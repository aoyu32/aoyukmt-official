<template>
    <div class="user-update">
        <div class="update-header">
            <h4>⚙️ 修改信息</h4>
            <button @click="hideSetting"><i class="iconfont icon-arrow-double-right"></i></button>
        </div>
        <div class="update-body">
            <div class="tip-message">
                <p>请点击你要进行的操作按钮!</p>
            </div>
            <div class="select-option">
                <button v-for="(item, index) in options" :key="index" @click="handleSelectOption(index)">{{ item
                    }}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const options = ref([
    "修改🐌昵称",
    "修改🎃头像",
    "设置🦆性别",
    "注销🕹️用户",
    "设置🎗️简介",
    "绑定📧邮箱",
    "修改🔑密码"
]);

const emit = defineEmits(["hide-setting", "select-option"])
const handleSelectOption = (index) => {
    console.log(index);
    emit("select-option", index)
}

const hideSetting = () => {
    emit("hide-setting")
}
</script>
<style scoped lang="scss">
@use "@/assets/styles/user/setting.scss" as *;
</style>