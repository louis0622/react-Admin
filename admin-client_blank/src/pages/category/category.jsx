import React, { Component } from 'react'
import { Card, Table, Button, Icon, Modal, message } from 'antd'
import { reqCategory, reqUpdateCategory , reqAddCategory } from '../../api'
import LinkButton from '../../components/link-button'
import UpdateForm from './update-form'
import AddForm from './add-form'

//Admin的分类管理子路由
export default class Category extends Component {

  state = {
    parentId: '0',                  // 父分类Id，一级
    parentName: '',
    categorys: [],
    subCategorys: [],
    loading: false,
    showStatus: 0,                  // 0: 都不显示, 1: 修改, 2: 添加
  }
  
//自定义函数区域
//获取一级或二级列表
  getCategory = async (pId) => {
    const parentId = pId || this.state.parentId
    this.setState({ loading: true });
    const result = await reqCategory(parentId);
    this.setState({ loading: false });
    if (result.status === 0) { 
      const categorys = result.data;              //得到的数组可能是一级或二级
      if (parentId === '0') {                     //判断得到的数组是一级或二级
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
    }
  }

  //点击显示某个列表
  //setState()是异步的, 在后面直接读取状态数据是旧的数据，要用callback
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name,
    }, () => {
      this.getCategory()
    })
  }

//初始化指定表格列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => {   // 参数为当前行的数据
          return (
            <span>
              <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
              {
                this.state.parentId === '0' && <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton>
              }
            </span>
          )
        }
      },
    ];
  }

//回退一级列表
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
}

//修改分类界面显示
  showUpdate = (category) => {
    this.category = category    //保存category
    this.setState(
      { showStatus:1 }
    )
  }

//更新分类
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //隐藏
        this.setState(
          { showStatus:0 }
        )
        const categoryName = this.form.getFieldValue('categoryName')        //得到输入的名称     
        this.form.resetFields()                                             //form.resetFields()重置数据    
        const categoryId = this.category._id         // 得到分类的_id                                  
        const result = await reqUpdateCategory({ categoryId, categoryName });     //发请求   
        console.log(result)
        if (result.status === 0) {
          message.success('更新分类成功') 
          this.getCategory()
        }
      } 
    })
  }

//添加分类
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //隐藏列表
        this.setState(
          { showStatus:0 }
        ) 
        //获取输入的数据
        const { categoryName, parentId } = this.form.getFieldsValue()
        //重置数据
        this.form.resetFields()          
        //发请求
        const result = await reqAddCategory( categoryName,parentId );
      
        if (result.status === 0) {
          message.success('添加成功')
          //添加一级分类
          if (parentId === '0') {
            this.getCategory('0')
          } else if(parentId === this.state.parentId){
            this.getCategory()
          } 
        }   
      } 
    })
  }

//定义生命周期勾子区域
  componentDidMount() {
    this.getCategory()
  }
  
  componentWillMount() {
    this.initColumns()
  }

//渲染区域
  render() {
     //读取当前的分类
    const { categorys, parentId, parentName, subCategorys, loading, showStatus } = this.state;
    const category = this.category || {}
    //定义左侧标题
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type="arrow-right"></Icon>&nbsp;&nbsp;
        <span>{parentName}</span>
      </span>
    )
    //定义右侧按钮
    const extra = (
      <Button type="primary" onClick={() => this.setState({ showStatus: 2 })}>
        <Icon type="plus" />
        添加
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={parentId === "0" ? categorys : subCategorys}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          okText="确认"
          cancelText="取消"
          title="更新分类"
          visible={showStatus === 1}
          onOk={this.updateCategory}
          onCancel={() => {
            this.form.resetFields();
            this.setState({ showStatus: 0 });
          }}
        >
          <UpdateForm
            categoryName={category.name}
            setForm={(form) => this.form = form}
          />
        </Modal>
        <Modal
          okText="确认"
          cancelText="取消"
          title="添加分类"
          visible={showStatus === 2}
          onOk={this.addCategory}
          onCancel={() => {
            this.form.resetFields();
            this.setState({ showStatus: 0 });
          }}
        >
          <AddForm
            categorys={categorys}
            parentId={parentId}
            setForm={(form) => this.form = form}
          />
        </Modal>
      </Card>
    );
  }
}
