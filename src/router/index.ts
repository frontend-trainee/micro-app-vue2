import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

Vue.use(VueRouter);

const prefix = (window as any).__POWERED_BY_QIANKUN__
  ? process.env.VUE_APP_MICRO_ROUTER
  : '';

const routes: Array<RouteConfig> = [
  {
    path: prefix + '/',
    name: 'Home',
    component: Home,
  },
  {
    path: prefix + '/about',
    name: 'About',
    component: About,
  },
];

const router = new VueRouter({
  routes,
});

// 判断 qiankun 环境则进行路由拦截，判断跳转路由是否有 /micro 开头前缀，没有则加上
if ((window as any).__POWERED_BY_QIANKUN__) {
  router.beforeEach((to, from, next) => {
    if (!to.path.includes(prefix)) {
      next({
        path: prefix + to.path,
      });
    } else {
      next();
    }
  });
}

export default router;
