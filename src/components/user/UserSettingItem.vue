<template>
    <div class="user-setting-item">
        <div class="modify-nickname" v-if="optionId === 0">
            <div class="header">
                <h3>🐌修改昵称</h3>
                <button @click="hideSettingItem(0)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <FormInput label="请输入新的昵称：" placeholder="🐧 昵称" />
            <button class="btn-save">保存</button>
        </div>

        <div class="modify-avatar" v-if="optionId === 1">
            <div class="header">
                <h3>🎃修改头像</h3>
                <button @click="hideSettingItem(1)"><i class="iconfont icon-retract-right"></i></button>
            </div>
            <div class="avatar-container">
                <div class="avatar">
                    <div class="upload-icon">
                        <i class="iconfont icon-upload"></i>
                    </div>
                    <img src="" alt="">
                    <input type="file" hidden>
                </div>
                <button class="btn-random">随机 <i class="iconfont icon-suijishushengcheng"></i></button>
            </div>
            <button class="btn-save">保存</button>
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
import FormInput from '../common/FormInput.vue';

const props = defineProps({
    optionId: {
        type: Number,
        default: 10
    }
})

//收起设置项
const emit = defineEmits(["hide-item"])
const hideSettingItem = (index) => {
    emit("hide-item", index)
}

</script>

<style lang="scss" scoped>
@use "@/assets/styles/user/item.scss" as *;
</style>