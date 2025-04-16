<template>
    <div class="message-tip" ref="messageRef" :class="{ 'show': display, 'hide': !display }"
        :style="{ 'position': messagePosition, 'top': topOffset }">
        <div class="message-container">
            <p> {{ message }}</p>
        </div>
    </div>
</template>
<script setup>
import { onMounted, watch, ref } from 'vue'
const props = defineProps({
    topOffset: {
        type: String,
        default: '0'
    },
    messagePosition: {
        type: String,
        default: 'fixed'
    }

})
const message = ref("")//提示内容
const display = ref(false)//是否显示
const localShowMessage = ref(props.isShowMessage)
watch(() => props.isShowMessage, (newValue) => {
    localShowMessage.value = newValue
})

const messageRef = ref()

onMounted(() => {
    messageRef.value.classList.remove('hide')
})

let timer = null
const show = (text) => {
    if (timer !== null) {
        clearTimeout(timer)
    }
    message.value = text
    display.value = true
    timer = setTimeout(() => {
        display.value = false
    }, 1500)
}
defineExpose({ show })
</script>

<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.message-tip {
    display: none;
    left: 50%;
    top: 0;
    height: 45px;
    transform: translateX(-50%);
    font-size: 16px;
    text-align: center;
    line-height: 45px;
    font-weight: bold;
    opacity: 0;
    border-radius: 8px;
    z-index: 10;
    box-shadow: 1px 5px 10px $theme-deep-shadow;

    .message-container {
        display: flex;
        align-items: center;
        justify-content: center;
        color: $theme-font-light;
        background-color: $theme-secondary-dark;
        margin: 0 auto;
        border-radius: 8px;
        padding: 0 20px;

        p {
            white-space: nowrap;
        }

    }
}

/* 通过弹出和收回动画显示/隐藏提示框 */
.message-tip.show {
    display: block;
    animation: slideDown 0.25s ease-out forwards;
}

.message-tip.hide {
    display: block;
    animation: slideUp 0.25s ease-in forwards;
    pointer-events: none;
}
</style>