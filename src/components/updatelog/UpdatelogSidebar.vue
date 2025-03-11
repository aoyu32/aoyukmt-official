<template>
    <div class="updatelog-sidebar">
        <div class="latest">
            <h2>🪁 最新版本</h2>
            <ul class="latest-ul">
                <li><a href="#" @click.prevent="scrollLatest(latest.id)" @click="showSidebar">{{
                    updatelogStore.isLatestEmpty ?
                        "error" : "v" + latest.version }}</a>
                </li>
            </ul>
        </div>
        <div class="history">
            <h2>🥏 历史版本</h2>
            <ul class="history-ul">
                <li v-for="(item, index) in history" :key="index" @click="showSidebar">
                    <a href="#" @click.prevent="scrollHistory(item.id)">{{ updatelogStore.isHistoryEmpty ? "error" : "v"
                        + item.version
                        }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUpdatelogStore } from '@/stores/updatelog';
import { storeToRefs } from 'pinia';
import { scrollTo } from '@/utils/scroll'
const updatelogStore = useUpdatelogStore()

const { latest, history } = storeToRefs(updatelogStore)

const scrollHistory = (version) => {
    const element = document.getElementById("version" + version)
    scrollTo(element, 300, null, 70)
}

const scrollLatest = (version) => {
    const element = document.getElementById("latest")
    scrollTo(element, 300, null, 70)
}

//点击li时通知父组件收起侧边栏
const emit = defineEmits(['showSidebar'])
const showSidebar = () => {
    emit("showSidebar", true)
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/updatelog/sidebar.scss" as *;
</style>