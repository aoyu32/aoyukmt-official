import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import tools from "@/utils/tools";

export const userStore = defineStore('user', () => {
    const tempId = tools.getRandomId()
    const tempUserName = tools.getRandomName()
    const tempAvatar = tools.getRandomAvatar(0)
    const tempDate = tools.getFormatDate('yyyy年mm月dd日')
    const token = ref("")

    const user = reactive({
        id: tempId,
        name: "未登录",
        avatar: tempAvatar,
        sex: '未知',
        status: '🔋',
        createTime: tempDate,
        resume: '该用户未填写任何简述！'
    })

    return {
        token,
        user
    }
})