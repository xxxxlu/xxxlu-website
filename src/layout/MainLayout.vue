<template>
  <div class="app">
    <Header />
    
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { initScrollAnimations, initStaggerAnimation, AnimationController } from '@/utils/scrollAnimation';
import Header from '@/layout/components/Header.vue';
import Footer from '@/layout/components/Footer.vue';
import useTheme from '@/hooks/useTheme';

// 初始化主题
useTheme();

let scrollObserver: AnimationController | undefined;
let staggerObserver: AnimationController | undefined;
const route = useRoute();

// 判断是否是首页
const isHomePage = () => {
  return route.path === '/' || route.path === '/index.html' || route.path === '';
};

// 初始化滚动动画
const initAnimations = () => {
  // 清理之前的观察者
  cleanupObservers();
  
  // 在非首页，立即显示所有动画元素，但不初始化动画
  if (!isHomePage()) {
    document.querySelectorAll('.scroll-animate').forEach(el => {
      el.classList.remove('scroll-animate-initial', 'scroll-animate-out');
      el.classList.add('scroll-animate-in');
    });
    
    document.querySelectorAll('.stagger-parent .stagger-item').forEach(el => {
      el.classList.remove('stagger-animate-initial');
      el.classList.add('stagger-animate-in');
    });
    
    return;
  }
  
  // 只在首页初始化动画
  scrollObserver = initScrollAnimations();
  staggerObserver = initStaggerAnimation('.stagger-parent', '.stagger-item', 100);
  
  // 兼容旧的动画类，将reveal-section转换为scroll-animate
  const legacyElements = document.querySelectorAll('.reveal-section:not(.scroll-animate)');
  legacyElements.forEach(el => {
    el.classList.add('scroll-animate');
    el.classList.add('fade-up');
  });
};

// 清理观察者
const cleanupObservers = () => {
  if (scrollObserver) {
    scrollObserver.disconnect();
    scrollObserver = undefined;
  }
  if (staggerObserver) {
    staggerObserver.disconnect();
    staggerObserver = undefined;
  }
};

// 在组件挂载后初始化动画
onMounted(() => {
  initAnimations();
  
  // 路由变化时重新初始化动画
  watch(() => route.path, () => {
    initAnimations();
  });
});

// 组件卸载时清理观察者
onUnmounted(cleanupObservers);
</script>

<style lang="scss">
.app {
  background-color: var(--bg-color, #0d1117);
  color: var(--text-color, #f0f6fc);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

main {
  min-height: 100vh;
  padding-top: 70px; // 为固定的header留出空间
  background-color: var(--bg-color, #0d1117);
}

// 页面过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
