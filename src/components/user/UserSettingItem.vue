<template>
    <div class="user-setting-item">
        <div class="modify-nickname" v-if="optionId === 0">
            <div class="header">
                <h3>🐌修改昵称</h3>
                <button @click="hideSettingItem(0)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <!-- 用户名 -->
            <FormInput label="请输入您的用户名：" placeholder="🐧 用户名" v-model="nickname" :message="nicknameTipMessage"
                :pattern="nicknamePattern" @validate="nicknameIsValid = $event" type="text" ref="nicknameRef" />
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
                    v-model="destroyPassword" :validator="destroyValidator" @validate="destroyPasswordIsValid = $event"
                    ref="destroyPasswordRef" />
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
                <FormInput placeholder="📧 请输入您的邮箱" v-model="bindEmailInput" :pattern="emailPattern"
                    :message="emailTipMessage" @validate="emailIsValid = $event" ref="emailInputRef" height="40px" />
            </div>
            <div class=" input-code">
                <FormInput placeholder="🔑 请输入验证码" v-model="vcodeInput" :pattern="vcodePattern"
                    :message="vcodeTipMessage" @validate="vcodeIsValid = $event" ref="vcodeInputRef" height="40px" />
                <button class="btn-code" @click="getCode">{{ vcodeBtnContext }}</button>
            </div>
            <button class="btn-submit" @click="submitBindEmail" :disabled="isDisable">绑定</button>
        </div>

        <div class="modify-password" v-if="optionId === 6">
            <div class="header">
                <h3>🔑修改密码</h3>
                <button @click="hideSettingItem(6)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <div class="password-form">
                <form>
                    <div class="input-group">
                        <FormInput type="password" placeholder="🗝️ 原密码" icon="icon-browse" height="35px"
                            v-model="modifyPassword.original" ref="originalPasswordRef" :message="originalTipMessage"
                            :validator="originalValidator" @validate="validResults.original = $event" />
                    </div>
                    <div class="input-group">
                        <FormInput type="password" placeholder="🔒 新密码" icon="icon-browse" height="35px"
                            v-model="modifyPassword.new" :pattern="newPassowrdPattern" :message="newTipMessages"
                            ref="newPasswordRef" @validate="validResults.new = $event" />
                    </div>
                    <div class="input-group">
                        <FormInput type="password" placeholder="🔐 确认新密码" icon="icon-browse" height="35px"
                            v-model="modifyPassword.confirm" :validator="confirmValidator" :message="confirmTipMessages"
                            ref="confirmPasswordRef" @validate="validResults.confirm = $event" />
                    </div>
                </form>
                <button class="btn-submit" @click="submitModifyPassword">{{ modifyPasswordBtnContext }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
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
const nickname = ref("")
const nicknameTipMessage = {
    prompt: "",
    success: "昵称可用✅",
    error: "昵称1~12个字符❌"
}
const nicknameIsValid = ref(false)
const nicknamePattern = ref(new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9]{1,12}$/))

//提交修改昵称
const submitModifyNickname = () => {
    if (!nicknameIsValid.value) {
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
//提交选择的性别
const submitModifyGender = () => {
    console.log(selectedGender.value);
}

//注销用户
const destroyPassword = ref("")//输入的确认注销用户的密码
const destroyPasswordRef = ref(null)
const destroyValidator = () => {
    return destroyPassword === ''
}
const cancelDestroy = () => {
    hideSettingItem(3)
}
const submitDestroyAccount = (e) => {
    e.preventDefault()
    if (!destroyPassword.value) {
        destroyPasswordRef.value.setTip("请输入您账号的密码，确认您的身份")
        destroyPasswordRef.value.triggerTipBlink(true)
        return
    }
    console.log("提交确认注销账户", destroyPassword.value);
    cancelDestroy()
}



//设置简介
const bioInput = ref("")//输入的简介
const surplus = ref(50)//还剩多少个字符可以输入
const bioBtnContext = ref("保存")

//监听输入
watch(() => bioInput.value, (newValue) => {
    console.log("输入的简介", newValue);

    if (!newValue) {
        surplus.value = 50
    }
    bioBtnContext.value = "保存"

    surplus.value = 50 - newValue.length
    if (surplus.value < 0) {
        surplus.value = 0
    }
})

//提交修改简介
const submitSettingBio = () => {
    if (!bioInput.value) {
        bioBtnContext.value = "请输入您的简介"
        setTimeout(() => {
            bioBtnContext.value = "保存"
        }, 1000)
        return
    }
    if (bioInput.value.length > 50) {
        bioBtnContext.value = "你输入的内容超过限制，请简化一下"
        setTimeout(() => {
            bioBtnContext.value = "保存"
        }, 1000)
        return

    }
    console.log("提交设置的简介", bioInput.value);
}


//验证邮箱
const emailInputRef = ref(null)
const vcodeInputRef = ref(null)
const bindEmailInput = ref("")//输入的邮箱
const vcodeInput = ref("")//输入的验证码
const emailPattern = ref(new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))//邮箱校验规则
const vcodePattern = ref(new RegExp(/^\d{4}$/))//验证码校验规则
const emailIsValid = ref(false)//邮箱校验是否通过
const vcodeIsValid = ref(false)//验证码校验是否通过
const vcodeBtnContext = ref("获取验证码")//获取验证码按钮文本
const isDisable = ref(false)//是否禁用获取验证码按钮
const emailTipMessage = {
    prompt: "",
    success: "邮箱格式正确✅",
    error: "邮箱格式不正确❌"
}

const vcodeTipMessage = {
    prompt: "",
    success: "",
    error: "请输入4位数字验证码❌"
}

//提交绑定
const submitBindEmail = () => {
    if (!emailIsValid.value && !vcodeIsValid.value) {
        emailInputRef.value.triggerTipBlink(true)
        vcodeInputRef.value.triggerTipBlink(true)
        return
    }

    console.log("提交绑定邮箱", bindEmailInput.value);
}

let timer = null
const getCode = () => {
    if (isDisable.value) return;
    vcodeTimer(60)
}
const vcodeTimer = (initialCount) => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
    let count = initialCount
    isDisable.value = true
    timer = setInterval(() => {
        vcodeBtnContext.value = `${count--}s`
        if (count === 0) {
            isDisable.value = false
            vcodeBtnContext.value = "获取验证码"
            clearInterval(timer)
            return
        }
    }, 1000)
}


//修改密码
const originalPasswordRef = ref(null)//原密码输入框
const newPasswordRef = ref(null)//新密码输入框
const confirmPasswordRef = ref(null)//确认密码输入框
const modifyPasswordBtnContext = ref("修改密码")//修改密码按钮文本
const validResults = reactive({
    original: false,
    new: false,
    confirm: false
})
const modifyPassword = reactive({
    original: "",
    new: "",
    confirm: ""
})
const originalTipMessage = {
    prompt: "请输入原密码",
    success: "",
    error: "您还未输入原密码❌"
}
// 密码输入框提示文本
const newTipMessages = {
    prompt: "密码要是8~16位，数字字母下划线哦",
    success: "密码符合要求啦✅",
    error: "密码不符合要求，重新设置一下吧!❌"
}
// 确认密码输入框提示文本
const confirmTipMessages = {
    prompt: "确认您的密码！",
    success: "密码确认成功✅",
    error: "两次输入的密码不一致!❌"
}

//原密码校验规则
const originalValidator = () => {
    return modifyPassword.original !== ''
}
// 密码校验规则
const newPassowrdPattern = ref(new RegExp(/^[a-zA-Z0-9_]{8,16}$/))
// 确认密码校验规则
const confirmValidator = () => {
    return modifyPassword.new === modifyPassword.confirm
}

// 监听密码输入
watch(() => modifyPassword.new, (newValue) => {
    console.log(newValue);

    if (!newValue || !modifyPassword.confirm) {
        return
    }
    confirmPasswordRef.value.validate(newValue)
}, { immediate: true })

// 是否所有输入项都校验成功
const allValid = computed(() => {
    return Object.values(validResults).every(Boolean)
})


//提交修改密码
const submitModifyPassword = () => {
    if (allValid) {
        modifyPasswordBtnContext.value = "请完善修改密码信息!"
        blink()
        setTimeout(() => {
            modifyPasswordBtnContext.value = "修改密码"
        }, 1500)
        return
    }
    console.log("提交修改密码", modifyPassword.new);
}

const blink = () => {
    if (!validResults.new && modifyPassword.new)
        newPasswordRef.value.triggerTipBlink(true)
    if (!validResults.confirm && modifyPassword.confirm)
        confirmPasswordRef.value.triggerTipBlink(true)
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/item.scss" as *;
</style>