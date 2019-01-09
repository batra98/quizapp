import React, { Component, Fragment } from "react";

import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./App.css";
import Routes from "./Route";


class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      enter: false
    };
    
  }
  
  userHasAuthenticated = authenticated => {
    
  }
  
  
  
  handleLogout = event => {
    this.userHasAuthenticated(false);
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.setItem("authentication",JSON.stringify(false));
    window.location.reload();
  }

  handleAdmin = event => {
    window.location.href="/admin";
  }
  
  async componentWillMount(){
    //localStorage.setItem("authentication",JSON.stringify(false));
    let ha = localStorage.getItem("authentication");
    ha=JSON.parse(ha);
    console.log(ha);
    
    if(ha===true)
    {
      this.state.enter=true;
    }
    else{
      this.state.enter=false;
    }
    
    if(localStorage.hasOwnProperty("email"))
    {
      
    }else{
      localStorage.setItem("email",JSON.stringify(""))
    }
    
  }
  
  async componentDidMount() {
    try {
      
      //console.log(UserProfile.getName())
      let value = localStorage.getItem("email");
      value=JSON.parse(value);
      console.log(value)
      if (value!=="") {
        this.userHasAuthenticated(true);
        //localStorage.setItem("authentication",JSON.stringify(true));
      }
      
      let ha = localStorage.getItem("authentication");
      ha=JSON.parse(ha);
      console.log(ha);
      
      if(ha===true)
      {
        this.state.enter=true;
        console.log("this is "+this.state.enter)
      }
      else{
        this.state.enter=false;
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    
    this.setState({ isAuthenticating: false });
  }
  
  
  
  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    
    return (
      <div className="App container">
      <Navbar fluid collapseOnSelect>
      <Navbar.Header>
      <Navbar.Brand>
      <Link to="/">QuizUp</Link>

      </Navbar.Brand> 
      
     


     
      <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav pullRight>
      
      {this.state.enter
        ?
        <Fragment>
        {localStorage.getItem("admin").toString()==="1"
        ?
        <Fragment>
        <LinkContainer to="/admin">
        <NavItem>View/Delete user</NavItem>
        </LinkContainer>
        <LinkContainer to="/makeadmin">
        <NavItem>Make Admin</NavItem>
        </LinkContainer>
        <LinkContainer to="/inter2">
        <NavItem>Create quiz</NavItem>
        </LinkContainer>
        <LinkContainer to="/creategenre">
        <NavItem>Create genre</NavItem>
        </LinkContainer>
        <LinkContainer to="inter3">
        <NavItem>View/Delete Quiz</NavItem>
        </LinkContainer>
        </Fragment>
        :<a></a>}
       
        
        <LinkContainer to="/login">
        <NavItem>Home</NavItem> 
        </LinkContainer>
        <LinkContainer to="/genre">
        <NavItem>Genre</NavItem> 
        </LinkContainer>
        <LinkContainer to="/userhistory">
        <NavItem>User History</NavItem> 
        </LinkContainer>
       
        
        <NavItem onClick={this.handleLogout}>Logout</NavItem>
        
        </Fragment>
        
         
        : <Fragment>
          <LinkContainer to="/leaderboard">
        <NavItem>LeaderBoard</NavItem>
        </LinkContainer>
        <LinkContainer to="/signup">
        <NavItem>Signup</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
        <NavItem>Login</NavItem>
        </LinkContainer>
        </Fragment>
      }
      
      </Nav>
      </Navbar.Collapse>
      </Navbar>
      
      <Routes childProps={childProps} />
      </div>
      );
    }
    
    
    
  }
  
  export default App;
  