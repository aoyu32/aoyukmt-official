<template>
    <div class="detail-card" v-aos="{
        animation: 'fade-up',
    }">
        <h3><span class="icon">{{ detail.icon }}</span>{{ detail.title }}</h3>
        <div class="detail-content">
            <template v-if="isEven">
                <!-- 偶数索引 -->
                <div class="detail-image" v-aos="{
                    animation: 'slide-right',
                    offset: 30
                }">
                    <img :src="detail.image" :alt="detail.alt" />
                </div>
                <div class="detail-text">
                    <p>{{ detail.text }}</p>
                </div>
            </template>
            <template v-else>
                <!-- 奇数索引 -->
                <div class="detail-text">
                    <p>{{ detail.text }}</p>
                </div>
                <div class="detail-image" v-aos="{
                    animation: 'slide-left',
                    offset: 20
                }">
                    <img :src="detail.image" :alt="detail.alt" />
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
// 定义 props
const props = defineProps({
    detail: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})
const isEven = computed(() => {
    return props.index % 2 === 0
})
</script>

<style lang="scss" scoped>
// @use "@/assets/styles/common/constant.scss";
@use "@/assets/styles/index/detail.scss";
</style>