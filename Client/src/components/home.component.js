import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import 'antd/dist/antd.css';

import { Layout, Menu, Breadcrumb, Avatar, Card, Col, Row, Image} from 'antd';
import '../css/Homepage.css';
import image from '../Assets/wound.jpg'
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;



export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  

  

  render() {
    return (

      <div style={{ 
        backgroundImage: `url(${image})` 
      }}>
  <Layout className="layout" >
      
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      
      <div className="site-layout-content">
      <div className="site-card-wrapper">
    <div>
   
    </div>
<div>   
    <Row gutter={16}>
      <Col span={8}>
        <Card title="I just want to Match" bordered={false}>
        <Link to={"/register"}>
          <img
          width={200}
          src="https://res.cloudinary.com/match2lists/image/upload/v1497274659/Match_600_gcdvaf.png"
          />
          </Link>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Explore your Options" bordered={false}>
        <a target="_blank" href="http://localhost:8081/register">
        <img
          width={200}
          src="https://previews.123rf.com/images/tashatuvango/tashatuvango1602/tashatuvango160200922/52240986-explore-your-options-concept-explore-your-options-drawn-on-dark-wall-explore-your-options-in-multico.jpg"
          />
          </a>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Dont want to Learn" bordered={false}>
        <img
          width={200}
          src="https://pbs.twimg.com/media/El-lLPCXUAYHXd-?format=png&name=4096x4096"
          />
        </Card>
      </Col>
    </Row>
    </div>
  </div>
      </div>
    </Content>
  </Layout>

  </div>
    );
  }
}
