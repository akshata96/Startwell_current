
import AuthService from "../services/auth.service";
import React, { Component } from "react";
//import Input from "react-validation/build/input";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import {isEmail} from "validator";

export default class Newsletter extends Component {  
  
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.submitReview = this.submitReview.bind(this);

    this.state = {
      email: "",
      loading: false,
      message: ""
    };
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

   submitReview(e) {

    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

console.log("here");  
    AuthService.registerEmail(this.state.email).then(
      () => {
        this.props.history.push("/success");
        window.location.reload();
      },
      error => {
        console.log(error);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
  
  render() {

  return (
    <Form
    onSubmit={this.submitReview}
    ref={c => {
      this.form = c;
    }}
  >
  <div> <h1>Sign Up for Newsletter</h1>
  <div className = "form">
  <label>Email</label>
  <Input type = "text" className="form-control" name = "email"    
   value={this.state.email}
    onChange={this.onChangeEmail}/>
  
  <div className="form-group">
                  <button className="btn btn-primary btn-block">Sumbit</button>
                </div>
  
  </div>
  </div>
  </Form>
  )

  }
}
