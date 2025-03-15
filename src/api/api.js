import instance from "@/utils/request"; // 导入封装的 Axios 实例

/**
 * 通用文件下载函数
 * @param {string} url - 下载接口的 URL
 * @param {Object} data - 请求参数
 * @param {string} defaultFileName - 默认文件名（可选）
 */
const downloadFile = async (url, data) => {
    try {
        // 发起下载请求
        const response = await instance.post(url, data, {
            responseType: 'blob', // 确保响应类型为 blob
        });

        // 创建一个 Blob 对象
        const blob = new Blob([response.data], { type: response.headers['content-type'] });

        console.log(response);
        
        // 从响应头中获取文件名
        const contentDisposition = response.headers['content-disposition'];
        console.log(contentDisposition);

        let fileName
        if (contentDisposition && contentDisposition.includes('filename=')) {
            // 从 Content-Disposition 中提取文件名
            fileName = contentDisposition
                .split('filename=')[1]
                .split(';')[0]
                .replace(/['"]/g, ''); // 去除可能的引号
            console.log(fileName);

        }

        // 创建一个链接元素
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        // 设置下载文件的名称
        link.download = fileName;

        // 触发下载
        link.click();

        // 释放 URL 对象
        window.URL.revokeObjectURL(link.href);
    } catch (error) {
        console.error('下载失败', error);
        throw new Error('下载失败，请稍后重试');
    }
};

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

    downloadLatest: (appFileName,uid) => {
        // return downloadFile('download\\latest', data);
        return instance.get(`download\\latest\\${appFileName}\\${uid}`)
    },

};