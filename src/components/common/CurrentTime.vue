<template>
    <div class="time">
        <p>{{ time }} </p>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
const time = computed(() => {
    if (!props.currentTime) {
        return ""
    }
    return `📅 ${props.currentTime} 🔝`
})
const props = defineProps({
    currentTime: {
        type: String,
        default: ''
    }
})
</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;

.time {
    width: 100%;
    margin: 30px 0;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $theme-font-gray;
    font-size: 14px;
}
</style>