import React, { Component } from "react";
import {BrowserRouter,HashRouter,Switch,Route} from "react-router-dom";
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";


//应用根组件
export default class App extends Component {
  render() {
    return (
      /* 路由注册 */
      <HashRouter>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </HashRouter>
    );
  }
}
