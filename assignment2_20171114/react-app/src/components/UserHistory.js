import React, { Component } from "react";
import "./UserHistory.css";


export default class Genre extends Component {
  
  constructor()
	{
		super();
		
		this.state ={					
			data2: []					
		};
		
		
		
		
	}
	
	
	


    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/gethistory');
        fetch(request)
        .then(response => response.json())
        .then(data => this.setState({data2: data}));
    }

render() {
    console.log(this.state.data2);
    
  return (
    
    <div className="App">
		<header className="App-header">
		<h1 className="App-title">User History</h1>
		</header>
		
		<div className = "formContainer">
		
<div class="batra">
<div class="row" >
<div class="batra2">
<div class="history_header">
		                <div class="history_header_product">
		                    Serial Number
		                </div> 
		                 <div class="history_header_quantity">
		                    UserName
		                </div>   
		                 <div class="history_header_size">
		                    Genre
		                </div>  
		                 <div class="history_header_date">
		                    Score
		                </div>    
		            </div>


    {this.state.data2.map(function(item, key) {
            console.log("in here"+item.genre)
            if(item.name===localStorage.getItem("name"))
            return(
                
		
		    
		        <div class="history_wrapper" >
		            
		            
		            
		            
		              <div class="history_body">
		                    <div class="history_list">
		                        <div class="history_item_name">
		                           <span class="item_name">{key+1}</span>
		                       
		                           
		                        </div>
		                         <div class="history_item_quantity">
		                             
	                                <span class="item_quantity">
	                                    {item.name}
	                                </span>
	                                 
	                                
		                         </div>
		                           <div class="history_item_size">
		                             
	                                <span class="item_size">
	                                   {item.genre}
	                                </span>
	                                   
	                                
		                         </div>
		                         <div class="history_item_date">
		                             
	                                <span class="item_date">
	                                    {item.score}
	                                </span>
	                                
		                         </div>
		                      
		                        
		                    </div>
		              </div>
		            
		        </div>
		    
		
	


                )
                else{
                    return(
                        <div></div>
                        )
                    }
                })}
                </div> 
    </div>            

	
</div>
    
    
   
    </div>
    </div>
    
    
    
    );
  }
} 