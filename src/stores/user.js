import { defineStore } from "pinia";
import { ref, reactive } from 'vue'
import tools from "@/utils/tools";

export const userStore = defineStore('user', () => {
    const tempId = tools.getRandomId()
    const tempUserName = tools.getRandomName()
    const tempAvatar = tools.getRandomAvatar(0)
    const tempDate = tools.getFormatDate('yyyy年mm月dd日')
    const user = reactive({
        id: tempId,
        name: tempUserName,
        avatar: tempAvatar,
        sex: '未知',
        createTime: tempDate,
        resume: '该用户未填写任何简述！'
    })

    return {
        user
    }
})