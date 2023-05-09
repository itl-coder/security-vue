<template>
    <div class="grade">
        <el-card>
            <!-- 条件-按钮组件 -->
            <div class="op-btn">
                <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteByIds">批量删除</el-button>
                <div class="classInfo">
                    <span>管理员姓名:</span>
                    <el-input placeholder="请输入管理员姓名" v-model="searchObj" clearable>
                    </el-input>
                </div>
                <el-button type="primary" icon="el-icon-search" @click="keySearch">搜索</el-button>
                <el-button type="info" icon="el-icon-refresh-right" @click="resetData()">重置</el-button>
            </div>
            <!-- 表格数据组件 -->
            <el-table ref="multipleTable" :data="gradeData" tooltip-effect="dark" border style="width: 100%"
                      height="660"
                      highlight-current-row fit @selection-change="handleSelectionChange">
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
                <el-table-column prop="photo" label="头像" show-overflow-tooltip align="center">
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
                        <el-button @click="editorHandleClick(scope.row)" type="warning" size="small">修改</el-button>
                        <el-button type="danger" size="small" @click="deleteRowData(scope.row)">删除</el-button>
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
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                           :page-sizes="[5, 10, 20, 50]" :page-size="limit"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import {
    getTeacherData,
    removeByIdOne,
    removeByIds,
    saveOrUpdateTeacher
} from "@/network/admin/teacher";
import AvatarUploader from "@/components/AvatarUploader.vue";

export default {
    components: {AvatarUploader},

    data() {
        // 自定义验证邮箱
        const validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else {
                const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!reg.test(value)) {
                    if (value.endsWith('@qq.com')) {
                        callback(new Error('QQ邮箱无法验证，请输入其他邮箱'));
                    } else {
                        callback(new Error('请输入正确的邮箱格式'));
                    }
                } else {
                    callback();
                }
            }
        };
        // 自定义三大运行商的手机号验证
        const validatePhoneNumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else {
                const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的手机号格式'));
                } else {
                    callback();
                }
            }
        };
        return {
            dialogVisibleTitle: "添加教职工信息",
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
                photo: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入管理员名称', trigger: 'blur'},
                    {min: 1, max: 15, message: '年级名称不能少于3位', trigger: 'blur'}
                ],
                sex: [
                    {required: true, message: '请输入管理员性别', trigger: 'blur'},
                    {min: 1, max: 2, message: '请输入合法的性别', trigger: 'blur'}
                ],
                email: [
                    {required: true, validator: validateEmail, trigger: 'blur'}
                ],
                address: [
                    {required: true, message: '请输入地址信息', trigger: 'blur'},
                    {min: 1, max: 55, message: '请输入合法的地址信息', trigger: 'blur'}
                ]
            },
            // 选中的多个要删除的 ids
            multipleSelection: [],
            imageName: ''
        }
    },

    created() {
        this.fetchData()
    },
    methods: {
        getSendImageName(name) {
            this.imageName = name
        },
        getImage(image) {
            return `http://localhost:8080/download?name=${image}`
        },
        // 点击按钮删除该行的数据
        deleteRowData(row) {
            this.$confirm('此操作将永久删除该管理员信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 获取id
                removeByIdOne(row.gradeId).then(res => {
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
            this.dialogVisibleTitle = "更新教职工信息"
            // 表单数据回显
            this.addRuleForm = row
        },
        updateTeacher() {
            // 重新组织数据作为回显数据
            this.$refs.ruleForm.validate((valid) => {
                // 重新组织表单数据作为本次的提交
                const data = {
                    ...this.addRuleForm,
                    photo: this.imageName
                }
                // 通过表单验证,发送添加请求
                if (valid) {
                    saveOrUpdateTeacher(data).then(res => {
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
        saveTeacher() {
            this.$refs.ruleForm.validate((valid) => {
                // 通过表单验证,发送添加请求
                if (valid) {
                    saveOrUpdateTeacher(this.addRuleForm).then(res => {
                        this.$message({
                            type: "success",
                            message: res.message
                        });
                        // 清空表单
                        this.addRuleForm = {}
                        // 重新获取数据现在
                        this.fetchData()
                    })
                } else {
                    // 提示错误信息
                    this.$message.error(res.message || '表单验证失败，请检查输入！');
                    return false;
                }
            });
        },
        saveOrUpdateGradeHandle() {
            if (this.dialogVisibleTitle === "添加教职工信息") {
                this.saveTeacher()
            }
            if (this.dialogVisibleTitle === "更新教职工信息") {
                this.updateTeacher()
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
                this.multipleSelection.push(e[i].gradeId)
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
            getTeacherData(this.page, this.limit, this.searchObj).then(res => {

                // 将获取到的数据进行持久化
                this.total = res.data.total
                this.gradeData = res.data.records
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
</style>