import React, {Component} from 'react'
import logo from '../../assets/img/logo.png'
import './login.less'
import {Form, Icon, Input, Button,message} from 'antd';


import { Redirect } from 'react-router-dom'
import { reqLogin } from '../../api';

import memoryUtils from '../../utils/memoryUtils'
import {saveUser} from '../../utils/StorageUtils'



//一级登录路由
let Item = Form.Item;
class Login extends Component {
  handleSubmit = (event) => {
    //阻止浏览器默认行为
    event.preventDefault();
    // 所有表单进行验证
     this.props.form.validateFields(async(err, values) => {
      if (!err) { 
        // 如果验证成功了    console.log('发送ajax请求: ', values)
        const {username,password} = values;          //拿取数据
        const result = await reqLogin(username, password); //调用  reqLogin()；
        if (result.status === 0) {

          const user = result.data;          //保存用户数据

          saveUser(user)      //保存在local 文件中
         
          memoryUtils.user = user;      //保存在内存中
          // console.log(user)
          this.props.history.replace('/');  //跳转admin页面
 
        } else {  
        //如果验证失败了
            message.error(result.msg, 2)
        }
      }
    })

    //读取数据
    // const username =this.props.form.getFieldsValue('username');
    // const password =this.props.form.getFieldsValue('password');
    // console.log(username,password);

  };

  // 用自定义方法验证密码进行
 validatePwd = (rule, value='', callback) => {
    value = value.trim()
    if (!value) {
      callback('必须输入密码')  // 指定要显示的提示内容 
    } else if (value.length<4) {
      callback('密码长度不能小于4位') 
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成!')
    } else {
      callback() // 验证通过
    }
}
  render() {
    const { getFieldDecorator } = this.props.form;

    // 访问login界面, 如果已经登陆, 自动跳转到admin
    if (memoryUtils.user._id) {
      return <Redirect to="/"/>
    }


    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username',
                  {//校验输入信息，配置规则
                    rules: [
                        { required: true, message: '请输入用户名' },
                        { min: 4, message: '用户名长度不能小于4位' },
                        { max: 12, message: '用户名长度不能大于12位' },
                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是由英文,数字,或下划线组成!' },
                      ], 
                  }   
                )(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }}/>} 
                    placeholder="Username"
                />)
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password',
                  //校验输入密码，配置规则
                  {
                    rules: [{validator: this.validatePwd},],
                  }
                )(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }}/>}
                    type="password" placeholder="Password"
                  />)
              }  
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                  登 录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

//暴露 高阶函数 Form.create()(Login)

export default Form.create()(Login) ;

