import http from "../axios";
import {toBodyString} from "../../utils"
import md5 from "../../md5"


//get
export const homeworkreport = (body = {}) => {
  let query = toBodyString(body);
  return http.get(`/work_report/home_work_info_list?${query}`,)
}

//登录
export const userlogin = (body = {}) => {
  let b = Object.assign({}, body);
  b.password = (b.password && b.username) ? md5(b.username + md5(b.password)) : '';
  return http.post(`/user/login`, b);
};

//post
export const addfinancial = (body = {}) => {
  let query = toBodyString(body);
  return http.post(`/warehouse/addFinanceV2`,query,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  })
};

//post
export const addpoint = (body = {}) => {
  return http.post(`location_area/v2/add_edit_area`,body,{
    headers: {
      'Content-Type': 'form-data'
    }
  })
}

//申请机器location_area/apply_vm
export const applyvm=(body={})=>{
  return http.post(`location_area/v2/apply_vm`,body)
}

/**
 * form表单提交
 */
export const feedback = (body = {}) => {
  return http.post(`/user/complaint`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 修改密码
 */
export const changepass = (body = {}) => {
  console.info(body)
  let b = Object.assign({}, body);
  b.oldpass = (b.oldpass && b.email) ? md5(b.email + md5(b.oldpass)) : '';
  b.newpass = (b.newpass && b.email) ? md5(b.email + md5(b.newpass)) : '';
  let query = toBodyString(b);
  return http.post(`/user/alterpasss`, query, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}


