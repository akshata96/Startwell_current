import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
     content:""
    };
  }

  componentDidMount() {

    if(AuthService.getCurrentUser()) {
    AuthService.getProfile(AuthService.getCurrentUser().user).then(
      response => {
        console.log("**profile" + JSON.stringify(response));
        if(response.message == "Unauthorized!" || response.message == "No token provided!" )
        {
          AuthService.logout();
          this.props.history.push("/home");
          window.location.reload();
        } 
        this.setState(
          {
            content :response
          });
      },
      error => {
        console.log("*** Profile Error ");
        AuthService.logout();
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          content: error
        });
  }
    );
} else {
  this.props.history.push("/home");
  window.location.reload();
}
}
 

  render() {
 

    return (
    
      <div className="container">
       
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{this.state.content.message}</strong>
          </h3>
        </header>
        </div>
      </div>
    );
  }
}
