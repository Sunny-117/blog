import { defineStore } from 'pinia';
import { GlobalState, ObjToKeyValArray } from "@/stores/interface"
import piniaPersistConfig from "@/config/piniaPersist"

export const useGlobalStore = defineStore({
  id: 'dy-global',
  state: ():GlobalState => ({ 
    //是否是深色主题模式
    isDark: false,
    //跟随系统颜色主题是否被激活
    osThemeActive:false
  }),
  actions: {
    //设置state的值
    setGlobalState(...args:ObjToKeyValArray<GlobalState>) { 
      this.$patch({[args[0]]:args[1]})
    }
  },
  persist:piniaPersistConfig("dy-global")
});
