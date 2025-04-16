import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import unloginAvatar from '@/assets/unlogin-avatar-square.svg'
export const userStore = defineStore('user', () => {
    //未登录时用户信息
    const initUserData = {
        uid: "",
        nickname: "未登录",
        avatar: unloginAvatar,
        gender: 0,
        activeStatus: '📡',
        registrationTime: "",
        bio: '',
        ipInfo: '',
        email: '',
        username: "",
        lastLoginTime:"",
        lastLoginIp:""
    }
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

    const user = ref(initUserData)

    //是否登录
    const hasLogin = computed(() => {
        return token.value !== ''
    })

    //用户是否绑定了邮箱
    const isBindEmail = computed(() => {
        return !user.value.email
    })

    //是否有用户信息
    const isUserInfoEmpty = computed(() => {
        return (
            user.value.uid === "" &&
            user.value.nickname === "未登录" &&
            user.value.email === "" &&
            user.value.username === ""
        );
    })
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

    const clearToken = () => {
        token.value = ''
    }

    const clearUserData = () => {
        user.value = initUserData
    }

    return {
        token,
        user,
        userLoginForm,
        userRegisterForm,
        hasLogin,
        isUserInfoEmpty,
        isBindEmail,
        setUser,
        setToken,
        setUserLoginForm,
        setUserRegisterForm,
        clearToken,
        clearUserData
    }
},
    {
        persist: {
            key: 'user_token',
            pick: ['token']
        }
    }

)
