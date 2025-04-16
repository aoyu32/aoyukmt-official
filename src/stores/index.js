import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useIndexStore = defineStore('index', () => {
    // 定义响应式状态
    const featureList = ref([]); // 特性列表
    const detailList = ref([]); // 详情列表
    // 计算属性 - 判断 featureList 是否为空
    const isFeatureListEmpty = computed(() => featureList.value.length === 0);

    // 计算属性 - 判断 detailList 是否为空
    const isDetailListEmpty = computed(() => detailList.value.length === 0);

    // 设置特性列表
    const setFeatureList = (list) => {
        featureList.value = list;
    };

    // 设置详情列表
    const setDetailList = (list) => {
        detailList.value = list;
    };


    return {
        featureList,
        detailList,
        isFeatureListEmpty, // 计算属性：特性列表是否为空
        isDetailListEmpty, // 计算属性：详情列表是否为空
        setFeatureList,
        setDetailList,
    };
});
