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
import axios from "axios";

export default {
    created() {
        axios.get("https://api.thecatapi.com/v1/images/search?limit=6").then(
            res => {
                // res.data[0].url
                for (let i = 0; i < res.data.length; i++) {
                    this.audioList[i].cover = res.data[i].url
                }
            })
    },
    data() {
        return {
            audioList: [
                {
                    id: 1,
                    title: '美术课程',
                    cover: 'https://i.328888.xyz/2023/05/07/i1Zx4t.jpeg',
                    duration: '3:32'
                },
                {
                    id: 2,
                    title: '音乐课程',
                    cover: 'https://i.328888.xyz/2023/05/07/i1Z7IJ.jpeg',
                    duration: '4:01'
                },
                {
                    id: 3,
                    title: '计算机基础课程',
                    cover: 'https://i.328888.xyz/2023/05/07/i1ZXvX.jpeg',
                    duration: '3:45'
                },
                {
                    id: 4,
                    title: '英语听力训练',
                    cover: 'https://i.328888.xyz/2023/05/07/i1ZEdc.jpeg',
                    duration: '3:27'
                },
                {
                    id: 5,
                    title: '语文',
                    cover: 'https://i.328888.xyz/2023/05/07/i1Z1pv.jpeg',
                    duration: '3:27'
                },
                {
                    id: 6,
                    title: '励志语录',
                    cover: 'https://i.328888.xyz/2023/05/07/i1ZakU.jpeg',
                    duration: '3:27'
                }
            ]
        }
    }
}
</script>

<style>
.el-card {
    margin: 5px;
}

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
