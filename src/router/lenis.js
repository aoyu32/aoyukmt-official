import Lenis from 'lenis';

let lenis;

export const initLenis = () => {
    // 创建 Lenis 实例
    lenis = new Lenis({
        // duration: 1.1, // 滚动动画持续时间

        // easing: (x) => {
        //     return Math.sin((x * Math.PI) / 2);
        // },
        // // easing: (x) => {
        // //     return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        // // },
        // // easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // easeInOutQuad
        // // easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // easeInOutCubic
        // smooth: true, // 是否平滑
        // direction: 'vertical', // 滚动方向
        duration: 0.6, // 滚动动画持续时间，稍微延长一点以获得更平滑的效果
        easing: (t) => Math.sin((t * Math.PI) / 2), // 使用正弦缓动函数，流畅且没有卡顿
        // easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 缓动函数
        smooth: true, // 启用平滑滚动
        direction: 'vertical', // 垂直滚动

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
