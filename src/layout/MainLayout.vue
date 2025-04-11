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
import { onMounted, onUnmounted } from 'vue';
import { initScrollAnimations, initStaggerAnimation, AnimationController } from '@/utils/scrollAnimation';
import Header from '@/layout/components/Header.vue';
import Footer from '@/layout/components/Footer.vue';
import useTheme from '@/hooks/useTheme';

// 初始化主题
useTheme();

let scrollObserver: AnimationController | undefined;
let staggerObserver: AnimationController | undefined;

// 在组件挂载后初始化滚动动画
onMounted(() => {
  // 初始化主要的滚动动画
  scrollObserver = initScrollAnimations();
  
  // 错开动画（每个元素依次出现）
  staggerObserver = initStaggerAnimation('.stagger-parent', '.stagger-item', 100);
  
  // 兼容旧的动画类，将reveal-section转换为scroll-animate
  const legacyElements = document.querySelectorAll('.reveal-section:not(.scroll-animate)');
  legacyElements.forEach(el => {
    el.classList.add('scroll-animate');
    el.classList.add('fade-up');
  });
});

// 清理观察者
onUnmounted(() => {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
  if (staggerObserver) {
    staggerObserver.disconnect();
  }
});
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
