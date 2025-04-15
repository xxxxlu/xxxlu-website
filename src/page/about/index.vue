<script setup lang="ts">
// 关于页面组件
</script>

<template>
  <div class="about-page">
    <section class="section hero">
      <div class="about-container">
        <section class="about-header scroll-animate fade-up">
          <h1>关于我</h1>
          <p class="subtitle">了解更多关于我的背景、技能和价值观</p>
        </section>

        <section class="about-story scroll-animate fade-up">
          <h2>我的故事</h2>
          <div class="content-wrapper">
            <div class="text-content scroll-animate fade-left delay-1">
              <p>欢迎来到我的个人网站！我是一名充满热情的开发者，致力于创造出直观、易用且美观的数字产品。我的专业旅程始于对技术的强烈好奇心，这种好奇心驱使我不断学习和成长。</p>
              <p>我相信技术的力量在于它能够连接人与人，简化复杂的任务，并为日常生活带来价值。在我的项目中，我始终追求卓越的用户体验和优雅的代码实现。</p>
            </div>
            <div class="image-content scroll-animate fade-right delay-2">
              <!-- 这里可以放置个人照片 -->
              <div class="image-placeholder"></div>
            </div>
          </div>
        </section>

        <section class="about-skills scroll-animate fade-up">
          <h2>我的专业技能</h2>
          <div class="skills-grid stagger-parent">
            <div class="skill-card stagger-item">
              <h3>前端开发</h3>
              <p>精通HTML, CSS, JavaScript以及现代前端框架如Vue, React。注重性能优化和响应式设计。</p>
            </div>
            <div class="skill-card stagger-item">
              <h3>UI/UX设计</h3>
              <p>具有优秀的设计感和用户体验理解能力，能够创造既美观又实用的界面。</p>
            </div>
            <div class="skill-card stagger-item">
              <h3>后端开发</h3>
              <p>熟悉Node.js, Express, MongoDB等后端技术，能够构建完整的全栈应用。</p>
            </div>
          </div>
        </section>
        
        <section class="about-values scroll-animate fade-up">
          <h2>我的价值观</h2>
          <div class="values-grid stagger-parent">
            <div class="value-card stagger-item">
              <h3>持续学习</h3>
              <p>我坚信学习是终身的旅程，始终保持对新技术和新方法的好奇心。</p>
            </div>
            <div class="value-card stagger-item">
              <h3>质量至上</h3>
              <p>在每个项目中追求卓越，关注细节，确保交付高质量的成果。</p>
            </div>
            <div class="value-card stagger-item">
              <h3>用户为中心</h3>
              <p>将用户需求和体验置于设计和开发过程的核心，创造真正有价值的产品。</p>
            </div>
          </div>
        </section>
        
        <section class="about-contact scroll-animate fade-up delay-3">
          <h2>与我联系</h2>
          <p>如果您有任何问题或合作意向，欢迎随时联系我。</p>
          <router-link to="/contact" class="contact-btn">联系我</router-link>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/index.scss' as *;

.about-page {
  color: #fff;
  background-color: #000;

  .hero {
    padding: 8rem 0 4rem;
    
    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
    
    .about-header {
      text-align: center;
      margin-bottom: 5rem;
      
      h1 {
        @include fancy-text;
        font-size: 3.5rem;
        margin-bottom: 1rem;
      }
      
      .subtitle {
        font-size: 1.2rem;
        opacity: 0.8;
      }
    }
  }
  
  // 共享的部分样式
  section {
    margin-bottom: 6rem;
    
    h2 {
      font-size: 2.2rem;
      margin-bottom: 2rem;
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 60px;
        height: 4px;
        background: linear-gradient(90deg, #007cf0, #00dfd8);
      }
    }
  }
  
  // 故事部分
  .about-story {
    .content-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
      
      .text-content {
        p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-size: 1.1rem;
        }
      }
      
      .image-content {
        .image-placeholder {
          width: 100%;
          height: 400px;
          background: linear-gradient(45deg, #222, #333);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(0,124,240,0.1), rgba(0,223,216,0.1));
          }
        }
      }
    }
  }
  
  // 技能部分
  .about-skills {
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      
      .skill-card {
        background: rgba(255,255,255,0.05);
        padding: 2rem;
        border-radius: 12px;
        transition: transform 0.3s ease, background 0.3s ease;
        
        &:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.08);
        }
        
        h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          color: #00dfd8;
        }
        
        p {
          line-height: 1.6;
          opacity: 0.9;
        }
      }
    }
  }
  
  // 价值观部分
  .about-values {
    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      
      .value-card {
        background: rgba(255,255,255,0.05);
        padding: 2rem;
        border-radius: 12px;
        transition: transform 0.3s ease;
        border-left: 4px solid #007cf0;
        
        &:hover {
          transform: translateY(-5px);
        }
        
        h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          color: #007cf0;
        }
        
        p {
          line-height: 1.6;
          opacity: 0.9;
        }
      }
    }
  }
  
  // 联系部分
  .about-contact {
    text-align: center;
    padding: 3rem 0;
    
    p {
      margin-bottom: 2rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
    }
    
    .contact-btn {
      display: inline-block;
      padding: 0.8rem 2rem;
      background: linear-gradient(90deg, #007cf0, #00dfd8);
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 600;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 7px 20px rgba(0, 124, 240, 0.3);
      }
    }
  }
}
</style>
