//公共校验
import { ElNotification } from 'element-plus'
//邮箱校验
const emailRegex = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
export const emailCheck=(Val:string)=>{ 
        if(! emailRegex.test(Val)){
             ElNotification.info({
                   title: '提示',
                   message: '你输入的邮箱不正确！',
                   showClose: false,
                   duration:1000,
                 })
                 throw new Error("邮箱错误")
           }
}
//密码校验
const passWordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,16}$/;
export const passWordCheck=(Val:string)=>{ 
        if(! passWordRegex.test(Val)){
             ElNotification.info({
                   title: '提示',
                   message: '密码必须包含数字和字母且大于6位小于16位',
                   showClose: false,
                   duration:2000
                 })
                 throw new Error("密码格式错误")
           }
}
