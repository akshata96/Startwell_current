import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Success extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return ( 
        <div>
        <header className="jumbotron">
          <h3>
            <strong> Registered Successfully</strong>
          </h3>
        </header>
        </div>
    
    );
  }
}
