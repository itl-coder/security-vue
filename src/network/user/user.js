import { request } from "../request";

// 定义新的文件进行引用,单独管理文件
export function loginNetwork(ruleForm, rememberMe) {
  return request({
    method: "post",
    url: "/login",
    // post
    data: { ...ruleForm, rememberMe },
  });
}

export function refNewCode() {
  return request({
    method: "get",
    url: "/common/captcha",
  });
}

export function getHello() {
  return request({
    method: "get",
    url: "/hello",
  });
}

export function logoutHandle() {
  return request({
    method: "post",
    url: "/logout",
  });
}

// 定义新的文件进行引用,单独管理文件
export function getUserData(pageNo, pageSize, username) {
  return request({
    method: "get",
    url: `/user/getUsers/${pageNo}/${pageSize}`,
    params: { username },
  });
}

export function saveUser(user) {
  return request({
    method: "post",
    url: `/user/save`,
    data: user,
  });
}

export function removeByIdOne(id) {
  return request({
    method: "get",
    url: `/user/remove/${id}`,
  });
}

export function removeByIds(userIds) {
  return request({
    method: "delete",
    url: `/user/deleteUser`,
    data: userIds,
  });
}
