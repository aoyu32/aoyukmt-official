import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import tools from "@/utils/tools";

export const userStore = defineStore('user', () => {
    const tempId = tools.getRandomId()
    const tempUserName = tools.getRandomName()
    const tempAvatar = tools.getRandomAvatar(0)
    const tempDate = tools.getFormatDate('yyyy年mm月dd日')
    const token = ref("")

    const userLoginForm = reactive({
        account: '',
        password: ''
    })

    const userRegisterForm = reactive({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const user = reactive({
        id: tempId,
        name: "aoyukmt1234567890",
        avatar: tempAvatar,
        sex: '未知',
        status: '🔋',
        createTime: tempDate,
        resume: '该用户未填写任何简述！'
    })

    //设置用户登录表单数据
    const setUserLoginForm = (form) => {
        userLoginForm = form
    }
    //设置用户注册表单数据
    const setUserRegisterForm = (form) => {
        userRegisterForm = form
    }
    //设置用户数据
    const setUser = (userData) => {
        user = userData
    }


    return {
        token,
        user,
        userLoginForm,
        userRegisterForm,
        setUser,
        setUserLoginForm,
        setUserRegisterForm
    }
})