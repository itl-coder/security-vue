<template>
    <div class="video-wrapper">
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
                <el-col :xs="24" :sm="16" :md="16">
                    <video class="video-player" controls :src="videoSrc"></video>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8">
                    <div class="course-wrapper">
                        <h3 class="course-title">{{ course.title }}</h3>
                        <p class="course-description">{{ course.description }}</p>
                        <el-divider></el-divider>
                        <h4 class="course-chapter">章节</h4>
                        <el-menu class="course-menu" :default-active="course.activeChapter"
                                 @select="handleSelectChapter">
                            <el-menu-item v-for="chapter in course.chapters" :key="chapter.id" :index="chapter.id">
                                {{ chapter.title }}
                            </el-menu-item>
                        </el-menu>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',

            videoSrc: 'https://www.bilibili.com/video/BV1cv4y1H7c3/?spm_id_from=333.1007.tianma.2-1-4.click&vd_source=c7495ba70dd0aea85589bc6bbbda61ee',
            course: {
                title: '中小学课程',
                description: '这是一门关于中小学教育的课程，包含多个章节，涵盖了数学、英语、科学等学科内容。',
                activeChapter: '1',
                chapters: [
                    {
                        id: '1',
                        title: '数学',
                        videos: [
                            {
                                id: '1-1',
                                title: '加法',
                                src: 'https://api.thecatapi.com/v1/images/search?limit=1'
                            },
                            {
                                id: '1-2',
                                title: '减法',
                                src: '../../assets/video/english.mp4'
                            }
                        ]
                    },
                    {
                        id: '2',
                        title: '英语',
                        videos: [
                            {
                                id: '2-1',
                                title: '单词',
                                src: '../../assets/video/english.mp4'
                            },
                            {
                                id: '2-2',
                                title: '语法',
                                src: '../../assets/video/english.mp4'
                            }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        handleSelectChapter(index) {
            this.course.activeChapter = index
            const chapter = this.course.chapters.find(c => c.id === index)
            if (chapter && chapter.videos.length > 0) {
                this.videoSrc = chapter.videos[0].src
            }
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>
.course-description {
    line-height: 2;
}

.video-wrapper {

    margin: 0 auto;
}

.video-player {
    width: 100%;
    height: auto;
}

.course-wrapper {
    padding: 20px;
}

.course-title {
    font-size: 20px;
    margin-bottom: 10px;
}

.course-description {
    font-size: 16px;
    margin-bottom: 10px;
}

.course-chapter {
    font-size: 18px;
    margin-bottom: 10px;
}

.course-menu {
    margin-top: 10px;
}
</style>