<template>
    <div>
        <el-row>
            <el-col :xs="24" :sm="12" :md="8" v-for="item in audioList" :key="item.id">
                <el-card :body-style="{ padding: '0px' }">
                    <img :src="item.cover" class="image">
                    <div style="padding: 14px;">
                        <span class="title">{{ item.title }}</span>
                        <div class="bottom clearfix">
                            <el-button type="text" size="small" class="float-right">播放</el-button>
                            <div class="float-left">{{ item.duration }}</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            audioList: [
                {
                    id: 1,
                    title: '美术课程',
                    cover: 'http://placehold.it/200x200',
                    duration: '3:32'
                },
                {
                    id: 2,
                    title: '音乐课程',
                    cover: 'http://placehold.it/200x200',
                    duration: '4:01'
                },
                {
                    id: 3,
                    title: '计算机基础课程',
                    cover: 'http://placehold.it/200x200',
                    duration: '3:45'
                },
                {
                    id: 4,
                    title: '英语听力训练',
                    cover: 'http://placehold.it/200x200',
                    duration: '3:27'
                }
            ]
        }
    }
}
</script>

<style>
.image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.title {
    font-size: 16px;
    font-weight: bold;
}

.bottom {
    font-size: 14px;
    color: #999;
    margin-top: 10px;
}
</style>
