import store from 'store'

//读取user数据
export function getUser() { 
    // return JSON.parse(localStorage.getItem('USER-KEY') || '{}')
    //直接return  {}对象
    return store.get('USER-KEY') || {};

}
//保存user数据
export function saveUser(user) { 
    // localStorage.setItem('USER-KEY',JSON.stringify(user))
    store.set('USER-KEY',user)

}
//删除user数据
export function removeUser(user) { 
    // localStorage.setItem('USER-KEY',JSON.stringify(user))
    store.remove('user')

}