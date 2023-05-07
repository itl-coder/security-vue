import { request } from "../request";

// 定义新的文件进行引用,单独管理文件
export function headerImgUpload(name) {
  return request({
    method: "post",
    url: `/upload/headerImgUpload`,
    data: {
      name,
    },
  });
}

