<template>
    <div class="userinfo">
        <div class="info">
            <el-row>
                <el-col :span="10">
                    <el-card>
                        <div slot="header" class="card-header">个人信息</div>
                        <div class="card-content">
                            <div class="personal-info">
                                <el-image :src="src"></el-image>
                            </div>
                            <div class="user-text">
                                <div class="info">
                                    <el-row>
                                        <el-col :span="6">
                                            <div class="left">
                                                <i class="el-icon-user-solid"> 用户昵称</i>
                                            </div>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="right">{{ userInfo.username }}</div>
                                        </el-col>
                                    </el-row>

                                    <el-row>
                                        <el-col :span="6">
                                            <div class="left">
                                                <i class="el-icon-phone-outline"> 手机号码</i>
                                            </div>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="right">{{ userInfo.phone }}</div>
                                        </el-col>
                                    </el-row>

                                    <el-row>
                                        <el-col :span="6">
                                            <div class="left">
                                                <i class="el-icon-s-shop"> 用户邮箱</i>
                                            </div>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="right">{{ userInfo.email }}</div>
                                        </el-col>
                                    </el-row>

                                    <el-row>
                                        <el-col :span="6">
                                            <div class="left">
                                                <i class="el-icon-user-solid"> 所属角色</i>
                                            </div>
                                        </el-col>
                                        <el-col :span="18">
                                            <div class="right">
                                                {{
                                                (userInfo.userType <= 2) ? "管理员、教职工" : "普通用户"
                                                }}
                                            </div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="14">
                    <el-card>
                        <div slot="header" class="card-header">基本资料</div>
                        <div class="card-content">
                            <div class="basic-info">
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane label="基本资料" name="first">
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                                 class="demo-ruleForm">
                                            <el-form-item label="手机号码" prop="phone">
                                                <el-input v-model="ruleForm.phone"></el-input>
                                            </el-form-item>
                                            <el-form-item label="用户邮箱" prop="email">
                                                <el-input v-model="ruleForm.email"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="submitForm1">保存</el-button>
                                                <el-button @click="resetForm">重置</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </el-tab-pane>
                                    <el-tab-pane label="修改密码" name="second">
                                        <el-form :model="form"
                                                 :rules="rules"
                                                 ref="form"
                                                 label-width="100px"
                                                 class="demo-ruleForm">
                                            <el-form-item label="新密码" prop="newPassword">
                                                <el-input type="password" v-model="form.newPassword"></el-input>
                                            </el-form-item>
                                            <el-form-item label="确认密码" prop="confirmPassword">
                                                <el-input type="password" v-model="form.confirmPassword"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary" @click="submitForm2">提交</el-button>
                                            </el-form-item>
                                        </el-form>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>


<script>

export default {
    name: "UserInfo",
    data() {
        return {
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            userInfo: {
                username: 'javaboy',
                phone: '13888888888',
                email: 'javaboy@example.com',
                userType: '管理员'
            },
            activeName: 'first',
            ruleForm: {
                phone: '',
                email: '',
            },
            rules: {
                phone: [
                    {required: true, message: '请输入手机号', trigger: 'blur'},
                    {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
                ],
                email: [
                    {required: true, message: '请输入邮箱', trigger: 'blur'},
                    {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
                ],
                newPassword: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                    {pattern: /^[a-zA-Z0-9]{6,20}$/, message: '密码长度为6~20位，只能包含字母和数字', trigger: 'blur'},
                    {validator: this.validateConfirmPassword, trigger: 'blur'},
                ],
                confirmPassword: [
                    {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    {validator: this.validateConfirmPassword, trigger: 'blur'},
                ],
            },// rules end
            form: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
        }
    }, // data end
    created() {
        // 获取用户信息
        const {userInfo} = JSON.parse(localStorage.getItem("userinfo"));
        this.userInfo = userInfo;
    },
    methods: {
        //
        handleClick() {
        },
        submitForm1() {
        },
        resetForm() {
        },
        validateConfirmPassword(rule, value, callback) {
            if (value !== this.form.newPassword) {
                callback(new Error('两次输入的密码不一致'))
            } else {
                callback()
            }
        },
        submitForm2() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    // 表单验证通过，可以在这里提交表单数据

                } else {
                    // 表单验证失败，可以在这里处理错误信息

                    return false
                }
            })
        }
    } // methods end
}
</script>


<style scoped lang="less">
.card {
  margin-bottom: 10px;
  box-sizing: border-box;
}

.card-header {
  font-size: 24px;
  text-align: left;
  margin: 10px;
}

.card-content {
  margin-bottom: 10px;
}

.personal-info {
  display: flex;
  align-items: center;
  justify-content: center;

  .el-image {
    width: 120px;
    height: 120px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .06)
  }
}

.avatar {
  margin-right: 20px;
}

.el-row {
  display: flex;
  justify-content: space-between;

  .el-col {
    margin: 10px;
  }
}


.left {
  display: flex;
  align-items: center;
  height: 100%;
}

.left i {
  margin-right: 10px;
}

.right {
  text-align: right;
  margin-right: 40px;
  line-height: 16px;
  height: 100%;
}

.user-text .info {
  margin: 15px;
  box-sizing: border-box;

  .el-row {
    border-bottom: 1px solid rgba(0, 0, 0, .08);
  }

}

</style>

