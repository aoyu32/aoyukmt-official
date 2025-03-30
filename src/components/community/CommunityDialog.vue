<template>
    <div class="modal-overlay">
        <div class="community-dialog">
            <div class="dialog-header">
                <div class="header-left">
                    <h3>{{ title }}</h3>
                </div>
                <div class="header-right">
                    <button class="close-button" @click="closeDialog">
                        <i class="iconfont icon-close-bold"></i>
                    </button>
                </div>
            </div>
            <div class="dialog-body">
                <div class="body-icon">
                    {{ icon }}
                </div>
                <div class="body-content">
                    <p>{{ content }}</p>
                </div>
            </div>
            <div class="dialog-footer">
                <button class="cancel" @click="closeDialog">{{ cancelBtn }}</button>
                <button class="submit" @click="handleSubmit"> {{ submitBtn }}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'DIALOG'
    },
    icon: {
        type: String,
        default: "☺️"
    },
    content: {
        type: String,
        default: "这是一个提示对话框"
    },
    cancelBtn: {
        type: String,
        default: "取消"
    },
    submitBtn: {
        type: String,
        default: "确认"
    }
})

const emit = defineEmits(["close-dialog", "dialog-submit"])
const closeDialog = () => {
    emit("close-dialog")
}

const handleSubmit = () => {
    emit("dialog-submit")
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/community/dialog.scss" as *;
</style>