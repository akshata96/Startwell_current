import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

 

  render() {
 

    return (
    
      <div className="container">
       
        <div>
        <header className="jumbotron">
          <h3>
            <strong>Welcome user </strong>
          </h3>
        </header>
        </div>
      </div>
    );
  }
}
