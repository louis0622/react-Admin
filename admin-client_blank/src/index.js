import React from 'react';
import ReactDOM from 'react-dom';

//入口js文件
import App from './App';
import './api';


import memoryUtils from './utils/memoryUtils'
import {getUser} from './utils/StorageUtils'

//读取local的user值  保存内存中
//JSON.parse()    
//JSON 通常用于与服务端交换数据。在接收服务器数据时一般是字符串。可以使用 
//JSON.parse() 方法将数据转换为 JavaScript 对象。

const user= getUser()

memoryUtils.user = user; 

ReactDOM.render( < App / > , document.getElementById('root'));

