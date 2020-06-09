import request from '@/utils/request'
import {getUser} from '@/utils/auth'
const group_name = 'friend'
const api_name = 'circle'
export default {
  circleJoinByToken(){
    return request({
      url: `/${group_name}/${api_name}/ifjoin`,
      method: 'put',
      headers: {
        token: getUser().token
    }
    })
  },
  joinCricle(circleid){
    return request({
      url: `/${group_name}/${api_name}/joincircle/${circleid}`,
      method: 'post',
      headers: {
        token: getUser().token
    }
    })
  },
  quitCricle(circleid){
    return request({
      url: `/${group_name}/${api_name}/quitcircle/${circleid}`,
      method: 'delete',
      headers: {
        token: getUser().token
    }
    })
  },
  getUser(circleid){
    return request({
      url: `/${group_name}/${api_name}/getusers/${circleid}`,
      method: 'get'
    })

  }

  
}
