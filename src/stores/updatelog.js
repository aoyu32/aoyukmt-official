import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUpdatelogStore = defineStore('updatelog', () => {
    const latest = ref({})//最新版本
    const history = ref([])//历史版本

    // 判断 `latest` 是否为空（对象无有效属性）
    const isLatestEmpty = computed(() => {
        return Object.keys(latest.value).length === 0;
    });

    // 判断 `history` 是否为空（数组长度为 0）
    const isHistoryEmpty = computed(() => {
        return history.value.length === 0;
    });


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
        setHistory,
        isLatestEmpty,
        isHistoryEmpty
    }
})