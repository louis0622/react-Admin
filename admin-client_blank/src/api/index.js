/*
1.包含n个接口请求函数的模块
2.根据接口文档进行编写
3.调用自定义ajax请求函数发请求
4.每一个函数的返回值都是promise对象
*/
import { message } from 'antd'
import jsonp from 'jsonp'
import ajax from "./ajax"
const BASE  = ''

export const reqLogin = (username,password)=> ajax(BASE +'./login',{username,password},'POST')

//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

// 测试
reqLogin('admin', 'admin').then(result => {
  // console.log('result', result)
})

//获取一级/二级列表数据请求
export const reqCategory = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

//更新数据请求
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASE + '/manage/category/update',{categoryId,categoryName},'POST')

//添加数据请求
export const reqAddCategory = (categoryName,parentId) => ajax(BASE + '/manage/category/add',{categoryName,parentId},'POST')



// 获取商品分页列表
export const reqProducts = ({pageNum, pageSize}) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

// 根据商品名称/描述搜索获取商品分页列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchType, // 搜索类型 值为'productDesc' / 'productName'
  searchName // 搜索的关键字
}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName
})

// 对商品进行上架/下架处理
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {
  productId,
  status
}, 'POST')

// 根据分类ID获取分类
export const reqCategory2 = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})


// 根据获取分类
// export const reqAddOrUpdateCategory = () =>ajax (BASE + '/manage/', {})








//发送jsonp获取天气请求
export const reqWeather = (city) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  
  return new Promise((resolve,reject) => {
    //执行请求
    setTimeout(()=>{
      jsonp(url, {} ,(error,data)=>{
        if (!error && data.status === 'success') {
          const {dayPictureUrl,weather} = data.results[0].weather_data[0]
          
          //成功了，调用resolve的值
          resolve({dayPictureUrl,weather})
        } else {
          message.error('获取天气信息失败！')
        }
      })

    },2000)
  })
}


