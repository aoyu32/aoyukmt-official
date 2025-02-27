import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUpdatelogStore = defineStore('updatelog', () => {
    const latest = ref({})//最新版本
    const history = ref([])//历史版本

    //最新版本
    const setLatest = (latestVerison) => {
        const version = {
            ...latestVerison,
            id: 'latest'
        }
        latest.value = version
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