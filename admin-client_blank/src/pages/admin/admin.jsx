import React, { Component } from "react";

//引入admin下的所有子路由
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

//引入Header和LeftNav组件
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'

import { Redirect , Switch, Route} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'


//引入Layout布局
import { Layout } from 'antd'
const { Footer, Sider, Content } = Layout;


//一级后台管理路由
export default class Admin extends Component {
  render() {
    // 如果当前没有登陆(内存的user中没有_id)
    const user = memoryUtils.user;
    if (!user._id) {
      //实现路由跳转
      return <Redirect to="/login"/> 
    }
    return (
      <Layout style={{height : '100%'}}>
          <Sider>
            <LeftNav/>
          </Sider>
        <Layout>
          <Header/>
          <Content style={{backgroundColor:'#fff', margin: 30}}>
            <Switch>
              <Route path='/home' component={Home} />
              <Route path='/category' component={Category} />
              <Route path='/product' component={Product} />
              <Route path='/role' component={Role} />
              <Route path='/user' component={User} />
              <Route path='/charts/bar' component={Bar} />
              <Route path='/charts/line' component={Line} />
              <Route path='/charts/pie' component={Pie} />
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center', color: '#aaaaaa'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    )
  }
}
