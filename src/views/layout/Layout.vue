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
        <router-link v-for="(item, index) in links" :key="index" :to="item.routerLink" @mouseover="hoverIndex = index"
          @mouseleave="hoverIndex = null">
          {{ hoverIndex === index ? item.name : item.hoverName }}
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
import { useHeaderStore } from "@/stores/header";
import { storeToRefs } from "pinia";
const headerStore = useHeaderStore()
const { links, typings } = storeToRefs(headerStore)
const navLinks = ref(null)
let pageText = ref("AOYUKMT");
let isActive = ref(false)
const logoText = ref(null);
const hoverIndex = ref(null)
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
    typings.value.forEach(element => {
      if (currentRoute === element.routerLink) {
        typingInstance = new TypeEffect(element.typeText, logoText.value, initTypeEffect);
        navWidth.value = element.navWidth
      }
    });

    // 启动打字效果
    if (typingInstance) {
      typingInstance.start();
    }

  });
});

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