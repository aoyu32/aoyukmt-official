import Lenis from 'lenis';

let lenis;

export const initLenis = () => {
    // 创建 Lenis 实例
    lenis = new Lenis({
        duration: 1.1, // 滚动动画持续时间
        // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 缓动函数
        easing: (x) => {
            return 1 - (1 - x) * (1 - x);
        },
        // easing: (x) => {
        //     return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        // },
        smooth: true, // 是否平滑
        direction: 'vertical', // 滚动方向
    });

    // 更新滚动动画帧
    const animate = (time) => {
        lenis.raf(time);
        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
};

// export const destroyLenis = () => {
//     if (lenis) {
//         lenis.destroy();
//     }
// };
