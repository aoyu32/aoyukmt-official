<template>
    <div class="user-window">
        <Message :messageContent="tipContext" :topOffset="'70px'" />

        <!-- 左侧用户信息卡片展示区域 -->
        <div class="user-left">
            <UserInfo :user-info="userData.user" />
        </div>
        <!-- 右侧用户信息修改区域 -->
        <div class="user-right">

        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Message from '../common/Message.vue';
import UserInfo from './UserInfo.vue';
import { userStore } from '@/stores/user';
const userData = userStore()
const tipContext = ref("")
onMounted(() => {
    console.log("用户数据：", userData.user);
})




</script>

<style lang="scss" scoped>
.user-window {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
    padding: 20px 15px;
    overflow: hidden;
    overflow-y: auto;
}
</style>
