/**
 * DOM 操作相关工具函数
 */

/**
 * 检查当前是否在首页
 */
export function isHomePage(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname === '/' || 
         window.location.pathname === '/index.html' || 
         window.location.pathname === '';
}

/**
 * 平滑滚动到指定元素
 * @param elementId 目标元素ID
 * @param offset 偏移量（像素）
 */
export function scrollToElement(elementId: string, offset: number = 0): void {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
  window.scrollTo({top: y, behavior: 'smooth'});
}

/**
 * 为所有元素应用特定类名
 * @param selector CSS选择器
 * @param className 要应用的类名
 * @param removeClasses 要移除的类名数组
 */
export function applyClassToElements(
  selector: string, 
  className: string, 
  removeClasses: string[] = []
): void {
  const elements = document.querySelectorAll(selector);
  elements.forEach(el => {
    if (removeClasses.length > 0) {
      el.classList.remove(...removeClasses);
    }
    el.classList.add(className);
  });
}

/**
 * 锁定或解锁页面滚动
 * @param lock 是否锁定
 */
export function toggleScrollLock(lock: boolean): void {
  if (lock) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = getScrollbarWidth() + 'px';
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

/**
 * 获取滚动条宽度
 */
function getScrollbarWidth(): number {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);
  
  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode?.removeChild(outer);
  
  return scrollbarWidth;
}
