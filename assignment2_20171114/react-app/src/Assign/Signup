import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
//import "./Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null,
      formData: {},
      check: 0,
      name: "",
      checkData: {}
    };
  }
  
  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
      );
    }
    
    validateConfirmationForm() {
      return this.state.confirmationCode.length > 0;
    }
    
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
    
    handleSubmit = async event => {
      
      var randomInt = require('random-int');
      this.state.check=randomInt(10,100);
      console.log(this.state.check);
      
      
      event.preventDefault();
      /*this.state.formData["Name"]=this.state.name;
      this.state.formData["email"]=this.state.email;
      this.state.formData["password"]=this.state.password;
      this.state.formData["check"]=this.state.check;*/
      this.state.checkData["check"]=this.state.check;
      this.state.checkData["email"]=this.state.email;
      
      //console.log(JSON.stringify(this.state.formData));
      
      this.setState({ isLoading: true });
      
      //this.setState({ newUser: "test" });
      fetch('http://localhost:8080/people/signup_check', {
      method: 'POST',
      body: JSON.stringify(this.state.checkData),
    })
    .then(response => {
      if(response.status >= 200 && response.status < 300)
      this.setState({newUser: this.state.name});
    });
    //console.log(this.state.check);
    
    this.setState({ isLoading: false });
    //this.state.formData.pop();
    
  }
  
  handleConfirmationSubmit = async event => {
    event.preventDefault();
    
    this.setState({ isLoading: true });
    console.log(this.state.confirmationCode);
    
    if(this.state.confirmationCode === this.state.check.toString()){
      
      this.state.formData["Name"]=this.state.name;
      this.state.formData["email"]=this.state.email;
      this.state.formData["password"]=this.state.password;
      
      fetch('http://localhost:8080/people/signup', {
      method: 'POST',
      body: JSON.stringify(this.state.formData),
    })
    .then(response => {
      if(response.status >= 200 && response.status < 300){
        this.setState({newUser: this.state.name});
        this.props.userHasAuthenticated(true);
        setTimeout(function() { //Start the timer
          this.setState({ isLoading: false });
          //window.location.reload();
          alert("Account created successfully. You can login now");
          window.location.reload();
        }.bind(this), 2000)
      }
      else{
        console.log(response.status)
        setTimeout(function() { //Start the timer
          this.setState({ isLoading: false });
          //window.location.reload();
          alert("Account already exists.");
          window.location.reload();
        }.bind(this), 2000)
      }
      
    });  
    
    
  }
  else{
    window.location.reload();
  }
  
  
  
}

renderConfirmationForm() {
  return (
    <form onSubmit={this.handleConfirmationSubmit}>
    <FormGroup controlId="confirmationCode" bsSize="large">
    <ControlLabel>Confirmation Code</ControlLabel>
    <FormControl
    autoFocus
    type="tel"
    value={this.state.confirmationCode}
    onChange={this.handleChange}
    />
    <HelpBlock>Please check your email for the code.</HelpBlock>
    </FormGroup>
    <LoaderButton
    block
    bsSize="large"
    disabled={!this.validateConfirmationForm()}
    type="submit"
    isLoading={this.state.isLoading}
    text="Verify"
    loadingText="Verifying…"
    />
    </form>
    );
  }
  
  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
      <FormGroup controlId="name" bsSize="large">
      <ControlLabel>Name</ControlLabel>
      <FormControl
      autoFocus
      type="name"
      value={this.state.name}
      onChange={this.handleChange}
      />
      </FormGroup>
      <FormGroup controlId="email" bsSize="large">
      <ControlLabel>Email</ControlLabel>
      <FormControl
      autoFocus
      type="email"
      value={this.state.email}
      onChange={this.handleChange}
      />
      </FormGroup>
      <FormGroup controlId="password" bsSize="large">
      <ControlLabel>Password</ControlLabel>
      <FormControl
      value={this.state.password}
      onChange={this.handleChange}
      type="password"
      />
      </FormGroup>
      <FormGroup controlId="confirmPassword" bsSize="large">
      <ControlLabel>Confirm Password</ControlLabel>
      <FormControl
      value={this.state.confirmPassword}
      onChange={this.handleChange}
      type="password"
      />
      </FormGroup>
      <LoaderButton
      block
      bsSize="large"
      disabled={!this.validateForm()}
      type="submit"
      isLoading={this.state.isLoading}
      text="Signup"
      loadingText="Signing up…"
      />
      </form>
      );
    }
    
    render() {
      return (
        <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
          </div>
          );
        }
      }
      