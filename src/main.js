import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/styles/base.css"
import "./assets/styles/el-reset.css"

Vue.config.productionTip = false;

Vue.use(ElementUI);

// // 按需引入
// import { Carousel,CarouselItem } from "element-ui"
// // 注册到全局
// Vue.component("el-carousel",Carousel)
// Vue.component("el-carousel-item",CarouselItem)

// 路由前置钩子(导航守卫)
/**
 * @param to 去哪里
 * @param from 从哪里来
 * @param next 放行，可以继续运行
 */
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  //用户登录之后有没有token
  let token = localStorage.getItem("sys_token")
  if (token) {
    // 如果已经登录，直接跳转
    next();
  } else {
    // 没有token
    if (to.path === "/login") {
      // 是登陆，直接跳转放行
      next();
    } else {// 如果不是，直接跳转到登录页
      next({ path: "/login" })
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
