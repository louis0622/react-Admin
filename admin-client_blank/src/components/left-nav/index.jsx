import React, { Component } from "react";
import { Link , withRouter} from "react-router-dom";
import logo from "../../assets/img/logo.png";
import "./index.less";
import menuList from '../../config/menuConfig'


import { Menu, Icon } from "antd";
const { SubMenu, Item } = Menu;


class LeftNav extends Component {

//定义getMenuNodes函数，保存数据
//根据menu中数据中数组生成包含<Item> / <SubMenu>的数组

  getMenuNodes=(menuList)=>{
    // 得到当前请求的路径
    const path = this.props.location.pathname
    return menuList.reduce((pre,item) => {
    //添加item
        if (!item.children) {
          pre.push(
            <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
          )
     }else{
      //添加 <SubMenu>
      // 如果请求的是当前item的children中某个item对应的path, 当前item的key就是openKey
      const cItem = item.children.find((cItem)=>{
        return cItem.key === path
      })
      if (cItem) { 
        // 当前请求的是某个二级菜单路由
        this.openKey = item.key
      }
      pre.push(
        <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
      {this.getMenuNodes(item.children)}
          </SubMenu>
      )

     }
     return pre
    } ,[])
}


// 在第一次render()之后componentDidMount (){}
// 在第一次render()之前componentWillMount (){}
  
  componentWillMount () {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    //将请求的路径作为key
    const selectedKey = this.props.location.pathname
    
    //得到SubMenu的值
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>欢迎光临</h1>
        </Link>
        <Menu 
            mode="inline"
            theme="dark"
            selectedKeys={[selectedKey]}
            defaultOpenKeys={[openKey]}
        >  
        {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

//withRouter作用是将LeftNav非路由组件包装成路由组件     
export default withRouter(LeftNav)