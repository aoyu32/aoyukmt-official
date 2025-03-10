import { defineStore } from "pinia";
import { ref, computed } from "vue";
export const useIndexStore = defineStore('index', () => {
    const featureList = ref([])
    const detailList = ref([])

    const setFeatureList = (list) => {
        featureList.value = list
    }

    const setDetailList = (list) => {
        detailList.value = list
    }

    return {
        featureList,
        detailList,
        setFeatureList,
        setDetailList
    }
})