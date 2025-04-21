<template>
    <div class="feedback-select">
        <div class="message">{{ greetings }}</div>
        <div class="select">
            <p>
                {{ tipSelect }}
            </p>
            <div class="select-option">
                <button v-for="(item, index) in options" :key="index" @click="handleSelectOption(item, index)"
                    :class="{ 'active': currentOption === item || currentOptionIndex === index }" :disabled="isSubmit">
                    {{ item }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// 接收当前选择的选项
const props = defineProps({
    currentOption: {
        type: String,
        default: ""
    },
    isSubmit: {
        type: Boolean,
        default: false
    }
});

// 问候语
const greetings = ref("您好！我是反馈助手，很高兴为您服务。请问您想要反馈什么问题呢？☺️");
// 提示选择文本
const tipSelect = ref("请选择您要反馈的类型：");
// 反馈类型
const options = ref([
    "有意见或建议",
    "提交应用 Bug",
    "有功能需求",
    "其他",
]);

// 向父组件发送数据
const emit = defineEmits(['setSelectOption']);

// 当前选择的反馈类型选项index
const currentOptionIndex = ref(null);

// 监听选择反馈选项按钮点击事件
const handleSelectOption = (item, index) => {
    currentOptionIndex.value = index;
    // 发送选择的反馈选项
    emit('setSelectOption', item);
};

</script>

<style scoped lang="scss">
@use "@/assets/styles/feedback/select.scss" as *;
</style>