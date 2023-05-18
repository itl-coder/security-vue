<template>
    <div>
        <el-card>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#ffffff"
                     @select="handleSelect">
                <el-menu-item index="1">
                    <router-link to="/admin/home">首页</router-link>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">推荐</template>
                    <el-menu-item index="2-1">计算机基础</el-menu-item>
                    <el-menu-item index="2-2">道德与法治</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="3">课程教学</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">劳动教育</a></el-menu-item>
                <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">课后服务</a></el-menu-item>
                <el-menu-item index="6"><a href="https://www.ele.me" target="_blank">家庭教育</a></el-menu-item>
                <el-menu-item index="7"><a href="https://www.ele.me" target="_blank">教材经验</a></el-menu-item>
            </el-menu>
        </el-card>
        <el-card>
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
        </el-card>
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
