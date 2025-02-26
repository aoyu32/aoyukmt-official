<template>
    <div class="updatelog-sidebar">
        <h2>🪁 最新版本</h2>
        <ul>
            <li><a href="">v2.0.0</a></li>
        </ul>
        <h2>🥏 历史版本</h2>
        <ul>
            <li v-for="(item, index) in data">
                <a href="">{{ item }}</a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const data = ref([
    'v1.0.0',
    'v1.0.1',
    'v1.0.2',
    'v1.0.3',
    'v1.0.4'
])

</script>
<style lang="scss" scoped>
@use "@/assets/styles/updatelog/sidebar.scss" as *;
</style>