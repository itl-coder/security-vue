<template>
    <div class="pdf-container">
        <div class="pdf-list">
            <el-card v-for="(item, index) in pdfList" :key="index" class="pdf-item" @click="selectPdf(item)">
                <div class="pdf-thumb">
                    <img :src="item.thumbUrl"/>
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

import axios from "axios";

export default {
    data() {
        return {
            pdfList: [
                {
                    id: 1,
                    title: '初中英语',
                    pdfUrl: 'https://i.328888.xyz/2023/05/07/i1ZEdc.jpeg',
                    thumbUrl: 'https://i.328888.xyz/2023/05/07/i1ZEdc.jpeg'
                },
                {
                    id: 2,
                    title: '初中语文',
                    pdfUrl: 'https://i.328888.xyz/2023/05/07/i1Z1pv.jpeg',
                    thumbUrl: 'https://i.328888.xyz/2023/05/07/i1Z1pv.jpeg'
                },
                {
                    id: 3,
                    title: '初中生物',
                    pdfUrl: 'https://i.328888.xyz/2023/05/07/i1ZakU.jpeg',
                    thumbUrl: 'https://i.328888.xyz/2023/05/07/i1ZakU.jpeg'
                },
                {
                    id: 4,
                    title: '初中物理',
                    pdfUrl: 'https://i.328888.xyz/2023/05/07/i1Z7IJ.jpeg',
                    thumbUrl: 'https://i.328888.xyz/2023/05/07/i1Z7IJ.jpeg'
                },
                {
                    id: 5,
                    title: '初中历史',
                    pdfUrl: 'https://example.com/高中化学.pdf',
                    thumbUrl: 'https://i.328888.xyz/2023/05/07/i1Z7IJ.jpeg'
                },
                {
                    id: 6,
                    title: '初中地理',
                    pdfUrl: 'https://i.328888.xyz/2023/05/07/i1ZXvX.jpeg',
                    thumbUrl: "https://cdn2.thecatapi.com/images/MTg4MjM4Mg.jpg"
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
    },
    created() {
        axios.get("https://api.thecatapi.com/v1/images/search?limit=6").then(
            res => {
                // res.data[0].url
                for (let i = 0; i < res.data.length; i++) {
                    this.pdfList[i].thumbUrl = res.data[i].url
                    this.pdfList[i].pdfUrl = res.data[i].url
                }
            })
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