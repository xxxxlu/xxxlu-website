<template>
  <header class="header" :class="{ 'transparent': isScrolled }">
    <div class="container">
      <div class="logo">
        <router-link to="/">Your Logo</router-link>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link">{{ $t('nav.home') }}</router-link>
        <router-link to="/about" class="nav-link">{{ $t('nav.about') }}</router-link>
        <router-link to="/projects" class="nav-link">{{ $t('nav.projects') }}</router-link>
        <router-link to="/contact" class="nav-link">{{ $t('nav.contact') }}</router-link>
        <CountrySelector class="country-selector-nav" />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import CountrySelector from '@/components/CountrySelector.vue';

// 管理滚动透明效果
const isScrolled = ref(false);

// 根据用户提供的代码示例实现滚动检测逻辑
const handleScroll = () => {
  // 获取滚动位置（兼容不同浏览器）
  const scrollPos = document.body.scrollTop || 
                   window.pageYOffset || 
                   document.documentElement.scrollTop;
  
  // 默认显示主题色背景，滚动到一定位置后变为透明背景
  if (scrollPos > 15) {
    // 滚动超过15px，切换为透明背景
    isScrolled.value = true;
  } else {
    // 页面顶部，使用主题色背景
    isScrolled.value = false;
  }
};

onMounted(() => {
  // 初始时不透明（显示主题色）
  isScrolled.value = false;
  
  // 绑定滚动监听器
  window.addEventListener('scroll', handleScroll);
  
  // 确保初始加载时执行一次判断
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: rgba(var(--bg-rgb), 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(var(--primary-rgb), 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  z-index: 1000;
  
  // 滚动后的透明样式
  &.transparent {
    background-color: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-bottom: none;
    box-shadow: none;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    position: relative;
    z-index: 5;
    
    a {
      background-image: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: opacity 0.3s ease;
    }
  }
  
  .nav {
    display: flex;
    gap: 2rem;
    align-items: center;
    
    .nav-link {
      position: relative;
      color: var(--text-color);
      transition: all 0.3s;
      font-weight: 500;
      
      .header.transparent & {
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
      }
      
      &:hover,
      &.router-link-active {
        color: var(--primary-color);
        
        .header.transparent & {
          color: #fff;
        }
      }
      
      &.router-link-active::after {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
      }
    }
    
    .country-selector-nav {
      margin-left: 1rem;
      border-left: 1px solid rgba(var(--text-rgb), 0.2);
      padding-left: 1rem;
      
      .header.transparent & {
        border-left: 1px solid rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
