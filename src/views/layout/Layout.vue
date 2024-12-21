<template>
    <header class="header">
      <nav class="nav">
        <router-link to="/" class="logo">
          <img src="@/assets/aoyukmt.png" />
          <span class="logo-text" ref="logoText">{{ pageText }}</span>
        </router-link>
        <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
          &#9776;
        </button>
        <div class="nav-links" id="nav-links">
          <router-link to="/download">{{ download }}</router-link>
          <router-link to="/document">{{ document }}</router-link>
          <router-link to="/feedback">{{ feedback }}</router-link>
          <router-link to="/updatelog" class="updatelog-link">{{ updatelog }}</router-link>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </template>
  
  <script setup>
  import { ref, watchEffect, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  let download = ref("🖥️ 下载安装");
  let document = ref("📇 使用文档");
  let feedback = ref("🗳️ 意见反馈");
  let updatelog = ref("🐋 更新日志");
  let pageText = ref("AOYUKMT");
  const logoText = ref(null);
  const route = useRoute();
  
  let typingTimer = null;
  let index = 0;
  let isDeleting = false;
  
  const typeEffect = (text) => {
    if (!logoText.value) return; // 添加空值检查
    
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseTime = 500;
    const cursor = "|";
  
    if (typingTimer) {
      clearTimeout(typingTimer);
      typingTimer = null;
    }
  
    logoText.value.textContent = "";
  
    const type = () => {
      if (!logoText.value) return; // 添加空值检查
      
      const displayText = text.slice(0, index) + cursor;
      logoText.value.textContent = displayText;
  
      if (!isDeleting && index < text.length) {
        index++;
        typingTimer = setTimeout(type, typingSpeed);
      } else if (isDeleting && index > 0) {
        index--;
        typingTimer = setTimeout(type, deletingSpeed);
      } else {
        isDeleting = !isDeleting;
        typingTimer = setTimeout(type, pauseTime);
      }
    };
  
    type();
  };
  
  // 在 onMounted 中设置监听
  onMounted(() => {
    watchEffect(() => {
      const currentRoute = route.path;
      if (currentRoute === "/index") {
        typeEffect("AOYUKMT");
      } else if (currentRoute === "/download") {
        typeEffect("DOWNLOAD");
      } else if (currentRoute === "/document") {
        typeEffect("DOCUMENT");
      } else if (currentRoute === "/feedback") {
        typeEffect("FEEDBACK");
      } else if (currentRoute === "/updatelog") {
        typeEffect("UPDATELOG");
      }
    });
  });
  </script>

<style lang="scss" scoped>
.header {
    background: $primary-color;
    padding: 1rem;
    position: fixed;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;

    img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
    }
}

.logo-text {
    font-family: 'Courier New', monospace;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}

.nav-links {
    display: flex;
    gap: 2rem;

    a {
        color: white;
        text-decoration: none;
        font-weight: 600;
        position: relative;
        padding-bottom: 4px;
        transition: color 0.3s;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: rgb(255, 253, 253);
            transition: width 0.3s ease, left 0.3s ease;
        }

        &:hover {
            color: $secondary-color;

            &::after {
                width: 100%;
                left: 0;
            }
        }
    }
}

// 响应式处理
.menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
        color: $secondary-color;
    }
}

@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: calc(100% + 1px); // 距离导航栏顶部
        right: 2px; // 保持适当的边距
        background: rgba(255, 77, 77, 0.7); // 半透明背景
        width: 200px; // 合适的宽度
        padding: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    .nav-links.active {
        display: flex;
    }

    .nav-links a {
        padding: 0.5rem;
        text-align: center;
    }
}
</style>