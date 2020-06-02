import request from '@/utils/request'
import {getUser} from '@/utils/auth'
const group_name = 'gathering'
const api_name = 'gathering'
export default {
  getList() {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'get'
    })
  },
  search(page, size, searchMap) {
    return request({
      url: `/${group_name}/${api_name}/search/${page}/${size}`,
      method: 'post',
      data: searchMap
    })
  },
  save(pojo) {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo
    })
  },
  findById(id) {
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'get'
    })
  },
  update(id, pojo) {
    if (id === null || id === '') {
      return this.save(pojo)
    }
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'put',
      data: pojo
    })
  },
  deleteById(id) {
    return request({
      url: `/${group_name}/${api_name}/${id}`,
      method: 'delete'
    })
  },
  mygathering(){
    return request({
      url: `/${group_name}/usergath`,
      method: 'get',
      headers: {
          token: getUser().token
      }
    })
  },
  gatheringsendsms(mobile){
    return request({
      url: `/${group_name}/usergath/deletegathering/sendsms/${mobile}`,
      method: 'post'
    })
  },
  delmygathering(gathid,mobile,checkcode){
    return request({
      url: `/${group_name}/usergath/${gathid}/${mobile}/${checkcode}`,
      method: 'delete'
    })
  },
  joingathering(gathid,mobile,checkcode){
    return request({
      url: `/${group_name}/usergath/${gathid}/${mobile}/${checkcode}`,
      method: 'post',
      headers: {
          token: getUser().token
      }
    })
  },
  joingatheringsendsms(mobile){
    return request({
      url: `/${group_name}/usergath/joingathering/sendsms/${mobile}`,
      method: 'post',
      headers: {
          token: getUser().token
      }
    })
  },
  joinorno(gathid){
    return request({
      url: `/gathering/usergath/isjoin/${gathid}`,
      method: 'get',
        headers: {
            token: getUser().token
        }
    })
  }


 
  
}
