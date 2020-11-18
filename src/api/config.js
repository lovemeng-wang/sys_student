import axios from "axios"

// 导入router对象
import router from "../router"

// 导入element-ui
import ElementUi from "element-ui"

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : 'http://www.chst.vip';
// 允许请求携带认证
axios.defaults.withCredentials = true

//创建请求拦截器，可以给每个请求都鞋带上想要传递的内容
axios.interceptors.request.use(config => {

    // 登录和注册不需要携带token
    if (config.url == "/users/login") {
        return config
    } else {
        let token = localStorage.getItem("sys_token");
        config.headers['authorization'] = token
        return config
    }
    // console.log(config);
});

//响应拦截
axios.interceptors.response.use(config => {
    // console.log(config);
    let { data } = config
    if (data.code == "1004" || data.code == "10022") {// 在当前后台api中 1004 代表token验证失败，提示错误，并且让页面跳转到登录页
        // 10022 表示session到期失效
        ElementUi.Message.error("登录信息失效，请重新登录");
        // console.log(router);
        // console.log(ElementUi)
        router.push("/login")
    }
    return config
})

axios.create({
    timeout: 4000,
})

export default axios