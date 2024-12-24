// src/utils/canvasBackground.js

export default function createCanvasBackground(canvasElement, options = {}) {
    const ctx = canvasElement.getContext("2d");
    const particles = [];
    const keys = options.keys || "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const particleCount = options.particleCount || 50; // 默认粒子数量
    const mouse = { x: null, y: null, isDragging: false, draggingParticle: null };
    const defaultStyles = {
      particleColor: "rgba(255, 255, 255, 0.8)",
      fontColor: "#ff4d4d",
      fontSizeRatio: 0.5,
      connectionLineColor: "rgba(255, 255, 255, 0.5)",
      connectionLineWidth: 1,
    };
    const styles = { ...defaultStyles, ...options.styles };
    let animationFrameId;
  
    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 40 + 20;
        const x = Math.random() * canvasElement.width;
        const y = Math.random() * canvasElement.height;
        const velocity = {
          x: (Math.random() * 2 - 1) * (options.speed || 1),
          y: (Math.random() * 2 - 1) * (options.speed || 1),
        };
        const key = keys[Math.floor(Math.random() * keys.length)];
        particles.push({
          x,
          y,
          size,
          key,
          velocity,
          color: styles.particleColor,
          isClicked: false,
        });
      }
    };
  
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      particles.forEach((particle, index) => {
        // 更新位置
        if (!mouse.isDragging || particle !== mouse.draggingParticle) {
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
        }
  
        // 边界反弹
        if (particle.x + particle.size > canvasElement.width || particle.x < 0)
          particle.velocity.x *= -1;
        if (particle.y + particle.size > canvasElement.height || particle.y < 0)
          particle.velocity.y *= -1;
  
        // 绘制粒子
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
  
        ctx.font = `${particle.size * styles.fontSizeRatio}px Arial`;
        ctx.fillStyle = styles.fontColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          particle.key,
          particle.x + particle.size / 2,
          particle.y + particle.size / 2
        );
  
        // 鼠标拖动连线
        if (mouse.isDragging && mouse.draggingParticle) {
          const dx = particle.x - mouse.draggingParticle.x;
          const dy = particle.y - mouse.draggingParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 200) {
            ctx.beginPath();
            ctx.moveTo(
              mouse.draggingParticle.x + mouse.draggingParticle.size / 2,
              mouse.draggingParticle.y + mouse.draggingParticle.size / 2
            );
            ctx.lineTo(particle.x + particle.size / 2, particle.y + particle.size / 2);
            ctx.strokeStyle = styles.connectionLineColor;
            ctx.lineWidth = styles.connectionLineWidth;
            ctx.stroke();
          }
        }
      });
  
      animationFrameId = requestAnimationFrame(drawParticles);
    };
  
    const onResize = () => {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
      particles.length = 0; // 清空粒子
      initParticles();
    };
  
    const onMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
  
    const onMouseDown = () => {
      const clickedParticle = particles.find(
        (particle) =>
          mouse.x >= particle.x &&
          mouse.x <= particle.x + particle.size &&
          mouse.y >= particle.y &&
          mouse.y <= particle.y + particle.size
      );
  
      if (clickedParticle) {
        mouse.isDragging = true;
        mouse.draggingParticle = clickedParticle;
        clickedParticle.color = "rgba(255, 99, 71, 0.9)"; // 改变颜色
      }
    };
  
    const onMouseUp = () => {
      if (mouse.draggingParticle) {
        mouse.draggingParticle.color = styles.particleColor; // 恢复颜色
      }
      mouse.isDragging = false;
      mouse.draggingParticle = null;
    };
  
    const start = () => {
      canvasElement.width = window.innerWidth;
      canvasElement.height = window.innerHeight;
      initParticles();
      drawParticles();
  
      window.addEventListener("resize", onResize);
      window.addEventListener("mousemove", onMouseMove);
      canvasElement.addEventListener("mousedown", onMouseDown);
      canvasElement.addEventListener("mouseup", onMouseUp);
    };
  
    const stop = () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      canvasElement.removeEventListener("mousedown", onMouseDown);
      canvasElement.removeEventListener("mouseup", onMouseUp);
    };
  
    return { start, stop };
  }
  