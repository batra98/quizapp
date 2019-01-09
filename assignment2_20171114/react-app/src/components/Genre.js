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
    localStorage.setItem("genre",current)
		//console.log('http://localhost:8080/people'+'/'+this.state.current);
		event.preventDefault();
		localStorage.setItem("number","0");
		localStorage.setItem("score","0");
    window.location.href="/inter";
    
		
}


componentDidMount() {
  const request = new Request('http://127.0.0.1:8080/getgenres');
  fetch(request)
  .then(response => response.json())
  .then(data => this.setState({data: data}));
}

render() {
	console.log(this.state.data.length);
	localStorage.setItem("lastidgenre",JSON.stringify(this.state.data.length));
  return (
    
    <div className="App">
		<header className="App-header">
		<h1 className="App-title">Select A Genre</h1>
		</header>
		
		<div className = "formContainer">
		<form onSubmit = {this.handleSubmit}>
		<div>
		<table className="table-hover">
		<thead>
		<tr>
		<th>Radio</th>
		<th>ID</th>
		<th>Name of Quiz</th>
		<th>Highest score</th>
		
		</tr>
		</thead>
		<tbody>
		{this.state.data.map(function(item, key) {
			return (
				<tr key = {key}>
				<td><input type="radio" name="radio" value={item.name}/></td>
				
				<td>{item.id}</td>
				<td>{item.name}</td>
				<td>{item.hscore}</td>
				
				</tr>
				)
			})}
		
    </tbody>
    </table>
    </div>
    <button type="submit" className="btn btn-default">Submit</button>
    
    
    </form>
    </div>
    </div>
    
    
    );
  }
} 