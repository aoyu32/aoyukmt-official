import instance from "@/utils/request"; // 导入封装的 Axios 实例

export const apis = {
    getFeatureList: () => {
        return instance.get('feature\\list');
    },

    getDetailList: () => {
        return instance.get('detail\\list');
    },

    getDocumentData: () => {
        return instance.get('docs\\list');
    },

    getLatestUpdatelog: () => {
        return instance.get('changelog\\latest');
    },

    getHistoryUpdatelog: () => {
        return instance.get('changelog\\history');
    },

    downloadLatest: (data) => {
        return instance.post('download\\latest', data)
    },

    downloadHistory: (data) => {
        return instance.post('download\\history', data)
    }


};