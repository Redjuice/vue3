/**
 * @author chuzhixin 1204505056@qq.com
 * @description 路由守卫，目前两种模式：all模式与intelligence模式
 */
import router from '@/router'
import store from '@/store'
import getPageTitle from '@/utils/pageTitle'
import {
  authentication,
  loginInterception,
  // recordRoute,
  routesWhiteList,
} from '@/config'

router.beforeEach(async (to, from, next) => {
  // 从缓存中获取accessToken
  let hasToken = store.getters['user/accessToken']

  // 是否开启登录拦截
  if (!loginInterception) hasToken = true
  // 如果有accessToken
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // console.log(store.getters['acl/role'])
      // console.log(store.getters['acl/ability'])
      const hasRoles =
        store.getters['acl/admin'] ||
        store.getters['acl/role'].length ||
        store.getters['acl/ability'].length
      if (hasRoles) {
        next()
      } else {
        try {
          // 是否开启登录拦截
          if (loginInterception) {
            // 获取用户信息
            await store.dispatch('user/getUserInfo')
          } else {
            // loginInterception为false（关闭登录拦截时）时，创建虚拟角色
            await store.dispatch('user/setVirtualRoles')
          }

          let accessRoutes = []
          // intelligence（前端导出路由）和all（后端导出路由）两种方式
          if (authentication === 'intelligence') {
            accessRoutes = await store.dispatch('routes/setRoutes')
          } else if (authentication === 'all') {
            accessRoutes = await store.dispatch('routes/setAllRoutes')
          }
          // 动态添加路由
          accessRoutes.forEach((item) => {
            router.addRoute(item)
          })
          next({ ...to, replace: true })
        } catch {
          await store.dispatch('user/resetAll')
          // if (recordRoute)
          //   next({
          //     path: '/login',
          //     query: { redirect: to.path },
          //     replace: true,
          //   })
          // else next({ path: '/login', replace: true })
          next({ path: '/login', replace: true })
        }
      }
    }
  } else {
    // 当前路由是否在 不经过token校验的路由 中
    if (routesWhiteList.includes(to.path)) {
      next()
    } else {
      // if (recordRoute)
      //   next({ path: '/login', query: { redirect: to.path }, replace: true })
      // else next({ path: '/login', replace: true })
      // 去登录页
      next({ path: '/login', replace: true })
    }
  }
})
router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title)
})
