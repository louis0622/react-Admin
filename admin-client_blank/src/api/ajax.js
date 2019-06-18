//引入axios
import axios from 'axios'


//封装axios + Promise函数，进行统一调用
export default function ajax(url , data={}, method="GET"){

    return new Promise((resolve,reject) => {
        var promise
        // 1. 执行异步ajax请求(使用axios)
        //发请求
        if (method === "GET") {
            promise = axios.get(url,{
                params:data
            })
        }else{
            promise = axios.post(url,data)
        }
        promise.then(
                // 2. 如果成功了, 调用resolve(), 并指定成功的数据
            response =>{
                resolve(response.data)
            },
                // 3. 如果出错了, 不调用reject(), 并显示错误的提示
            error => {
                alert('请求出现错误: ' + error.message)

            }
        )
    })    
}



// async function login(){ 
//     //注意  把response换为result   其实result就是response.data
//         const result = await ajax('login',{
//             username:'admin',
//             password:'admin'
//         },'POST')
//         if (result.status === 0) {
            
//         }else{

//         }
// }




/* async function login(){
  const response = await ajax('/login', {
    username: 'admin',
    password: 'admin'
  }, 'POST')
  const result = response.data   
  if (result.status === 0) {

  } else {

  }
  
}
*/
