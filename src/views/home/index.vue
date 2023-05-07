<template>
  <div class="index">
    <div class="title">智慧校园云台系统</div>
    <div class="login">
      <router-link to="/login">登录</router-link>
    </div>
    <div class="register">
      <router-link to="/register">注册</router-link>
    </div>
    <div class="resolve">
      <p>
        <span>*</span>
        <strong>智慧中小学在线解决方案</strong>
        <span>*</span>
      </p>
      <div class="card">
        <el-card>
          <span class="icon-zhuti"></span>
          <p>智能场景</p>
          <strong>基于校园的同行、安全、课堂、消费、借阅等多场景</strong>
        </el-card>
        <el-card>
          <span class="icon-zhinengkeji-icon-7"></span>
          <p>智能环境</p>
          <strong>实现智能化环境,打造绿色智能校园</strong>
        </el-card>
        <el-card>
          <span class="icon-bigdata"></span>
          <p>智能数据</p>
          <strong>提供可视化,实现校园大脑数据管理服务</strong>
        </el-card>
      </div>
      <div class="consume">
        <p>人脸识别消费、学校节约成本、学生理性消费</p>
        <div class="fice-consumer">
          <p>
            <span>人脸识别消费系统</span>
            <span>人脸识别+支付宝免密代扣,学校提高效率,节约成本;培养学生理性消费</span>
          </p>
          <img src="@/assets/img/system-info.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  components: {},

  methods: {

  },
}
</script>

<style lang="less" scoped>
.consume {
  width: 960px;
  margin: 30px auto;
  padding: 0 300px;
  box-shadow: 0px 0px 24px 10px rgba(160, 160, 160, 0.08);
}

.consume:hover {
  box-shadow: 0px 0px 14px 2px rgba(102, 102, 102, 0.2);
}

.fice-consumer {
  img {
    width: 60%;
  }

  p {
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-weight: 500;

    span {
      display: block;
      text-align: left;
      margin: 20px;
    }

    span:nth-child(1) {
      font-size: 24px;
    }

    span:nth-child(2) {
      font-size: 14px;
      color: #b4b6c0;
    }
  }
}

.card {
  display: flex;
  margin-top: 30px;
  justify-content: center;

  .el-card {
    width: 384px;
    height: 248px;
    margin: 10px;
    box-shadow: 0px 0px 24px 0px rgb(20 45 160 / 6%);

    .icon-bigdata,
    .icon-zhuti,
    .icon-zhinengkeji-icon-7 {
      font-family: iconfont;
    }

    .icon-bigdata,
    .icon-zhuti,
    .icon-zhinengkeji-icon-7 {
      width: 100%;
      font-size: 40px;
      display: block;
      margin-top: 20px;
      text-align: center;
    }

    strong {
      text-align: center;
      display: block;
      line-height: 2;
      font-size: 14px;
      color: #9698a0;
    }
  }
}

.resolve {
  margin-top: 30px;

  p {
    text-align: center;
    padding: 20px;
    font-size: 20px;
    font-weight: 500;

    span {
      margin: 20px;
    }
  }
}

.index {
  position: relative;
}

.title {
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  height: 80px;
  line-height: 80px;
  border: 1px solid #eef0f2;
}

.register,
.login {
  position: absolute;
  right: 400px;
  top: 30px;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #3c4050;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.register:hover,
.login:hover {
  color: #fff;
  background: #66b1ff;
  border-color: #66b1ff;
}

.register {
  position: absolute;
  right: 250px;
  top: 30px;
}
</style>