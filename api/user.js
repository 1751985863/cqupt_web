import request from '@/utils/request'
import {getUser} from '@/utils/auth'
const group_name = 'user'
const api_name = 'user'
export default {
    updatepassword(oldpassword,newpassword){
        return request({
            url:`/${group_name}/${api_name}/change/${oldpassword}/${newpassword}`,
            method: 'put',
            headers: {
                token: getUser().token
            }
        })

    },
    sendsms(mobile){
        return request({
            url:`/${group_name}/${api_name}/sendsms/${mobile}`,
            method: 'post'
        })
    },
    register(user,code){
        return request({
            url:`/${group_name}/${api_name}/register/${code}`,
            method: 'post',
            data: user
        })
    },
    login(mobile,password){
        return request({
            url:`/${group_name}/${api_name}/login`,
            method: 'post',
            data: {
                mobile,
                password
            }
        })
    },
    info(){
       return request({
           url: `/${group_name}/${api_name}/info`,
           method: 'get',
           headers: {
               token: getUser().token
           }
       }) 
    },
    saveinfo(user){
        return request({
            url: `/${group_name}/${api_name}/saveinfo`,
            method: 'put',
            data: user,
            headers: {
                token: getUser().token
            }

        })
    },
    findById(userId){
        return request({
            url:`/${api_name}/${userId}`,
            method: 'get'
        })
    },
    likeOrNo(nickname){ //通过nikename查询当前token用户是否关注他
        return request({
            url: `/user/user/wherelike/${nickname}`,
            method: 'get',
            headers: {
                token: getUser().token
            }
        })
    },
    delFollow(nikename){ //通过nikename取消当前token用户关注他
        return request({
            url: `/user/user/follow/${nikename}`,
            method: 'delete',
            headers: {
                token: getUser().token
            }
        })
    },
    doFollow(nikename){ //通过nikename添加当前token用户关注他
        return request({
            url: `/user/user/follow/${nikename}`,
            method: 'put',
            headers: {
                token: getUser().token
            }
        })
    },
    myfollow(){//我的关注
        return request({
            url: `/${group_name}/${api_name}/follow/myfollow`,
            method: 'get',
            headers: {
                token: getUser().token
            }
        })
    },
    myfans(){//我的粉丝
        return request({
            url: `/${group_name}/${api_name}/follow/myfans`,
            method: 'get',
            headers: {
                token: getUser().token
            }
        })
    },
    findpassword(mobile){
        return request({
            url: `/${group_name}/${api_name}/findpassword/${mobile}`,
            method: 'post'
        })
    },
    forget(mobile,checkcode,password){
        return request({
            url: `/${group_name}/${api_name}/forget/${mobile}/${checkcode}/${password}`,
            method: 'put'
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
    },
    finduserbynickname(nickname){
        return request({
            url: `/user/user/finduser//${nickname}`,
            method: 'get'
        })

    }
    

}