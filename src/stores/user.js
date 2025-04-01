import { defineStore } from "pinia";
import { ref } from 'vue'
import tools from "@/utils/tools";

export const userStore = defineStore('user', () => {
    const tempId = tools.getRandomId()
    const tempUserName = tools.getRandomName()
    const tempAvatar = tools.getRandomAvatar(0)
    const tempDate = tools.getFormatDate('yyyy年mm月dd日')
    const token = ref("")

    const userLoginForm = ref({
        account: '',
        password: ''
    })

    const userRegisterForm = ref({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const user = ref({
        id: tempId,
        name: tempUserName,
        avatar: tempAvatar,
        sex: '未知',
        status: '🔋',
        createTime: tempDate,
        resume: '该用户未填写任何简述！'
    })

    // 直接替换整个对象
    const setUserLoginForm = (form) => {
        userLoginForm.value = form
    }

    const setUserRegisterForm = (form) => {
        userRegisterForm.value = form
    }

    const setUser = (userData) => {
        user.value = userData
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
