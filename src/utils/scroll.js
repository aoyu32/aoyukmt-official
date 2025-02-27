export const scrollTo = (target = 'bottom', duration = 200, element = null, offset = 0) => {
    setTimeout(() => {
        const scrollElement = element || document.documentElement || document.body; // 默认滚动窗口为文档根元素
        let start, end, change;

        // 如果目标是 DOM 元素，则滚动到该元素的位置 + 偏移量
        if (target instanceof Element) {
            start = scrollElement.scrollTop;
            end = target.offsetTop - offset; // 获取元素到文档顶部的距离，再加上偏移量
        } else if (target === 'bottom') {
            start = scrollElement.scrollTop;
            end = scrollElement.scrollHeight - scrollElement.clientHeight;
        } else if (target === 'top') {
            start = scrollElement.scrollTop;
            end = 0;
        } else if (typeof target === 'number') {
            start = scrollElement.scrollTop;
            end = target;
        } else {
            console.error('Invalid target specified. Expected "bottom", "top", a number, or a DOM element.');
            return;
        }

        change = end - start;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // 确保进度不超过1
            const amountScrolled = easeInOutQuad(progress) * change;

            scrollElement.scrollTop = start + amountScrolled;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        };

        // 缓动函数，用于平滑滚动
        const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };

        requestAnimationFrame(animateScroll);
    }, 50); // 短暂延迟确保 DOM 已更新
};