/**
 * 动画相关工具函数
 */
import { isHomePage } from './domUtils';

// 定义动画控制器接口
export interface AnimationController {
  disconnect: () => void;
}

/**
 * 显示所有动画元素，不使用滚动触发
 * 适用于非首页
 */
function showAllElements(): void {
  // 所有滚动动画元素立即可见
  document.querySelectorAll('.scroll-animate').forEach(el => {
    el.classList.remove('scroll-animate-initial', 'scroll-animate-out');
    el.classList.add('scroll-animate-in');
  });
  
  // 所有错开动画元素立即可见
  document.querySelectorAll('.stagger-parent .stagger-item').forEach(el => {
    el.classList.remove('stagger-animate-initial');
    el.classList.add('stagger-animate-in');
  });
  
  // 兼容旧的动画类
  document.querySelectorAll('.reveal-section').forEach(el => {
    el.classList.remove('scroll-animate-initial', 'scroll-animate-out');
    el.classList.add('scroll-animate-in');
  });
}

/**
 * 初始化滚动动画效果
 * 注意：非首页不使用滚动动画，直接显示元素
 */
export function initScrollAnimations(): AnimationController {
  if (typeof window === 'undefined') return {
    disconnect: () => {}
  };
  
  // 非首页直接显示所有元素，不使用滚动动画
  if (!isHomePage()) {
    showAllElements();
    return {
      disconnect: () => {}
    };
  }
  
  // 以下代码只在首页执行
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      
      if (entry.isIntersecting) {
        el.classList.add('scroll-animate-in');
        el.classList.remove('scroll-animate-initial');
      } else if (!el.classList.contains('scroll-animate-in')) {
        el.classList.add('scroll-animate-initial');
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });
  
  // 监听所有滚动动画元素
  document.querySelectorAll('.scroll-animate').forEach(el => {
    el.classList.add('scroll-animate-initial');
    observer.observe(el);
  });
  
  // 兼容旧的动画类
  document.querySelectorAll('.reveal-section:not(.scroll-animate)').forEach(el => {
    el.classList.add('scroll-animate');
    el.classList.add('scroll-animate-initial');
    observer.observe(el);
  });
  
  return {
    disconnect: () => {
      observer.disconnect();
    }
  };
}

/**
 * 初始化渐进式出现动画，每个子元素依次出现
 * @param selector 父元素选择器
 * @param childrenSelector 子元素选择器
 * @param delay 子元素之间的延迟（毫秒）
 */
export function initStaggerAnimation(
  selector: string, 
  childrenSelector: string, 
  delay: number = 100
): AnimationController {
  if (typeof window === 'undefined') return {
    disconnect: () => {}
  };
  
  // 非首页简化处理：立即显示所有元素
  if (!isHomePage()) {
    document.querySelectorAll(`${selector} ${childrenSelector}`).forEach(child => {
      child.classList.remove('stagger-animate-initial');
      child.classList.add('stagger-animate-in');
    });
    
    return {
      disconnect: () => {}
    };
  }
  
  // 首页使用简化版的错开动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target;
        const children = parent.querySelectorAll(childrenSelector);
        
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.remove('stagger-animate-initial');
            child.classList.add('stagger-animate-in');
          }, index * delay);
        });
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  });
  
  // 初始化所有父元素
  document.querySelectorAll(selector).forEach(parent => {
    // 设置子元素的初始状态
    parent.querySelectorAll(childrenSelector).forEach(child => {
      child.classList.add('stagger-animate-initial');
    });
    
    // 开始观察父元素
    observer.observe(parent);
  });
  
  return {
    disconnect: () => {
      observer.disconnect();
    }
  };
}
