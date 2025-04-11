// 滚动动画工具类

// 扩展Window接口，添加scrollTimer属性
declare global {
  interface Window {
    scrollTimer: number;
  }
}

// 定义动画控制器接口
export interface AnimationController {
  disconnect: () => void;
}

/**
 * 初始化滚动动画效果
 * 监听元素的可见性，添加和删除对应的CSS类
 */
export function initScrollAnimations(): AnimationController {
  if (typeof window === 'undefined') return {
    disconnect: () => {}
  };
  
  // 跟踪上一次滚动位置，用于确定滚动方向
  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollDirection = 'down'; // 默认向下滚动
  // 监听滚动事件
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    scrollDirection = st > lastScrollTop ? 'down' : 'up';
    lastScrollTop = st <= 0 ? 0 : st; // 处理iOS反弹效果
    
    // 更新观察到的元素的状态
    updateAnimations();
    
    // 设置防抖，滚动停止后再次检查
    clearTimeout(window.scrollTimer);
    window.scrollTimer = setTimeout(() => {
      updateAnimations();
    }, 100) as unknown as number;
  }, { passive: true });
  
  // 存储观察到的元素
  const observedElements: Set<Element> = new Set();
  
  // 更新所有观察元素的动画状态
  function updateAnimations() {
    observedElements.forEach(element => {
      const el = element as HTMLElement;
      const rect = el.getBoundingClientRect();
      const isVisible = (
        rect.top < window.innerHeight && 
        rect.bottom > 0
      );
      
      // 元素可见
      if (isVisible) {
        // 根据滚动方向添加适当的动画类
        if (scrollDirection === 'down') {
          if (!el.classList.contains('scroll-animate-in')) {
            el.classList.remove('scroll-animate-out');
            el.classList.add('scroll-animate-in');
          }
        }
      } 
      // 元素不可见
      else {
        // 向上滚动时添加淡出动画
        if (scrollDirection === 'up' && el.classList.contains('scroll-animate-in')) {
          el.classList.remove('scroll-animate-in');
          el.classList.add('scroll-animate-out');
        }
      }
    });
  }
  
  // 使用IntersectionObserver进行初始检测
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      
      // 将元素添加到观察集合
      if (!observedElements.has(el)) {
        observedElements.add(el);
      }
      
      // 初始状态处理
      if (entry.isIntersecting) {
        if (scrollDirection === 'down') {
          el.classList.add('scroll-animate-in');
          el.classList.remove('scroll-animate-out', 'scroll-animate-initial');
        }
      } else {
        // 确保初始状态
        if (!el.classList.contains('scroll-animate-in') && 
            !el.classList.contains('scroll-animate-out')) {
          el.classList.add('scroll-animate-initial');
        }
      }
    });
  }, { 
    threshold: 0.1, // 当元素10%可见时触发
    rootMargin: '0px 0px -10% 0px' // 稍微提前触发
  });
  
  // 监视所有带有scroll-animate类的元素
  document.querySelectorAll('.scroll-animate').forEach(el => {
    // 默认将所有元素设置为隐藏状态
    el.classList.add('scroll-animate-initial');
    observer.observe(el);
    observedElements.add(el); // 添加到观察集合
  });
  
  // 初始化时立即执行一次检查
  setTimeout(updateAnimations, 100);
  
  return {
    disconnect: () => {
      observer.disconnect();
      observedElements.clear();
      window.removeEventListener('scroll', updateAnimations);
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
  
  // 存储已处理的父元素
  const processedParents = new Set<Element>();
  
  // 清除子元素上的动画类并重置
  function resetChildrenAnimation(parent: Element) {
    const children = parent.querySelectorAll(childrenSelector);
    children.forEach(child => {
      child.classList.remove('stagger-animate-in');
      child.classList.add('stagger-animate-initial');
    });
  }
  
  // 为子元素应用错开动画
  function applyStaggerAnimation(parent: Element) {
    const children = parent.querySelectorAll(childrenSelector);
    children.forEach((child, index) => {
      // 延迟添加出现动画类
      setTimeout(() => {
        child.classList.add('stagger-animate-in');
      }, index * delay);
    });
  }
  
  // 监听元素的可见性
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const parent = entry.target;
      
      // 如果元素可见
      if (entry.isIntersecting) {
        // 添加到已处理集合
        processedParents.add(parent);
        // 应用错开动画
        applyStaggerAnimation(parent);
      } 
      // 元素不可见
      else {
        // 只有之前处理过的元素才需要重置
        if (processedParents.has(parent)) {
          resetChildrenAnimation(parent);
        }
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  });
  
  // 初始化所有子元素
  document.querySelectorAll(selector).forEach(parent => {
    // 设置子元素的初始状态
    const children = parent.querySelectorAll(childrenSelector);
    children.forEach(child => {
      child.classList.add('stagger-animate-initial');
    });
    
    // 开始观察父元素
    observer.observe(parent);
  });
  
  return {
    disconnect: () => {
      observer.disconnect();
      processedParents.clear();
    }
  };
}
