<template>
    <div class="user-update">
        <div class="update-header">
            <h4>⚙️ 修改信息</h4>
            <button @click="hideUpdate"><i class="iconfont icon-arrow-double-right"></i></button>
        </div>
        <div class="update-body">
            <div class="tip-message">
                <p>请点击你要进行的操作按钮!</p>
            </div>
            <div class="select-option">
                <button v-for="(item, index) in options" :key="index">{{ item }}</button>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
    slide: {
        typeof: String,
        default: 'in'
    }
})

const options = ref([
    "修改🐌昵称",
    "修改🎃头像",
    "修改🔑密码",
    "设置🦆性别",
    "绑定📧邮箱",
    "注销🕹️用户",
    "设置🎗️简介"
]);

const emit = defineEmits(["hide-update"])
const hideUpdate = () => {
    emit("hide-update")
}
</script>
<style scoped lang="scss">
@use "@/assets/styles/user/update.scss" as *;
</style>