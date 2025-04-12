<template>
    <div class="user-window" ref="userWindowRef">
        <Message :messageContent="tipContext" :topOffset="'70px'" />

        <!-- 左侧用户信息卡片展示区域 -->
        <div class="user-left">
            <UserInfo :user-info="userData.user" @display-setting="handleSetting"
                :is-setting="displaySetting || optionId !== 100" />
        </div>
        <Transition name="slide">
            <div class="user-email-unbind" v-if="isShowEmailTip">
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
        </Transition>
        <!-- 右侧用户信息修改区域 -->
        <Transition name="slide">
            <div class="user-right" v-if="displaySetting">
                <UserSetting @hide-setting="displaySetting = false" @select-option="handleSelectOption" />
            </div>
        </Transition>

        <Transition name="slide">
            <div class="user-right" v-if="optionId !== 100">
                <UserSettingItem :option-id="optionId" @hide-item="handleHideItem" />
            </div>
        </Transition>


    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import Message from '../common/Message.vue';
import UserInfo from './UserInfo.vue';
import { userStore } from '@/stores/user';
import UserSetting from './UserSetting.vue';
import UserSettingItem from './UserSettingItem.vue';
import { scrollTo } from '@/utils/scroll';
const userData = userStore()
const tipContext = ref("")
const isShowEmailTip = ref(false)
const displaySetting = ref(false)
const userWindowRef = ref(null)
onMounted(() => {
    checkEmailBinding()
})

//监听点击哪个设置选项
const optionId = ref(100)
const handleSelectOption = (index) => {
    optionId.value = index
    displaySetting.value = false
    controlEmialItemHide.value = false
}

//检查是否绑定邮箱
const checkEmailBinding = () => {
    setTimeout(() => {
        isShowEmailTip.value = userData.hasLogin ? userData.isBindEmail : false
        if (userData.hasLogin && userData.isBindEmail) {
            scrollTo('bottom', 150, userWindowRef.value)
        }
    }, 1000)
}

//显示设置菜单
const handleSetting = () => {
    if (optionId.value !== 100) {
        displaySetting.value = !displaySetting.value
    }
    optionId.value = 100
    displaySetting.value = !displaySetting.value
    isShowEmailTip.value = false

}

//隐藏设置项，显示设置菜单
const handleHideItem = (index) => {
    optionId.value = 100
    if (index === 5 && controlEmialItemHide.value)
        return
    displaySetting.value = true
}

//现在绑定邮箱
const controlEmialItemHide = ref(false)
const handleNowBindingEmail = () => {
    isShowEmailTip.value = false
    optionId.value = 5
    controlEmialItemHide.value = true
    if (window.innerWidth >= 1100)
        return
    scrollTo('bottom', 150, userWindowRef.value)
}

//监听是否显示设置菜单，如果显示窗口滚动到底部
watch(() => displaySetting.value, (newValue) => {
    console.log("是否处于设置模式：", !newValue && optionId.value === 100);

    if (!newValue && optionId.value === 100)
        checkEmailBinding()
    if (window.innerWidth >= 1100)
        return
    if (newValue || optionId.value !== 100) {
        scrollTo('bottom', 150, userWindowRef.value)
    } else {
        scrollTo('top', 150, userWindowRef.value)
    }
}, { immediate: true })

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
