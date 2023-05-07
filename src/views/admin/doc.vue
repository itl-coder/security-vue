<template>
    <div class="pdf-container">
        <div class="pdf-list">
            <el-card v-for="(item, index) in pdfList" :key="index" class="pdf-item" @click="selectPdf(item)">
                <div class="pdf-thumb">
                    <img :src="item.thumbUrl" />
                </div>
                <div class="pdf-title">
                    <h3>{{ item.title }}</h3>
                </div>
            </el-card>
        </div>
        <div class="pdf-viewer">
            <iframe :src="selectedPdfUrl"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pdfList: [
                {
                    id: 1,
                    title: '初中物理',
                    pdfUrl: 'https://example.com/初中物理.pdf',
                    thumbUrl: 'https://example.com/初中物理.jpg'
                },
                {
                    id: 2,
                    title: '初中化学',
                    pdfUrl: 'https://example.com/初中化学.pdf',
                    thumbUrl: 'https://example.com/初中化学.jpg'
                },
                {
                    id: 3,
                    title: '初中生物',
                    pdfUrl: 'https://example.com/初中生物.pdf',
                    thumbUrl: 'https://example.com/初中生物.jpg'
                },
                {
                    id: 4,
                    title: '高中物理',
                    pdfUrl: 'https://example.com/高中物理.pdf',
                    thumbUrl: 'https://example.com/高中物理.jpg'
                },
                {
                    id: 5,
                    title: '高中化学',
                    pdfUrl: 'https://example.com/高中化学.pdf',
                    thumbUrl: 'https://example.com/高中化学.jpg'
                },
                {
                    id: 6,
                    title: '高中生物',
                    pdfUrl: 'https://example.com/高中生物.pdf',
                    thumbUrl: 'https://example.com/高中生物.jpg'
                }
            ],
            selectedPdfId: 1
        };
    },
    computed: {
        selectedPdfUrl() {
            const selectedPdf = this.pdfList.find((pdf) => pdf.id === this.selectedPdfId);
            return selectedPdf ? selectedPdf.pdfUrl : '';
        }
    },
    methods: {
        selectPdf(pdf) {
            this.selectedPdfId = pdf.id;
        }
    }
};
</script>

<style scoped lang="less">
.pdf-container {
    display: flex;
    height: 100%;
}

.pdf-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
}

.pdf-item {
    width: calc(33.33% - 20px);
    margin-bottom: 20px;
    cursor: pointer;
}

.pdf-thumb {
    height: 200px;
    overflow: hidden;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
}

.pdf-title {
    padding: 10px;

    h3 {
        margin: 0;
        font-size: 18px;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}

.pdf-viewer {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;

    iframe {
        width: 100%;
        height: 100%;
    }
}
</style>