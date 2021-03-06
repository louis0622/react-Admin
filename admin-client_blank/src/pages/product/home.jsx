import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table, message } from "antd";
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants' 
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
const { Option } = Select;


export default class ProductHome extends Component {
  state = {
      loading:false,
      products: [],                    // 当前页的商品数组
      total: 0,                        // 所有商品的总个数
      searchType: 'productName',      // 根据什么来搜索, productName: 商品名, productDesc: 商品描述
      searchName: '',                 // 搜索的关键字
  };

//自定义函数区域
//更新商品的状态
 updateStatus = async (status, productId) => {
    const result = await reqUpdateStatus(productId, status)
    if (result.status===0) {
      message.success('更新状态成功')
      // 重新获取当前页显示
      this.getProducts(this.pageNum)
    }
  }


//初始化列信息
  initColumns=()=>{
    this.columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          render: (price) => '¥' + price
        },
        {
          title: '状态',
          width: 100,
          render: (product) => {
           const {status, _id} = product
           const btnText = status===1 ? '下架' : '上架'
           const text = status===1 ? '在售' : '已下架'
           return (
             <span>
               <Button type="primary" onClick={() => this.updateStatus(status === 1 ? 2 : 1, _id)}>{btnText}</Button>
               <span>{text}</span>
             </span>
           )
          }
        },
        {
          title: '操作',
          width: 100,
          render: (product) => (
           <span>
              <LinkButton onClick={() => this.props.history.push('/product/detail', product)}>详情</LinkButton>
             <LinkButton>修改</LinkButton>
           </span>
          )
        },
      ]

  }

  
  
 //获取指定分页页码的商品列表数据
  getProducts = async (pageNum) => {
    this.pageNum = pageNum
    this.setState({ loading: true })
    const { searchType, searchName} = this.state
    let result
    if (!searchName) { 
      result = await reqProducts({ pageNum, pageSize: PAGE_SIZE })
    } else {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName})
    }
    this.setState({ loading: false })
    if (result.status===0) {
      const {total, list} = result.data
      // 更新状态
      this.setState({
        total,
        products: list
      })
    }
  }


//生命周期函数区域
  componentWillMount(){
    this.initColumns()
  }
  componentDidMount () {
    this.getProducts(1)
  }



  render() {
    const {loading, products, total, searchType, searchName } = this.state
    const title = (
      <span>
        <Select
          value={searchType}
          onChange={value => this.setState({ searchType: value })}
          style={{ width: 150 }}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{ margin: "0 15px", width: 150 }}
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>
          搜索
        </Button>
      </span>
    );
    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/product/add-update")}
      >
        <Icon type="plus" />
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={products}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total,
            // 监视页码改变的监听
            onChange:this.getProducts           
          }}
        />
      </Card>
    );
  }
}
