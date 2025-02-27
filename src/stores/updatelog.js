import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUpdatelogStore = defineStore('updatelog', () => {
    const latest = ref({})//最新版本
    const history = ref([])//历史版本

    //最新版本
    const setLatest = (latestVerison) => {
        latest.value = latestVerison
    }
    //历史版本
    const setHistory = (historyVersion) => {
        history.value = historyVersion
    }

    return {
        latest,
        history,

        setLatest,
        setHistory
    }
})