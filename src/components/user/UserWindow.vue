<template>
    <div class="user-window">
        <Message :messageContent="tipContext" :topOffset="'70px'" />

        <!-- 左侧用户信息卡片展示区域 -->
        <div class="user-left">
            <UserInfo :user-info="userData.user" @display-update="displayUpdate = !displayUpdate" />
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
                        <button>现在绑</button>
                    </div>
                </div>
            </div>
        </Transition>
        <!-- 右侧用户信息修改区域 -->
        <Transition name="slide">
            <div class="user-right" v-if="displayUpdate">
                <UserUpdate @hide-update="displayUpdate = false" />
            </div>
        </Transition>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Message from '../common/Message.vue';
import UserInfo from './UserInfo.vue';
import { userStore } from '@/stores/user';
import UserUpdate from './UserUpdate.vue';
const userData = userStore()
const tipContext = ref("")
const isShowEmailTip = ref(false)
const displayUpdate = ref(false)
onMounted(() => {
    console.log("用户数据：", userData.user);
    console.log(userData.isBindEmail);

    setTimeout(() => {
        isShowEmailTip.value = userData.hasLogin ? userData.isBindEmail : false
    }, 1000)
})

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
    padding: 15px 15px;
    overflow: hidden;
    overflow-y: auto;

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

.slide-enter-active {
    animation: slideLeft 0.3s ease-in-out;
}

.slide-leave-active {
    animation: slideLeftOut 0.15s ease-in-out;
}
</style>
