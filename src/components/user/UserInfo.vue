<template>
    <div class="user-info">
        <div class="user-info-header">
            <h3>🍰 我的资料卡</h3>
            <button @click="displayUpdate" :tip="toolTipContent"><i class="iconfont"
                    :class="isSetting ? 'icon-edit' : 'icon-setting'"></i></button>
        </div>
        <div class="user-info-body">
            <div class="info-body-left">
                <div class="avatar">
                    <img :src="userAvatar" alt="用户头像">
                </div>
                <div class="basic-info">
                    <div class="nickname">{{ userInfo.nickname || '未设置昵称' }}</div>
                </div>
            </div>
            <div class="info-body-right">
                <div class="info-item-top">
                    <div class="info-item-left">
                        <div class="item">
                            <div class="item-content"><label>🆔 用户 ID</label> <span>{{ userInfo.uid }}</span></div>
                        </div>
                        <div class="item">
                            <div class="item-content"><label>🐬 用户名</label> <span>{{ userInfo.username }}</span></div>
                        </div>
                        <div class="item">
                            <div class="item-content"><label>🦆 性别</label> <span>{{ gender }}</span></div>
                        </div>
                        <div class="item">
                            <div class="item-content"><label>⏳ 注册日期</label> <span>{{ userInfo.registrationTime }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="info-item-right">
                        <div class="item">
                            <div class="item-content"><label>📧 邮箱</label> <span>{{ email }}</span></div>
                        </div>
                        <div class="item">
                            <div class="item-content"><label>🌐 IP 信息</label> <span>安徽阜阳</span></div>
                        </div>
                        <div class="item">
                            <div class="item-content"><label>🌍 上一次登录IP</label> <span>117.72.89.209</span></div>
                        </div>
                        <div class="item">
                            <div class="item-content"><label>🕒 上一次登录时间</label> <span>2023-12-01 12:23:34</span></div>
                        </div>
                    </div>
                </div>
                <div class="info-item-bottom">
                    <div class="item-lable">🏅 个人简述</div>
                    <div class="item-value">
                        <p>{{ bio }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import unloginAvatar from '@/assets/unlogin-avatar-square.svg'
import { ref, onMounted, computed } from 'vue'
const props = defineProps({
    //是否处于设置模式
    isSetting: {
        type: Boolean,
        default: false
    },
    hasLogin: {
        type: Boolean,
        default: false
    },
    //用户信息
    userInfo: {
        type: Object,
        default: () => {
            return {
                uid: "",
                nickname: "未登录",
                gender: 0,
                activeStatus: '📡',
                registrationTime: "",
                bio: '',
                ipInfo: '',
                email: '',
                username: ""
            }
        }
    }
})

const gender = computed(() => {
    console.log("gender", props.userInfo.gender,typeof(props.userInfo.gender));

    const userGender = props.userInfo.gender
    if (userGender === 3)
        return '保密'
    if (userGender === 2)
        return '女'
    if (userGender === 1)
        return '男'
    if (userGender === 0)
        return '未设置'
    return ''
})

const email = computed(() => {
    return !props.userInfo.email ? '未绑定' : props.userInfo.email
})

const bio = computed(() => {
    return !props.userInfo.bio ? "你还没有填写你的简介信息！😫" : props.userInfo.bio
})

const userAvatar = computed(() => {
    return props.hasLogin ? props.userInfo.avatar : unloginAvatar
})

const toolTipContent = computed(() => {
    if (!props.hasLogin)
        return '您还未登录'
    return props.isSetting ? '点击退出用户设置' : '点击设置用户信息'
})

//显示修改用户信息组件
const emit = defineEmits(["display-setting"])
const displayUpdate = () => {
    if (!props.hasLogin)
        return
    emit("display-setting")
}

</script>
<style lang="scss" scoped>
@use "@/assets/styles/user/info.scss" as *;
</style>