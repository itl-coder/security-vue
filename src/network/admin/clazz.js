import { request } from "../request";

// 定义新的文件进行引用,单独管理文件
export function getClazzData(pageNo, pageSize, clazzName) {
  return request({
    method: "get",
    url: `/admin/getClazzs/${pageNo}/${pageSize}`,
    params: { clazzName },
  });
}

export function saveOrUpdateGrade(grade) {
  return request({
    method: "post",
    url: `/admin/getClazzs/saveOrUpdateGrade`,
    data: grade,
  });
}

export function removeByIdOne(gradeId) {
  return request({
    method: "get",
    url: `/admin/getClazzs/remove/${gradeId}`,
  });
}

export function removeByIds(gradeIds) {
  return request({
    method: "delete",
    url: `/admin/getClazzs/deleteGrade`,
    data: gradeIds,
  });
}
