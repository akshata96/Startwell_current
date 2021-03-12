import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import {BrowserRouter as Router} from 'react-router-dom'
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Homepage  from './HomePage.js'


import 'antd/dist/antd.css';
import { Button, Typography} from 'antd';
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Card, Col, Row, Image} from 'antd';

import image from './Assets/wound.jpg'

import logo from './Assets/logo.PNG'

const { Header, Content, Footer } = Layout;



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      /*showAdminBoard: false,
      currentUser: undefined, */
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        /*showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),*/
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, /* showModeratorBoard, showAdminBoard */ } = this.state;

    return (
      <div>
       <Layout className="layout" >
      
      <Header>
        <div className="logo" />
  
       
        
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" style={{float:"right"}}><Avatar size={64} style={{float:'right'}} icon={<UserOutlined />} /></Menu.Item>  
          <Menu.Item key="2" style={{float:"right"}}>About</Menu.Item>
          <Menu.Item key="3" style={{float:"right"}}>Contact Us</Menu.Item>
          <Menu.Item key="4" style={{float:"right"}}>Self Help</Menu.Item>
          <Menu.Item key="5" style={{float:"right"}}>Home</Menu.Item>
          <img
            width={50}
            src={logo}
            />
          
        </Menu>
      </Header>
     
    </Layout>
    <Router>
      <header className="App-header">
      <Route 
        exact 
        path = {"/Homepage"} 
        render = {props =>(
         <Homepage />
        )}
        />
      </header>
      </Router>

        <div className="container mt-3">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
