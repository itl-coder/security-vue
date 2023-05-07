<template>
  <div class="login" v-cloak>
    <div class="left">
      <video autoplay="autoplay" loop="loop" muted oncanplay="true" src="@/assets/video/passport.mp4"></video>
    </div>
    <div class="right">
      <div class="box">
        <p>
          <strong> 登录 </strong>
          <span>没有账户? <router-link to="/register">免费注册</router-link>
          </span>
        </p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="" prop="username">
            <el-input placeholder="请输入账号" v-model="ruleForm.username" type="text">
              <i slot="suffix" class="el-input__icon icon-jurassic_user"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="ruleForm.password" ref="pwdRef" placeholder="请输入密码" :type="inputType">
              <i slot="suffix" class="el-input__icon icon-mima" @click="showPasswd"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="kaptcha" class="code">
            <el-input placeholder="请输入验证码" v-model="ruleForm.kaptcha" type="text" style="width: 170px;">
              <i slot="suffix" class="el-input__icon icon-yanzhengma"></i>
            </el-input>
            <img :src="kaptchaCode" ref="captchaImg" alt="" title="点击刷新" @click="refreshCaptcha">
          </el-form-item>

          <el-form-item label="">
            <el-checkbox v-model="rememberMe" @ckick="autoLogin">下次自动登录</el-checkbox>
          </el-form-item>

          <el-button @click="loginHandle">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { loginNetwork, refNewCode } from "@/network/user/user";
export default {
  data() {
    return {
      // 记住我
      rememberMe: false,
      ruleForm: {
        username: '', // 用户名
        password: '', // 密码
        kaptcha: '' // 验证码
      },
      kaptchaCode: "",
      showPassword: false, // 默认不显示密码
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
        kaptcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 4 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    // 修改密码显示
    inputType() {
      return this.showPassword ? 'text' : 'password';
    },
  },
  created() {
    this.refreshCaptcha()
  },
  methods: {
    // 记住我
    autoLogin() {
      this.rememberMe = !this.rememberMe
    },
    // 点击刷新验证码
    refreshCaptcha() {
      refNewCode().then(res => {
        // 先查看获取到的数据模型
        console.log(res)
        // 再进行下一步就明确自己要怎么获取数据量了
        if (res.code === 200) {
          // 解析 base64 图片资源 data:image/png;base64,
          this.kaptchaCode = "data:image/png;base64," + res.data
          this.$message({
            type: "success",
            message: res.message || "刷新成功!",
            duration: 1000
          });
        } else {
          this.$message({
            type: "error",
            message: res.message || "验证码获取失败!",
            duration: 1000
          });
        }
      })

    },
    // 点击显示验证码明文字符
    showPasswd() {
      this.showPassword = !this.showPassword;
    },
    // 点击登录事件
    loginHandle() {
      // 表单校验
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          loginNetwork(this.ruleForm).then(res => {
            // 判断 code
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.message,
                duration: 1000
              });
              // 存储登录信息
              console.log("存储登录信息: ", res)
              localStorage.setItem("userinfo", JSON.stringify(res.data))
              // TODO 页面跳转
              this.$router.push("/admin")
            } else {
              this.$message.error(res.message)
            }

          })
        }
      })
    },

  },
}
</script>

<style lang="less" scoped>
[v-cloak] {
  display: none;
}

.code {
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 40px;
    line-height: 40px;
    margin-left: 10px;
    vertical-align: middle;
  }
}

.icon-yanjing_xianshi {
  position: absolute;
  font-size: 14px;
  z-index: 1;
  right: 10px;
  color: #606266;
  font-family: iconfont;
}

.el-button:hover {
  background: #ffa459;
}

.icon-mima,
.icon-yanzhengma,
.icon-jurassic_user {
  font-family: iconfont;
}

.box p {
  position: relative;
  left: 80px;
  padding: 20px;

  strong {
    font-size: 32px;
    font-weight: 600;
    line-height: 40px;
    color: #121315;
  }

  span {
    display: block;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #767e89;
  }

  a {
    color: #fb9337;
    cursor: pointer;
    transition: color 0.3s;
  }
}

.right {
  position: relative;
  width: 50%;
  margin-left: 140px;
  box-sizing: border-box;

  .box {
    position: absolute;
    top: 300px;
  }

  .el-form {
    width: 100%;

    .el-input {
      width: 300px;
    }
  }
}

.el-button {
  position: relative;
  left: 100px;
  width: 300px;
  color: #fff;
  background-color: #fb9337;
}

.login {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .left video {
    display: inline-block;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
}
</style>