<template>
    <div class="exercise-container">
        <el-tabs v-model="activeTab">
            <el-tab-pane v-for="(subject, index) in subjects" :key="index" :label="subject.label">
                <div class="exercise-list">
                    <el-row>
                        <el-col v-for="exercise in subject.exercises" :key="exercise.id" :xs="24" :sm="12" :md="8" :lg="6">
                            <div class="exercise-item" :class="{ 'active': exercise.id === activeExerciseId }"
                                @click="handleExerciseClick(exercise.id)">
                                <div class="thumbnail">
                                    <img :src="exercise.thumbnailUrl" alt="exercise-thumbnail">
                                </div>
                                <div class="title">{{ exercise.title }}</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="exercise-viewer">
            <div v-if="activeExerciseId" class="iframe-container">
                <iframe :src="getExerciseUrl(activeExerciseId)"></iframe>
            </div>
            <div v-else class="empty-tips">
                请先选择一个习题
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeTab: '1',
            activeExerciseId: null,
            subjects: [
                {
                    label: '语文',
                    exercises: [
                        {
                            id: '1',
                            title: '小学语文习题一',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=1',
                            pdfUrl: '/pdfs/chinese/exercise1.pdf'
                        },
                        {
                            id: '2',
                            title: '小学语文习题二',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=2',
                            pdfUrl: '/pdfs/chinese/exercise2.pdf'
                        },
                        {
                            id: '3',
                            title: '初中语文习题一',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=3',
                            pdfUrl: '/pdfs/chinese/exercise3.pdf'
                        }
                    ]
                },
                {
                    label: '数学',
                    exercises: [
                        {
                            id: '4',
                            title: '小学数学习题一',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=4',
                            pdfUrl: '/pdfs/math/exercise1.pdf'
                        },
                        {
                            id: '5',
                            title: '小学数学习题二',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=5',
                            pdfUrl: '/pdfs/math/exercise2.pdf'
                        },
                        {
                            id: '6',
                            title: '初中数学习题一',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=6',
                            pdfUrl: '/pdfs/math/exercise3.pdf'
                        }
                    ]
                },
                {
                    label: '英语',
                    exercises: [
                        {
                            id: '7',
                            title: '小学英语习题一',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=7',
                            pdfUrl: '/pdfs/english/exWercise1.pdf'
                        },
                        {
                            id: '8',
                            title: '小学英语习题二',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=8',
                            pdfUrl: '/pdfs/english/exercise2.pdf'
                        },
                        {
                            id: '9',
                            title: '初中英语习题一',
                            thumbnailUrl: 'https://picsum.photos/200/150?random=9',
                            pdfUrl: '/pdfs/english/exercise3.pdf'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleExerciseClick(id) {
            this.activeExerciseId = id;
        },
        getExerciseUrl(id) {
            const subject = this.subjects.find(subject => subject.exercises.some(exercise => exercise.id === id));
            const exercise = subject.exercises.find(exercise => exercise.id === id);
            return exercise.pdfUrl;
        }
    }
};
</script>

<style scoped>
.exercise-container {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.exercise-list {
    margin: 16px;
}

.exercise-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
}

.exercise-item:hover {
    transform: scale(1.05);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.exercise-item.active {
    border-color: #409EFF;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
}

.title {
    margin-top: 8px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #333;
}

.exercise-viewer {
    margin: 16px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.iframe-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    height: 0;
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.empty-tips {
    font-size: 24px;
    color: #999;
}
</style>