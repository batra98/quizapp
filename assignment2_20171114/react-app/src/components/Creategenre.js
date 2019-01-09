import React, { Component } from "react";
import "./Genre.css";


export default class Genre extends Component {
    
    constructor() {
        super();
        this.state = {
            formData: {
                id: 0,
                name:"",
                hscore:0,
            },
            submitted: false,
        }
        this.handleGChange = this.handleGChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }
    
    handleSubmit (event) {
        event.preventDefault();
        this.state.formData.id=parseInt(localStorage.getItem("lastidgenre"))+1;
        console.log(this.state.formData);
        fetch('http://localhost:8080/creategenre', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
    })
    .then(response => {
        if(response.status >= 200 && response.status < 300){
            localStorage.setItem("lastidgenre",JSON.stringify(parseInt(localStorage.getItem("lastidgenre"))+1));
            this.setState({submitted:true});
        }else if(response.status>=400){
            alert('create genre first');

        }
        
    });
    
    //console.log(this.state.formData);
}

handleGChange(event) {
    this.state.formData.name = event.target.value;
}

render() {
    
    return (
        <div className="App">
        <header className="App-header">
        <h1 className="App-title">Create a New Genre</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label>Genre</label>
        <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGChange}/>
        </div>
        
        <button type="submit" className="btn btn-default">Submit</button>
        </form>
        </div>
        
        {this.state.submitted &&
            <div>
            <h2>
            New person successfully added.
            </h2>
            This has been printed using conditional rendering.
            </div>
        }
        
        </div>
        );
    }
}