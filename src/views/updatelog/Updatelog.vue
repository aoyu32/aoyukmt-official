<template>
    <div class="updatelog">
        <div class="main-content">
            <div class="sidebar">
                <UpdatelogSidebar v-aos="{
                    animation: 'slide-right',
                }" />
            </div>
            <div class="container">
                <div class="content">
                    <div class="latest">
                        <h2>🪁 NEW版本更新日志</h2>
                        <UpdatelogCard />
                    </div>
                    <div class="history">
                        <h2>🥏 历史版本</h2>
                        <UpdatelogCard />
                        <UpdatelogCard />
                        <UpdatelogCard />
                        <UpdatelogCard />
                    </div>
                </div>
            </div>

        </div>
    </div>




</template>
<script setup>
import UpdatelogCard from '@/components/updatelog/UpdatelogCard.vue';
import UpdatelogSidebar from '@/components/updatelog/UpdatelogSidebar.vue';

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
            width: 100%;
            height: 100vh;

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