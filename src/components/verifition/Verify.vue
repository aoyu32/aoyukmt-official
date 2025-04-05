<template>
    <div :class="mode == 'pop' ? 'mask' : ''" v-show="showBox">
        <div :class="mode == 'pop' ? 'verifybox' : ''" :style="{ 'max-width': parseInt(imgSize.width) + 30 + 'px' }">
            <div class="verifybox-top" v-if="mode == 'pop'">
                请完成安全验证
                <span class="verifybox-close" @click="closeBox">
                    <i class="iconfont icon-close"></i>
                </span>
            </div>
            <div class="verifybox-bottom" :style="{ padding: mode == 'pop' ? '15px' : '0' }">
                <!-- 验证码容器 -->
                <component v-if="componentType" :is="componentType" :captchaType="captchaType" :type="verifyType"
                    :figure="figure" :arith="arith" :mode="mode" :vSpace="vSpace" :explain="explain" :imgSize="imgSize"
                    :blockSize="blockSize" :barSize="barSize" ref="instance"></component>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
/**
 * Verify 验证码组件
 * @description 分发验证码使用
 * */
import VerifySlide from './VerifySlide.vue';
import { computed, ref, watch, toRefs, watchEffect } from 'vue';
export default {
    name: 'Vue2Verify',
    components: {
        VerifySlide,
    },
    props: {
        captchaType: {
            type: String,
            required: true
        },
        figure: {
            type: Number
        },
        arith: {
            type: Number
        },
        mode: {
            type: String,
            default: 'pop'
        },
        vSpace: {
            type: Number
        },
        explain: {
            type: String
        },
        imgSize: {
            type: Object,
            default() {
                return {
                    width: '310px',
                    height: '155px'
                }
            }
        },
        blockSize: {
            type: Object
        },
        barSize: {
            type: Object
        },
    },
    setup(props) {
        const { captchaType, figure, arith, mode, vSpace, explain, imgSize, blockSize, barSize } = toRefs(props)
        const clickShow = ref(false)
        const verifyType = ref(undefined)
        const componentType = ref(undefined)

        const instance = ref({})

        const showBox = computed(() => {
            if (mode.value == 'pop') {
                return clickShow.value
            } else {
                return true;
            }
        })
        /**
         * refresh
         * @description 刷新
         * */
        const refresh = () => {
            console.log(instance.value);
            if (instance.value.refresh) {
                instance.value.refresh()
            }
        }
        const closeBox = () => {
            refresh();
        }
        const show = () => {
            if (mode.value == "pop") {
                clickShow.value = true;
            }
        }
        watchEffect(() => {
            switch (captchaType.value) {
                case 'blockPuzzle':
                    verifyType.value = '2'
                    componentType.value = 'VerifySlide'
                    break
                case 'clickWord':
                    verifyType.value = ''
                    componentType.value = 'VerifyPoints'
                    break
            }
        })

        return {
            clickShow,
            verifyType,
            componentType,
            instance,
            closeBox,
            showBox,
            show
        }
    },
}
</script>
<style lang="scss">
@use "@/assets/styles/captcha/verify.scss" as *;
</style>
