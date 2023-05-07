<template>
    <el-upload
            class="avatar-uploader"
            name="multipartFile"
            action="http://localhost:8080/upload/headerImgUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>

export default {
    name: "AvatarUploader",
    data() {
        return {
            imageUrl: ''
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log("handleAvatarSuccess", res.data)
            this.imageUrl = `http://localhost:8080/download?name=${res.data}`;
        },
        beforeAvatarUpload(file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Define allowed image types
            const isAllowed = allowedTypes.includes(file.type); // Check if the selected file type is allowed
            const isLt2M = file.size / 1024 / 1024 < 2; // Check if the file size is less than 2MB

            if (!isAllowed) {
                this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isAllowed && isLt2M;
        }
    },
};
</script>

<style scoped>
.avatar-uploader {
    display: inline-block;
    width: 150px;
    height: 150px;
    border-radius: 6%;
    border: 1px dashed #d9d9d9;
    background-color: rgba(255, 255, 255, 0.98);
    overflow: hidden;
    position: relative;
}

.avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.avatar-uploader-icon {
    font-size: 42px;
    color: #8c939d;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
