/**
 * 初始化一个带有浮动键盘快捷键的动画背景画布
 * @param {string} canvasId - HTML 画布元素的 ID
 * @param {Object} options - 自定义选项
 * @param {Object} options.keyBackground - 按键背景的渐变颜色
 * @param {string} options.keyBackground.start - 按键背景渐变的起始颜色（顶部）
 * @param {string} options.keyBackground.end - 按键背景渐变的结束颜色（底部）
 * @param {string} options.keyBorder - 按键的边框颜色
 * @param {string} options.keyText - 按键内的文字颜色
 * @param {string} options.plusSign - 按键之间加号的颜色
 * @returns {Object} 带有更新颜色方法的控制器
 */
export function initBackgroundCanvas(canvasId, options = {}) {
    // 获取画布元素
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // 颜色自定义选项及默认值
    const colors = {
        keyBackground: options.keyBackground || { start: "#ffffff", end: "#f0f0f0" }, // 按键渐变颜色
        keyBorder: options.keyBorder || "#ff3333", // 边框颜色
        keyText: options.keyText || "#ff0000", // 按键内文字颜色
        plusSign: options.plusSign || "#ff0000" // 按键之间加号的颜色
    };

    /**
     * 调整画布大小以匹配窗口尺寸
     */
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 初始化画布大小
    resizeCanvas();

    // 添加调整大小的监听器
    window.addEventListener("resize", resizeCanvas);

    // 可能显示的按键字符数组
    const keys = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
        "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
        "RShift", "LShift", "RCtrl", "LCtrl", "RAlt", "LAlt", "Tab", "Esc", "Enter", "CapsLock", "Space",
        "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
        "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "=", "+",
        "[", "]", "{", "}", "\\", "|", ";", ":", "'", '"', ",", ".", "/", "<", ">", "?", "`", "~"
    ];

    // 键盘快捷键组合的集合
    let combos = [];

    /**
     * 表示键盘快捷键组合（两个按键）的类
     */
    class ShortcutCombo {
        /**
         * 创建一个新的快捷键组合
         * @param {number} delay - 显示组合前的初始延迟
         */
        constructor(delay = 0) {
            this.delay = delay;       // 出现前的初始延迟
            this.active = false;      // 组合当前是否处于活动状态
            this.height = 35;         // 按键元素的高度
            this.reset();             // 初始化其他属性
        }

        /**
         * 使用新的随机值重置组合
         */
        reset() {
            // 选择随机按键
            this.key1 = keys[Math.floor(Math.random() * keys.length)];
            this.key2 = keys[Math.floor(Math.random() * keys.length)];

            // 初始不透明度和淡入淡出设置
            this.opacity = 0;
            this.fadingIn = true;
            this.fadeSpeed = 0.02;

            // 计算随机移动方向
            const angle = Math.random() * Math.PI * 2;
            this.dx = Math.cos(angle) * 0.5; // 水平速度
            this.dy = Math.sin(angle) * 0.5; // 垂直速度

            // 根据文本内容计算按键宽度
            ctx.font = "bold 16px Arial";
            const key1TextWidth = ctx.measureText(this.key1).width;
            const key2TextWidth = ctx.measureText(this.key2).width;

            // 确保最小按键宽度（40px）或文本宽度加内边距（30px）
            this.key1Width = Math.max(key1TextWidth + 30, 40);
            this.key2Width = Math.max(key2TextWidth + 30, 40);

            // 计算总宽度，包括加号空间（30px）
            this.width = this.key1Width + 30 + this.key2Width;

            // 在画布上找到合适的位置
            this.findSafePosition();
        }

        /**
         * 在画布上找到一个不与其他组合重叠的位置
         */
        findSafePosition() {
            let attempts = 0;
            let found = false;

            // 尝试最多100次找到一个不重叠的位置
            while (!found && attempts < 100) {
                // 距离边缘有一定边距的随机位置
                this.x = Math.random() * (canvas.width - this.width - 20);
                this.y = Math.random() * (canvas.height - this.height - 20);

                // 检查与其他组合的碰撞
                let collision = false;
                for (let other of combos) {
                    if (other !== this && other.active) {
                        const dx = this.x - other.x;
                        const dy = this.y - other.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        // 组合之间的最小距离为100px
                        if (distance < 100) {
                            collision = true;
                            break;
                        }
                    }
                }

                if (!collision) {
                    found = true;
                }
                attempts++;
            }
        }

        /**
         * 更新组合的状态和位置
         */
        update() {
            // 如果还在延迟期间，减少延迟并返回
            if (this.delay > 0) {
                this.delay--;
                return;
            }

            this.active = true;

            // 处理淡入淡出效果
            if (this.fadingIn) {
                // 淡入
                this.opacity += this.fadeSpeed;
                if (this.opacity >= 1) {
                    this.opacity = 1;
                    this.fadingIn = false;
                }
            } else {
                // 淡出
                this.opacity -= this.fadeSpeed;
                if (this.opacity <= 0) {
                    // 淡出完成后重置
                    this.active = false;
                    this.reset();
                    this.delay = Math.random() * 100 + 50;
                    this.fadingIn = true;
                }
            }

            // 只有在可见时才更新位置
            if (this.opacity > 0) {
                // 更新位置
                this.x += this.dx;
                this.y += this.dy;

                // 边界检查，使用正确的宽度
                if (this.x < 0 || this.x > canvas.width - this.width) {
                    this.dx *= -1; // 反转水平速度
                    // 调整位置以保持在边界内
                    this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));
                }

                if (this.y < 0 || this.y > canvas.height - this.height) {
                    this.dy *= -1; // 反转垂直速度
                    // 调整位置以保持在边界内
                    this.y = Math.max(0, Math.min(this.y, canvas.height - this.height));
                }
            }
        }

        /**
         * 绘制快捷键组合
         */
        draw() {
            // 如果不活动或不可见则不绘制
            if (!this.active || this.opacity <= 0) return;

            // 保存当前上下文状态
            ctx.save();
            ctx.globalAlpha = this.opacity;

            /**
             * 绘制单个按键
             * @param {string} text - 按键上的文本
             * @param {number} x - 按键的x坐标
             * @param {number} y - 按键的y坐标
             * @param {number} width - 按键的宽度
             */
            const drawKey = (text, x, y, width) => {
                // 创建自定义颜色的渐变
                const gradient = ctx.createLinearGradient(x, y, x, y + this.height);
                gradient.addColorStop(0, colors.keyBackground.start);
                gradient.addColorStop(1, colors.keyBackground.end);

                // 绘制按键背景
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(x, y, width, this.height, 8);
                ctx.fill();

                // 绘制按键边框
                ctx.strokeStyle = colors.keyBorder;
                ctx.lineWidth = 2;
                ctx.stroke();

                // 绘制居中文本
                ctx.fillStyle = colors.keyText;
                ctx.font = "bold 16px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, x + width / 2, y + this.height / 2);
            };

            // 绘制第一个按键
            drawKey(this.key1, this.x, this.y, this.key1Width);

            // 绘制加号
            ctx.fillStyle = colors.plusSign;
            ctx.font = "bold 20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("+", this.x + this.key1Width + 15, this.y + this.height / 2);

            // 绘制第二个按键
            drawKey(this.key2, this.x + this.key1Width + 30, this.y, this.key2Width);

            // 恢复上下文状态
            ctx.restore();
        }
    }

    // 创建带有交错延迟的组合
    combos = Array(7)
        .fill()
        .map((_, i) => new ShortcutCombo(i * 50));

    /**
     * 动画循环函数
     */
    function animate() {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新和绘制所有组合
        combos.forEach((combo) => {
            combo.update();
            combo.draw();
        });

        // 请求下一帧动画
        requestAnimationFrame(animate);
    }

    // 启动动画
    animate();

    // 返回一个用于更新颜色的方法
    return {
        /**
         * 更新颜色设置
         * @param {Object} newColors - 新的颜色设置
         * @param {Object} [newColors.keyBackground] - 按键背景新颜色
         * @param {string} [newColors.keyBackground.start] - 按键背景渐变的新起始颜色
         * @param {string} [newColors.keyBackground.end] - 按键背景渐变的新结束颜色
         * @param {string} [newColors.keyBorder] - 按键边框的新颜色
         * @param {string} [newColors.keyText] - 按键文字的新颜色
         * @param {string} [newColors.plusSign] - 加号的新颜色
         */
        updateColors: (newColors) => {
            Object.assign(colors, newColors);
        }
    };
}