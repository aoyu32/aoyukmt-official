<template>
    <div class="updatelog-sidebar">
        <h2>🪁 最新版本</h2>
        <ul>
            <li><a href="">v{{ latest.version }}</a></li>
        </ul>
        <h2>🥏 历史版本</h2>
        <ul>
            <li v-for="(item, index) in history" :key="index">
                <a href="">v{{ item.version }}</a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUpdatelogStore } from '@/stores/updatelog';
import { storeToRefs } from 'pinia';

const updatelogStore = useUpdatelogStore()

const {latest,history} = storeToRefs(updatelogStore)

</script>
<style lang="scss" scoped>
@use "@/assets/styles/updatelog/sidebar.scss" as *;
</style>