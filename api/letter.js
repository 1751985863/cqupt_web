import request from '@/utils/request'
import {getUser} from '@/utils/auth'
const group_name = 'user'
const api_name = 'letter'
export default {
    sendletter(targetname,pojo){ //发送私信
        return request({
            url:`/${group_name}/${api_name}/sendletter/${targetname}`,
            method: 'post',
            data: pojo,
            headers: {
              token: getUser().token
          }
            
        })
    },
    findnoread(){ //根据token获取私信
        return request({
            url:`/${group_name}/${api_name}/findnoread/1/100`,
            method: 'get',
            headers: {
              token: getUser().token
          }
            
        })
    },
    readletter(letterid){ //根据letterid查询，请求一次就表示已读
        return request({
            url:`/${group_name}/${api_name}/${letterid}`,
            method: 'get',
            headers: {
              token: getUser().token
          }
            
     })

    },
    deleteletter(letterid){ //根据letterid查询，请求一次就表示已读
        return request({
            url:`/${group_name}/${api_name}/${letterid}`,
            method: 'delete',
            headers: {
              token: getUser().token
          }
            
     })

    },
    lettersend(){
        return request({
            url:`/${group_name}/${api_name}/lettersend/1/100`,
            method: 'get',
            headers: {
              token: getUser().token
          }
            
     })

    },
    letterget(){
        return request({
            url:`/${group_name}/${api_name}/letterget/1/100`,
            method: 'get',
            headers: {
              token: getUser().token
          }
            
     })

    }

    

}