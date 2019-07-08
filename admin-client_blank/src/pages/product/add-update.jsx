import React, { Component } from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Button,
  message,
  Cascader
} from 'antd'

import LinkButton from '../../components/link-button'
import {reqCategory} from '../../api'
const { Item } = Form




/* 
商品的添加/修改子路由组件
*/
class ProductAddUpdate extends Component {
  state = {
    options:[
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
      },
    ]
  }


//自定义函数区域

  getSubmit=()=>{
    this.props.form.validateFields((err,values)=>{
      if (!err) {
        console.log("成功了")
      }
    })
  }
//获取一级/二级列表显示数据

  getCategory=(parentId)=>{
    const result =  reqCategory(parentId)
    if (result.status === "0") {
      
    } 
  }
  
//对价格进行验证
validatePrice=(rule,value,callback)=>{
  if (value < 0 ) {
    callback("价格不能小于零")
  }else(
    callback()
  )
}


//显示一级分类列表下的二级分类列表
loadData = selectedOptions => {
  //得到一级列表数据
  const targetOption = selectedOptions[0];
  //显示loading效果
  targetOption.loading = true;
  setTimeout(() => {
    targetOption.loading = false;
    targetOption.children = [
      {
        label: `${targetOption.label} Dynamic 1`,
        value: 'dynamic1',
      },
      {
        label: `${targetOption.label} Dynamic 2`,
        value: 'dynamic2',
      },
    ];
    this.setState({
      options: [...this.state.options],
    });
  }, 1000);
};


//生命周期函数区域
  componentDidMount(){
    this.getCategory()
  }
  


  render() {
    const { getFieldDecorator } = this.props.form

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{ fontSize: 20 }} />
        </LinkButton>
        添加商品
      </span>
    )

    // 指定form的item布局的对象
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card title={title}>
        <Form {...formLayout}>
          <Item label="商品名称">
            {getFieldDecorator("name", {
              initialValue: "",
              rules: [{ required: true, message: "商品名称必须输入" }]
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc", {
              initialValue: "",
              rules: [{ required: true, message: "商品描述必须输入" }]
            })(<Input placeholder="请输入商品描述" />)}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price", {
              initialValue: "",
              rules: [
                { required: true, message: "商品价格必须输入" },
                { validator: this.validatePrice }
              ]
            })(<Input type="number" placeholder="请输入商品价格" />)}
          </Item>
          <Item label="商品分类">
            <Cascader
              options={this.state.options}
              loadData={this.loadData}
            />
          </Item>
          <Item label="商品图片">
            <span>商品图片列表</span>
          </Item>
          <Item label="商品详情">
            <span>商品详情信</span>
          </Item>
          <Button type="primary" onClick={this.getSubmit}>
            提交
          </Button>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductAddUpdate)