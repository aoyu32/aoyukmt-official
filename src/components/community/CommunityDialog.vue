<template>
    <div class="modal-overlay">
        <div class="community-dialog">
            <div class="dialog-header">
                <div class="header-left">
                    <h3>{{ config.title }}</h3>
                </div>
                <div class="header-right">
                    <button class="close-button" @click="closeDialog">
                        <i class="iconfont icon-close-bold"></i>
                    </button>
                </div>
            </div>
            <div class="dialog-body">
                <div class="body-icon">
                    {{ config.icon }}
                </div>
                <div class="body-content">
                    <p>{{ config.content }}</p>
                </div>
            </div>
            <div class="dialog-footer">
                <button class="cancel" @click="closeDialog">{{ config.cancel }}</button>
                <button class="submit" @click="handleSubmit"> {{ config.submit }}</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    config: {
        type: Object,
        default: () => ({
            icon: '',
            title: 'DIALOG',
            content: '这是一个提示对话框',
            cancel: '取消',
            submit: '确认',
            event: ''
        })
    }
})

const emit = defineEmits(["close-dialog", "dialog-submit"])
const closeDialog = () => {
    emit("close-dialog")
}

const handleSubmit = () => {
    console.log("执行的操作：",props.config.event);
    
    emit("dialog-submit", props.config.event)
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/community/dialog.scss" as *;
</style>