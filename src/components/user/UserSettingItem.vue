<template>
    <div class="user-setting-item">
        <div class="modify-nickname" v-if="optionId === 0">
            <div class="header">
                <h3>🐌修改昵称</h3>
                <button @click="hideSettingItem(0)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <FormInput label="请输入新的昵称：" placeholder="🐧 昵称" v-model="nickname" :tipContent="nicknameTip"
                @icon-click="nickname = ''" :blink="showValidationError" />
            <button class="btn-save" @click="submitModifyNickname">保存</button>
        </div>

        <div class="modify-avatar" v-if="optionId === 1">
            <div class="header">
                <h3>🎃修改头像</h3>
                <button @click="hideSettingItem(1)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <div class="avatar-container">
                <div class="avatar">
                    <div class="upload-icon" @click="triggerUploadAvatar">
                        <i class="iconfont icon-upload"></i>
                    </div>
                    <img :src="avatarImage" alt="" v-if="avatarImage">
                    <input type="file" hidden @change="handleUploadAvatar" ref="avatarInputRef" accept="image/*"
                        multiple="false">
                </div>
                <button class="btn-random">随机 <i class="iconfont icon-suijishushengcheng"></i></button>
            </div>
            <button class="btn-save" @click="submitModifyAvatar">{{ avatarBtnContext }}</button>
        </div>

        <div class="setting-gender" v-if="optionId === 2">
            <div class="header">
                <h3>🦆性别设置</h3>
                <button @click="hideSettingItem(2)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <div class="radio-group">
                <label class="radio-label">
                    <input type="radio" value="male" name="gender" v-model="selectedGender" />
                    <span>男♂️</span>
                </label>
                <label class="radio-label">
                    <input type="radio" value="female" name="gender" v-model="selectedGender" />
                    <span>女♀️</span>
                </label>
                <label class="radio-label">
                    <input type="radio" value="other" name="gender" v-model="selectedGender" />
                    <span>保密⚧️</span>
                </label>
            </div>
            <button class="btn-save" @click="submitModifyGender">保存</button>
        </div>

        <div class="destroy-account" v-if="optionId === 3">
            <div class="header">
                <h3>🕹️注销账号</h3>
                <button @click="hideSettingItem(3)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <p class="warning-text">☣️账号注销后将无法恢复，所有数据将被永久删除!</p>
            <form>
                <FormInput type="password" placeholder="密码" label="输入密码确认操作！" icon="icon-browse"
                    v-model="destroyPassword" :tip-content="destroyTip" :blink="destroyAccountBlink"
                    @icon-click="isShowDestroyPassword = !isShowDestroyPassword"
                    :type="isShowDestroyPassword ? 'text' : 'password'"
                    :icon-active="isShowDestroyPassword ? 'active' : ''" />
                <div class="btn-actions">
                    <button class="cancel-btn " @click="cancelDestroy">取消</button>
                    <button class="confirm-btn" @click="submitDestroyAccount">确认注销</button>
                </div>

            </form>
        </div>

        <div class="setting-bio" v-if="optionId === 4">
            <div class="header">
                <h3>🎗️设置简介</h3>
                <button @click="hideSettingItem(4)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <textarea placeholder="介绍一下自己..." class="bio-textarea" rows="2" v-model="bioInput"></textarea>
            <span>还剩{{ surplus }}个字符可输入</span>
            <button class="btn-save" @click="submitSettingBio">{{ bioBtnContext }}</button>
        </div>

        <div class="binding-email" v-if="optionId === 5">
            <div class="header">
                <h3>📧绑定邮箱</h3>
                <button @click="hideSettingItem(5)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <div class="input-email">
                <FormInput placeholder="📧 请输入您的邮箱" v-model="bindEmailInput" @icon-click="bindEmailInput = ''"
                    :tip-content="bindEmailTip" :blink="bindEmailBlink" />
            </div>
            <div class=" input-code">
                <FormInput placeholder="🔑 请输入验证码" v-model="inputVerifyCode" @icon-click="inputVerifyCode = ''"
                    :tip-content="verifyCodeTip" @blur="handleVerifyCode" :blink="verifyCodeBlink" />
                <button class="btn-code">获取验证码</button>
            </div>
            <button class="btn-submit" @click="submitBindEmail">绑定</button>
        </div>

        <div class="modify-password" v-if="optionId === 6">
            <div class="header">
                <h3>🔑修改密码</h3>
                <button @click="hideSettingItem(6)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <div class="password-form">
                <form>
                    <div class="input-group">
                        <FormInput type="password" placeholder="🗝️ 原密码" icon="icon-browse" height="40px" />
                    </div>
                    <div class="input-group">
                        <FormInput type="password" placeholder="🔒 新密码" icon="icon-browse" height="40px" />
                    </div>
                    <div class="input-group">
                        <FormInput type="passowrd" placeholder="🔐 确认新密码" icon="icon-browse" height="40px" />
                    </div>
                </form>
                <button class="btn-submit">修改密码</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import FormInput from '../common/FormInput.vue';

const props = defineProps({
    optionId: {
        type: Number,
        default: 100
    }
})

//收起设置项
const emit = defineEmits(["hide-item"])
const hideSettingItem = (index) => {
    emit("hide-item", index)
}

//昵称
const NICKNAME_RULES = {
    minLength: 1,
    maxLength: 12,
    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-\s]+$/ // 允许中文、英文、数字、下划线、短横线和空格
};
const nickname = ref("")
const nicknameTip = ref("");
const nicknameIsValid = ref(false);
const showValidationError = ref(false)
const VALIDATION_MESSAGES = {
    empty: "",
    valid: "昵称可用 ✅",
    tooShort: `昵称至少需要${NICKNAME_RULES.minLength}个字符 ❌`,
    tooLong: `昵称最多${NICKNAME_RULES.maxLength}个字符 ❌`,
    invalidChars: "包含非法字符 ❌",
}
//校验昵称
// 验证昵称
const validateNickname = (value) => {
    showValidationError.value = false;

    if (!value.trim()) {
        updateNicknameState("", false);
        return;
    }

    // 检查长度
    if (value.length < NICKNAME_RULES.minLength) {
        updateNicknameState(VALIDATION_MESSAGES.tooShort, false);
        return;
    }

    if (value.length > NICKNAME_RULES.maxLength) {
        updateNicknameState(VALIDATION_MESSAGES.tooLong, false);
        return;
    }

    // 检查字符有效性
    if (!NICKNAME_RULES.pattern.test(value)) {
        updateNicknameState(VALIDATION_MESSAGES.invalidChars, false);
        return;
    }

    updateNicknameState(VALIDATION_MESSAGES.valid, true);
};

// 更新昵称状态
const updateNicknameState = (message, isValid) => {
    nicknameTip.value = message;
    nicknameIsValid.value = isValid;
};
const debounceValidate = debounce((value) => {
    validateNickname(value);
}, 500);
//监听昵称输入
watch(() => nickname.value, (value) => {
    debounceValidate(value);
}, { immediate: true });

// 防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

//提交修改昵称
const submitModifyNickname = () => {
    if (!nicknameIsValid.value) {
        showValidationError.value = true;
        return;
    }


    console.log("要修改的昵称：", nickname.value);
    hideSettingItem(0)
}

//头像
// 头像相关状态
const avatarInputRef = ref(null);
const avatarBtnContext = ref("保存");
const avatarImage = ref("");
const avatarVerify = ref(false);

// 常量定义
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB
const ERROR_MESSAGES = {
    invalidType: "仅支持 JPG/PNG 格式",
    tooLarge: "图片大小不能超过3M",
    default: "保存"
};

// 触发上传头像
const triggerUploadAvatar = () => {
    avatarInputRef.value?.click();
};

// 处理上传头像
const handleUploadAvatar = (event) => {
    resetAvatarState();

    const file = event.target.files?.[0];
    if (!file) return;


    // 预览图片
    previewImage(file);
    // 验证文件类型
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        setAvatarErrorState(ERROR_MESSAGES.invalidType);
        return;
    }

    // 验证文件大小
    if (file.size > MAX_IMAGE_SIZE) {
        setAvatarErrorState(ERROR_MESSAGES.tooLarge);
        return;
    }

    setAvatarSuccessState();
};

// 预览图片
const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        avatarImage.value = e.target.result;
    };
    reader.onerror = () => {
        setAvatarErrorState("图片读取失败");
    };
    reader.readAsDataURL(file);
};

// 重置状态
const resetAvatarState = () => {
    avatarVerify.value = false;
    avatarBtnContext.value = ERROR_MESSAGES.default;
};

// 设置错误状态
const setAvatarErrorState = (message) => {
    avatarVerify.value = false;
    avatarBtnContext.value = message;
};

// 设置成功状态
const setAvatarSuccessState = () => {
    avatarVerify.value = true;
    avatarBtnContext.value = ERROR_MESSAGES.default;
};

// 提交修改
const submitModifyAvatar = async () => {
    if (!avatarVerify.value || !avatarImage.value) return;
    console.log("提交修改头像");
    hideSettingItem(1);
};


//设置性别
const selectedGender = ref('')//用户选择的性别
const destroyTip = ref("")//销毁账户输入框提示文本
const destroyAccountBlink = ref(false)//是否闪烁提示文本
//提交选择的性别
const submitModifyGender = () => {
    console.log(selectedGender.value);
}

//注销用户
const destroyPassword = ref("")//输入的确认注销用户的密码
const isShowDestroyPassword = ref(false)//是否显示输入框内的密码
const cancelDestroy = () => {
    hideSettingItem(3)
}

const submitDestroyAccount = (e) => {
    e.preventDefault()
    if (!destroyPassword.value) {
        destroyTip.value = "请输入您账号的密码，确认您的身份"
        destroyAccountBlink.value = true
        return
    }
    console.log("提交确认注销账户", destroyPassword.value);

}
//监听输入
watch(() => destroyPassword.value, (newValue) => {
    destroyTip.value = ''
    destroyAccountBlink.value = false
})


//设置简介
const bioInput = ref("")//输入的简介
const surplus = ref(50)//还剩多少个字符可以输入
const bioBtnContext = ref("保存")
//监听输入
watch(() => bioInput.value, (newValue) => {
    bioBtnContext.value = "保存"
    if (surplus.value > 0) {
        surplus.value = 50 - newValue.length
    }
})
//提交修改简介
const submitSettingBio = () => {
    if (!bioInput.value) {
        bioBtnContext.value = "请输入您的简介"
        return
    }
    if (bioInput.value.length > 50) {
        bioBtnContext.value = "你输入的内容超过限制，请简化一下"
        return
    }
    console.log("提交设置的简介", bioInput.value);
}

//绑定邮箱
const bindEmailInput = ref("")//输入的邮箱
const bindEmailTip = ref("")//邮箱输入提示文本
const bindEmailValid = ref(false)//邮箱验证结果
const bindEmailBlink = ref(false)//是否闪烁提示文本
const inputVerifyCode = ref("")//输入的验证码
const verifyCodeTip = ref("")//验证码提示文本
const verifyCodeValid = ref(false)//验证码验证结果
const verifyCodeBlink = ref(false)//是否闪烁验证码提示文本

const ERROR_MESSAGE = {
    invalid: "邮箱不能为空",
    emailError: "邮箱格式不正确",
    verifyCodeError: "验证码为6位"

}

//验证邮箱
const validateBindEmail = () => {
    if (!bindEmailInput.value) {
        bindEmailValid.value = false
        bindEmailTip.value = ERROR_MESSAGE.invalid
        return
    }
    //验证邮箱格式
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(bindEmailInput.value)
    bindEmailTip.value = isValid ? "邮箱格式正确" : ERROR_MESSAGE.emailError
    bindEmailValid.value = true
}
//验证验证码

//监听邮箱输入
watch(() => bindEmailInput.value, (newValue) => {
    if (!newValue) {
        return
    }
    console.log(newValue);
    validateBindEmail()
})

//监听验证码输入框失去焦点
const handleVerifyCode = () => {

}
//提交绑定邮箱
const submitBindEmail = () => {

}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/item.scss" as *;
</style>