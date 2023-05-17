<template>
    <div class="video-wrapper">
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
                    <el-menu class="course-menu" :default-active="course.activeChapter" @select="handleSelectChapter">
                        <el-menu-item v-for="chapter in course.chapters" :key="chapter.id" :index="chapter.id">
                            {{ chapter.title }}
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
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
        }
    }
}
</script>

<style>
.video-wrapper {
    max-width: 1200px;
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