import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 404页面
const notFound = () => import("@/pages/notFound");
// 首页
const index = () => import("@/pages/index/index");
const routes = [
  {
    path: "/",
    name: "home",
    component: index,
    meta: {
      title: "主页"
    }
  },
  {
    path: "*",
    name: "404",
    component: notFound,
    meta: {
      title: "404 NOT FOUND"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  // const rights = window.localStorage.getItem('username')
  //   ? window.localStorage.getItem('username')
  //   : ''
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
export default router;
