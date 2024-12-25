<template>
    <div class="download">
        <section class="download-section dynamic-background">
            <!-- 动态背景的 Canvas -->
            <canvas ref="backgroundCanvas" class="canvas-background"></canvas>
            <img src="@/assets/aoyukmt.png" v-aos="{
                animation: 'slide-down'
            }" class="img-animation">

            <div class="download-text">
                <h2 id="download-h2"><span ref="downloadText"></span></h2>
            </div>

            <p class="download-platform">支持 window 7+ 平台，选择适合您的版本：</p>
            <div class="download-options">
                <DownloadCard v-for="(item, index) in downloadOptions" :key="index" :title="item.title"
                    :description="item.description" :downloadLink="item.downloadLink" :animation="item.animation" />
            </div>
            <p class="latest-version">
                <span class="version">🦈V1.0.0</span> ｜
                <span class="update">🎉Last updated 2024-11-22</span> ｜
                <span class="platform">🎲Win 7 & 10 & 11</span>
            </p>
        </section>
        <footer>
            <p>&copy; 2024 aoyukmt. All rights reserved. | 支持 Windows 系统</p>
        </footer>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DownloadCard from "@/components/download/DownloadCard.vue";
import TypeEffect from "@/utils/typing";
import AOS from 'aos';
import 'aos/dist/aos.css';  // 必须引入CSS
const downloadText = ref(null)
let typingInstance = null;  // 用来存储打字效果实例

const backgroundCanvas = ref(null);


const initTypeEffect = {
    typingSpeed: 50,  // 自定义输入速度
    deletingSpeed: 45,  // 自定义删除速度
    pauseTime: 300,  // 自定义暂停时间
    cursor: "👇",  // 自定义光标
}
// 在 onMounted 中设置监听
onMounted(() => {
    typingInstance = new TypeEffect("下载AOYUKMT到你的WINDOWS", downloadText.value, initTypeEffect);
    typingInstance.start();  // 启动打字效果
});
// 组件销毁时清除打字机效果
onBeforeUnmount(() => {
    if (typingInstance) {
        typingInstance.stop();  // 停止当前的打字机效果
    }
});
const downloadOptions = ref([
    {
        title: '安装版',
        description: '🔧 安装程序，适用于更复杂的安装需求',
        downloadLink: './downloads/aoyukmt_full.zip',
        animation: 'slide-right', // 这里的动画可以根据需要更改
    },
    {
        title: '便携版',
        description: '📦 灵活：ZIP压缩包解压即用，绿色便携',
        downloadLink: './downloads/aoyukmt_portable.zip',
        animation: 'slide-left', // 这里的动画可以根据需要更改
    }

]);

AOS.init(
    {
        duration: 600,  // 动画持续时间，单位：毫秒
    }
)

AOS.refresh();

</script>
<style lang="scss" scoped>
.download-section {
    padding-top: 72px;
    text-align: center;
    background-color: #fff5f5;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1;

    .download-options {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    img {
        width: 190px;
        height: 190px;
        border-radius: 35px;
        /* 圆角设置，与实际icon一致 */
        margin-bottom: 40px;
        transition: box-shadow 0.3s ease-in-out;
        animation: moveUpDown 3s infinite ease-in-out, glowEffectWhite 3s infinite alternate;

        &:hover {
            /* 停止白色光晕动画 */
            box-shadow: 0 0 20px 12px rgba(255, 100, 100, 0.8);
            animation: moveUpDown 3s infinite ease-in-out, glowEffectRed 3s infinite;
            /* 激活浅红色光晕动画 */
        }

    }

    .download-text {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    h2 {
        height: 40px;
        width: 528px;
        font-size: 2rem;
        color: #ff4d4d;
        display: inline-block;
        text-align: left;
        margin-bottom: 30px;
    }

    .download-platform {
        display: block;
        margin-bottom: 30px;
    }

}

.canvas-background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}

/* 动态背景基础样式 */
.dynamic-background {
    position: relative;
    text-align: center;
    color: #fff;
    overflow: hidden;
    background: linear-gradient(120deg, #ff7b7b, #ffd1d1, #ffe8e8, #ffbc80);

    background-size: 400% 400%;
    animation: gradientShift 10s ease infinite;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.latest-version {
    display: flex;
    gap: 10px; // 调整间距
    color: #726d6da1;
    margin-top: 20px;
    margin-bottom: 0;

    span {
        transition: color 0.3s ease;
    }

    // 给第一个 span 添加 hover 效果
    .version {
        position: relative;
        transition: color 0.3s ease;

        &:hover {
            color: #ff4d4d;
            cursor: pointer;

            &::after {
                content: '';
                position: absolute;
                bottom: -2px;
                right: 0;
                width: 95%;
                height: 1px;
                /* 下划线的厚度 */
                background-color: #ff4d4d;
                transform: scaleX(0);
                transform-origin: left center;
                animation: underline 0.3s forwards;

            }
        }
    }

    // 动画效果实现每个 span 的颜色轮流变化
    .version,
    .update,
    .platform {
        &:nth-child(1) {
            animation: colorCycle 9s infinite 0s;
        }

        &:nth-child(2) {
            animation: colorCycle 9s infinite 3s;
        }

        &:nth-child(3) {
            animation: colorCycle 9s infinite 6s;
        }
    }
}

// 每3秒切换颜色
@keyframes colorCycle {

    0%,
    100% {
        color: #726d6da1; // 初始颜色
    }

    25% {
        color: #ff4d4d; // 变为红色
    }

    75% {
        color: #726d6da1; // 恢复原始颜色
    }
}

// 下划线动画效果
@keyframes underline {
    to {
        transform: scaleX(1);
    }
}

footer {
    text-align: center;
    padding: 5px;
    background-color: #ff4d4d;
    color: white;
    font-size: 0.875rem;
}


/* 背景动画 */
@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

/* 响应式处理 */
@media (max-width: 800px) {

    .download-section {
        padding-top: 110px;

        .download-options {
            display: block;
        }

        img {
            width: 150px;
            height: auto;
            margin-bottom: 20px;
        }

        h2 {
            font-size: 1.8rem;
            color: #ff4d4d;
            width: 475px;
            margin-bottom: 20px;
        }

        .download-platform {
            display: block;
            margin-bottom: 20px;
        }

        .latest-version {
            margin-top: 5px;
        }

    }

}

@keyframes moveUpDown {

    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes glowEffectWhite {
    0% {
        box-shadow: 0 0 0 0 rgba(71, 70, 70, 0);
        /* 无光晕 */
    }

    25% {
        box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.4);
        /* 光晕开始出现 */
    }

    50% {
        box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.8);
        /* 光晕达到最大 */
    }

    75% {
        box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.4);
        /* 光晕开始消退 */
    }

    100% {
        box-shadow: 0 0 0 0 rgba(71, 70, 70, 0);
        /* 光晕完全消失 */
    }
}

@keyframes glowEffectRed {
    0% {
        box-shadow: 0 0 0 0 rgba(71, 70, 70, 0);
        /* 无光晕 */
    }

    25% {
        box-shadow: 0 0 10px 5px rgba(255, 146, 146, 0.313);
        /* 光晕开始出现，浅红色 */
    }

    50% {
        box-shadow: 0 0 20px 10px rgba(244, 164, 164, 0.406);
        /* 光晕达到最大，浅红色 */
    }

    75% {
        box-shadow: 0 0 10px 5px rgba(255, 146, 146, 0.313);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(71, 70, 70, 0);
        /* 光晕完全消失 */
    }
}
</style>
