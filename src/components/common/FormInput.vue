<template>
    <div class="form-input">
        <div class="input-label" v-if="label">
            <label>{{ label }}</label>
        </div>
        <div class="input-wrapper">
            <input :type="type" :placeholder="placeholder" :value="modelValue" @input="update" @blur="handleBlur"
                :autocomplete="autocompleteText" :style="{ height: height }">
            <i :class="['iconfont', icon, iconActive]" @click="handleIconClick"></i>
        </div>
        <div class="input-tip" :class="{ 'show': tipContent, 'blink-name': blink }">
            <p>{{ tipContent }}</p>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    //输入框高度
    height: {
        type: String,
        default: '45px'
    },
    //输入框标签
    label: {
        type: String,
        default: ""
    },
    //预览文本
    placeholder: {
        type: String,
        default: ""
    },
    //输入框类型
    type: {
        type: String,
        default: "text"
    },
    //右边的按钮图标
    icon: {
        type: String,
        default: "icon-close-bold"
    },
    //改变icon按钮颜色
    iconActive: {
        type: String,
        default: ''
    },
    //输入的值
    modelValue: {
        type: String,
        default: ""
    },
    //提示消息
    tipContent: {
        type: String,
        default: ""
    },
    //自动填充
    autocompleteText: {
        type: String,
        default: "username"
    },
    //提示文本闪烁
    blink: {
        type: Boolean,
        default: false
    }
})

//更新输入的值
const emit = defineEmits(["update:modelValue", "icon-click", "blur"])

const update = (event) => {
    emit("update:modelValue", event.target.value)
}

const handleBlur = () => {
    emit("blur", props.modelValue)
}

//右侧图标点击事件
const handleIconClick = () => {
    emit("icon-click")
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;
@use "@/assets/styles/common/_animation.scss" as *;

.form-input {
    .input-label {
        display: block;
        font-size: 14px;
        color: #555555;
        font-weight: 500;
        margin-bottom: 8px;
    }

    .input-wrapper {
        position: relative;

        input {
            width: 100%;
            height: 45px;
            padding: 0 15px;
            border: 1px solid $theme-secondary-light;
            border-radius: 8px;
            font-size: 14px;
            color: $theme-font-dark;
            background-color: $theme-background;
            transition: all 0.3s;
            padding-right: 40px;

            &:focus {
                outline: none;
                border-color: $theme-primary-hover-dark;
                box-shadow: 0 0 0 3px $theme-primary-hover;
                background-color: #ffffff;

                &::placeholder {
                    opacity: 0;
                }
            }

            &::placeholder {
                color: #bbbbbb;
                transition: opacity 0.2s ease;
            }
        }

        .iconfont {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #bbbbbb;
            cursor: pointer;

            &:hover {
                color: $theme-secondary;
            }

            &.active {
                color: $theme-primary;
            }

        }


    }

    .input-tip {
        margin-top: 5px;
        width: 100%;
        color: #666666;
        height: 20px; // 固定高度防止跳动
        opacity: 0;

        p {
            font-size: 12px;
            margin: 0;
        }


        &.show {
            opacity: 1;
        }

        &.blink-name {
            color: rgba(255, 0, 0, 0.833);
            animation: blinkOfInput 0.5s infinite;
        }
    }
}
</style>
