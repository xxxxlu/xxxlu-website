<script setup lang="ts">
import { ref } from 'vue'

// 项目数据
const projects = ref([
  {
    id: 1,
    title: '项目一',
    description: '这是一个令人惊叹的项目，展示了我的技术能力和创意思维。',
    image: 'https://via.placeholder.com/800x450',
    tags: ['Vue.js', 'TypeScript', 'GSAP'],
    link: '#'
  },
  {
    id: 2,
    title: '项目二',
    description: '一个具有挑战性的项目，我在其中解决了复杂问题并实现了创新解决方案。',
    image: 'https://via.placeholder.com/800x450',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#'
  },
  {
    id: 3,
    title: '项目三',
    description: '这个项目展示了我的团队协作和项目管理能力。',
    image: 'https://via.placeholder.com/800x450',
    tags: ['Angular', 'Firebase', 'SCSS'],
    link: '#'
  },
  {
    id: 4,
    title: '项目四',
    description: '一个创新的移动应用程序，为用户提供了独特的体验。',
    image: 'https://via.placeholder.com/800x450',
    tags: ['React Native', 'GraphQL', 'AWS'],
    link: '#'
  }
])
</script>

<template>
  <div class="projects-page">
    <section class="section hero">
      <div class="container">
        <h1 class="hero-title scroll-animate fade-up">我的项目</h1>
        <p class="lead scroll-animate fade-up delay-1">探索我最近完成的一些项目</p>
      </div>
    </section>

    <section class="section projects scroll-animate fade-up">
      <div class="container">
        <div class="projects-grid">
          <div v-for="(project, index) in projects" :key="index" 
               class="project-card scroll-animate" 
               :class="index % 2 === 0 ? 'fade-left' : 'fade-right'">
            <div class="project-image">
              <img :src="project.image" :alt="project.title">
            </div>
            <div class="project-content">
              <h2 class="project-title">{{ project.title }}</h2>
              <p class="project-description">{{ project.description }}</p>
              <div class="technologies stagger-parent">
                <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="tech-tag stagger-item">{{ tag }}</span>
              </div>
              <div class="project-links">
                <a :href="project.link" class="btn btn-primary" target="_blank">查看详情</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/minxin.scss' as *;

.projects-page {
  color: #fff;
  background-color: #000;

  .hero {
    padding: 8rem 0 4rem;
    text-align: center;
    
    .hero-title {
      @include fancy-text;
    }
  }
  
  .projects {
    padding: 4rem 0;
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 3rem;
      
      @include responsive(mobile) {
        grid-template-columns: 1fr;
      }
    }
    
    .project-card {
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        
        .project-image img {
          transform: scale(1.05);
        }
      }
      
      .project-image {
        overflow: hidden;
        
        img {
          width: 100%;
          transition: transform 0.5s;
        }
      }
      
      .project-content {
        padding: 1.5rem;
      }
      
      .project-title {
        margin-bottom: 0.5rem;
      }
      
      .project-description {
        opacity: 0.8;
        margin-bottom: 1.5rem;
      }
      
      .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        
        .tag {
          background-color: rgba(0, 124, 240, 0.2);
          color: rgba(0, 223, 216, 1);
          padding: 0.25rem 0.75rem;
          border-radius: 30px;
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
