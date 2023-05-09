<template>
    <el-container>
        <el-header>
            <div class="left">
                智慧校园云台系统
            </div>
            <div class="right">
                <span>{{ username }}</span>
                <img src="@/assets/img/avat.gif" alt="" title="点击图像退出" @click="myLogoutHandle">
            </div>
        </el-header>
        <el-container class="aside-container">
            <el-aside width="200px">
                <el-col :span="12">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-0">
                                    <router-link to="/admin/home">首页</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-1">
                                    <router-link to="/admin/user">学生管理</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-2" v-if="authUserType<3">
                                    <router-link to="/admin/teacher">教师管理</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-3" v-if="authUserType<2">
                                    <router-link to="/admin/clazz">班级管理</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-4" v-if="authUserType===3">
                                    <router-link to="/admin/grade">年纪管理</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-5" v-if="authUserType===1">
                                    <router-link to="/admin/system">管理员管理</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-6">
                                    <router-link to="/admin/userinfo">
                                        个人信息管理
                                    </router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>资源管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1">
                                    <router-link to="/admin/audio">
                                        音频资源
                                    </router-link>
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                    <router-link to="/admin/video">
                                        视频资源
                                    </router-link>
                                </el-menu-item>
                                <el-menu-item index="1-3">
                                    <router-link to="/admin/doc">
                                        文档资源
                                    </router-link>
                                </el-menu-item>
                                <el-menu-item index="1-4">课前预习</el-menu-item>
                                <el-menu-item index="1-5">
                                    <router-link to="/admin/exercise">
                                        课后习题
                                    </router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import {logoutHandle} from "@/network/user/user";

export default {
    data() {
        return {
            username: "",
            info: {},
            authUserType: ''
        }
    },
    created() {
        this.getUserInfo();
        this.authUserType = this.info.userInfo.userType
    },

    methods: {
        // 获取用户信息
        getUserInfo() {
            let res = JSON.parse(localStorage.getItem("userinfo"))
            this.info = res
            // 将获取的英文字符转换为大写显示
            this.username = String(res.userInfo.username).toUpperCase()
        },
        // 注销
        myLogoutHandle() {
            logoutHandle().then(res => {
                this.$message({
                    type: "success",
                    message: res.message,
                    duration: 800
                });
                // 页面跳转
                this.$router.push("/login");
                // 清空用户信息
                localStorage.removeItem("userinfo")
            })
        },
        handleOpen() {
        },
        handleClose() {
        }
    },
}
</script>

<style lang="less" scoped>
.aside-container {
  overflow: hidden;
}

a {
  color: #fff;
  display: inline-block;
}

a:hover {
  color: blue;
  transition: all .2s;
}

.el-aside {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #304156;

  span {
    color: #fff;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcfcfc;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
}

.right img {
  height: 49px;
  line-height: 49px;
  box-sizing: border-box;
  padding: 2px;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px #fff;
}

.right {
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    margin-right: 10px;
  }
}
</style>