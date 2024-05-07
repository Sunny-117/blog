export interface GlobalState { 
  isDark: boolean;
  osThemeActive: boolean;
}

export type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T]