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
    },

    //获取验证图片  以及token
    reqGet: (data) => {
        return instance({
            url: '/captcha/get',
            method: 'post',
            data
        })
    },
    //滑动或者点选验证
    reqCheck: (data) => {
        return instance({
            url: '/captcha/check',
            method: 'post',
            data
        })
    },

    //注册
    register: (data) => {
        return instance.post('auth/register', data)
    },

    //获取用户信息
    getUserInfo: () => {
        return instance.post("user/info", null, {
            needAuth: true
        });
    },

    //用户登录
    login: (data) => {
        return instance.post('auth/login', data)
    }



};