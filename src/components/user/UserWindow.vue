<template>
    <div class="user-window" ref="userWindowRef">
        <Message :topOffset="'70px'" ref="messageRef" />

        <!-- 左侧用户信息卡片展示区域 -->
        <div class="user-left">
            <UserInfo :user-info="userData.user" @display-setting="handleSetting"
                :is-setting="displaySetting || hasSettingItem" :has-login="userData.hasLogin"
                @display-login="displayLogin" />
        </div>
        <Transition name="slide" mode="out-in">
            <!-- 邮箱提示组件 -->
            <div class="user-email-unbind" v-if="isShowEmailTip && !displaySetting && !hasSettingItem">
                <div class="email-tip">
                    <div class="content">
                        <p>您好呀！您还没有绑定邮箱，邮箱可用于登录和找回密码，为了您的账号安全请绑定邮箱!</p>
                    </div>
                    <div class="to-bind">
                        <div class="emoji">
                            ☺️
                        </div>
                        <button @click="isShowEmailTip = false">稍后绑</button>
                        <button @click="handleNowBindingEmail">现在绑</button>
                    </div>
                </div>
            </div>
            <!-- 设置菜单组件 -->
            <div class="user-right" v-else-if="displaySetting">
                <UserSetting @hide-setting="displaySetting = false" @select-option="handleSelectOption" />
            </div>
            <!-- 具体设置项组件 -->
            <div class="user-right" v-else-if="hasSettingItem">
                <UserSettingItem :option-id="optionId" @hide-item="handleHideItem" />
            </div>
        </Transition>

    </div>
</template>
<script setup>
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import UserInfo from './UserInfo.vue';
import { userStore } from '@/stores/user';
import UserSetting from './UserSetting.vue';
import UserSettingItem from './UserSettingItem.vue';
import { scrollTo } from '@/utils/scroll';
import emitter from '@/utils/emitter';
import { apis } from '@/api/api';
const userData = userStore()
const optionId = ref(100)
const messageRef = ref(null)


//是否显示没绑定邮箱提示
const isShowEmailTip = ref(false)
//控制是否显示设置选项
const displaySetting = ref(false)
//用户信息窗口
const userWindowRef = ref(null)

//是否有设置项显示
const hasSettingItem = computed(() => {
    return optionId.value < 7
})

onMounted(() => {
    //刚进入用户信息页面时检查是否绑定邮箱，如果没绑定显示提示消息
    checkEmailBinding()
})

const displayLogin = () => {
    //显示登陆窗口事件
    emitter.emit('display-login')
}


//监听点击哪个设置选项
const handleSelectOption = (index) => {
    displaySetting.value = false
    if(index === 7){
        userData.clearToken()
        userData.clearUserData()
    }
    optionId.value = index
    scrollToBottom()
}

let emailCheckTimer = null;

const checkEmailBinding = () => {
    // 清除之前的定时器
    if (emailCheckTimer) {
        clearTimeout(emailCheckTimer);
    }

    emailCheckTimer = setTimeout(() => {
        const flag = userData.hasLogin && userData.isBindEmail
        isShowEmailTip.value = flag
        if (flag) {
            scrollTo('bottom', 150, userWindowRef.value)
        }
    }, 1000)
}

//显示设置菜单
const handleSetting = () => {

    //显示 隐藏设置菜单项
    displaySetting.value = !displaySetting.value
    //隐藏邮箱提示
    isShowEmailTip.value = false
    // 清除定时器
    if (emailCheckTimer) {
        clearTimeout(emailCheckTimer);
        emailCheckTimer = null;
    }

    if (hasSettingItem.value) {
        optionId.value = 100
        displaySetting.value = false
    }

}

//隐藏设置项，显示设置菜单
const handleHideItem = (index) => {
    displaySetting.value = true
    //如果是通过点击绑定邮箱提示的绑定邮箱按钮
    if (index === 5 && controlEmialItemHide.value) {
        displaySetting.value = false
    }
    optionId.value = 100
    controlEmialItemHide.value = false
    scrollToBottom()

}

const scrollToBottom = () => {
    nextTick(() => {
        setTimeout(() => {
            scrollTo('bottom', 150, userWindowRef.value)
            console.log('bottom 执行了')
        }, 300)
    })
}

//现在绑定邮箱
const controlEmialItemHide = ref(false)
const handleNowBindingEmail = () => {
    isShowEmailTip.value = false
    optionId.value = 5
    controlEmialItemHide.value = true
    if (window.innerWidth < 1100) {
        scrollToBottom()
    }

}

//监听是否显示设置菜单，如果显示窗口滚动到底部
watch(() => displaySetting.value, (newValue) => {
    if (!newValue && !hasSettingItem.value) {
        checkEmailBinding()
    }
    if (window.innerWidth >= 1100)
        return
    if (newValue || hasSettingItem.value) {
        scrollTo('bottom', 150, userWindowRef.value)
    } else {
        scrollTo('top', 150, userWindowRef.value)
    }
}, { immediate: true })

//监听是否登录或退出登录
watch(() => userData.hasLogin, (newValue) => {
    if (newValue) {
        checkEmailBinding()
    } else {
        isShowEmailTip.value = false
        optionId.value = 100
        displaySetting.value = false
    }
}, { immediate: true })

//处理请求函数
const handleUpdateRequest = async (eventData) => {
    console.log("请求参数", eventData.data);
    let message = ''
    try {
        const resp = await apis.update(eventData.data)
        console.log("服务端返回更新结果：", resp);
        //更新展示的用户信息
        if (eventData.type === 'nickname') {
            userData.user.nickname = eventData.data.nickname
            message = "昵称修改成功😉"
            handleHideItem(0)
        }
        if (eventData.type === 'gender') {
            message = "性别设置成功😉"
            userData.user.gender = eventData.data.gender
            handleHideItem(2)
        }
        if (eventData.type === 'bio') {
            message = "个人简介设置成功😉"
            userData.user.bio = eventData.data.bio
            handleHideItem(4)
        }
        messageRef.value.show(message)
    } catch (error) {
        messageRef.value.show(error.message)
    }
}

const handleDestroyUser = async (eventData) => {
    console.log("注销用户数据：", eventData);
    console.log(eventData);

    try {
        const resp = await apis.destroy(eventData)
        console.log("服务器返回的注销结果：", resp);
        messageRef.value.show("注销成功")

        // 退出用户
        userData.clearToken()
        userData.clearUserData()
        handleHideItem(3)
    } catch (error) {
        messageRef.value.show(error.message)
    }
}


const handleResetPassword = async (evnetData) => {
    console.log("用户重置密码的数据", evnetData);
    try {
        const resp = await apis.modify(evnetData)
        console.log("服务端响应结果：", resp);
        messageRef.value.show("重置密码成功")
        handleHideItem(6)
    } catch (error) {
        messageRef.value.show(error.message)
    }
}

const handleAvatarModify = async (eventData) => {
    console.log("用户上传的头像图片数据：", eventData);
    try {
        //判断点击类型
        //提交上传图片点击事件
        if (eventData.type === 'upload') {
            let resp
            //判断上传类型
            //提交随机生成的图片
            if (eventData.random) {
                resp = await apis.randomAvatar('confirm')
            } else {
                //提交本地上传图片
                resp = await apis.avatar(eventData.data)
            }
            userData.user.avatar = resp
            messageRef.value.show("头像修改成功😉")
            handleHideItem(1)

        }
        //生成随机图片点击事件
        else {
            const resp = await apis.randomAvatar('generate')
            eventData.callback(resp)
            console.log("服务端响应：", resp);
        }

    } catch (error) {
        console.log(error.message);
        messageRef.value.show(error.message)

    }

}

const handleBindEmail = async (eventData) => {
    console.log("用户请求数据：", eventData);
    try {
        if (eventData.type === 'code') {
            const resp = await apis.code(eventData.data)
            console.log("服务端验证码接口响应结果", resp);
            // messageRef.value.show("验证码已发送")
            eventData.callback(true)
        }
        if (eventData.type === 'bind') {
            const resp = await apis.email(eventData.data)
            console.log("服务端绑定邮箱接口响应结果", resp);
            messageRef.value.show("邮箱绑定成功")
            userData.user.email = eventData.data.email
            handleHideItem(5)
        }
    } catch (error) {
        if (eventData.type === 'code') {
            eventData.callback(false)
        }
        messageRef.value.show(error.message)
    }

}

//请求执行更新用户数据操作
emitter.on('handle-update-request', handleUpdateRequest)
//请求注销用户操作
emitter.on('handle-destroy-user', handleDestroyUser)
//请求重置密码
emitter.on('handle-reset-password', handleResetPassword)
//修改头像
emitter.on('handle-avatar-modify', handleAvatarModify)
//绑定邮箱
emitter.on('handle-bind-email', handleBindEmail)


</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;
@use "@/assets/styles/mixins/_tooltip-mixins.scss" as *;

.user-window {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    overflow: hidden;
    // overflow-y: auto;

    .user-left {
        width: 100%;
    }

    .user-email-unbind {
        width: 100%;
        padding-top: 15px;
        display: flex;
        justify-content: flex-end;
        // animation: slideLeft 0.3s ease-in-out;

        .email-tip {
            max-width: 60%;
            padding: 10px;
            border: 1px solid $theme-primary;
            border-radius: 10px;

            .content {
                width: 100%;
                margin-bottom: 15px;

                p {
                    color: $theme-font-gray;
                }
            }

            .to-bind {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                gap: 10px;

                .emoji {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: auto;
                }

                button {
                    padding: 5px 10px;
                    border: none;
                    background-color: $theme-primary;
                    color: $theme-font-light;
                    border-radius: 5px;
                }
            }
        }
    }

    .user-right {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding-top: 15px;
    }
}

@media (max-width: 1100px) {
    .user-window {
        overflow: hidden;
        overflow-y: auto;
    }
}

.slide-enter-active {
    animation: slideLeft 0.3s ease-in-out;
}

.slide-leave-active {
    animation: slideLeftOut 0.1s ease-in-out;
}
</style>
