<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <router-link to="/">Your Logo</router-link>
        </div>
        <div class="footer-links">
          <div class="footer-links-group">
            <h3>{{ $t('nav.navigation', 'Navigation') }}</h3>
            <router-link to="/">{{ $t('nav.home') }}</router-link>
            <router-link to="/about">{{ $t('nav.about') }}</router-link>
            <router-link to="/projects">{{ $t('nav.projects') }}</router-link>
            <router-link to="/contact">{{ $t('nav.contact') }}</router-link>
          </div>
          <div class="footer-links-group">
            <h3>{{ $t('nav.social', 'Social') }}</h3>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
          <div class="footer-links-group">
            <h3>{{ $t('nav.contact') }}</h3>
            <a href="mailto:contact@example.com">contact@example.com</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} {{ $t('nav.copyright', 'All Rights Reserved') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 无需额外的逻辑
</script>

<style lang="scss" scoped>
.footer {
  background-color: #111;
  color: rgba(255, 255, 255, 0.8);
  padding: 3rem 0 1.5rem;
  
  a {
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.3s;
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 2rem;
    }
  }
  
  .footer-logo {
    flex: 0 0 25%;
    
    a {
      font-size: 1.5rem;
      font-weight: 700;
      background-image: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  .footer-links {
    flex: 0 0 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1.5rem;
    }
  }
  
  .footer-links-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #fff;
    }
  }
  
  .footer-bottom {
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
