<template>
    <div class="grade">
        <el-card>
            <!-- 条件-按钮组件 -->
            <div class="op-btn">
                <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true" v-if="loginUserType==='1' || loginUserType==='2'">添加</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteByIds"  v-if="loginUserType==='1' || loginUserType==='2'">批量删除</el-button>
                <div class="classInfo">
                    <span>用户姓名:</span>
                    <el-input placeholder="请输入用户姓名" v-model="searchObj" clearable>
                    </el-input>
                </div>
                <el-button type="primary" icon="el-icon-search" @click="keySearch">搜索</el-button>
                <el-button type="info" icon="el-icon-refresh-right" @click="resetData()">重置</el-button>
            </div>
            <!-- 表格数据组件 -->
            <el-table ref="multipleTable" :data="gradeData" tooltip-effect="dark" border style="width: 100%"
                      height="660" fit
                      highlight-current-row @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center">
                </el-table-column>
                <el-table-column prop="id" label="ID" width="120" align="center">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="120" align="center">
                </el-table-column>
                <el-table-column prop="sex" label="性别" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column label="头像" prop="photo" align="center" show-overflow-tooltip width="85">
                    <template slot-scope="{row}">
                        <div class="cell-container">
                            <el-image style="width: auto; height: 40px; border: none; cursor: pointer;"
                                      :src="getImage(row.photo)"
                                      :preview-src-list="[`http://localhost:8080/download?name=${row.photo}`]">
                            </el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                        <el-button @click="detailHandleClick(scope.row)" type="primary" size="small">详细信息
                        </el-button>
                        <el-button @click="editorHandleClick(scope.row)" type="warning" size="small" v-if="loginUserType==='1'">修改</el-button>
                        <el-button type="danger" size="small" @click="deleteRowData(scope.row)" v-if="loginUserType==='1'">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 弹窗添加组件 -->
            <el-dialog :title="dialogVisibleTitle" :visible.sync="dialogVisible" width="30%"
                       :before-close="handleClose">
                <!-- 添加信息输入框 -->
                <el-form :model="addRuleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="username">
                        <el-input v-model="addRuleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-input v-model="addRuleForm.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addRuleForm.email" type="email"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="addRuleForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="addRuleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <div>
                            <avatar-uploader @send-image-name="getSendImageName"/>
                        </div>
                    </el-form-item>
                </el-form>
                <!-- 按钮事件 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="resetForm">重置</el-button>
                    <el-button type="primary" @click="saveOrUpdateGradeHandle">添加</el-button>
                </span>
            </el-dialog>

            <!-- 分页组件 -->
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="page"
                           :page-sizes="[5, 10, 20, 50]" :page-size="limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>

            <!-- 用户详细信息 -->
            <el-dialog
                    title="学生详细信息"
                    :visible.sync="detailDialogVisible"
                    width="50%"
                    :before-close="detailInfoClose">
                <el-descriptions class="margin-top" :column="3" :size="size" border>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-user"></i>
                            用户名
                        </template>
                        <el-tag> {{ detailInfo.username }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-mobile-phone"></i>
                            手机号
                        </template>
                        {{ detailInfo.phone }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-s-comment"></i>
                            邮箱
                        </template>
                        {{ detailInfo.email }}
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-location-outline"></i>
                            居住地
                        </template>
                        陕西省xxxxxxx
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-tickets"></i>
                            备注
                        </template>
                        <el-tag size="small">学生</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            联系地址
                        </template>
                        陕西省吴中区吴中大道 1188 号
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            所在班级
                        </template>
                        七年级八班
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-office-building"></i>
                            学生家长
                        </template>
                        <el-tag type="success">xxxxxxxx</el-tag>
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template slot="label">
                            <i class="el-icon-phone"></i>
                            家长联系方式
                        </template>
                        <el-tag type="success">xxxxxxxx</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import AvatarUploader from '@/components/AvatarUploader.vue'

import {getUserData, saveUser, removeByIdOne, removeByIds} from "@/network/user/user";
import {headerImgUpload} from "@/network/admin/upload";

import axios from "axios";


import {validateEmail, validatePhoneNumber} from "@/utils/validateUtils"

export default {
    data() {
        return {
            size: '',
            // 用户详细信息默认关闭
            detailDialogVisible: false,
            dialogVisibleTitle: "添加用户信息",
            // 是否显示
            dialogVisible: false,
            gradeData: [],
            // 分页
            total: 0,// 数据库中的总记录数
            page: 1,// 默认显示的页码(1:第一页),
            limit: 10, // 每页显示的记录数
            searchObj: '',// 查询条件
            // 添加年级的表单信息
            addRuleForm: {
                id: null,
                username: '',
                sex: '',
                email: '',
                address: '',
                phone: '',
                photo: ''
            },
            detailInfo: {},
            rules: {
                username: [
                    {required: true, message: '请输入用户名称', trigger: 'blur'},
                    {min: 3, max: 15, message: '用户称不能少于3位', trigger: 'blur'}
                ],
                sex: [
                    {required: true, message: '请输入用户性别', trigger: 'blur'},
                    {min: 1, max: 2, message: '请输入合法的性别', trigger: 'blur'}
                ],
                email: [
                    {required: true, validator: validateEmail, trigger: 'blur'}
                ],
                phone: [
                    {required: true, validator: validatePhoneNumber, trigger: 'blur'}
                ],
                address: [
                    {required: true, message: '请输入地址信息', trigger: 'blur'},
                    {min: 3, max: 55, message: '请输入合法的地址信息', trigger: 'blur'}
                ]
            },
            // 选中的多个要删除的 ids
            multipleSelection: [],
            imageName: '',
            loginUserType: ''
        }
    },
    components: {AvatarUploader},
    created() {
        this.fetchData()

        const loginUserType = JSON.parse(localStorage.getItem("userinfo")).userInfo.userType
        this.loginUserType = loginUserType
    },
    methods: {
        detailInfoClose() {
            this.detailDialogVisible = false
        },
        // 查看用户的详细信息
        detailHandleClick(row) {
            this.detailDialogVisible = true
            // 组织数据显示
            this.detailInfo.username = row.username
            this.detailInfo.phone = row.phone
            this.detailInfo.email = row.email


        },
        getImage(image) {
            return `http://localhost:8080/download?name=${image}`
        },
        // 点击按钮删除该行的数据
        deleteRowData(row) {
            this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeByIdOne(row.id).then(res => {
                    this.$message.success(res.message)
                })
                // 刷新数据显示
                this.fetchData()
            }).catch(() => {
                this.$message.info('已取消删除')
            });
        },
        // 编辑按钮处理事件
        editorHandleClick(row) {
            // 显示弹窗
            this.dialogVisible = true
            // 更换标题
            this.dialogVisibleTitle = "更新用户信息"
            // 数据回显
            // TODO photo 回显: 父组件向子组件传递图片名称,子组件进行下载
            this.addRuleForm = row
        },
        getSendImageName(name) {
            this.imageName = name
        },
        saveUser() {
            this.$refs.ruleForm.validate((valid) => {
                // 通过表单验证,发送添加请求
                if (valid) {
                    saveUser(this.addRuleForm).then(res => {
                        this.$message({
                            type: "success",
                            message: res.message
                        });
                        // 重新获取数据
                        this.fetchData()
                    })
                } else {
                    // 提示错误信息
                    this.$message.error(res.message || '表单验证失败，请检查输入！');
                    return false;
                }
            });
        },
        update() {
            // 重新组织数据作为回显数据
            this.$refs.ruleForm.validate((valid) => {
                // 重新组织表单数据作为本次的提交
                const data = {
                    ...this.addRuleForm,
                    photo: this.imageName
                }
                // 通过表单验证,发送添加请求
                if (valid) {
                    saveUser(data).then(res => {
                        this.$message({
                            type: "success",
                            message: res.message
                        });
                        // 重新获取数据
                        this.fetchData()
                    })
                } else {
                    // 提示错误信息
                    this.$message.error(res.message || '表单验证失败，请检查输入！');
                    return false;
                }
            });
            // 关闭弹窗
            this.handleClose()
        },
        saveOrUpdateGradeHandle() {
            // 如何区分 save | update
            if (this.dialogVisibleTitle === '更新用户信息') {
                this.update();
            }
            if (this.dialogVisibleTitle === '添加用户信息') {
                this.saveUser()
            }
        },
        resetForm() {
            this.$refs.ruleForm.resetFields();
        },

        // 多选处理
        handleSelectionChange(e) {
            // [{},{}]
            for (let i = 0; i < e.length; i++) {
                // 对象的id
                this.multipleSelection.push(e[i].id)
            }
        },
        deleteByIds() {
            // 将数组
            removeByIds(this.multipleSelection).then(res => {
                this.$message.success(res.message)
                this.fetchData()
            })
        },
        // 一页显示的条目数的改变事件
        handleSizeChange(size) {
            this.limit = size
            this.fetchData()
        },
        // 将要跳转的页码的改版事件
        handleCurrentChange(page) {
            this.page = page
            this.fetchData()
        },
        fetchData() {
            // 发送请求，获取分页的数据
            getUserData(this.page, this.limit, this.searchObj).then(res => {
                // 将获取到的数据进行持久化
                this.total = res.data.total
                this.gradeData = res.data.records
                // TODO 发送下载图片请求 遍历 records,获取 name
                this.gradeData.forEach(photoName => {
                    const name = photoName.photo;
                    // TODO 构造图片请求地址

                });
            })
        },
        // 清空数据
        resetData() {
            this.searchObj = ''
            // 重新获取当前页的数据
            this.fetchData()
        },
        // 模糊查询
        keySearch() {
            this.fetchData()
        },
        // 点击关闭按钮
        handleClose() {
            this.dialogVisible = !this.dialogVisible
        }
    },
}
</script>

<style lang="less" scoped>
.cell-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.avatar-uploader-cell {
  width: 50px;
  height: 50px;
}

.el-card {
  height: 100% !important;
}

.el-pagination {
  text-align: center;
  margin: 20px;
}

.el-table {
  margin: 20px;
}

.classInfo {
  display: flex;
  width: 20%;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;

  span {
    display: inline-block;
    width: 200px;
    margin-right: 15px;
    text-align: right;
  }
}

.op-btn {
  display: flex;
  justify-content: flex-start;

  .el-button {
    margin-left: 20px;
  }
}

// 图像大小
</style>