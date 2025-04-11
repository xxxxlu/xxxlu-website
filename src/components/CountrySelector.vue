<template>
  <div class="country-selector">
    <div class="selected-country" @click="toggleDropdown">
      <span class="country-flag">{{ countryFlags[currentCountry] }}</span>
      <span class="country-name">{{ countryNames[currentCountry] }}</span>
      <span class="dropdown-arrow" :class="{ 'open': isOpen }">▼</span>
    </div>

    <div class="country-dropdown" v-if="isOpen">
      <div 
        v-for="(name, code) in countryNames" 
        :key="code" 
        class="country-option"
        :class="{ 'active': currentCountry === code }"
        @click="selectCountry(code)"
      >
        <span class="country-flag">{{ countryFlags[code] }}</span>
        <span class="country-name">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import useTheme, { CountryCode, countryFlags, countryNames } from '@/hooks/useTheme';

const { currentCountry, changeCountry } = useTheme();
const isOpen = ref(false);

// 切换下拉菜单
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// 选择国家
const selectCountry = (code: CountryCode) => {
  changeCountry(code);
  isOpen.value = false;
};

// 点击外部关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  const element = event.target as HTMLElement;
  const selector = document.querySelector('.country-selector');
  if (selector && !selector.contains(element)) {
    isOpen.value = false;
  }
};

// 监听点击事件
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

// 清理事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
.country-selector {
  position: relative;
  font-size: 0.9rem;
  user-select: none;
}

.selected-country {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 4px;
  gap: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .country-flag {
    font-size: 1.2rem; 
  }

  .dropdown-arrow {
    font-size: 0.6rem;
    margin-left: 4px;
    transition: transform 0.2s;

    &.open {
      transform: rotate(180deg);
    }
  }
}

.country-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: var(--bg-color-light);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 130px;
  z-index: 100;
  overflow: hidden;
}

.country-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: var(--primary-color);
    color: white;
  }

  .country-flag {
    font-size: 1.2rem;
  }
}
</style>
