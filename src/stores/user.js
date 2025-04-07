import { defineStore } from "pinia";
import { ref } from 'vue'
import tools from "@/utils/tools";
import unloginAvatar from '@/assets/unlogin-avatar.svg'
export const userStore = defineStore('user', () => {
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
        uid: "",
        nickname: "未登录",
        avatar: unloginAvatar,
        gender: '未知',
        activeStatus: '🔋',
        registrationTime: "",
        bio: '',
        ipInfo: ''
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

    const setToken = (tokenValue) => {
        token.value = tokenValue
    }

    return {
        token,
        user,
        userLoginForm,
        userRegisterForm,
        setUser,
        setToken,
        setUserLoginForm,
        setUserRegisterForm
    }
},
    {
        persist: {
            key: 'user_token',
            pick: ['token']
        }
    }

)
