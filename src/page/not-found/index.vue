<script setup lang="ts">
// Not Found 页面组件
</script>

<template>
  <div class="not-found-page">
    <div class="not-found-container">
      <h1 class="title scroll-animate fade-up">九霄之外！</h1>
      <h2 class="subtitle scroll-animate fade-up delay-1">404 - 页面未找到</h2>
      <p class="description scroll-animate fade-up delay-2">抱歉，您访问的页面不存在或已被移除。</p>
      <div class="action-container scroll-animate fade-up delay-3">
        <router-link to="/" class="home-button">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/minxin.scss' as *;

.not-found-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 2rem;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0,124,240,0.05) 0%, rgba(0,0,0,0) 100%);
    top: 0;
    left: 0;
    z-index: 0;
  }
  
  .not-found-container {
    max-width: 600px;
    position: relative;
    z-index: 1;
  }
  
  .title {
    font-size: 8rem;
    font-weight: 800;
    margin: 0;
    line-height: 1;
    @include fancy-text;
    position: relative;
    
    &::after {
      content: '404';
      position: absolute;
      font-size: 20rem;
      opacity: 0.03;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: -1;
    }
  }
  
  .subtitle {
    font-size: 2.5rem;
    margin: 0 0 1.5rem;
    background: linear-gradient(90deg, #00dfd8, #007cf0);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }
  
  .description {
    font-size: 1.2rem;
    opacity: 0.8;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  
  .action-container {
    margin-top: 3rem;
  }
  
  .home-button {
    display: inline-block;
    background: linear-gradient(90deg, #007cf0, #00dfd8);
    color: #fff;
    text-decoration: none;
    padding: 0.8rem 2rem;
    border-radius: 30px;
    font-weight: 600;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    z-index: 1;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #00dfd8, #007cf0);
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 124, 240, 0.3);
      
      &::before {
        opacity: 1;
      }
    }
  }
}
</style>
