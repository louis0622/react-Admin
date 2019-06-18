import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import './index.less'

//引入Menu导航菜单
import { Menu, Icon,} from 'antd';
const { SubMenu,Item}  = Menu;

export default class LeftNav extends Component {
    render() {
        return (
          <div className="left-nav">
            <Link to="/home" className="left-nav-header">
              <img src={logo} alt="logo" />
              <h1>欢迎光临</h1>
            </Link>

            <Menu
              mode="inline"
              theme="dark"
            >
              <Menu.Item key="1">
                <Icon type="home" theme="twoTone"/>
                <span>首页</span>
              </Menu.Item>
              <SubMenu
                key="/products"
                title={
                  <span>
                    <Icon type="shop" theme="twoTone"/>
                    <span>商品管理</span>
                  </span>
                }
              >
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        );
    }
}
