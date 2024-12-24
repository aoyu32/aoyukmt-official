class TypeEffect {
  constructor(text, element, options = {}) {
    if (!element) return; // 如果元素为空，直接返回

    // 设置可配置的选项，提供默认值
    const {
      typingSpeed = 150,  // 输入速度，默认 150ms
      deletingSpeed = 100,  // 删除速度，默认 100ms
      pauseTime = 500,  // 暂停时间，默认 500ms
      cursor = "|",  // 光标符号，默认 "|"
    } = options;

    this.text = text;
    this.element = element;
    this.typingSpeed = typingSpeed;
    this.deletingSpeed = deletingSpeed;
    this.pauseTime = pauseTime;
    this.cursor = cursor;
    this.index = 0;
    this.isDeleting = false;
    this.typingTimer = null;  // 用于存储定时器引用
  }

  // 初始化打字效果
  start() {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
    this.element.textContent = "";
    this.type();
  }

  // 执行打字效果
  type() {
    if (!this.element) return; // 如果元素为空，直接返回

    const displayText = this.text.slice(0, this.index) + this.cursor;
    this.element.textContent = displayText;

    if (!this.isDeleting && this.index < this.text.length) {
      this.index++;
      this.typingTimer = setTimeout(() => this.type(), this.typingSpeed);
    } else if (this.isDeleting && this.index > 0) {
      this.index--;
      this.typingTimer = setTimeout(() => this.type(), this.deletingSpeed);
    } else {
      this.isDeleting = !this.isDeleting;
      this.typingTimer = setTimeout(() => this.type(), this.pauseTime);
    }
  }

  // 清除定时器
  stop() {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
  }
}

export default TypeEffect;
