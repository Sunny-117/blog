/**
 * 仓库持久化函数处理
 * @param key 存储到持久化的name
 * @param path 需要持久化的state name
 * @returns 
 */
const piniaPersistConfig = (key: string, paths?: string[]) => { 
  const persist = {
    key,
    storage: localStorage,
    paths
  }
  return persist;
}

export default piniaPersistConfig;