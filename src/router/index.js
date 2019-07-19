import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import routes from './routes';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.fullPath === '/') {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
    return;
  }

  if (to.matched.some(r => r.meta.requireAuth)) {  // 判断该路由是否需要登录权限
    if (store.state.auth.currentUser && store.state.auth.currentUser.token) {  // 通过vuex state获取当前的token是否存在
        next();
    } else {
        next({
            path: '/login',
            query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
  } else {
      next();
  }
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              if (routeFrom.name === args[0].name) {
                NProgress.done();
              }

              next(...args);
              reject(new Error('Redirected'));
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  } catch (error) {
    return;
  }

  next();
});

// When each route is finished evaluating...
router.afterEach((routeTo, routeFrom) => {
  NProgress.done();
});

export default router;