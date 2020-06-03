import request from '@/utils/request'
import {getUser} from '@/utils/auth'
const group_name = 'spit'
const api_name = 'spit'
export default {
  spitthumbif(spitid){
    return request({
      url: `/${group_name}/${api_name}/ifthumbup/${spitid}`,
      method: 'get',
      headers: {
        token: getUser().token
    }

    })

  },
  thumbspit(spitid){
    return request({
      url: `/${group_name}/${api_name}/thumbup/${spitid}`,
      method: 'put',
      headers: {
        token: getUser().token
    }

    })

  },
  delthumbspit(spitid){
    return request({
      url: `/${group_name}/${api_name}/deletethumbup/${spitid}`,
      method: 'delete',
      headers: {
        token: getUser().token
    }

    })

  },
    search(page, size) {
        return request({
          url: `/${group_name}/${api_name}/search/1/${page}/${size}`,
          method: 'post',
 
        })
    },
    findById(id) {
        return request({
          url: `/${group_name}/${api_name}/${id}`,
          method: 'get'
        })
    },
    commentlist(id) {
        return request({
          url: `/${group_name}/reply/replylist/${id}`,
          method: 'get'
        })
    },
    thumbup(id){
        return request({
            url: `/${group_name}/${api_name}/thumbup/${id}`,
            method: 'put'
        })
    },
    comment(pojo) {
        return request({
          url: `/${group_name}/reply`,
          method: 'post',
          data: pojo,
          headers: {
            token: getUser().token
        }
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
    myspit(){
      return request({
        url: `/${group_name}/${api_name}/myspit` ,
        method: 'get',
        headers: {
          token: getUser().token
      }
      })
    },
    delmyspit(spitid){
      return request({
        url: `/${group_name}/${api_name}/${spitid}` ,
        method: 'delete',
        headers: {
          token: getUser().token
      }
      })

    }

}
