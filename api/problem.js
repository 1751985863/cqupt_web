import request from '@/utils/request'
import {getUser} from '@/utils/auth'
const group_name = 'qa'
const api_name = 'problem'
export default {
    spitthumbif(problemid){
        return request({
          url: `/${group_name}/${api_name}/ifthumbup/${problemid}`,
          method: 'get',
          headers: {
            token: getUser().token
        }
    
        })
    
      },
      thumbspit(problemId){
        return request({
          url: `/${group_name}/${api_name}/thumbup/${problemId}`,
          method: 'put',
          headers: {
            token: getUser().token
        }
    
        })
    
      },
      delthumbspit(problemId){
        return request({
          url: `/${group_name}/${api_name}/nothumbup/${problemId}`,
          method: 'delete',
          headers: {
            token: getUser().token
        }
    
        })
    
      },
    list(type,label,page,size){
        return request({
            url:`/${group_name}/${api_name}/${type}/${label}/${page}/${size}`,
            method: 'get'
        })
    },
    save(pojo,labelid){
        return request({
            url: `/${group_name}/${api_name}/${labelid}`,
            method: `post` ,
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
    commentlist(id) {
        return request({
          url: `/${group_name}/reply/problemReply/${id}`,
          method: 'get'
        })
    },
    reply(pojo,problemid){
        return request({
            url: `/${group_name}/reply/addreply/${problemid}`,
            method: `post` ,
            data: pojo,
            headers: {
                token: getUser().token
            }
            
        })
    },
    listByNikenameByRequster(nikename){ //根据用户查询提出的问题
        return request({
            url: `/${group_name}/${api_name}/findproblem/${nikename}`,
            method: `get` 
            
        })
    },
    listByNikenameByRespondent(nikename){ //根据用户查询提出的回复
        return request({
            url: `/${group_name}/reply/findreply/${nikename}`,
            method: `get` 
            
        })
    },
    myproblem(){
        return request({
            url: `/${group_name}/${api_name}/myproblem`,
            method: 'get',
            headers: {
                token: getUser().token
            }
        })
    },
    myreply(nickname){
        return request({
            url: `/${group_name}/${api_name}/findproblem/reply/${nickname}`,
            method: 'get'
        })
    },
    delmyprobelm(id){
      return request({
        url: `/${group_name}/${api_name}/${id}` ,
        method: 'delete',
        headers: {
          token: getUser().token
      }
      })

    }



}