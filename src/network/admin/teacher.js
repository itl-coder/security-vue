import { request } from "../request";

// 定义新的文件进行引用,单独管理文件
export function getTeacherData(pageNo, pageSize, teacherName) {
  return request({
    method: "get",
    url: `/teacher/getTeacher/${pageNo}/${pageSize}`,
    params: { teacherName },
  });
}

export function saveOrUpdateTeacher(grade) {
  return request({
    method: "post",
    url: `/teacher/getTeacher/save`,
    data: grade,
  });
}

export function removeByIdOne(gradeId) {
  return request({
    method: "get",
    url: `/teacher/getTeacher/remove/${gradeId}`,
  });
}

export function removeByIds(gradeIds) {
  return request({
    method: "delete",
    url: `/teacher/getTeacher/deleteTeacher`,
    data: gradeIds,
  });
}

