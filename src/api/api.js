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
    },

    //更新用户信息
    update: (data) => {
        return instance.post('/user/update', data, {
            needAuth: true
        })
    },

    //注销用户
    destroy: (data) => {
        return instance.post('/auth/logoff', data, {
            needAuth: true
        })
    },

    //重置密码
    modify: (data) => {
        return instance.post('/auth/modify', data, {
            needAuth: true
        })
    },

    //修改头像
    avatar: (file) => {
        const formData = new FormData()
        formData.append('file', file)
        return instance.post('/user/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            needAuth: true
        })
    },
    //随机头像
    randomAvatar: (action) => {
        return instance.get(`/user/avatar/${action}`, {
            needAuth: true
        })
    },

    //获取验证码
    code: (type,data) => {
        return instance.post(`/auth/code/${type}`, data, {
            needAuth: true
        })
    },
    //绑定或更新邮箱
    email: (data) => {
        return instance.post('/auth/email', data, {
            needAuth: true
        })
    },

    //反馈
    feedback: (data) => {
        return instance.post('/feedback/submit', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            needAuth: true
        })
    },
    //获取反馈列表
    feedbackList: () => {
        return instance.get('/feedback/query', {
            needAuth: true
        })
    },
    //重置密码
    reset: (data) => {
        return instance.post('/auth/reset', data)
    }

};