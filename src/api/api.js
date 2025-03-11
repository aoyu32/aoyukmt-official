import instance from "@/utils/request";

export const apis = {

    getFeatureList: () => {
        return instance.get('feature')
    },

    getDetailList: () => {
        return instance.get('detail')
    },

    getDocumentData: () => {
        return instance.get('documents')
    },

    getLatestUpdatelog: () => {
        return instance.get('latest')
    },
    getHistoryUpdatelog: () => {
        return instance.get('changelog\\history')
    }

}