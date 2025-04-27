<template>
    <div class="assistant-history-bar">
        <div class="history-bar-header">
            <h4>对话历史</h4>
            <button><i class="iconfont icon-arrow-right" @click="handleHideHistroy"></i></button>
        </div>
        <div class="history-bar-body">
            <ul>
                <li>对话001</li>
                <li>对话001</li>
                <li>对话001</li>
                <li>对话001</li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref, provide } from 'vue'
const emit = defineEmits(["hide-histroy"])
const handleHideHistroy = () => {
    emit("hide-histroy")
}
</script>
<style scoped lang="scss">
@use "@/assets/styles/assistant/history.scss" as *;
</style>