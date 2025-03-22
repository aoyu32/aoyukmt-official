import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const userStore = defineStore('user', () => {

    const user = ref({
        uid: '123',
        name: 'aoyukmt'
    });

    return {
        user
    }
})