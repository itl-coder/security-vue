import { request } from "../request";

// 定义新的文件进行引用,单独管理文件
export function getAdminData(pageNo, pageSize, adminUserName) {
  return request({
    method: "get",
    url: `/admin/getAdmins/${pageNo}/${pageSize}`,
    params: { adminUserName },
  });
}

export function saveOrUpdateGrade(grade) {
  return request({
    method: "post",
    url: `/admin/saveOrUpdateGrade`,
    data: grade,
  });
}

export function removeByIdOne(gradeId) {
  return request({
    method: "get",
    url: `/admin/remove/${gradeId}`,
  });
}

export function removeByIds(gradeIds) {
  return request({
    method: "delete",
    url: `/admin/deleteGrade`,
    data: gradeIds,
  });
}
