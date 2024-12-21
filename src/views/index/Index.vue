<template>
    <router-view></router-view>
    <div>
        <section class="introduce">
            <canvas id="backgroundCanvas"></canvas> <!-- 将 canvas 放入 section 内 -->
            <div class="aoyukmt-ico">
                <img src="@/assets/aoyukmt.png">
            </div>
            <div class="introduce-content">
                <h2>AOYUKMT</h2>
                <h1>自定义“真快捷”键工具</h1>
                <p>自由支配你的按键，让你拥有一套属于自己的快捷键，独特的键盘操作</p>
                <a href="https://github.com/aoyu32/aoyukmt_pro/releases" class="download-btn floating">
                    立即下载
                </a>
            </div>
            <div class="scroll-down">
                <span>&#9660;</span>
            </div>
        </section>
        <section class="features" id="features">
            <h2>✨ 功能特点</h2>
            <div class="feature-grid">
                <!-- 使用 v-for 渲染功能卡片 -->
                <div class="feature-card" v-for="(feature, index) in features" :key="index">
                    <div class="feature-icon">{{ feature.icon }}</div>
                    <h3>{{ feature.title }}</h3>
                    <p>{{ feature.description }}</p>
                </div>
            </div>
        </section>

        <section class="feature-details" id="details">
            <h2>🔖 功能展示</h2>
            <div class="detail-card" v-for="(detail, index) in details" :key="index">
                <h3><span class="icon">{{ detail.icon }}</span>{{ detail.title }}</h3>
                <div class="detail-content">
                    <template v-if="index % 2 === 0">
                        <div class="detail-image">
                            <img :src="detail.image" :alt="detail.alt">
                        </div>
                        <div class="detail-text">
                            <p>{{ detail.text }}</p>
                        </div>
                    </template>
                    <template v-else>
                        <div class="detail-text">
                            <p>{{ detail.text }}</p>
                        </div>
                        <div class="detail-image">
                            <img :src="detail.image" :alt="detail.alt">
                        </div>
                    </template>
                </div>
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
import { ref, onMounted } from "vue";
import { initBackgroundCanvas } from "@/utils/canvas";
// 定义功能项的数据
const features = ref([
    { icon: "🔧", title: "模块化设计", description: "灵活可控的功能模块，按需开启禁用" },
    { icon: "⌨️", title: "快捷字符输入", description: "特殊字符快速输入，效率倍增" },
    { icon: "🎯", title: "方向键操作", description: "方向键与space组合，移动更便捷" },
    { icon: "📝", title: "编辑操作", description: "复制、粘贴、撤销等操作一键完成" },
    { icon: "🚀", title: "快捷启动", description: "磁盘和应用程序快速启动" },
    { icon: "📌", title: "自定义热字符串", description: "常用内容快速输入" },
    { icon: "⚡", title: "小巧迅速", description: "响应迅速，无卡顿，资源占用低" },
    { icon: "🪟", title: "便捷窗口操作", description: "方便快捷的窗口管理操作方式" },
    { icon: "🗂️", title: "文件管理器快捷键", description: "自由配置文件管理器常用操作快捷键" }
]);


// 定义展示项的数据
const details = ref([
    {
        icon: "⌨️",
        title: "快捷字符输入",
        text: "通过简单的快捷键组合，即可快速输入各种特殊字符。支持自定义映射规则，让您的输入更加高效。无需记忆复杂的字符码，一键即可输入常用符号。",
        image: new URL('@/assets/8.webp', import.meta.url).href,
        alt: "快捷字符输入示意图"
    },
    {
        icon: "🎯",
        title: "方向键操作",
        text: "创新的方向键与空格键组合操作，让您的光标移动更加灵活。无需频繁移动手部位置，即可实现精确的光标控制，大大提升工作效率。",
        image: new URL('@/assets/5.webp', import.meta.url).href,
        alt: "方向键操作示意图"
    },
    {
        icon: "🚀",
        title: "快捷启动",
        text: "一键启动常用应用程序和文件夹，快速访问系统磁盘。支持自定义启动项配置，让您的工作流程更加流畅。告别繁琐的点击操作，提升工作效率。",
        image: new URL('@/assets/6.webp', import.meta.url).href,
        alt: "快捷启动示意图"
    },
    {
        icon: "📝",
        title: "编辑操作",
        text: "常用编辑操作快捷键不在局限于固定Ctrl,C,V,X,Z，告别别扭的Ctrl组合快捷键，灵活快捷键配置常用编辑操作快捷键。",
        image: new URL('@/assets/7.webp', import.meta.url).href,
        alt: "编辑操作示意图"
    },
    {
        icon: "🪟",
        title: "窗口操作",
        text: "一键启动常用应用程序和文件夹，快速访问系统磁盘。支持自定义启动项配置，让您的工作流程更加流畅。告别繁琐的点击操作，提升工作效率。",
        image: new URL('@/assets/6.webp', import.meta.url).href,
        alt: "窗口操作示意图"
    },
    {
        icon: "🗂️",
        title: "文件操作",
        text: "常用编辑操作快捷键不在局限于固定Ctrl,C,V,X,Z，告别别扭的Ctrl组合快捷键，灵活快捷键配置常用编辑操作快捷键。",
        image: new URL('@/assets/7.webp', import.meta.url).href,
        alt: "文件操作示意图"
    }
]);

onMounted(() => {
    initBackgroundCanvas("backgroundCanvas");
});

</script>
<style lang="scss" scoped>
@import "@/assets/styles/index/introduce.scss";
@import "@/assets/styles/index/features.scss";
@import "@/assets/styles/index/detail.scss";
@import "@/assets/styles/index/footer.scss";
</style>