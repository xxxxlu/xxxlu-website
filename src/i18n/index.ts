import { createI18n } from 'vue-i18n';
import enUS from './locales/en-US';
import enGB from './locales/en-GB';
import zhCN from './locales/zh-CN';
import koKR from './locales/ko-KR';
import frFR from './locales/fr-FR';

// 国家代码映射到语言代码
export const countryToLocale = {
  'USA': 'en-US',
  'UK': 'en-GB', 
  'China': 'zh-CN',
  'Korea': 'ko-KR',
  'France': 'fr-FR'
};

// 语言代码映射到国家
export const localeToCountry = {
  'en-US': 'USA',
  'en-GB': 'UK',
  'zh-CN': 'China',
  'ko-KR': 'Korea',
  'fr-FR': 'France'
};

// 支持的语言代码类型
export type SupportedLocale = 'en-US' | 'en-GB' | 'zh-CN' | 'ko-KR' | 'fr-FR';

// 根据语言代码获取国家名称
export function getCountryFromLocale(locale: string): string {
  return localeToCountry[locale as keyof typeof localeToCountry] || 'USA';
}

// 根据国家获取语言代码
export function getLocaleFromCountry(country: string): string {
  return countryToLocale[country as keyof typeof countryToLocale] || 'en-US';
}

// 创建i18n实例
export const i18n = createI18n({
  legacy: true, // 使用传统模式，可全局访问$t
  globalInjection: true, // 全局注入$t等函数
  locale: 'en-US', // 默认语言
  fallbackLocale: 'en-US', // 回退语言
  messages: {
    'en-US': enUS,
    'en-GB': enGB,
    'zh-CN': zhCN,
    'ko-KR': koKR,
    'fr-FR': frFR
  }
});

// 切换语言
export function setLanguage(locale: string) {
  const typedLocale = Object.keys(i18n.global.messages.value).includes(locale) 
    ? locale as SupportedLocale 
    : 'en-US' as SupportedLocale;
    
  i18n.global.locale.value = typedLocale;
  
  // 检查是否在浏览器环境
  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', locale);
  }
}

// 根据浏览器语言获取默认语言
export function getDefaultLocale(): SupportedLocale {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'en-US';
  }
  
  try {
    // 获取浏览器首选语言
    const browserLang = navigator.language || 'en-US';
    
    // 检查是否支持浏览器语言
    for (const supportedLang of Object.keys(i18n.global.messages.value)) {
      // 检查完全匹配或语言代码匹配(如zh-CN和zh)
      if (browserLang === supportedLang || browserLang.split('-')[0] === supportedLang.split('-')[0]) {
        return supportedLang as SupportedLocale;
      }
    }
    
    // 如果没有匹配返回默认语言
    return 'en-US';
  } catch (e) {
    console.warn('Error determining browser language:', e);
    return 'en-US';
  }
}

// 根据浏览器语言获取默认国家
export function getDefaultCountry(): string {
  const locale = getDefaultLocale();
  return getCountryFromLocale(locale);
}

// 设置初始语言
export function setupI18n() {
  let locale: SupportedLocale;
  
  // 检查是否在浏览器环境
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      // 先使用存储的语言，如果没有则使用浏览器语言
      const savedLocale = localStorage.getItem('locale');
      
      if (savedLocale && Object.keys(i18n.global.messages.value).includes(savedLocale)) {
        locale = savedLocale as SupportedLocale;
      } else {
        // 使用浏览器首选语言
        locale = getDefaultLocale();
      }
    } catch (e) {
      console.warn('Error accessing browser storage or language:', e);
      locale = getDefaultLocale();
    }
  } else {
    locale = 'en-US';
  }
  
  setLanguage(locale);
  return i18n;
}

export default i18n;
