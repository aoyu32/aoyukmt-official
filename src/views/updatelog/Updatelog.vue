<template>
    <div class="updatelog">
        <div class="main-content">
            <div class="sidebar">
                <UpdatelogSidebar />
            </div>
            <div class="container">
                <div class="content">
                    <div class="latest" v-aos="{
                        animation: 'zoom-in',
                        duration: 300,
                    }">
                        <h2 id="latest">🪁 NEW版本更新日志</h2>
                        <UpdatelogCard :versionData="latestData" />
                    </div>
                    <div class="history">
                        <h2>🥏 历史版本</h2>
                        <UpdatelogCard v-for="(item, index) in historyData" :key="index" :versionData="item"  :id="`version${item.id}`"/>
                    </div>
                </div>
            </div>

        </div>
    </div>


</template>
<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import UpdatelogCard from '@/components/updatelog/UpdatelogCard.vue';
import UpdatelogSidebar from '@/components/updatelog/UpdatelogSidebar.vue';
import { initLenis, destroyLenis } from "@/utils/lenis";
import { useUpdatelogStore } from '@/stores/updatelog';
import { latestData, historyData } from '@/data/version'

const updatelogStore = useUpdatelogStore()

onMounted(() => {
    initLenis();
    updatelogStore.setLatest(latestData)
    updatelogStore.setHistory(historyData)

});

onUnmounted(() => {
    destroyLenis()
})

</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/constant.scss" as *;

.updatelog {
    display: flex;
    justify-content: center; // 居中子元素（水平）
    align-items: center; // 居中子元素（垂直）
    width: 100%;


    .main-content {
        margin-top: 72px;
        width: 1200px;
        height: calc(100vh - 72px);
        display: flex;
        flex-direction: row;
        position: relative;

        .container {
            height: 100vh;
            width: 100%;

            .content {
                flex: 1;
                background-color: rgb(255, 255, 255);
                margin-left: 250px;
                height: auto;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-direction: column;
                font-size: 16px;
                color: #333;
                padding: 10px 50px 0 50px;
                box-shadow: 1px 0 3px rgba(88, 86, 86, 0.114);



                h2 {
                    margin-bottom: 20px;
                    /* background-color: #ff6b6b; */
                    border-radius: 15px;
                    color: $primary-color;
                }

                .latest {
                    width: 100%;
                    padding: 20px;
                    margin-bottom: 30px;

                }

                .history {
                    width: 100%;
                    padding: 20px;

                }
            }
        }


    }

}
</style>