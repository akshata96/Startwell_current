import React, { Component,useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";



import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div >
        This field is required!
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div>
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div>
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUserFirstname = this.onChangeUserFirstname.bind(this);
    this.onChangeUserLastname = this.onChangeUserLastname.bind(this);
    this.onChangeDob = this.onChangeDob.bind(this);
    this.onChangeSex= this.onChangeSex.bind(this);
    this.onChangeUserType = this.onChangeUserType.bind(this);
    this.onChangeUserUserId = this.onChangeUserUserId.bind(this);

    this.state = {
      userid:"",
      firstname: "",
      lastname: "",
      dob:"",
      usertype:"",
      email: "",
      password: "",
      sex:"",
      successful: false,
      message: ""
    };
  }

  onChangeUserUserId(e) {
    this.setState({
      userid: e.target.value
    });
  }

  onChangeUserFirstname(e) {
    this.setState({
      firstname: e.target.value
    });
  }

  onChangeUserLastname(e) {
    this.setState({
      lastname: e.target.value
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeDob(e) {
    this.setState({
      dob: e.target.value
    });
  }

  onChangeSex(e) {
    this.setState({
      sex: e.target.value
    });
  }
  
  onChangeUserType(e) {
    this.setState({
      usertype: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.firstname,
        this.state.lastname,
        this.state.dob,
        this.state.email,
        this.state.usertype,
        this.state.sex,
        this.state.password,
        this.state.userid

      ).then(
        () => {
          this.props.history.push("/success");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    
    return (
      
      <div className="col-md-12">
        <div className="card card-container">

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>

              <div className="form-group">
                  <label>UserId</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="userid"
                    value={this.state.userid}
                    onChange={this.onChangeUserUserId}
                
                  />
                </div>

                <div className="form-group">
                  <label>FirstName</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChangeUserFirstname}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label>LastName</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.onChangeUserLastname}
                
                  />
                </div>

                <div className="form-group">
                  <label>DOB</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="dob"
                    value={this.state.dob}
                    onChange={this.onChangeDob}
                  />
                </div>


                <div className="form-group">
                  <label>Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </div>

                <div className="form-group">
                  <label>UserType</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="usertype"
                    value={this.state.usertype}
                    onChange={this.onChangeUserType}
                  />
                </div>


                <div className="form-group">
                  <label >Sex</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="sex"
                    value={this.state.sex}
                    onChange={this.onChangeSex}
                  />
                </div>


                <div className="form-group">
                  <label>Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
