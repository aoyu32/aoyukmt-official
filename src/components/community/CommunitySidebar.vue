<template>
    <div class="sidebar">
        <!-- 上半部分：头像和用户名 -->
        <div class="sidebar-top">
            <div class="user-info">
                <div class="avatar" @click="displayUserIDCard">
                    <img :src="userData.user.avatar" alt="User Avatar" />
                </div>
                <p class="username">{{ userData.user.name }}</p>
            </div>
        </div>

        <div class="sidebar-middle"></div>

        <div class="sidebar-bottom">
            <router-link v-for="(item, index) in menuItems" :key="index" :to="item.link" class="menu-item"
                :title="item.name" :class="{ 'active': currentIndex === index }" @click="currentIndex = index">
                <div class="menu-icon"><span>{{ item.icon }}</span></div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { userStore } from '@/stores/user';
const userData = userStore()
const currentIndex = ref(0)

// 菜单项数据
const menuItems = [
    { name: "人机客服🐔", icon: "🐻‍❄️", link: "/community/assistant" },
    { name: "意见反馈🐼", icon: "👻", link: "/community/feedback" },
    { name: "群聊论坛☠️", icon: "🐚", link: "/community/forum" },

];

//显示用户身份证卡片
const emit = defineEmits(["display-user-card"])
const displayUserIDCard = () => {
    emit("display-user-card")
}


</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.sidebar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    padding: 20px 10px;
    box-sizing: border-box;

    a {
        text-decoration: none;
    }

    .sidebar-top {
        .user-info {
            text-align: center;

            .avatar {
                width: 50px;
                height: 50px;
                border: 1px solid $theme-primary;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 auto 10px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;

                }
            }

            .username {
                font-size: 14px;
                color: $theme-font-gray;
                word-wrap: break-word;
            }
        }
    }

    .sidebar-middle {
        flex-grow: 1;
    }

    .sidebar-bottom {
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        justify-content: center;

        .menu-item {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid $theme-primary;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;
            line-height: 40px;
            transition: background-color 0.3s ease;

            /* 上传按钮的提示气泡 */
            &::after {
                content: attr(title);
                /* 提示文本 */
                position: absolute;
                bottom: 0px;
                left: 120%;
                transform: translateX(-50%);
                background-color: $theme-secondary-light;
                color: $theme-font-light;
                padding: 8px 12px;
                border-radius: 5px;
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                display: none;
                /* 默认隐藏 */
                opacity: 0;
                transition: opacity 0.3s ease, transform 0.3s ease;
                white-space: nowrap;
                z-index: 1000;


            }

            &:hover::after {
                display: block;
                opacity: 1;
                transform: translateX(-50%) translateY(-10px);
                animation: slideIn 0.3s ease-in-out forwards, fadeOut 0.5s 1.2s forwards;
            }

            .menu-icon {
                width: 40px;
                height: 40px;
                display: flex;
                font-size: 16px;
                align-items: center;
                justify-content: center;


                span {
                    width: 100%;
                    // background-color: aqua;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease-in-out;
                }


            }


            &:not(.active):hover {

                border: 2px solid $theme-primary;

                span {
                    transform: scale(1.3);
                }
            }

            &.active {
                border: 2px solid $theme-primary;
                box-shadow: 0 0 7px $theme-primary-shadow;

                .menu-icon {
                    display: inline-block;
                    animation: fontSize 2s infinite ease-in-out;
                }
            }

        }

    }
}

@media (max-width:786px) {
    .sidebar {
        padding: 10px 10px 20px 10px;

        .sidebar-top {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;


            .user-info {
                .avatar {
                    width: 40px;
                    height: 40px;
                }

                .username {
                    display: none;
                }
            }
        }

    }
}
</style>