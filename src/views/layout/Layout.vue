<template>
  <header class="header">
    <nav class="nav" ref="navLinks" :style="{ maxWidth: navWidth }">
      <router-link to="/index" class="logo">
        <img src="@/assets/aoyukmt.png" />
        <span class="logo-text" ref="logoText">{{ pageText }}</span>
      </router-link>
      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu" @click="isActive = !isActive">
        &#9776;
      </button>
      <div id="nav-links" :class="['nav-links', isActive ? 'active' : '']">
        <router-link to="/download" @mouseover="changeText('download', '🫣 下载安装')"
          @mouseleave="resetText('download', '😎 下载安装')">
          {{ download }}
        </router-link>
        <router-link to="/document" @mouseover="changeText('document', '🐳 使用文档')"
          @mouseleave="resetText('document', '🐋 使用文档')">
          {{ document }}
        </router-link>
        <router-link to="/assistant" @mouseover="changeText('assistant', '👍 智能助手')"
          @mouseleave="resetText('assistant', '👎 智能助手')">
          {{ assistant }}
        </router-link>
        <router-link to="/updatelog" @mouseover="changeText('updatelog', '🐤 更新日志')"
          @mouseleave="resetText('updatelog', '🐣 更新日志')">
          {{ updatelog }}
        </router-link>
      </div>
    </nav>
  </header>
  <main>
    <router-view>
    </router-view>
  </main>
</template>

<script setup>
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import TypeEffect from "@/utils/typing";

const navLinks = ref(null)
let download = ref("😎 下载安装");
let document = ref("🐋 使用文档");
let assistant = ref("👎 智能助手");
let updatelog = ref("🐣 更新日志");
let pageText = ref("AOYUKMT");
let isActive = ref(false)
const logoText = ref(null);
const route = useRoute();
let typingInstance = null;  // 用来存储打字效果实例
let navWidth = ref('1200px')
const initTypeEffect = {
  typingSpeed: 150,  // 自定义输入速度
  deletingSpeed: 80,  // 自定义删除速度
  pauseTime: 300,  // 自定义暂停时间
  cursor: "|",  // 自定义光标
}
// 在 onMounted 中设置监听
onMounted(() => {
  watchEffect(() => {
    const currentRoute = route.path;

    // 如果有已有的打字实例，先停止
    if (typingInstance) {
      typingInstance.stop();
    }

    isActive.value = false

    // 根据当前路由创建新的打字实例
    if (currentRoute === "/index") {
      typingInstance = new TypeEffect("AOYUKMT", logoText.value, initTypeEffect);
      navWidth.value = '1200px'
    } else if (currentRoute === "/download") {
      typingInstance = new TypeEffect("DOWNLOAD", logoText.value, initTypeEffect);
      navWidth.value = '1200px'
    } else if (currentRoute.startsWith("/document")) {
      typingInstance = new TypeEffect("DOCUMENT", logoText.value, initTypeEffect);
      navWidth.value = '95%'
    } else if (currentRoute === "/assistant") {
      typingInstance = new TypeEffect("assistant", logoText.value, initTypeEffect);
      navWidth.value = '1200px'
    } else if (currentRoute === "/updatelog") {
      typingInstance = new TypeEffect("UPDATELOG", logoText.value, initTypeEffect);
      navWidth.value = '1200px'
    }

    // 启动打字效果
    if (typingInstance) {
      typingInstance.start();
    }

  });
});

// 改变链接文本的函数
const changeText = (link, newText) => {
  if (link === 'download') {
    download.value = newText;
  } else if (link === 'document') {
    document.value = newText;
  } else if (link === 'assistant') {
    assistant.value = newText;
  } else if (link === 'updatelog') {
    updatelog.value = newText;
  }
};

// 恢复链接文本的函数
const resetText = (link, originalText) => {
  if (link === 'download') {
    download.value = originalText;
  } else if (link === 'document') {
    document.value = originalText;
  } else if (link === 'assistant') {
    assistant.value = originalText;
  } else if (link === 'updatelog') {
    updatelog.value = originalText;
  }
};
</script>


<style lang="scss" scoped>
@use "@/assets/styles/common/_theme.scss" as *;
@use "@/assets/styles/common/_variable.scss" as *;

.header {
  background: $theme-primary;
  padding: 1rem;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 10px $theme-shallow-shadow;

  .nav {
    max-width: $max-width;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: $theme-font-light;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: $font-weight;

      img {
        width: $img-size-small;
        height: $img-size-small;
        border-radius: 8px;
      }

      .logo-text {
        font-family: $logo-font-family;
        font-size: 1.5rem;
        font-weight: $font-weight;
      }

    }


    .nav-links {
      display: flex;
      gap: 2rem;

      a {
        color: $theme-font-light;
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
          background: $theme-secondary-light;
          transition: width 0.3s ease, left 0.3s ease;
        }

        &:hover {
          color: $theme-secondary;

          &::after {
            width: 100%;
            left: 0;
          }
        }
      }
    }

  }
}

main {
  width: 100%;
  height: 100%;
  position: relative;
}


// 响应式处理
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: $theme-font-light;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: $theme-secondary;
  }
}

@media (max-width: 768px) {
  .header {
    .menu-toggle {
      display: block;
    }

    .nav {
      .nav-links {
        display: none;
        flex-direction: column;
        position: absolute;
        top: calc(100% + 1px); // 距离导航栏顶部
        right: 2px; // 保持适当的边距
        background: $theme-primary; // 半透明背景
        width: 150px; // 合适的宽度
        padding: 1rem;
        box-shadow: 0 4px 6px $theme-shallow-shadow;
        border-radius: 8px;

        a {
          text-align: center;
        }
      }

      .active {
        display: flex;
      }


    }
  }

}
</style>