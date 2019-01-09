import React, { Component } from "react";
import "./Genre.css";


export default class Genre extends Component {
  
  constructor()
	{
		super();
		
		this.state = 
		{					
			data: []					
		};
		
		
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	
	handleSubmit(event){
    var current = document.querySelector('input[name="radio"]:checked').value;    
    //console.log(uniqid);
    console.log(current);
    fetch('http://localhost:8080/getallusers'+'/'+current, {
		method: 'DELETE',
		
    })
    .then(response => {
		
		if(response.status >= 200 && response.status < 300)
		window.location.reload();
		//this.setState({submitted: true});
		
	});
    event.preventDefault();
    /*localStorage.setItem("genre",current)
		//console.log('http://localhost:8080/people'+'/'+this.state.current);
		event.preventDefault();
		localStorage.setItem("number","0");
		localStorage.setItem("score","0");
    window.location.href="/main";*/
    
		
}


componentDidMount() {
  const request = new Request('http://127.0.0.1:8080/getallusers');
  fetch(request)
  .then(response => response.json())
  .then(data => this.setState({data: data}));
}

render() {
    
  return (
    
    <div className="App">
		<header className="App-header">
		<h1 className="App-title">List of All Users (Select a user to Delete)</h1>
		</header>
		
		<div className = "formContainer">
		<form onSubmit = {this.handleSubmit}>
		<div>
		<table className="table-hover">
		<thead>
		<tr>
		<th>Radio</th>
		<th>ID</th>
		<th>Name of User</th>
		<th>Email</th>
		
		</tr>
		</thead>
		
		{this.state.data.map(function(item, key) {
			return (
                <tbody>

                {item.admin===1?
                <tr key = {key}>
                <td>Admin</td>
                <td>{item.id}</td>
				<td>{item.name}</td>
				<td>{item.email}</td>
                </tr>
                :
                <tr key = {key}>
                <td><input type="radio" name="radio" value={item.id}/></td>
                <td>{item.id}</td>
				<td>{item.name}</td>
				<td>{item.email}</td>
                </tr>
                }
				
				
				
				
				
                </tbody>
				)
			})}
		
    
    </table>
    </div>
    <button type="submit" className="btn btn-default">Submit</button>
    
    
    </form>
    </div>
    </div>
    
    
    
    );
  }
} 