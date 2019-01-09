import React, { Component } from 'react';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            gaurav: []
        }
    }
    
    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
        const request = new Request('http://127.0.0.1:3001/api/jokes');
        fetch(request)
            .then(response => response.json())
                .then(data => this.setState({data: data}));
        
                
                const script = document.createElement("script");

                script.src = "http://code.jquery.com/jquery-2.1.4.min.js";
                script.async = true;
        
                document.body.appendChild(script); 
                
                //const script = document.createElement("script");

                script.src = "https://cdn.auth0.com/js/auth0/9.0/auth0.min.js";
                script.async = true;
        
                document.body.appendChild(script);

                //const script = document.createElement("script");

                script.type = "application/javascript";
                script.src = "https://unpkg.com/react@16.0.0/umd/react.production.min.js";
                script.async = true;
        
                document.body.appendChild(script); 

                //const script = document.createElement("script");
                script.type="application/javascript";

                script.src = "https://unpkg.com/react-dom@16.0.0/umd/react-dom.production.min.js";
                script.async = true;
        
                document.body.appendChild(script); 

                //const script = document.createElement("script");
                script.type="application/javascript"

                script.src = "https://unpkg.com/babel-standalone@6.26.0/babel.js";
                script.async = true;
        
                document.body.appendChild(script); 

                //const script = document.createElement("script");
                script.type="text/babel"

                script.src = "js/app.jsx";
                script.async = true;
        
                document.body.appendChild(script); 


    }
    
    render() {
        //console.log(this.state.data)
        //this.state.gaurav.push(this.state.data)

       // const options = this.state.data.map((item, index) => <li key={index}>{`${item}`}</li>)
        return (
            
           
            <div className="App">
            <header className="App-header">
              <h1 className="App-title">View All People</h1>
            </header>
    
            <table className="table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>City</th>
                </tr>
              </thead>

              <tbody>               
              {this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.likes}</td>
                      <td>{item.joke}</td>
                      
                  </tr>
                )
             })}
              </tbody>
           </table>
          </div>
        );
    }
}

export default Login;
