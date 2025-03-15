<template>
    <div class="index">
        <Message :messageContent="tipContext" :isShowMessage="indexStore.showTip" :topOffset="'72px'" />
        <section class="introduce">
            <canvas id="backgroundCanvas"></canvas> <!-- 将 canvas 放入 section 内 -->
            <div class="aoyukmt-ico" v-aos="{
                animation: 'slide-down',
                duration: 450,
            }">
                <img src="@/assets/aoyukmt.png">
            </div>
            <div class="introduce-content">
                <h2>AOYUKMT</h2>
                <!-- <h1>自定义“真快捷”键工具</h1> -->
                <h1>一个能重新定义快捷键的工具</h1>
                <p>自由支配你的按键，让你拥有一套属于自己的快捷键，独特的键盘操作</p>
                <button class="download-btn floating" @click.prevent="downloadApp">
                    立即下载
                </button>
            </div>
            <div class="scroll-down">
                <span>&#9660;</span>
            </div>
        </section>
        <section class="features" id="features">
            <h2>功能 🔖 特点</h2>
            <div class="feature-container">
                <div class="loadding-box" v-if="indexStore.isFeatureListEmpty">
                    <Loadding :text="loaddingText" fontSize="25px" animationType="jump-up" :fullScreen="false" />
                </div>
                <div class="feature-grid" v-else>
                    <FeatureCard v-for="(feature, index) in indexStore.featureList" :key="index" :feature="feature" />
                </div>
            </div>
        </section>

        <section class="feature-details" id="details">
            <h2>功能 🎸 展示</h2>
            <div class="details-container">
                <div class="loadding-box" v-if="indexStore.isDetailListEmpty">
                    <Loadding :text="loaddingText" fontSize="25px" animationType="jump-up" :fullScreen="false" />
                </div>
                <div class="details-box" v-else>
                    <DetailCard v-for="(detail, index) in indexStore.detailList" :key="index" :detail="detail"
                        :index="index" />
                </div>
            </div>
        </section>

        <section>
            <div class="scroll-up">
                <span @click="scrollTo('top', 400)">&#9650;</span>
            </div>
        </section>
        <footer>
            <div class="footer-waves"></div>
            <div class="footer-content">
                <div class="copyright">
                    <p class="copyright-text">打造更高效的键盘操作体验</p>
                    <p class="copyright-explain">Copyright © 2024 - Aoyukmt All Rights Reserved</p>
                </div>
            </div>
        </footer>
    </div>
</template>
<script setup>
import FeatureCard from "@/components/index/FeatureCard.vue";
import DetailCard from "@/components/index/DetailCard.vue";
import { ref, onMounted, nextTick, onUpdated, onUnmounted } from "vue";
import Message from "@/components/common/Message.vue";
import tools from "@/utils/tools";
import { initLenis, destroyLenis } from "@/utils/lenis";
import { scrollTo } from "@/utils/scroll";
import { apis } from "@/api/api";
import { useIndexStore } from "@/stores";

//动画背景
import { initBackgroundCanvas } from "@/utils/canvas";
import Loadding from "@/components/common/Loadding.vue";
const loaddingText = ref("LOADDING")
const indexStore = useIndexStore()
let lenis = null
onMounted(async () => {
    lenis = initLenis()
    initBackgroundCanvas("backgroundCanvas");
    if (indexStore.isFeatureListEmpty) {
        try {
            const featureList = await apis.getFeatureList()
            indexStore.setFeatureList(featureList)
            // 等待 DOM 更新后再执行
            await nextTick();
            lenis.resize()
        } catch (error) {
            loaddingText.value = error.message;
        }
    }
    if (indexStore.isDetailListEmpty) {
        try {
            const detailList = await apis.getDetailList()
            indexStore.setDetailList(detailList)
            // 等待 DOM 更新后再执行
            await nextTick();
            lenis.resize()
        } catch (error) {
            loaddingText.value = error.message;
        }
    }

});
const tipContext = ref("")
const downloadApp = async (event) => {

    try {
        const path = await apis.downloadLatest("installer", "123")
        tools.downloadFile(path)
    } catch (error) {
        tipContext.value = error.message + "!🤬"
        indexStore.setShowTip()
    }

}



onUnmounted(() => {
    destroyLenis()
})

</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/index/introduce.scss";
@use "@/assets/styles/index/footer.scss";

//功能特点卡片盒子
.features {
    padding: 4rem 0rem;
    max-width: $max-width;
    margin: 0 auto;

    h2 {
        text-align: center;
        font-size: 2rem;
        margin: 4rem 0rem;
        color: $theme-primary;
    }

    .feature-container {
        width: 100%;
        height: 100%;
    }

    //功能特点网格布局
    .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: $feature-card-gap;

    }

}


//功能展示卡片盒子
.feature-details {
    background: $theme-detail-background;
    overflow: hidden;

    h2 {
        text-align: center;
        font-size: 2rem;
        margin: 4rem 0rem;
        color: $theme-primary;
    }
}

.loadding-box {
    width: 100%;
    height: 200px;
    background-color: $theme-primary-lt;

}

//前往顶部按钮
.scroll-up {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 2s 1s both;
    background: $theme-detail-background;
    position: relative;
    /* 设置较高的 z-index */

    span {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        color: $theme-secondary;
        animation: floating 3s ease-in-out infinite;
        border-radius: 50%;
        background-color: transparent;
        transition: width 0.2s ease-in-out, height 0.2s ease-in-out, background-color 0.2s ease-in-out;

        &:hover {
            width: 40px;
            height: 40px;
            background-color: $theme-primary-lt;
            cursor: pointer;
        }
    }
}
</style>