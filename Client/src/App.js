import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import {BrowserRouter as Router} from 'react-router-dom'
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Home  from './components/home.component';
import Newsletter from "./components/Newsletter.component";


import 'antd/dist/antd.css';

import { UserOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Avatar, Card, Col, Row, Image} from 'antd';


import logo from './Assets/logo.PNG'
import Success from "./components/success.component";

const { Header, Content, Footer } = Layout;



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser:undefined,
      showModeratorBoard: false,
  
    };
  }

  componentDidMount() {
    const localStorage = AuthService.getCurrentUser();
    console.log("** APP Mount " + localStorage);
    if(localStorage) {
    if (localStorage.user) {
      this.setState({
        currentUser: localStorage.user,
      });
    }
  }
  }

  logOut() {
    console.log("logout");
    this.state = {
      currentUser:undefined
  
    };
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
       <Layout className="layout" >
      
      <Header>
        <div className="logo" />
  
       
        {currentUser ? (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" style={{float:"right"}} onClick={this.logOut}><Link to={"/login"} > Logout</Link></Menu.Item>  
          <Menu.Item key="2" style={{float:"right"}}>About</Menu.Item>
          <Menu.Item key="3" style={{float:"right"}}>Contact Us</Menu.Item>
          <Menu.Item key="4" style={{float:"right"}}><Link to={"/Newsletter"} >Newsletter</Link></Menu.Item>
          <Menu.Item key="5" style={{float:"right"}}><Link to={"/home"} >Home</Link></Menu.Item>
          <img
            width={50}
            src={logo}
            />
          
        </Menu>
        ) :(

          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" style={{float:"right"}}><Link to={"/login"} > <Avatar size={64} style={{float:'right'}} icon={<UserOutlined />} /></Link></Menu.Item>  
          <Menu.Item key="2" style={{float:"right"}}>About</Menu.Item>
          <Menu.Item key="3" style={{float:"right"}}>Contact Us</Menu.Item>
          <Menu.Item key="4" style={{float:"right"}}><Link to={"/Newsletter"} >Newsletter</Link></Menu.Item>
          <Menu.Item key="5" style={{float:"right"}}><Link to={"/home"} >Home</Link></Menu.Item>
          <img
            width={50}
            src={logo}
            />
          
        </Menu>
        ) }
      </Header>
     
    </Layout>
   

        <div className="container mt-3">
          <Switch>
          <Route exact path={["/","/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/success" component={Success} />
            <Route exact path="/Newsletter" component={Newsletter} />

          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
