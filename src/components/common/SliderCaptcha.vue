<template>
    <div class="slide-captcha">
        <Vcode type="inside" @success="onSuccess" show="true" puzzle-scale="0.7" slider-size="30" />
    </div>
</template>

<script setup>
import Vcode from "vue3-puzzle-vcode";

const props = defineProps({
    isDisplay: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(["close-slide-captcha"])
const onSuccess = () => {
    emit("close-slide-captcha")
};


</script>
<style lang="scss" scoped>
.slide-captcha {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;
}
</style>