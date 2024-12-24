<template>
    <div class="feature-card" v-aos="{
        animation: 'zoom-in',
        duration: 200
    }">
        <div class="feature-icon">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
    </div>
</template>

<script setup>
defineProps({
    feature: {
        type: Object,
        required: true
    }
})
</script>
<style lang="scss" scoped>
// @use "@/assets/styles/common/constant.scss";
@use "@/assets/styles/index/features.scss";
</style>