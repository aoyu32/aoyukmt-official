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
                    <img :src="avatarImage" v-if="avatarImage">
                    <input type="file" hidden @change="handleUploadAvatar" ref="avatarInputRef" accept="image/*"
                        multiple="false">
                </div>
                <button class="btn-random" @click="submitGetRandowmAvatar">随机 <i
                        class="iconfont icon-suijishushengcheng"></i></button>
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
                    <input type="radio" value="1" name="gender" v-model="selectedGender" />
                    <span>男♂️</span>
                </label>
                <label class="radio-label">
                    <input type="radio" value="2" name="gender" v-model="selectedGender" />
                    <span>女♀️</span>
                </label>
                <label class="radio-label">
                    <input type="radio" value="3" name="gender" v-model="selectedGender" />
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
            <span>字符限制50字符内，当前字符数：{{ surplus }}</span>
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
                <button class="btn-code" @click="getCode" :disabled="isDisable">{{ vcodeBtnContext }}</button>
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
                        <FormInput type="password" placeholder="🗝️ 原密码" icon="icon-browse" height="35px"
                            v-model="modifyPassword.original" ref="originalPasswordRef" :message="originalTipMessage"
                            :validator="originalValidator" @validate="validResults.original = $event" />
                    </div>
                    <div class="input-group">
                        <FormInput type="password" placeholder="🔒 新密码" icon="icon-browse" height="35px"
                            v-model="modifyPassword.newPwd" :pattern="newPassowrdPattern" :message="newTipMessages"
                            ref="newPasswordRef" @validate="validResults.newPwd = $event" />
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
import { ref, reactive, watch, computed, nextTick } from 'vue'
import FormInput from '../common/FormInput.vue';
import emitter from '@/utils/emitter';
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
const submitModifyNickname = async () => {
    if (!nicknameIsValid.value) {
        return;
    }
    console.log("要修改的昵称：", nickname.value);
    updateRequest('handle-update-request', {
        type: 'nickname',
        data: {
            nickname: nickname.value
        }
    })
}

//头像
// 头像相关状态
const avatarInputRef = ref(null);
const avatarBtnContext = ref("保存");
const avatarImage = ref("");
const avatarVerify = ref(false);
const avatarFile = ref(null)
const random = ref(false)//是否生成了随机图片
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
    random.value = false
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
    avatarFile.value = file
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
    updateRequest("handle-avatar-modify", {
        type: 'upload',//提交本地图片
        data: avatarFile.value,
        random: random.value,//是否生成了随机图片
    })
    random.value = false
};

//获取随机头像
const submitGetRandowmAvatar = () => {
    random.value = true
    setAvatarSuccessState()
    avatarImage.value = ''
    avatarFile.value = new File([], "")

    updateRequest("handle-avatar-modify", {
        type: 'random',
        callback: (resp) => {
            avatarImage.value = resp
        }
    })
}


//设置性别
const selectedGender = ref(0)//用户选择的性别
//提交选择的性别
const submitModifyGender = async () => {

    console.log(selectedGender.value);
    updateRequest('handle-update-request', {
        type: 'gender',
        data: {
            gender: Number(selectedGender.value)
        }
    })
}

//注销用户
const destroyPassword = ref("")//输入的确认注销用户的密码
const destroyPasswordRef = ref(null)
const destroyPasswordIsValid = ref(false)
const destroyValidator = () => {
    return destroyPassword === ''
}
const cancelDestroy = (e) => {
    e.preventDefault()
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
    updateRequest("handle-destroy-user", {
        password: destroyPassword.value
    })
}



//设置简介
const bioInput = ref("")//输入的简介
const surplus = ref(0)//还剩多少个字符可以输入
const bioBtnContext = ref("保存")

//监听输入
watch(() => bioInput.value, (newValue) => {
    console.log("输入的简介", newValue);

    if (!newValue) {
        surplus.value = 0
    }
    bioBtnContext.value = "保存"

    surplus.value = newValue.length
    if (surplus.value < 0) {
        surplus.value = 0
    }
})

//提交修改简介
const submitSettingBio = async () => {
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
    updateRequest('handle-update-request', {
        type: 'bio',
        data: {
            bio: bioInput.value
        }
    })
}


//验证邮箱
const emailInputRef = ref(null)
const vcodeInputRef = ref(null)
const bindEmailInput = ref("")//输入的邮箱
const vcodeInput = ref("")//输入的验证码
const emailPattern = ref(new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/))//邮箱校验规则
const vcodePattern = ref(new RegExp(/^\d{6}$/))//验证码校验规则
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
    error: "请输入6位数字验证码❌"
}

//提交绑定
const submitBindEmail = () => {
    if (emailError()) return
    updateRequest('handle-bind-email', {
        type: 'bind',
        data: {
            code: vcodeInput.value,
            email: bindEmailInput.value
        }
    })
}

const emailError = () => {
    const emailInvalid = !emailIsValid.value
    const vcodeInvalid = !vcodeIsValid.value
    console.log("邮箱校验结果：", emailInvalid);
    console.log("验证码校验结果：", vcodeInvalid);

    if (emailInvalid) {
        emailInputRef.value.triggerTipBlink(true)
    }

    if (vcodeInvalid) {
        vcodeInputRef.value.triggerTipBlink(true)
    }

    return emailInvalid || vcodeInvalid
}
let timer = null
const getCode = () => {
    if (!bindEmailInput.value) {
        emailInputRef.value.setTip("请先输入邮箱❌")
        emailInputRef.value.triggerTipBlink(true)
        return
    }
    if (!emailIsValid.value) return
    if (isDisable.value) return;
    updateRequest('handle-bind-email', {
        type: 'code',
        data: {
            email: bindEmailInput.value,
        },
        callback: (resp) => {
            if (resp) {
                vcodeTimer("已发送", 60)
            } else {

            }
        }
    })
}
const vcodeTimer = (text, initialCount) => {
    isDisable.value = true;
    let count = initialCount;
    vcodeBtnContext.value = text ? `${text}(${count}s)` : `${count}s`;

    if (timer) clearInterval(timer);

    timer = setInterval(() => {
        count--;
        vcodeBtnContext.value = text ? `${text}(${count}s)` : `${count}s`;

        if (count <= 0) {
            clearInterval(timer);
            isDisable.value = false;
            vcodeBtnContext.value = "获取验证码";
        }
    }, 1000);
}

//修改密码
const originalPasswordRef = ref(null)//原密码输入框
const newPasswordRef = ref(null)//新密码输入框
const confirmPasswordRef = ref(null)//确认密码输入框
const modifyPasswordBtnContext = ref("修改密码")//修改密码按钮文本
const validResults = reactive({
    original: false,
    newPwd: false,
    confirm: false
})
const modifyPassword = reactive({
    original: "",
    newPwd: "",
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
    return modifyPassword.newPwd === modifyPassword.confirm
}

// 监听密码输入
watch(() => modifyPassword.newPwd, (newValue) => {
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
    console.log(allValid.value);
    if (!allValid.value) {
        modifyPasswordBtnContext.value = "请完善修改密码信息!"
        blink()
        setTimeout(() => {
            modifyPasswordBtnContext.value = "修改密码"
        }, 1500)
        return
    }
    console.log("提交修改密码", modifyPassword.newPwd);
    const { original, newPwd } = modifyPassword
    const data = { originalPassword: original, newPassword: newPwd }
    console.log(data);


    updateRequest('handle-reset-password', data)
}

const blink = () => {
    if (!validResults.newPwd && modifyPassword.newPwd)
        newPasswordRef.value.triggerTipBlink(true)
    if (!validResults.confirm && modifyPassword.confirm)
        confirmPasswordRef.value.triggerTipBlink(true)
}

const updateRequest = (type, data) => {
    //传递事件
    emitter.emit(type, data)
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/item.scss" as *;
</style>