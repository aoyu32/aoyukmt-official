<template>
    <div class="advanced-loader" :class="{ 'full-screen': fullScreen }">
        <div class="loading-container">
            <div class="loading-text">
                <span v-for="(char, index) in loadingText" :key="index" :class="animationType"
                    :style="getCharStyles(index)">
                    {{ char }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// 定义组件props
const props = defineProps({
    // 加载文案
    text: {
        type: String,
        default: '加载中'
    },
    // 是否全屏
    fullScreen: {
        type: Boolean,
        default: false
    },
    // 动画类型
    animationType: {
        type: String,
        default: 'jump-up',
    },
    // 自定义颜色配置
    colors: {
        type: Object,
    },
    // 动画持续时间
    duration: {
        type: Number,
        default: 0.6
    },
    // 动画强度
    intensity: {
        type: Number,
        default: 0.1,
    },
    // 是否显示省略号
    showDots: {
        type: Boolean,
        default: false
    },
    // 自定义字体大小
    fontSize: {
        type: String,
        default: '15px'
    },
    // 自定义颜色
    customColor: {
        type: String,
        default: ''
    }
})

// 处理加载文本
const loadingText = computed(() => {
    const baseText = props.text
    return props.showDots
        ? (baseText + '...').split('')
        : baseText.split('')
})

// 获取字符样式
const getCharStyles = (index) => {
    return {
        animationDelay: `${0.1 * (index + 1)}s`,
        animationDuration: `${props.duration}s`,
        color: props.customColor, // 优先使用自定义颜色
        fontSize: props.fontSize, // 应用自定义字体大小
        '--jump-intensity': `${30 * props.intensity}px`
    }
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/common/_theme.scss" as *;

/* 样式保持不变 */
.advanced-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
}

.loading-container {
    display: flex;
    font-weight: bold;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
}

.loading-text {
    display: flex;
}

.loading-text span {
    display: inline-block;
    margin: 0 1px;
    opacity: 0.7;
    will-change: transform;
    color: $theme-primary-dark;
}

/* 动画样式 */
.jump-up {
    animation: jump-up infinite alternate;
}

@keyframes jump-up {
    0% {
        transform: translateY(0);
        opacity: 0.7;
    }

    100% {
        transform: translateY(calc(-1 * var(--jump-intensity)));
        opacity: 1;
    }
}

.jump-down {
    animation: jump-down infinite alternate;
}

@keyframes jump-down {
    0% {
        transform: translateY(0);
        opacity: 0.7;
    }

    100% {
        transform: translateY(var(--jump-intensity));
        opacity: 1;
    }
}

.zoom {
    animation: zoom infinite alternate;
}

@keyframes zoom {
    0% {
        transform: scale(0.7);
        opacity: 0.7;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.wave {
    animation: wave infinite alternate;
}

@keyframes wave {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.7;
    }

    100% {
        transform: translateY(calc(-1 * var(--jump-intensity))) rotate(10deg);
        opacity: 1;
    }
}

.rotate {
    animation: rotate infinite alternate;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg) scale(1);
        opacity: 0.7;
    }

    100% {
        transform: rotate(360deg) scale(1.1);
        opacity: 1;
    }
}

.shake {
    animation: shake infinite alternate;
}

@keyframes shake {
    0% {
        transform: translateX(0);
        opacity: 0.7;
    }

    100% {
        transform: translateX(var(--jump-intensity));
        opacity: 1;
    }
}
</style>