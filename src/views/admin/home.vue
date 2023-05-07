<template>
    <div class="home">
        <span>欢迎使用</span>
        <h1>渭南市前进路中学智慧云台</h1>
        <span>管理系统</span>
    </div>
</template>

<script>


export default {
    name: 'home',
    components: {

    },
}
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    margin: 200px auto;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        color: #2D7D79;
        font-size: 64px;
        font-weight: bold;
        padding: 15px;
    }

    span {
        font-size: 34px;
        font-weight: bold;
        display: inline-block;
    }
}
</style>
