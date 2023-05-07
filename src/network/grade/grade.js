import { request } from "../request";

// 定义新的文件进行引用,单独管理文件
export function getGradeData(pageNo, pageSize, gradeName) {
  return request({
    method: "get",
    url: `/admin/getGrades/${pageNo}/${pageSize}`,
    // get 请求传参方式  params: { gradeName },
    // post 是请求体传参,所以是data: {}
    params: { gradeName },
  });
}

export function saveOrUpdateGrade(grade) {
  return request({
    method: "post",
    url: `/admin/getGrades/saveOrUpdateGrade`,
    data: grade,
  });
}

export function removeByIdOne(gradeId) {
  return request({
    method: "get",
    url: `/admin/getGrades/remove/${gradeId}`,
  });
}

export function removeByIds(gradeIds) {
  return request({
    method: "delete",
    url: `/admin/getGrades/deleteGrade`,
    data: gradeIds,
  });
}
