<template>
  <div class="time">
    <span>2023</span
    >年<span>02</span>月<span>02</span>日<span>21</span>时<span>15</span>分<span>49</span>秒
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.time {
  width: 80%;
  margin: 50px auto;
  padding: 50px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 0px 24px 0px rgba(245, 206, 206, 0.3) !important;
  span {
    display: inline-block;
    width: 50px;
    padding: 10px 20px;
    font-size: 24px;
    font-weight: bold;
    margin: 4px;
    border-radius: 20px;
    background-color: rgba(186, 211, 223, 0.5);
  }
}
</style>