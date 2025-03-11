<template>
    <div class="updatelog">
        <div class="main-content">
            <div class="loadding-box" v-if="updatelogStore.isLatestEmpty && updatelogStore.isHistoryEmpty">
                <Loadding :text="loaddingText" fontSize="35px" animationType="jump-up" :fullScreen="false" />
            </div>
            <div class="updatelog-box" v-else>
                <button class="sidebar-toggle" :class="{ 'rotated': isShowSidebar }"
                    @click="isShowSidebar = !isShowSidebar">
                    <i class="iconfont icon-arrow-left-filling" id="sidebar-button"></i>
                </button>
                <div class="sidebar" :class="{ 'show': !isShowSidebar }">
                    <UpdatelogSidebar @showSidebar="handleShowSidebar" />
                </div>
                <div class="container" @click="toggleSidebar">
                    <div class="content">
                        <div class="latest" v-aos="{
                            animation: 'zoom-in',
                            duration: 300,
                        }">
                            <h2 id="latest">🪁 NEW版本更新日志</h2>
                            <div class="loadding" v-if="updatelogStore.isLatestEmpty">
                                <Loadding :text="loaddingText" fontSize="35px" animationType="jump-up"
                                    :fullScreen="false" />
                            </div>
                            <UpdatelogCard :versionData="updatelogStore.latest" v-else />
                        </div>

                        <div class="history">
                            <h2>🥏 历史版本</h2>
                            <div class="loadding" v-if="updatelogStore.isHistoryEmpty">
                                <Loadding :text="loaddingText" fontSize="35px" animationType="jump-up"
                                    :fullScreen="false" />
                            </div>
                            <UpdatelogCard v-for="(item, index) in updatelogStore.history" :key="index"
                                :versionData="item" :id="`version${item.id}`" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script setup>
import { ref, nextTick, onUpdated, onMounted, onUnmounted } from 'vue'
import UpdatelogCard from '@/components/updatelog/UpdatelogCard.vue';
import UpdatelogSidebar from '@/components/updatelog/UpdatelogSidebar.vue';
import { useUpdatelogStore } from '@/stores/updatelog';
import Loadding from '@/components/feedback/Loadding.vue';
import { apis } from '@/api/api';
const loaddingText = ref("LOADDING")
const updatelogStore = useUpdatelogStore()
onMounted(async () => {

    // 初始检查窗口大小
    checkWindowSize();
    // 监听窗口大小变化
    window.addEventListener('resize', checkWindowSize);
    if (updatelogStore.isLatestEmpty) {
        try {
            const latestLog = await apis.getLatestUpdatelog()
            updatelogStore.setLatest(latestLog)
        } catch (error) {
            loaddingText.value = error.message
        }
    }
    if (updatelogStore.isHistoryEmpty) {
        try {
            const historyLog = await apis.getHistoryUpdatelog()
            console.log(historyLog);
            updatelogStore.setHistory(historyLog)
        } catch (error) {
            loaddingText.value = error.message
        }

    }

});
//是否显示侧边栏
const isShowSidebar = ref(true)

// 检查窗口大小并设置状态
const checkWindowSize = () => {
    if (window.innerWidth >= 768) {
        isShowSidebar.value = true;
    }
}

const toggleSidebar = () => {
    if (isShowSidebar.value = true) {
        return
    } else {
        isShowSidebar.value = false
    }
}

const handleShowSidebar = () => {
    if (isShowSidebar.value = true) {
        return
    } else {
        isShowSidebar.value = false
    }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.sidebar-toggle {
    display: none;
    position: fixed;
    top: $distance-top;
    z-index: 20;
    color: $theme-primary;
    border: none;
    left: 0;
    cursor: pointer;
    background-color: $theme-background;
    border-radius: 50%;
    transition: background-color 0.3s ease;

    span {
        font-size: 1rem;
    }

    &:hover {
        color: $theme-primary-light;
    }

    .iconfont {
        font-size: 16px;
        transition: transform 0.3s ease;
        display: block;
    }

    &.rotated {
        .iconfont {
            transform: rotate(180deg);
        }
    }
}

.updatelog {
    display: flex;
    justify-content: center; // 居中子元素（水平）
    align-items: center; // 居中子元素（垂直）
    width: 100%;


    .main-content {
        margin-top: $distance-top;
        width: $max-width;
        height: calc(100vh - $distance-top);
        display: flex;
        flex-direction: row;
        position: relative;

        .loadding-box {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .sidebar {
            position: fixed;
            width: $updatelog-sidebar-width;
            height: 100%;
            background-color: $theme-background;
        }


        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10;
        }

        .container {
            height: 100vh;
            width: 100%;

            .content {
                flex: 1;
                background-color: $theme-background;
                margin-left: 250px;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-direction: column;
                font-size: 16px;
                color: $theme-font-dark;
                padding: 10px 50px 0 50px;
                box-shadow: 1px 0 3px $theme-shallow-shadow;

                .loadding {
                    width: 100%;
                    height: 250px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 30px;
                    background-color: $theme-primary-lt;
                }


                h2 {
                    margin-bottom: 20px;
                    /* background-color: #ff6b6b; */
                    border-radius: 15px;
                    color: $theme-primary;
                }

                .latest {
                    width: 100%;
                    padding: 20px;
                    // margin-bottom: 30px;
                }

                .history {
                    width: 100%;
                    padding: 20px;
                }
            }
        }


    }

    .updatelog-box {
        width: 100%;
        height: 100%;
    }


}

@media (max-width: 768px) {

    .updatelog {

        .main-content {
            .container {
                height: 100vh;
                width: 100%;

                .content {
                    margin-left: 0;
                    padding: 5px;
                }
            }

        }
    }

    .sidebar {
        position: fixed;
        background-color: $theme-background;
        transform: translateX(-100%);
        transition: transform 0.1s ease-in-out;
        z-index: 15;
    }

    .sidebar-toggle {
        display: block;
    }

    .show {
        transform: translateX(0);
        box-shadow: 3px 0 3px $theme-shallow-shadow;
    }

}
</style>