import type { RouteRecordRaw } from 'vue-router'

export const getLocalRoutes = () => {
  // 动态获取所有的路由对象, 放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []
  // import.meta.glob()导入所有router/main下的ts文件
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  // 将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

//  通过路由映射菜单
export const mapMenusToRoutes = (userMenus: any[]) => {
  // 1.加载本地路由
  const localRoutes = getLocalRoutes()
  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) routes.push(route)
    }
  }
  return routes
}
