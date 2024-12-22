// aosAnimation.js
import AOS from 'aos' // 导入 AOS 动画库
import 'aos/dist/aos.css' // 导入 AOS 样式

// 定义支持的动画效果列表，便于以后在指令中使用
const ANIMATIONS = {
    // 淡入效果
    'fade-up': 'fade-up',           // 从下方淡入上升
    'fade-down': 'fade-down',       // 从上方淡入下降
    'fade-left': 'fade-left',       // 从左侧淡入
    'fade-right': 'fade-right',     // 从右侧淡入
    
    // 组合淡入效果
    'fade-up-right': 'fade-up-right',     // 从左下方淡入向右上方移动
    'fade-up-left': 'fade-up-left',       // 从右下方淡入向左上方移动
    'fade-down-right': 'fade-down-right', // 从左上方淡入向右下方移动
    'fade-down-left': 'fade-down-left',   // 从右上方淡入向左下方移动
    
    // 翻转效果
    'flip-left': 'flip-left',       // 从右向左翻转
    'flip-right': 'flip-right',     // 从左向右翻转
    'flip-up': 'flip-up',           // 从下向上翻转
    'flip-down': 'flip-down',       // 从上向下翻转
    
    // 放大效果
    'zoom-in': 'zoom-in',           // 中心放大
    'zoom-in-up': 'zoom-in-up',     // 从下方放大
    'zoom-in-down': 'zoom-in-down', // 从上方放大
    'zoom-in-left': 'zoom-in-left', // 从左侧放大
    'zoom-in-right': 'zoom-in-right', // 从右侧放大
    
    // 缩小效果
    'zoom-out': 'zoom-out',           // 中心缩小
    'zoom-out-up': 'zoom-out-up',     // 向上缩小
    'zoom-out-down': 'zoom-out-down', // 向下缩小
    'zoom-out-left': 'zoom-out-left', // 向左缩小
    'zoom-out-right': 'zoom-out-right', // 向右缩小
    
    // 滑动效果
    'slide-up': 'slide-up',         // 向上滑动
    'slide-down': 'slide-down',     // 向下滑动
    'slide-left': 'slide-left',     // 向左滑动
    'slide-right': 'slide-right'    // 向右滑动
}

// 初始化 AOS 动画库，设置默认配置
AOS.init({
    duration: 500, // 动画持续时间，单位为毫秒
    easing: 'ease-out', // 动画缓动效果
    once: true, // 是否只执行一次动画
    offset: 120, // 动画触发的偏移量，值越大触发时机越迟
    delay: 0 // 动画延迟时间，单位为毫秒
})

export default {
    // 当元素挂载到 DOM 时触发
    mounted(el, binding) {
        // 获取指令传入的配置参数，默认值为空对象
        const options = binding.value || {}

        // 获取动画类型，默认值为 'fade-up'
        const animation = options.animation || 'fade-up'
        
        // 检查动画类型是否在支持的列表中，如果不支持则使用默认的 'fade-up' 动画
        if (!ANIMATIONS[animation]) {
            console.warn(`Animation "${animation}" is not supported. Using "fade-up" instead.`)
        }

        // 给元素添加 AOS 的动画类型属性，动态设置动画类型
        el.setAttribute('data-aos', ANIMATIONS[animation] || 'fade-up')

        // 设置其他 AOS 选项（如果传入了）
        if (options.duration) {
            el.setAttribute('data-aos-duration', options.duration) // 动画时长
        }
        if (options.delay) {
            el.setAttribute('data-aos-delay', options.delay) // 动画延迟
        }
        if (options.offset) {
            el.setAttribute('data-aos-offset', options.offset) // 动画触发时机的偏移
        }
        if (options.easing) {
            el.setAttribute('data-aos-easing', options.easing) // 动画的缓动效果
        }
        if (options.once !== undefined) {
            el.setAttribute('data-aos-once', options.once) // 是否只执行一次
        }

        // 刷新 AOS 配置，确保动画效果正常应用
        AOS.refresh()
    },

    // 当元素更新时触发，通常用于动态数据更新后的效果刷新
    updated(el, binding) {
        AOS.refresh() // 刷新 AOS 动画
    },

    // 当元素从 DOM 中卸载时触发
    unmounted() {
        AOS.refresh() // 确保卸载时 AOS 的状态得到更新
    }
}
