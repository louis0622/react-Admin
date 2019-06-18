/*
1.包含n个接口请求函数的模块
2.根据接口文档进行编写
3.调用自定义ajax请求函数发请求
4.每一个函数的返回值都是promise对象
*/
import ajax from "./ajax"
const BASE  = ''

export const reqLogin = (username,password)=> ajax(BASE +'./login',{username,password},'POST')


//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')


// 测试
reqLogin('admin', 'admin').then(result => {
  console.log('result', result)
})
