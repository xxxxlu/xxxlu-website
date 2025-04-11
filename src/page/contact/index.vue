<script setup lang="ts">
import { ref } from 'vue'

// 表单数据
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// 表单提交
const handleSubmit = () => {
  console.log('表单提交', form.value)
  // 在这里添加表单提交逻辑
  alert('感谢您的留言！我会尽快回复。')
  // 重置表单
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>

<template>
  <div class="contact-page">
    <section class="section hero">
      <div class="container">
        <h1 class="hero-title">联系我</h1>
        <p class="lead">与我取得联系，了解更多信息或合作机会</p>
      </div>
    </section>

    <section class="section contact-content">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>联系方式</h2>
            <div class="contact-methods">
              <div class="contact-item">
                <div class="contact-icon">📧</div>
                <div class="contact-detail">
                  <h3>邮箱</h3>
                  <p><a href="mailto:your.email@example.com">your.email@example.com</a></p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-icon">📱</div>
                <div class="contact-detail">
                  <h3>电话</h3>
                  <p>+86 138 0000 0000</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">🔗</div>
                <div class="contact-detail">
                  <h3>社交媒体</h3>
                  <p>
                    <a href="https://github.com/yourusername" target="_blank">GitHub</a> |
                    <a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contact-info scroll-animate fade-right">
            <h2 class="scroll-animate fade-up">发送消息</h2>
            <form @submit.prevent="handleSubmit" class="scroll-animate fade-up delay-1">
              <div class="form-group stagger-parent">
                <div class="form-field stagger-item">
                  <label for="name">姓名</label>
                  <input type="text" id="name" v-model="form.name" required>
                </div>
              
                <div class="form-field stagger-item">
                  <label for="email">邮箱</label>
                  <input type="email" id="email" v-model="form.email" required>
                </div>
              
                <div class="form-field stagger-item">
                  <label for="subject">主题</label>
                  <input type="text" id="subject" v-model="form.subject" required>
                </div>
              
                <div class="form-field stagger-item">
                  <label for="message">消息</label>
                  <textarea id="message" v-model="form.message" rows="5" required></textarea>
                </div>
              </div>
              
              <button type="submit" class="btn btn-primary scroll-animate fade-up delay-5">发送消息</button>
            </form>
          </div>
          
          <div class="contact-info scroll-animate fade-right">
            <h2>联系方式</h2>
            <div class="info-items stagger-parent">
              <div class="info-item stagger-item">
                <strong>邮箱:</strong>
                <p><a href="mailto:your.email@example.com">your.email@example.com</a></p>
              </div>
              
              <div class="info-item stagger-item">
                <strong>社交媒体:</strong>
                <div class="social-links">
                  <a href="https://github.com/yourusername" target="_blank">GitHub</a> |
                  <a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a>
                </div>
              </div>
              
              <div class="info-item stagger-item">
                <strong>位置:</strong>
                <p>中国，上海</p>
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

.contact-page {
  color: #fff;
  background-color: #000;

  .hero {
    padding: 8rem 0 4rem;
    text-align: center;
    
    .hero-title {
      @include fancy-text;
    }
  }
  
  .contact-content {
    padding: 4rem 0;
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      
      @include responsive(mobile) {
        grid-template-columns: 1fr;
      }
    }
    
    h2 {
      margin-bottom: 2rem;
      position: relative;
      
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
    
    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .contact-item {
      display: flex;
      align-items: flex-start;
      
      .contact-icon {
        font-size: 2rem;
        margin-right: 1rem;
      }
      
      .contact-detail {
        h3 {
          margin-bottom: 0.5rem;
          font-size: 1.2rem;
        }
        
        a {
          color: rgba(0, 223, 216, 1);
          transition: color 0.3s;
          
          &:hover {
            color: rgba(0, 124, 240, 1);
          }
        }
      }
    }
    
    .contact-form {
      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        
        label {
          font-weight: 500;
        }
        
        input, textarea {
          padding: 0.75rem;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: #fff;
          font-family: inherit;
          
          &:focus {
            outline: none;
            border-color: rgba(0, 124, 240, 0.5);
          }
        }
      }
      
      button {
        align-self: flex-start;
        margin-top: 1rem;
      }
    }
  }
}
</style>
