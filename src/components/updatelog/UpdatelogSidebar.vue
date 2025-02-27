<template>
    <div class="updatelog-sidebar">
        <h2>🪁 最新版本</h2>
        <ul>
            <li><a href="#" @click.prevent="scrollLatest(latest.id)">v{{ latest.version }}</a></li>
        </ul>
        <h2>🥏 历史版本</h2>
        <ul>
            <li v-for="(item, index) in history" :key="index">
                <a href="#" @click.prevent="scrollHistory(item.id)">v{{ item.version }}</a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUpdatelogStore } from '@/stores/updatelog';
import { storeToRefs } from 'pinia';
import { scrollTo } from '@/utils/scroll'

const updatelogStore = useUpdatelogStore()

const { latest, history } = storeToRefs(updatelogStore)

// //滚动条滚动到对应版本
// const scrollToVersion = (version) => {
//     const element = document.getElementById(`version-${version}`)
//     const container = document.querySelector('.updatelog');  // 获取滚动容器
//     if (container && element) {
//         // 获取目标元素相对于容器的偏移位置
//         const rect = element.getBoundingClientRect();
//         const containerRect = container.getBoundingClientRect();
//         // 计算目标元素的 top 偏移量
//         const offsetTop = rect.top - containerRect.top + container.scrollTop;
//         // 使用 scrollTo 滚动到目标位置
//         window.scrollTo({
//             top: offsetTop - 100,
//             behavior: 'smooth'
//         });
//     }

// }
const scrollHistory = (version) => {
    const element = document.getElementById("version" + version)
    scrollTo(element, 300, null, 70)
}

const scrollLatest = (version) => {
    const element = document.getElementById("latest")
    scrollTo(element, 300, null, 70)
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/updatelog/sidebar.scss" as *;
</style>