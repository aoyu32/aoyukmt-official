<template>
    <div class="index">
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
                <FeatureCard v-for="(feature, index) in features" :key="index" :feature="feature" />
            </div>
        </section>

        <section class="feature-details" id="details">
            <h2>🔖 功能展示</h2>
            <DetailCard v-for="(detail, index) in details" :key="index" :detail="detail" :index="index" />
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
import { initLenis, destroyLenis } from "@/utils/lenis";
import { ref, onMounted, onUnmounted } from "vue";
import { scrollTo } from "@/utils/scroll";
//动画背景
import { initBackgroundCanvas } from "@/utils/canvas";
// 定义功能项的数据
// const features = ref([
//     { icon: "🔧", title: "模块化设计", description: "灵活可控的功能模块，按需开启禁用" },
//     { icon: "⌨️", title: "快捷输入", description: "特殊字符快速输入，效率倍增" },
//     { icon: "🎯", title: "操作方便", description: "方向键与space组合，移动更便捷" },
//     { icon: "📝", title: "编辑操作", description: "复制、粘贴、撤销等操作一键完成" },
//     { icon: "🚀", title: "快捷启动", description: "磁盘和应用程序快速启动" },
//     { icon: "📌", title: "自定义热字符串", description: "常用内容快速输入" },
//     { icon: "⚡", title: "小巧迅速", description: "响应迅速，无卡顿，资源占用低" },
//     { icon: "🪟", title: "便捷窗口操作", description: "方便快捷的窗口管理操作方式" },
//     { icon: "🗂️", title: "文件管理器快捷键", description: "自由配置文件管理器常用操作快捷键" }
// ]);

const features = ref([
    { icon: "🔧", title: "模块化设计", description: "灵活可控的功能模块，按需开启禁用" },
    { icon: "⌨️", title: "自定义快捷键", description: "支持多种操作快捷键，适配个人习惯" },
    { icon: "🔤", title: "字符映射输入", description: "使用键位映射特殊字符，提高输入效率" },
    { icon: "🎯", title: "方向键替换", description: "可用 space+w/a/s/d 代替方向键操作" },
    { icon: "📝", title: "编辑控制增强", description: "提供剪切、复制、粘贴等快捷键方案" },
    { icon: "💾", title: "磁盘快捷访问", description: "RShift+字母 直接打开指定磁盘" },
    { icon: "🚀", title: "快速启动软件", description: "lalt+字母 启动常用本地软件" },
    { icon: "🌐", title: "快速访问网站", description: "ralt+字母 直接打开常用网站" },
    { icon: "📌", title: "热字符串扩展", description: "输入特定缩写，自动展开为完整文本" },
    { icon: "⚙️", title: "系统操作快捷键", description: "一键执行托盘、音量调节、关机重启等操作" },
    { icon: "🗂️", title: "资源管理器优化", description: "提供新建、删除、重命名等快捷方式" },
    { icon: "🪟", title: "窗口管理增强", description: "支持窗口关闭、最小化、最大化、移动等操作" }
]);


// 定义展示项的数据
// const details = ref([
//     {
//         icon: "⌨️",
//         title: "快捷字符输入",
//         text: "通过简单的快捷键组合，即可快速输入各种特殊字符。支持自定义映射规则，让您的输入更加高效。无需记忆复杂的字符码，一键即可输入常用符号。",
//         image: new URL('@/assets/8.webp', import.meta.url).href,
//         alt: "快捷字符输入示意图"
//     },
//     {
//         icon: "🎯",
//         title: "方向键操作",
//         text: "创新的方向键与空格键组合操作，让您的光标移动更加灵活。无需频繁移动手部位置，即可实现精确的光标控制，大大提升工作效率。",
//         image: new URL('@/assets/5.webp', import.meta.url).href,
//         alt: "方向键操作示意图"
//     },
//     {
//         icon: "🚀",
//         title: "快捷启动",
//         text: "一键启动常用应用程序和文件夹，快速访问系统磁盘。支持自定义启动项配置，让您的工作流程更加流畅。告别繁琐的点击操作，提升工作效率。",
//         image: new URL('@/assets/6.webp', import.meta.url).href,
//         alt: "快捷启动示意图"
//     },
//     {
//         icon: "📝",
//         title: "编辑操作",
//         text: "常用编辑操作快捷键不在局限于固定Ctrl,C,V,X,Z，告别别扭的Ctrl组合快捷键，灵活快捷键配置常用编辑操作快捷键。",
//         image: new URL('@/assets/7.webp', import.meta.url).href,
//         alt: "编辑操作示意图"
//     },
//     {
//         icon: "🪟",
//         title: "窗口操作",
//         text: "一键启动常用应用程序和文件夹，快速访问系统磁盘。支持自定义启动项配置，让您的工作流程更加流畅。告别繁琐的点击操作，提升工作效率。",
//         image: new URL('@/assets/6.webp', import.meta.url).href,
//         alt: "窗口操作示意图"
//     },
//     {
//         icon: "🗂️",
//         title: "文件操作",
//         text: "常用编辑操作快捷键不在局限于固定Ctrl,C,V,X,Z，告别别扭的Ctrl组合快捷键，灵活快捷键配置常用编辑操作快捷键。",
//         image: new URL('@/assets/7.webp', import.meta.url).href,
//         alt: "文件操作示意图"
//     }
// ]);

const details = ref([
    {
        icon: "⌨️",
        title: "高度自定义快捷键",
        text: "告别固定死板的系统快捷键，彻底解放您的操作习惯！支持自定义所有快捷键，轻松映射任意组合，让您的指尖操作更加流畅高效。无论是执行命令、调用软件，还是窗口管理，都能随心设置，打造完全符合自己习惯的操作方式，远超传统键盘快捷方式的局限。",
        image: new URL('@/assets/8.webp', import.meta.url).href,
        alt: "自定义快捷键示意图"
    },
    {
        icon: "🔤",
        title: "字符映射输入",
        text: "有些按键组合总让你感到别扭？比如输入一些常用的符号或字符，却总是需要按组合键或多次切换。现在，您可以通过软件将这些复杂组合映射成简单快捷的按键操作。只需按下自定义的快捷键组合，就能迅速输入常见字符，大大减少手指的移动和按键的记忆负担，轻松实现高效输入。",
        image: new URL('@/assets/9.webp', import.meta.url).href,
        alt: "智能字符映射输入示意图"
    },
    {
        icon: "🎯",
        title: "颠覆传统的方向键替代方案",
        text: "方向键太远？影响打字流畅度？本软件独创方向键替代方案，利用 Space + W/A/S/D 组合，实现更加顺滑精准的光标移动。无需再让手指离开主键区，减少疲劳，提高文本编辑效率，远超传统方向键的生硬体验。",
        image: new URL('@/assets/5.webp', import.meta.url).href,
        alt: "方向键替代方案示意图"
    },
    {
        icon: "🚀",
        title: "超快软件和文件启动",
        text: "还在费力翻找应用程序或文件？传统方式需要点击开始菜单、桌面图标或任务栏，而本软件让您通过快捷键一键直达，无需鼠标操作！支持自定义启动项，无论是文件夹、软件、网站还是磁盘，都能秒速打开，极大优化工作流。",
        image: new URL('@/assets/6.webp', import.meta.url).href,
        alt: "快速启动应用示意图"
    },
    {
        icon: "📌",
        title: "热字符串输入",
        text: "敲击几个字符，就能自动扩展出完整的单词、短语甚至整段文本。支持代码片段、邮件模板、客服回复等多种场景，彻底告别重复输入！相比传统输入法或剪贴板工具，热字符串能更快、更智能地完成文本扩展，极大提升效率。",
        image: new URL('@/assets/10.webp', import.meta.url).href,
        alt: "热字符串扩展示意图"
    },
    {
        icon: "📝",
        title: "编辑操作自由定义",
        text: "打破 Ctrl+C/V/X/Z 的僵化组合，支持完全自定义的剪切、复制、粘贴、撤销等快捷键，符合您的操作习惯。再也不用适应固定的快捷方式，而是让快捷键适应您！相比传统方式，减少按键冲突，提高输入流畅度。",
        image: new URL('@/assets/7.webp', import.meta.url).href,
        alt: "编辑操作优化示意图"
    },
    {
        icon: "⚙️",
        title: "全方位系统控制",
        text: "传统的系统操作需要打开多个窗口，点击各种菜单，而本软件提供一键控制方案。音量调节、输入法切换、亮度调节、托盘管理、关机重启等操作，全部可通过自定义快捷键一键搞定，彻底提升系统操控效率。",
        image: new URL('@/assets/11.webp', import.meta.url).href,
        alt: "系统功能控制示意图"
    },
    {
        icon: "🪟",
        title: "极致窗口管理",
        text: "传统窗口管理需要拖动、点击按钮，甚至调用任务管理器，本软件提供更便捷的解决方案！一键最小化、最大化、关闭、调整大小、移动窗口，甚至快速切换应用，减少鼠标依赖，让您的多任务处理更加高效。",
        image: new URL('@/assets/12.webp', import.meta.url).href,
        alt: "窗口管理增强示意图"
    },
    {
        icon: "🗂️",
        title: "文件管理器快捷键增强",
        text: "传统文件管理方式繁琐，需要鼠标操作或单调的固定快捷键。本软件允许您自由配置文件管理器快捷键，实现更快速的新建、删除、重命名、复制、粘贴等文件操作，让您的工作更加流畅，效率远超传统方式。",
        image: new URL('@/assets/13.webp', import.meta.url).href,
        alt: "文件管理优化示意图"
    }
]);


onMounted(() => {
    const controller = initBackgroundCanvas("backgroundCanvas");
    // Update colors later
    // controller.updateColors({
    //     keyBackground: { start: '#ffffff', end: '#ffffff' },
    //     keyBorder: '#4caf50',
    //     keyText: '#388e3c',
    //     plusSign: '#ffcc00'
    // });

    initLenis();
});

onUnmounted(() => {
    destroyLenis(); // 销毁 Lenis 实例
});

</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/index/introduce.scss";
@use "@/assets/styles/index/footer.scss";

//功能特点卡片盒子
.features {
    padding: 5rem 2rem;
    max-width: $max-width;
    margin: 0 auto;

    h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
        color: $theme-primary;
    }
}

//功能特点网格布局
.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $feature-card-gap;
}

//功能展示卡片盒子
.feature-details {
    padding: $detail-padding;
    // padding: 5rem 2rem;
    background: $theme-detail-background;
    overflow: hidden;

    h2 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 3rem;
        color: $theme-primary;
    }
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