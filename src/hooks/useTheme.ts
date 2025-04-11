import { ref, watchEffect } from 'vue';
import { setLanguage, getDefaultCountry } from '@/i18n';

// 国家代码类型
export type CountryCode = 'us' | 'uk' | 'cn' | 'kr' | 'fr';

// 国家代码到语言代码的映射
const countryToLocale: Record<CountryCode, string> = {
  us: 'en-US',
  uk: 'en-GB',
  cn: 'zh-CN',
  kr: 'ko-KR',
  fr: 'fr-FR'
};

// 根据国家代码获取对应的语言代码
const getLocaleFromCountry = (countryCode: CountryCode): string => {
  return countryToLocale[countryCode] || 'en-US';
};

// 国家主题颜色配置
interface ThemeColors {
  primaryColor: string;
  primaryColorLight: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  textColorMuted: string;
  backgroundColor: string;
  backgroundColorLight: string;
}

// 国家名称映射表
export const countryNames: Record<CountryCode, string> = {
  us: '美国',
  uk: '英国',
  cn: '中国',
  kr: '韩国',
  fr: '法国'
};

// 国家图标映射表 (使用国旗emoji)
export const countryFlags: Record<CountryCode, string> = {
  us: '🇺🇸',
  uk: '🇬🇧',
  cn: '🇨🇳',
  kr: '🇰🇷',
  fr: '🇫🇷'
};

// 不同国家的主题色配置
const countryThemes: Record<CountryCode, ThemeColors> = {
  // 美国主题 (蓝红为主)
  us: {
    primaryColor: '#3a86ff',
    primaryColorLight: '#8ecae6',
    secondaryColor: '#e63946',
    accentColor: '#f1faee',
    textColor: '#1d3557',
    textColorMuted: '#457b9d',
    backgroundColor: '#f8f9fa',
    backgroundColorLight: '#ffffff'
  },
  // 英国主题 (蓝红白为主)
  uk: {
    primaryColor: '#003a8c',
    primaryColorLight: '#005b96',
    secondaryColor: '#cf142b',
    accentColor: '#f5f5f5',
    textColor: '#221e22',
    textColorMuted: '#6e6e6e',
    backgroundColor: '#f5f5f5',
    backgroundColorLight: '#ffffff'
  },
  // 中国主题 (红黄为主)
  cn: {
    primaryColor: '#de2910',
    primaryColorLight: '#ff7875',
    secondaryColor: '#ffdc00',
    accentColor: '#fffbe6',
    textColor: '#262626',
    textColorMuted: '#595959',
    backgroundColor: '#f7f7f7',
    backgroundColorLight: '#ffffff'
  },
  // 韩国主题 (蓝红黑白为主)
  kr: {
    primaryColor: '#003478',
    primaryColorLight: '#4e6e99',
    secondaryColor: '#c5283d',
    accentColor: '#f5f5f5',
    textColor: '#1f1f1f',
    textColorMuted: '#5a5a5a',
    backgroundColor: '#f8f9fa',
    backgroundColorLight: '#ffffff'
  },
  // 法国主题 (蓝白红为主)
  fr: {
    primaryColor: '#002395',
    primaryColorLight: '#3457D5',
    secondaryColor: '#ed2939',
    accentColor: '#f5f5f5',
    textColor: '#1a1a1a',
    textColorMuted: '#666666',
    backgroundColor: '#f9f9f9',
    backgroundColorLight: '#ffffff'
  }
};

// 获取默认国家代码（先使用本地存储，如果没有则根据浏览器语言决定）
const getThemeDefaultCountry = (): CountryCode => {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    // 在SSR环境下默认使用中国主题
    return 'cn';
  }
  
  try {
    // 先检查是否有已保存的国家选择
    const savedCountry = localStorage.getItem('country') as CountryCode;
    if (savedCountry && Object.keys(countryNames).includes(savedCountry)) {
      return savedCountry;
    }
    
    // 如果没有已保存的国家，使用浏览器语言决定
    const browserCountry = getDefaultCountry();
    
    // 将国家名称映射到国家代码
    switch (browserCountry) {
      case 'USA': return 'us';
      case 'UK': return 'uk';
      case 'China': return 'cn';
      case 'Korea': return 'kr';
      case 'France': return 'fr';
      default: return 'cn'; // 默认使用中国主题
    }
  } catch (e) {
    console.warn('Unable to determine default country:', e);
    return 'cn';
  }
};

/**
 * 主题钩子函数，用于管理和切换不同国家的主题
 */
export default function useTheme() {
  // 当前选中的国家代码
  const currentCountry = ref<CountryCode>(getThemeDefaultCountry());

  // 辅助函数：将HEX颜色转换为RGB格式的三个数字，便于rgba()使用
  const hexToRgb = (hex: string): string => {
    // 去掉可能的#前缀
    const cleanHex = hex.replace('#', '');
    
    // 处理简写的3位hex值 (如 #f00 -> #ff0000)
    const fullHex = cleanHex.length === 3 
      ? cleanHex.split('').map(char => char + char).join('') 
      : cleanHex;
    
    // 转换为RGB值
    const r = parseInt(fullHex.substr(0, 2), 16);
    const g = parseInt(fullHex.substr(2, 2), 16);
    const b = parseInt(fullHex.substr(4, 2), 16);
    
    return `${r}, ${g}, ${b}`;
  };
  
  // 应用主题到CSS变量
  const applyTheme = (countryCode: CountryCode) => {
    const theme = countryThemes[countryCode];
    if (!theme) return;

    // 将主题颜色应用到CSS变量
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
    document.documentElement.style.setProperty('--primary-color-light', theme.primaryColorLight);
    document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', theme.accentColor);
    document.documentElement.style.setProperty('--text-color', theme.textColor);
    document.documentElement.style.setProperty('--text-color-muted', theme.textColorMuted);
    document.documentElement.style.setProperty('--bg-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--bg-color-light', theme.backgroundColorLight);
    
    // 添加RGB格式的颜色变量，用于rgba()透明效果
    document.documentElement.style.setProperty('--primary-rgb', hexToRgb(theme.primaryColor));
    document.documentElement.style.setProperty('--primary-light-rgb', hexToRgb(theme.primaryColorLight));
    document.documentElement.style.setProperty('--secondary-rgb', hexToRgb(theme.secondaryColor));
    document.documentElement.style.setProperty('--text-rgb', hexToRgb(theme.textColor));
    document.documentElement.style.setProperty('--text-muted-rgb', hexToRgb(theme.textColorMuted));
    document.documentElement.style.setProperty('--bg-rgb', hexToRgb(theme.backgroundColor));
    document.documentElement.style.setProperty('--bg-light-rgb', hexToRgb(theme.backgroundColorLight));

    // 保存选择到本地存储
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('country', countryCode);
        
        // 设置对应的语言
        const locale = getLocaleFromCountry(countryCode);
        setLanguage(locale);
        localStorage.setItem('locale', locale);
      } catch (e) {
        console.warn('Unable to access localStorage:', e);
      }
    } else {
      // 在没有localStorage的情况下也要设置语言
      const locale = getLocaleFromCountry(countryCode);
      setLanguage(locale);
    }
  };

  // 切换国家主题
  const changeCountry = (countryCode: CountryCode) => {
    currentCountry.value = countryCode;
  };

  // 监听当前国家变化，应用对应主题
  watchEffect(() => {
    if (typeof window !== 'undefined') {
      applyTheme(currentCountry.value);
    }
  });

  return {
    currentCountry,
    changeCountry,
    countryThemes,
    countryNames,
    countryFlags
  };
}
