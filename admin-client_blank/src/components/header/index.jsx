import React, { Component } from "react";
import "./index.less";
import { withRouter } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import menuList from "../../config/menuConfig.js";
import { formateDate } from "../../utils/dateUtils";
import {removeUser} from "../../utils/StorageUtils";
import { reqWeather } from "../../api";
import LinkButton from "../link-button/index";
import { Modal } from "antd";


class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),       //当前的时间
        dayPictureUrl: "",                          //天气显示的图片
        weather: ""                                 //天气显示的文本
    };

//自定义函数区域
//刷新时间
    updateCurrentTime = () => {
        this.timer = setInterval(() => {
            const currentTime = formateDate(Date.now());
            this.setState({ currentTime });
        }, 1000);
    };

//得到当前路径下的title
    getTitle = () => {
        const path = this.props.location.pathname;
        var title = "";
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                const cItem = item.children.find(item => path.indexOf(item.key) === 0);
                if (cItem) {
                    title = cItem.title;
                }
            }
        });
        return title;
    };

//获取天气图片
    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather("北京");
        this.setState({ dayPictureUrl, weather });
    };

//定义退出登录按钮
    logout = () => {
        const {user} = memoryUtils;
        // console.log({user})
        Modal.confirm({
            title: `Hello，${user.username}， 你真的确认要退出吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk: () => {  
                removeUser();           // local中的数据
                memoryUtils.user = {};  // 内存中的user
                this.props.history.replace("/login");  
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    };

//定义生命周期勾子区域

    componentDidMount() {
        this.updateCurrentTime();
        this.getWeather();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }


    render() {
        const { currentTime, dayPictureUrl, weather } = this.state;
        const { user } = memoryUtils;
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>你好，{user.username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
