<template>
  <div class="register">
    <div class="card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入您的姓名"
          ></el-input>
        </el-form-item>

        <el-form-item label="学号" prop="stuId">
          <el-input
            v-model="ruleForm.stuId"
            placeholder="请输入您的教师号/学号"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            placeholder="请输入您的密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入您的手机号"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="agree">
        <el-checkbox
          ref="checkboxRef"
          :checked="isChecked"
          @change="checkHandle"
        /><span>已阅读并同意</span>
        <a href="#">&lt;&lt;用户服务协议&gt;&gt;</a>和<a href="#"
          >&lt;&lt;隐私政策&gt;&gt;</a
        >
      </div>
      <div class="btn">
        <el-button
          type="success"
          @click="registerHandle"
          :disabled="submitLoading"
          ref="registerRef"
          >注册</el-button
        >
        <el-button type="info" @click="resetHandle">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    checkHandle() {
      this.isChecked = !this.isChecked
      // 复选框已经勾选
      if (this.isChecked) {
        this.submitLoading = false
      }
    },
    // 登录
    registerHandle() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 表单校验通过处理逻辑
          // 判断是否勾选复选框
          if (!this.$refs.checkboxRef.checked) {
            this.$message.warning('请选择用户协议')
            // 禁止再次点击,当勾选复选框后改变
            this.submitLoading = true
          }
          // 注册按钮可点击 发送注册请求 -> 跳转登录页
          if (!this.submitLoading) {
            this.$router.push('/login')
          }
        } else {
          // 表单验证失败时处理逻辑
          return false
        }
      })
    },
    // 重置
    resetHandle() {
      // nextTick 是将回调函数延迟在下一次 dom 更新数据后调用,避免 控制台 报ruleForm undefined
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate() // 移除表单校验
        this.$refs.ruleForm.resetFields() // 移除表单并初始化表单
      })
    },
  },
  data() {
    return {
      submitLoading: false,
      isChecked: false,
      ruleForm: {
        name: '',
        stuId: '',
        pwd: '',
        phone: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        stuId: [
          { required: true, message: '请输入您的学号', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 5 到 18 个字符',
            trigger: 'blur',
          },
        ],
        pwd: [
          { required: true, message: '请输入您的密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 5 到 18 个字符',
            trigger: 'blur',
          },
        ],
        phone: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' },
        ],
      },
    }
  },
}
</script>

<style lang="less" scoped>
.agree {
  position: absolute;
  bottom: 80px;
  left: 172px;
  font-size: 12px;
  span {
    margin-left: 10px;
  }
  a {
    color: #4aa468;
  }
}
.el-form {
  padding: 30px;
  margin-bottom: 72px;
  box-sizing: border-box;
  .el-input {
    width: 300px;
  }
}
.btn {
  position: absolute;
  bottom: 20px;
  left: 30%;
  .el-button {
    width: 100px;
  }
}
.register {
  position: relative;
  height: 100vh;
  background: url('@/assets/img/banner2.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  background-color: #cccccc;
}
.card {
  position: absolute;
  right: 160px;
  top: 150px;

  width: 420px;
  // height: 400px;
  margin-left: 323px;
  background: hsla(0, 0%, 100%, 0.9);
  border-radius: 8px;
  padding: 0 40px;
}
</style>