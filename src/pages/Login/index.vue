<template>
  <div class="login-page">
    <div class="left"></div>
    <div class="login-container">
      <h1>千峰管理系统</h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <video
      class="bg-video"
      src="~/assets/video/bg_video.mp4"
      preload="auto"
      muted="muted"
      loop="loop"
      autoplay="autoplay"
    ></video>
  </div>
</template>

<script>
import { login } from "@/api";
import {mapMutations} from "vuex"
export default {
  // 登录逻辑的实现
  // 1.收集用户输入的username&password传递到后端
  // 2.登录通过后，将后端返回的token存到本地
  // 3.每次请求时要携带token
  // 4.展示token校验正确的数据
  // 5.校验不通过是跳转回登录页
  data() {
    /**
     * jsDOc
     * @param {Object} rule 就是一个表单验证对象
     * @param 要描述函数的参数
     * {Object} 类型
     * rule字段
     * @param {string} value 输入值
     * @param {Function} callback 校验通过不传参，
     */
    var validateUsername = (rule, value, callback) => {
      //用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        callback("4到16位（字母，数字，下划线，减号");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    submitForm(formName) {
      /**
       * @param {Function} validate 校验的方法
       */
      console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //本地校验通过

          // 打开 登录加载动画
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          })
          let { username, password } = this.loginForm;
          login(username, password)
            .then((res) => {
              console.log(res);
              // 得到服务器响应，关掉loading动画
              loading.close();
              if (res.data.state) {
                this.$message.success("登录成功")
                localStorage.setItem("sys_token", res.data.token);
                localStorage.setItem("sys_userInfo",JSON.stringify(res.data.userInfo))
                // 更改vuex中的state['userInfo']的值
                this.SET_USERINFO(res.data.userInfo)
                // 跳转到主页
                this.$router.push("/");
              } else {
                this.$message.error('用户名或密码错误');
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style scoped>
/* 表单样式 */
.el-form {
  width: 400px;
}
/* 登录页面样式 */
.login-page {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
/* 背景视频样式 */
.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  background-size: cover;
}
/* 表单区域样式 */
.login-container {
  position: absolute;
  left: 75%;
  top: 50%;
  width: 25rem;
  border-radius: 5%;
  height: 30.47619048rem;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.2);
}
h1 {
  margin: 50px;
  color: #fff;
  text-align: center;
}
/* 输入按钮样式 */
.el-button {
  width: 85%;
  background: linear-gradient(90deg, #959599, #012454);
}
.el-button:hover {
  background: linear-gradient(90deg, #959599, #012454);
}
.el-button--primary {
  background: linear-gradient(90deg, #959599, #012454);
}
/* 左边图片 */
.left {
  width: 50%;
  height: 100%;
  background: url("../..//assets/imgs/bg2.png") no-repeat 50% center/50%;
}
</style>