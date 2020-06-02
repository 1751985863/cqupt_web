import request from '@/utils/request'
import {getUser} from '@/utils/auth'
const group_name = 'article'
const api_name = 'article'
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
  searchByKeyWord(keyword,page, size, searchMap) {
    return request({
      url: `/search/${api_name}/search/${keyword}/${page}/${size}`,
      method: 'get',
      data: searchMap
    })
  },
  save(pojo) {
    return request({
      url: `/${group_name}/${api_name}`,
      method: 'post',
      data: pojo,
      headers: {
        token: getUser().token
    }

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
      method: 'delete',
      headers: {
        token: getUser().token
    }
    })
  },
  examine(id){
    return request({
      url: `/${group_name}/${api_name}/examine/${id}`,
      method: 'put'
    })
  },
  myarticle(){
    return request({
      url: `/${group_name}/${api_name}/myarticle`,
      method: 'get',
      headers: {
          token: getUser().token
      }
    })
  },
  ispublic(articleid){
    return request({
      url: `/${group_name}/${api_name}/ispublic/${articleid}`,
      method: 'put',
      headers: {
          token: getUser().token
      }
    })
  }
  
  
}
