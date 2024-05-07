import { useGlobalStore } from "@/stores/modules/global";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";

const media = window.matchMedia("(prefers-color-scheme: dark)");

export const useTheme = () => { 
  const globalStore = useGlobalStore()
  const { isDark,osThemeActive } = storeToRefs(globalStore)

  const switchTheme = (init?: Boolean) => {
    //init参数为true时，表示初始化页面或者直接跟随系统主题
    //这个时候不需要手动切换明暗主题，也不需要将跟随系统主题设置为false
    if (!init) { 
      globalStore.setGlobalState("isDark", !isDark.value)
      globalStore.setGlobalState("osThemeActive", false)
    }
    
    const html = document.documentElement as HTMLElement;
    if (isDark.value) html.setAttribute('class', 'dark');
    else html.setAttribute('class', 'primary');
  }

  //跟随系统主题
  const followSystem = () => { 
    const isOSDark = media.matches;
    //跟随系统明暗主题
    globalStore.setGlobalState("isDark", isOSDark)
    switchTheme(true);
  }

  const activeOSTheme = () => { 
    globalStore.setGlobalState("osThemeActive", !osThemeActive.value);
    followSystem();
  }

  watchEffect(() => { 
    if (osThemeActive.value) {
      media.addEventListener("change", followSystem);
    }
    else { 
      media.removeEventListener("change", followSystem);
    }
  });

  const initTheme = () => { 
    switchTheme(true)
  }

  return {
    switchTheme,
    initTheme,
    activeOSTheme
  }
}