<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <h1 class="logo"></h1>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-shop"></i>
            <span slot="title">管理首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">学员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-s-order"></i>学院项目管理
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-data-analysis"></i>学员资料
              </el-menu-item>
              <el-menu-item index="2-3">
                <i class="el-icon-school"></i>学院宿舍
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">考勤管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">我的中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-radio-group v-model="isCollapse">
                  <el-radio-button v-show="isCollapse" :label="false">
                    <i class="el-icon-s-unfold"></i>
                  </el-radio-button>
                  <el-radio-button v-show="!isCollapse" :label="true">
                    <i class="el-icon-s-fold"></i>
                  </el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">万峰智慧管理系统</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-avatar
                  size="large"
                  fit="cover"
                  src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=299848528,4021999190&fm=11&gp=0.jpg"
                ></el-avatar>
                <span>欢迎你：</span>
                <b class="nickname">{{ userInfo.nickname }}</b>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- 主题栏 -->
        <el-main>{{ isCollapse }}</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
/* 侧边栏logo */
.logo {
  height: 60px;
  background: url("../../assets/imgs/logo.png") no-repeat 50% center/80%;
}

/* 主体样式 */
.el-header {
  background: linear-gradient(135deg, rgb(76, 103, 255), rgb(86, 53, 223))
    rgb(65, 184, 131);
  color: #333;
  text-align: center;
  box-sizing: border-box;
  line-height: 60px;
  height: 60px;
}

.el-aside {
  background: linear-gradient(135deg, rgb(76, 103, 255), rgb(86, 53, 223))
    rgb(65, 184, 131);
  color: #333;
  text-align: center;
  line-height: 200px;
  overflow: hidden;
  transition: all 0.3s;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/* 菜单栏 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-row {
  height: 60px;
  box-sizing: border-box;
}
.el-col {
  border-radius: 4px;
}
/* .bg-purple-dark {
  background: #99a9bf;
} */
.bg-purple {
  height: 60px;
  box-sizing: border-box;
  position: relative;
  /* background: #d3dce6; */
}
/* .bg-purple-light {
  background: #e5e9f2;
} */
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
/* .row-bg {
  background-color: #f9fafc;
} */



/* 菜单按钮 */
.el-radio-group {
  position: absolute;
  left: 0;
  top: 5px;
  bottom: 5px;
}

/* 导航菜单样式 */
/* 第一个 */
.el-menu-item {
  text-align: left;
}
.el-submenu__title {
  text-align: left;
}
.el-menu-item-group__title {
  display: none;
}
.grid-content {
  height: 60px;
  box-sizing: border-box;
  padding: 0;
  vertical-align: middle;
}
.el-avatar {
  vertical-align: middle;
  margin: 0px 10px 5px 0;
}
.el-avatar > img {
  margin: 0;
  padding: 0;
}
.quit {
  padding-left: 10px;
  cursor: pointer;
}
.nickname {
  font-size: 20px;
  font-family: "宋体";
}
</style>

<script>
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    quit() {
      // 退出登录
      // 1. 清除token和userinfo
      // 2. 跳转到登录页
      localStorage.removeItem("sys_token");
      localStorage.removeItem("sys_userInfo");
      this.$router.push("/login");
    },
  },
  mounted() {
    getLoginLog().then((res) => {
      console.log(res);
    });
  },
};
</script>