<template>
    <div class="modal-overlay" v-if="assistantStore.showDialog">
        <div class="dialog">
            <div class="dialog-header">
                <span class="username" id="username">Hi, {{ assistantStore.user.name }}</span>
                <button class="close-button" @click="assistantStore.setShowDialog(false)">
                    <i class="iconfont icon-close-bold"></i>
                </button>
            </div>
            <div class="avatar-container">
                <div class="avatar">
                    <div class="avatar-img" :class="{ 'blink-avatar': isAvatarBlink }" id="avatar-img">
                        <img :src="avatarImage" alt="">
                    </div>
                    <input type="file" id="avatar-img-input" accept=".jpg, .jpeg, .png" hidden ref="uploadInput"
                        @change="handleImageUpload" />
                    <div for="avatar-img-input" class="avatar-upload" :class="{ 'show-tooltip': isAvatarBlink }"
                        :data-avatar-tooltip="avatarToolTip" id="avatar-upload" @click="modifyAvatar">
                        <i class="iconfont icon-picture"></i>
                    </div>
                </div>
            </div>
            <div class="info">请修改你的名字吧🫡</div>
            <input type="text" id="input-name" placeholder="🔧 修改用户名" v-model="inputNameValue" @input="handleInputName">
            <div class="input-hint" :class="{ 'blink-name': isNameBlink }" id="input-hint">{{ nameTooltip }}</div>
            <div class="button-group">
                <button class="confirm-button" :data-button-tooltip="buttonTooltip" id="confirm" @click="ConfirmModify"
                    :disabled="isDisable" @mouseenter="handleMouseenter">确认</button>
                <button class="cancel-button" id="cancel" @click="assistantStore.setShowDialog(false)">取消</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAssistantStore } from '@/stores/assistant';

const assistantStore = useAssistantStore()

//修改头像

//上传input
const uploadInput = ref(null)
//头像图片
const avatarImage = ref(assistantStore.user.avatar)
//头像边框是否闪烁
const isAvatarBlink = ref(false)
//头像提示文本
const avatarToolTip = ref("点击修改头像,图片要小于3M哈🤓")

//触发上传
const modifyAvatar = () => {
    uploadInput.value.click()
}

//处理上传图片
const handleImageUpload = (event) => {

    const file = event.target.files[0]
    const MAX_SIZE = 3 * 1024 * 1024
    const type = ['image/png', 'image/jepg', 'image/jpg']
    console.log(file);
    if (!file || !type.includes(file.type)) {
        return
    }

    const reader = new FileReader()
    reader.onload = () => {
        avatarImage.value = reader.result
    }
    reader.readAsDataURL(file)
    if (file.size > MAX_SIZE) {
        isAvatarBlink.value = true
        avatarToolTip.value = "图片大于3M啦,请更换一个!😒"
    } else {
        isAvatarBlink.value = false
        avatarToolTip.value = "点击修改头像,图片要小于3M哈🤓"
    }

}

//用户输入的名称
const inputNameValue = ref('')//用户输入的新名字
const nameTooltip = ref('用户名长度，字符数不大于8个哈!🫰')//用户输入名字提示
const isNameBlink = ref(false)
//监听用户输入
const handleInputName = () => {
    //输入校验
    console.log(inputNameValue.value.length);
    if (inputNameValue.value.length > 12) {
        nameTooltip.value = '你用户名长度超过字符数限制啦!😡'
        isNameBlink.value = true
    } else {
        nameTooltip.value = '用户名长度，字符数不大于8个哈!🫰'
        isNameBlink.value = false
    }
}

//确认修改
const buttonTooltip = ref("修改用户名和头像请点击!🤠")//提示气泡文本
const isDisable = ref(true)//默认禁用按钮

//确认按钮鼠标悬浮提示气泡
const handleMouseenter = () => {
    // 检查头像和用户名是否有错误
    if (isAvatarBlink.value && isNameBlink.value) {
        buttonTooltip.value = '用户名和头像不行，改一下!🙄'
        isDisable.value = true
        return
    }

    if (isAvatarBlink.value) {
        buttonTooltip.value = '你的头像超过3M啦,换下呀!😒'
        isDisable.value = true
        return
    }

    if (isNameBlink.value) {
        buttonTooltip.value = '用户名长度超出,无法确认!😐'
        isDisable.value = true
        return
    }

    // 检查是否有实际更改
    const hasNameChange = inputNameValue.value.trim() !== '' && inputNameValue.value.trim() !== assistantStore.user.name
    const hasAvatarChange = avatarImage.value !== assistantStore.user.avatar

    if (!hasNameChange && !hasAvatarChange) {
        buttonTooltip.value = '你没修改任何信息!🫠'
        isDisable.value = true
    } else if (hasNameChange && hasAvatarChange) {
        buttonTooltip.value = '修改用户名和头像请点击!🤠'
        isDisable.value = false
    } else if (hasNameChange) {
        buttonTooltip.value = '修改用户名请点击!🙂'
        isDisable.value = false
    } else if (hasAvatarChange) {
        buttonTooltip.value = '修改头像请点击!😊'
        isDisable.value = false
    }
}


const ConfirmModify = () => {

    if (isAvatarBlink.value && isNameBlink.value) {
        return
    }

    if (inputNameValue.value.trim() !== '') {
        assistantStore.user.name = inputNameValue.value.trim()
    }
    assistantStore.user.avatar = avatarImage.value
    assistantStore.showDialog = false
    inputNameValue.value = ''
}


</script>
<style lang="scss" scoped>
@use "@/assets/styles/community/dialog.scss" as *;
</style>