import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import LoaderButton from "./LoaderButton";
import axios from 'axios';


export default class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
            email: "",
            password: "",
            submitted: false,
            formData: {},
            data: [],
            data2:[],
        };
    }
    
    
    /*componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/gethistory');
        fetch(request)
        .then(response => response.json())
        .then(data => this.setState({data2: data}));
    }*/
    
    
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    handleSubmit = event => {
        event.preventDefault();
        this.state.formData["email"]=this.state.email
        this.state.formData["password"]=this.state.password
        fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
    })
    .then(response => {
        if(response.status >= 200 && response.status < 300){
            this.props.userHasAuthenticated(true);
            
            localStorage.setItem("email",JSON.stringify(this.state.email));
            localStorage.setItem("authentication",JSON.stringify(true));
            localStorage.setItem("password",JSON.stringify(this.state.password));
            
            //console.log("out");
            if(JSON.parse(localStorage.getItem("authentication"))===true)
            {
                console.log("hello");
                //const request = new Request('http://127.0.0.1:8080/people/');
                axios.get('http://localhost:8080/people/'+JSON.parse(localStorage.getItem("email")))
                .then(response => {
                    //console.log("response",response);
                    this.setState({
                        data:response.data
                    });
                    //console.log("fetchuser",this.state.data);
                    console.log(this.state.data);
                    localStorage.setItem("name",this.state.data.name);
                    console.log(localStorage.getItem("name"));
                    console.log(localStorage.getItem("email"));
                    localStorage.setItem("admin",JSON.stringify(this.state.data.admin));
                    console.log(localStorage.getItem("admin").toString());
                    if(localStorage.getItem("admin").toString()==="1"){
                        alert('welcome admin');
                    }
                    localStorage.setItem("powerup","0");
                    window.location.reload()
                });
                
                
                
                
                
                
                
                //console.log(JSON.parse(localStorage.getItem("name")));
                
                
                //window.location.reload()
            }
            
            
            
            
            
            
            //window.location.reload();
            
            
            
            
        }
        else
        {
            alert("Wrong Credentials");
        }
        
        
    });
    
    //window.location.reload();
    
    
}

renderForm() {
    return (
        <div className="Login">
        <form onSubmit={this.handleSubmit}>
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
        <LoaderButton
        block
        bsSize="large"
        disabled={!this.validateForm()}
        type="submit"
        isLoading={this.state.isLoading}
        text="Login"
        loadingText="Logging in…"
        />
        
        </form>
        </div>
        );
    }
    
    renderConfirmationForm(){
        
        return(
            
            <div className="container emp-profile">
            <form method="post">
            <div class="row">
            <div class="col-md-4">
            <div class="profile-img">
            <img src="https://lh3.googleusercontent.com/-2UCQ2K8l3oY/VrD7FhEPxNI/AAAAAAAABco/9ghSvXdjNZw/s640/11057487_1561621587452409_3478364893360535675_n.jpg" alt=""/>
            <div class="file btn btn-lg btn-primary">
            Change Photo
            <input type="file" name="file"/>
            </div>
            </div>
            </div>
            <div class="col-md-6">
            <div class="profile-head">
            <h5>
            {localStorage.getItem("name")}
            </h5>
            <h6>
            A Quiz Lover
            </h6>
            <p class="proile-rating">RANKINGS : <span>8/10</span></p>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
            </li>
            </ul>
            </div>
            </div>
            <div class="col-md-2">
            <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4">
            <div class="profile-work">
            <p>Top 5 Scores</p>
            <a href="">Website Link</a><br/>
            <a href="">Bootsnipp Profile</a><br/>
            <a href="">Bootply Profile</a>
            <p>Favourite Genres</p>
            <a href="">Web Designer</a><br/>
            <a href="">Web Developer</a><br/>
            <a href="">WordPress</a><br/>
            <a href="">WooCommerce</a><br/>
            <a href="">PHP, .Net</a><br/>
            </div>
            </div>
            <div class="col-md-8">
            <div class="tab-content profile-tab" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="row">
            <div class="col-md-6">
            <label>User Id</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("name")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
            <label>Name</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("name")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
            <label>Email</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("email")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
            <label>Phone</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("phone")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
            <label>Profession</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("profession")}</p>
            </div>
            </div>
            </div>
            
            
            
            
            
            
            
            
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="row">
            <div class="col-md-6">
            <label>Number of matches</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("no_matches")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
            <label>Total Losses</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("losses")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
            <label>Total Wins</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("wins")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
            <label>Level</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("level")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-6">
            <label>Time-Spent</label>
            </div>
            <div class="col-md-6">
            <p>{localStorage.getItem("time")}</p>
            </div>
            </div>
            <div class="row">
            <div class="col-md-12">
            <label>Your Bio</label><br/>
            <p>Your detail description</p>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </form>                      
            </div>
             
                    
                    );
                }
                
                
                render() {
                    return (
                        <div className="Login">
                        {JSON.parse(localStorage.getItem("authentication")) === false
                        ? this.renderForm()
                        : this.renderConfirmationForm()}
                        </div>
                        );
                    }
                }
                
                
                
                
                