<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// 引用DOM元素
const curtainSection = ref(null);
const mainContent = ref(null);

// 技能数据
const skills = ref([
  { icon: '💻', name: 'Frontend', description: 'Vue, React, Angular' },
  { icon: '🛠️', name: 'Backend', description: 'Node.js, Express, Django' },
  { icon: '🎨', name: 'Design', description: 'Figma, Adobe XD, Sketch' },
  { icon: '📱', name: 'Mobile', description: 'React Native, Flutter' },
]);

// 项目数据
const projects = ref([
  { title: 'Project 1', description: 'A description of project 1', image: 'https://via.placeholder.com/300x200' },
  { title: 'Project 2', description: 'A description of project 2', image: 'https://via.placeholder.com/300x200' },
  { title: 'Project 3', description: 'A description of project 3', image: 'https://via.placeholder.com/300x200' },
]);

// 在页面加载后初始化动画
onMounted(() => {
  // 注册GSAP插件
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // 使用GSAP ScrollTrigger为元素添加滚动动画
  const sections = document.querySelectorAll('.reveal-section');
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%', // 当元素顶部到达视口80%的位置时触发
      end: 'bottom 20%',
      markers: false, // 调试时可以设置为true
      onEnter: () => {
        section.classList.add('is-revealed');
      },
      onLeaveBack: () => {
        // 如果要在离开视口时隐藏元素，可以取消下面注释
        // section.classList.remove('is-revealed');
      }
    });
  });
  
  // 对幕布应用动画
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.curtain-section',
      start: 'top top', // 当幕布顶部到达视口顶部时开始
      end: '+=80%', // 减少滚动距离，更快地展示内容
      scrub: true, // 平滑动画与滚动同步
      pin: true, // 固定幕布在视口中
      markers: false,
      // 确保滚动结束后平滑过渡到下一部分
      onLeave: () => {
        // 滚动结束后平滑过渡到第二屏
        gsap.to(window, {
          duration: 0.5,
          scrollTo: {
            y: '.second-screen',
            offsetY: 0
          },
          ease: 'power2.inOut'
        });
      }
    }
  });
  
  // 幕布淡出动画
  tl.to('.curtain-backdrop', {
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out'
  }, 0);
  
  // 纱幕上升动画
  tl.to('.curtain-content', {
    y: '-80%',
    opacity: 0,
    duration: 0.8,
    ease: 'power3.inOut'
  }, 0);
  
  // 将主内容容器渐变到完全不透明，并向上移动
  tl.to('.main-content', {
    opacity: 1, 
    y: '-20vh', // 向上移动以消除空白
    duration: 0.5,
    ease: 'power2.out'
  }, 0.3);
  
  // 创建第二屏的滚动触发器，确保与第一屏无缝衔接
  ScrollTrigger.create({
    trigger: '.second-screen',
    start: 'top bottom',
    end: 'top top',
    markers: false,
    onEnter: () => {
      // 确保第二屏在进入视口时立即显示
      const secondScreen = document.querySelector('.second-screen');
      if (secondScreen) {
        secondScreen.classList.add('is-revealed');
      }
      // 激活内部的淡入元素
      document.querySelectorAll('.second-screen .fade-left, .second-screen .fade-right').forEach((el) => {
        el.classList.add('is-revealed');
      });
    }
  });
  
  // 初始化设置
  // 确保第一屏完全展示，并且Header可以正确应用透明效果
  gsap.set('.main-content', {
    visibility: 'visible'
  });
  
  // 即使在初始化过程中，也确保页面顶部处于第一屏内容区
  setTimeout(() => {
    // 强制检查一次滚动位置，确保Header的透明状态正确
    window.scrollTo(0, 0);
    // 触发一个滚动事件，确保所有依赖滚动位置的组件都会更新
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});
</script>

<template>
  <div class="home">
    <!-- 幕布效果的第一屏 -->
    <section class="curtain-section" ref="curtainSection">
      <div class="curtain-content">
        <h1 class="hero-title">{{ $t('hero.title') }}</h1>
        <p class="hero-description">{{ $t('hero.description') }}</p>
        <div class="hero-buttons">
          <router-link to="/contact" class="btn primary-btn">{{ $t('hero.buttons.contact') }}</router-link>
          <router-link to="/projects" class="btn secondary-btn">{{ $t('hero.buttons.projects') }}</router-link>
        </div>
      </div>
      <!-- 滚动指示器 -->
      <div class="scroll-indicator">
        <span>{{ $t('scrollIndicator') }}</span>
        <div class="arrow-down"></div>
      </div>
    </section>

    <!-- 主要内容 -->
    <div class="main-content" ref="mainContent" style="opacity: 0; margin-top: -5vh;">
      <!-- 大型第二屏展示 -->
      <section class="second-screen reveal-section">
        <div class="second-screen-bg"></div>
        <div class="container">
          <div class="profile-grid">
            <!-- 左侧个人照片 -->
            <div class="profile-image-container reveal-section fade-right">
              <div class="profile-image">
                <img src="https://via.placeholder.com/500x600" alt="个人照片" />
              </div>
              <div class="profile-decorations">
                <div class="decoration-circle"></div>
                <div class="decoration-square"></div>
                <div class="decoration-dots"></div>
              </div>
            </div>
            
            <!-- 右侧个人信息 -->
            <div class="profile-info reveal-section fade-left">
              <h2 class="heading-gradient">{{ $t('about.greeting', '你好，我是') }} <span>{{ $t('about.name', '小苏') }}</span></h2>
              <h3 class="profile-subtitle">{{ $t('about.jobTitle', '前端工程师 & UI/UX设计师') }}</h3>
              
              <div class="profile-description">
                <p>{{ $t('about.bio1', '我是一名热爱创造的前端开发者，拥有三年的前端开发经验。我喜欢探索新技术，并且始终致力于创造新顶的用户体验。') }}</p>
                <p>{{ $t('about.bio2', '我的目标是结合创意设计和前沿技术，打造清畅、实用且具有强大功能的Web应用程序。') }}</p>
              </div>
              
              <div class="key-stats">
                <div class="stat-item">
                  <div class="stat-value">3+</div>
                  <div class="stat-label">{{ $t('about.stats.years', '年经验') }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">20+</div>
                  <div class="stat-label">{{ $t('about.stats.projects', '个项目') }}</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">5+</div>
                  <div class="stat-label">{{ $t('about.stats.clients', '客户') }}</div>
                </div>
              </div>
              
              <div class="profile-cta">
                <router-link to="/about" class="btn primary-btn">{{ $t('about.buttons.more', '了解更多') }}</router-link>
                <router-link to="/contact" class="btn secondary-btn">{{ $t('about.buttons.contact', '联系我') }}</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 主要内容容器 -->
      <div class="content-wrapper">
        <!-- 关于区域 -->
        <section class="about-section reveal-section fade-up">
          <div class="container">
            <h2>{{ $t('about.title') }}</h2>
            <p class="about-description">
              {{ $t('about.description') }}
            </p>
            <router-link to="/about" class="btn primary-btn">{{ $t('about.learnMore') || '了解更多' }}</router-link>
          </div>
        </section>

        <!-- 技能区域 -->
        <section class="skills-section reveal-section fade-up">
          <div class="container">
            <h2>{{ $t('skills.title') }}</h2>
            <div class="skills-grid">
              <div v-for="(skill, index) in skills" :key="index" class="skill-card scroll-animate fade-up">
                <div class="skill-icon">{{ skill.icon }}</div>
                <h3>{{ skill.name }}</h3>
                <p>{{ skill.description }}</p>
              </div>
            </div>
          </div>
        </section>
        
        <!-- 项目区域 -->
        <section class="projects-section reveal-section fade-up">
          <div class="container">
            <h2>{{ $t('projects.title') }}</h2>
            <div class="projects-grid">
              <div v-for="(project, index) in projects" :key="index" class="project-card scroll-animate fade-up">
                <div class="project-image">
                  <img :src="project.image" :alt="project.title" />
                </div>
                <div class="project-content">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>
                  <a href="#" class="btn secondary-btn small">{{ $t('projects.viewProject') || '查看详情' }}</a>
                </div>
              </div>
            </div>
            <div class="center mt-4">
              <router-link to="/projects" class="btn primary-btn">{{ $t('projects.viewAll') || '所有项目' }}</router-link>
            </div>
          </div>
        </section>

      <!-- 联系区域 -->
      <section class="contact-section reveal-section fade-up">
        <div class="container">
          <h2>联系我</h2>
          <p>如果您对我的作品感兴趣或有任何问题，请随时联系我。</p>
          <router-link to="/contact" class="btn primary-btn">发送消息</router-link>
        </div>
      </section>
      </div> <!-- 内容包装器结束 -->
    </div>

  </div>
</template>

<style lang="scss">
.home {
  overflow-x: hidden; /* 防止水平溢出 */
  scroll-behavior: smooth; /* 添加平滑滚动 */
}

/* 按钮共用样式 */
.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &.primary-btn {
    background: var(--primary-color);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    
    &:hover {
      background: var(--primary-color-light);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
  }
  
  &.secondary-btn {
    background: transparent;
    color: white;
    border: 2px solid white;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
  }
}

/* 幕布部分样式 */
.curtain-section {
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color-light) 0%, var(--primary-color) 100%);
  color: white;
  text-align: center;
  padding: 0 1rem;
  overflow: hidden;
  will-change: transform;

  .curtain-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
  }

  .hero-description {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }

  /* 向下滚动指示器 */
  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .arrow-down {
      width: 16px;
      height: 16px;
      border-right: 3px solid white;
      border-bottom: 3px solid white;
      transform: rotate(45deg);
      margin-top: 5px;
    }
  }
}

.main-content {
  position: relative;
  opacity: 0; /* 初始时隐藏，通过滚动动画显示 */
  z-index: 5;
  margin-top: -5vh; /* 减少顶部空白 */
  background: var(--bg-color-light); /* 使用亮色背景 */
  will-change: transform;
  visibility: hidden; /* 初始隐藏，由JS控制显示 */
  
  .content-wrapper {
    background: var(--bg-color-light);
    min-height: 100vh;
    padding-top: 2rem;
    padding-bottom: 3rem;
  }
}

.about-section,
.skills-section,
.projects-section,
.contact-section {
  padding: 6rem 0;

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
    font-weight: 700;
  }
}

/* 第二屏样式 */
.second-screen {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 5rem 0;
  margin-top: -10vh; // 负边距减少空白
  background-color: var(--bg-color);
  
  .second-screen-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(var(--primary-rgb), 0.05) 0%, transparent 20%),
      radial-gradient(circle at 90% 80%, rgba(var(--secondary-rgb), 0.05) 0%, transparent 25%);
    z-index: 0;
  }
  
  .container {
    position: relative;
    z-index: 1;
  }
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.profile-image-container {
  position: relative;
  
  .profile-image {
    position: relative;
    z-index: 2;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    transition: transform 0.5s ease;
    
    img {
      display: block;
      width: 100%;
      height: auto;
      transition: filter 0.3s ease;
    }
    
    &:hover {
      transform: translateY(-10px);
      
      img {
        filter: brightness(1.05);
      }
    }
  }
  
  .profile-decorations {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    
    .decoration-circle {
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-color-light), var(--primary-color));
      top: -40px;
      left: -40px;
      opacity: 0.1;
    }
    
    .decoration-square {
      position: absolute;
      width: 100px;
      height: 100px;
      background: var(--secondary-color);
      bottom: -20px;
      right: -30px;
      transform: rotate(30deg);
      opacity: 0.1;
    }
    
    .decoration-dots {
      position: absolute;
      top: 20%;
      right: -40px;
      width: 100px;
      height: 200px;
      background-image: radial-gradient(circle, var(--primary-color) 2px, transparent 2px);
      background-size: 20px 20px;
      opacity: 0.3;
    }
  }
}

.profile-info {
  color: var(--text-color);
  
  .heading-gradient {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    
    span {
      background-image: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      padding-bottom: 5px;
    }
  }
  
  .profile-subtitle {
    font-size: 1.5rem;
    color: var(--text-color-muted);
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  
  .profile-description {
    margin-bottom: 2rem;
    
    p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 1rem;
      color: var(--text-color-muted);
    }
  }
  
  .key-stats {
    display: flex;
    gap: 2.5rem;
    margin-bottom: 2.5rem;
    
    .stat-item {
      text-align: center;
      
      .stat-value {
        font-size: 3rem;
        font-weight: 800;
        background-image: linear-gradient(135deg, var(--primary-color), var(--primary-color-light));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .stat-label {
        font-size: 1rem;
        color: var(--text-color-muted);
        font-weight: 500;
      }
    }
  }
  
  .profile-cta {
    display: flex;
    gap: 1rem;
    
    @media (max-width: 576px) {
      flex-direction: column;
      gap: 0.8rem;
    }
    
    .btn.secondary-btn {
      color: var(--primary-color);
      border-color: var(--primary-color);
      
      &:hover {
        background: rgba(var(--primary-rgb), 0.05);
      }
    }
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.skill-card {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .skill-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  p {
    color: var(--text-color-muted);
    line-height: 1.6;
  }
}

.projects-section {
  background-color: var(--bg-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
}

.project-card {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .project-image {
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  &:hover .project-image img {
    transform: scale(1.05);
  }

  .project-content {
    padding: 1.5rem;

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.3rem;
    }

    p {
      margin-bottom: 1.5rem;
      color: var(--text-color-muted);
      line-height: 1.6;
    }
  }
}

.contact-section {
  background-color: var(--bg-color-light);
  text-align: center;

  p {
    max-width: 600px;
    margin: 0 auto 2rem;
    font-size: 1.2rem;
  }
}

.center {
  text-align: center;
}

/* 动画类 */
.reveal-section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s, transform 0.6s;
  
  &.is-revealed {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-left {
  transform: translateX(30px);
  transition: opacity 0.8s, transform 0.8s;
  
  &.is-revealed {
    transform: translateX(0);
  }
}

.fade-right {
  transform: translateX(-30px);
  transition: opacity 0.8s, transform 0.8s;
  
  &.is-revealed {
    transform: translateX(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .curtain-section .hero-title {
    font-size: 2.5rem;
  }
  
  .curtain-section .hero-description {
    font-size: 1.2rem;
  }
  
  .projects-grid,
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 250px;
    margin: 2rem auto 0;
  }
}
</style>
