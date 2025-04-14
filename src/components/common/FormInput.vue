<template>
    <div class="form-input">
        <div class="input-label" v-if="label">
            <label>{{ label }}</label>
        </div>
        <div class="input-wrapper">
            <input :type="inputType" :placeholder="placeholder" :value="modelValue" @input="update" @blur="handleBlur"
                :autocomplete="autocompleteText" :style="{ height: height }">
            <i :class="['iconfont', icon, { 'active': iconActive }]" @click="handleIconClick"></i>
        </div>
        <div class="input-tip" :class="{ 'show': message, 'blink-name': shouldBlink }">
            <p>{{ tip }}</p>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'

const props = defineProps({
    height: {
        type: String,
        default: '45px'
    },
    label: {
        type: String,
        default: ""
    },
    placeholder: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "text"
    },
    icon: {
        type: String,
        default: "icon-close-bold"
    },
    modelValue: {
        type: String,
        default: ""
    },
    autocompleteText: {
        type: String,
        default: "username"
    },
    pattern: {
        type: RegExp,
    },
    message: {
        type: Object,
        default: () => ({
            prompt: '',
            success: '',
            error: ''
        })
    },
    validator: {
        type: Function,
        default: null
    },
})

const tip = ref("") // 提示文本
const isValid = ref(false) // 校验结果
const iconActive = ref(false) // 是否高亮
const emit = defineEmits(["update:modelValue", "icon-click", "blur", "validate"])
const inputType = ref(props.type === "password" ? "password" : "text")
const shouldBlink = ref(false)//是否闪烁提示文本

// 更新输入的值
const update = (event) => {
    emit("update:modelValue", event.target.value)
}

// 失去焦点事件
const handleBlur = () => {
    emit("blur", props.modelValue)
}

// 设置文本
const setTip = (value) => {
    tip.value = value
}

//设置提示文本闪烁
const triggerTipBlink = (flag) => {
    shouldBlink.value = flag
}

// 右侧图标点击事件
const handleIconClick = () => {
    if (props.type === 'text') {
        emit("update:modelValue", "")
        return
    }
    if (props.type === 'password') {
        inputType.value = inputType.value === "text" ? "password" : "text"
        iconActive.value = inputType.value === "text"
    }
}

// 校验函数
const validate = (value) => {
    if (props.validator) {
        isValid.value = props.validator(value)
    } else if (props.pattern) {
        isValid.value = props.pattern.test(value)
    } else {
        return
    }
    setTip(isValid.value ? props.message.success : props.message.error)
    emit("validate", isValid.value)
    triggerTipBlink(false)
}

// 监听输入框输入
let timer = null
watch(() => props.modelValue, (newValue) => {
    if (timer) clearTimeout(timer)
    shouldBlink.value = false
    if (!newValue) {
        setTip(props.message.prompt)
        isValid.value = false
        return
    }
    debounceValidate(newValue)
}, { immediate: true })

// 防抖函数
const debounce = (fn, delay) => {
    return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

// 防抖验证
const debounceValidate = debounce((value) => {
    validate(value)
}, 300)

//防止防抖验证的内存泄露
onUnmounted(() => {
    if (timer) clearTimeout(timer)
})
defineExpose({ validate, setTip, triggerTipBlink })
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
        height: 20px;
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
            transition: all 0.3s ease-in-out;
            animation: blinkOfInput .7s infinite;
        }
    }
}
</style>