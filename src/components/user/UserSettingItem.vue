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
                    <input type="radio" value="male" name="gender" />
                    <span>男♂️</span>
                </label>
                <label class="radio-label">
                    <input type="radio" value="female" name="gender" />
                    <span>女♀️</span>
                </label>
                <label class="radio-label">
                    <input type="radio" value="other" name="gender" />
                    <span>保密⚧️</span>
                </label>
            </div>
            <button class="btn-save">保存</button>
        </div>

        <div class="destroy-account" v-if="optionId === 3">
            <div class="header">
                <h3>🕹️注销账号</h3>
                <button @click="hideSettingItem(3)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <p class="warning-text">☣️账号注销后将无法恢复，所有数据将被永久删除!</p>
            <FormInput type="password" placeholder="密码" label="输入密码确认操作！" icon="icon-browse" />
            <div class="btn-actions">
                <button class="cancel-btn">取消</button>
                <button class="confirm-btn">确认注销</button>
            </div>
        </div>

        <div class="setting-bio" v-if="optionId === 4">
            <div class="header">
                <h3>🎗️设置简介</h3>
                <button @click="hideSettingItem(4)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <textarea placeholder="介绍一下自己..." class="bio-textarea" rows="2"></textarea>
            <span>还剩10个字符可输入</span>
            <button class="btn-save">保存</button>
        </div>

        <div class="binding-email" v-if="optionId === 5">
            <div class="header">
                <h3>📧绑定邮箱</h3>
                <button @click="hideSettingItem(5)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <div class="input-email">
                <FormInput type="email" placeholder="输入邮箱地址" />
            </div>
            <div class="input-code">
                <FormInput type="text" placeholder="输入验证码" />
                <button class="btn-code">获取验证码</button>
            </div>
            <button class="btn-submit">绑定</button>
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


</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/item.scss" as *;
</style>