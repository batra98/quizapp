import React, { Component } from "react";
import "./main2.css";


export default class Genre extends Component {
    constructor()
	{
		super();
		
		this.state = {	
            number: 0,
            batra: [],
            ques: 0,				
            data: [],
            score: 0,
            update:{
                genre: "",
                score: 0,
            },
            history:{
                name:"",
                genre:"",
                score: 0,
            }

		};
		
		
		
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	
	handleSubmit(event){
        event.preventDefault();
        var option1 = "0";
        var option2 = "0";
        var option3 = "0";
        var option4 = "0";
        try{
            option1 = document.querySelector('input[name="option1"]:checked').value;
        }catch(e){
            option1="0";
        }
        
        try{
            option2 = document.querySelector('input[name="option2"]:checked').value;
        }catch(e){
            option2="0";
        }
        
        try{
            option3 = document.querySelector('input[name="option3"]:checked').value;
        }catch(e){
            option3="0";
        }
        
        try{
            option4 = document.querySelector('input[name="option4"]:checked').value;
        }catch(e){
            option4="0";
        }
        console.log(option1);
        console.log(option2);
        console.log(option3);
        console.log(option4);
        
        //console.log("aslkdja");
        localStorage.setItem("number",JSON.stringify(parseInt(localStorage.getItem("number"))+1));
        this.state.number+=1;
        
        console.log(this.state.data[this.state.ques-1].answeroption1);
        var flag = 0;
        
        if(this.state.data[this.state.ques-1].answeroption1===1){
            if(option1==="0"){
                console.log("in 1");
                flag=1;
            }
        }
        if(this.state.data[this.state.ques-1].answeroption2===1){
            if(option2==="0"){
                console.log("in 2");
                flag=1;
            }
        }
        if(this.state.data[this.state.ques-1].answeroption3===1){
            if(option3==="0"){
                console.log("in 3");
                flag=1;
            }
        }
        if(this.state.data[this.state.ques-1].answeroption4===1){
            if(option4==="0"){
                console.log("in 4");
                flag=1;
            }
        }
        
        console.log(flag);
        
        if(flag===0){
            if(parseInt(localStorage.getItem("powerup"))===1){
                localStorage.setItem("score",JSON.stringify(parseInt(localStorage.getItem("score"))+2));
            }else{
                localStorage.setItem("score",JSON.stringify(parseInt(localStorage.getItem("score"))+1));
            }
            alert('correct ans');
            
        }else{
            if(parseInt(localStorage.getItem("powerup")===1)){
                localStorage.setItem("powerup","0");
                alert('powerup disabled');
            }
            alert('wrong ans');
        }
        
        
        if(parseInt(localStorage.getItem("number"))>=5){
            this.state.update["genre"]=localStorage.getItem("genre");
            this.state.update["score"]=parseInt(localStorage.getItem("score"));
            this.state.history["genre"]=localStorage.getItem("genre");
            this.state.history["score"]=parseInt(localStorage.getItem("score"));
            this.state.history["name"]=localStorage.getItem("name");
            console.log(JSON.stringify(this.state.update));
            alert('Quiz is over .\n'+'score ='+localStorage.getItem("score"));

            if(parseInt(localStorage.getItem("powerup"))!==1){
                if(parseInt(localStorage.getItem("score"))===5){
                    localStorage.setItem("powerup","1");
                    alert('Powerup has been enabled.You will get 2x points per question');
                }
            }
            
            fetch('http://localhost:8080/updatescore', {
            method: 'POST',
            body: JSON.stringify(this.state.update),
        });

        console.log("its time");

        fetch('http://localhost:8080/updatehistory',{
            method: 'POST',
            body: JSON.stringify(this.state.history),
        })
        .then(response => {
    
            if(response.status >= 200 && response.status < 300)
            {
                window.location.href="/login";
            }
            
            });


        
        
    }else{
        window.location.reload();
    }
    console.log(this.state.number);
    
    event.preventDefault();
    //console.log('http://localhost:8080/people'+'/'+this.state.current);
    /*event.preventDefault();
    fetch('http://localhost:8080/people'+'/'+current, {
    method: 'DELETE',
    
})
.then(response => {
    
    if(response.status >= 200 && response.status < 300)
    window.location.reload()
    this.setState({submitted: true});
    
});*/
}
componentDidMount() {
	const request = new Request('http://127.0.0.1:8080/quiz2/'+localStorage.getItem("genre"));
	fetch(request)
	.then(response => response.json())
    .then(data => this.setState({data: data}));
    
    
}





render() {
    
    for (var i =0;i<this.state.data.length;i++)
    {
        if(this.state.data[i].genre===localStorage.getItem("genre"))
        this.state.batra.push(this.state.data[i].id);
    }
    localStorage.setItem("lastidmulti",JSON.stringify(this.state.data.length));
    console.log(this.state.batra);
    var randomValue = this.state.batra[Math.floor(Math.random() * this.state.batra.length)];
    //var randomInt = require('random-int');
    this.state.ques=randomValue;
    localStorage.setItem("quesmulti",JSON.stringify(this.state.ques));
    console.log(this.state.check);
    console.log(this.state.data);
    return(
        
        
        
        
        
        <form onSubmit = {this.handleSubmit}>
        <div class="container">
        <div class="row">
        <div class="batra">
        <div class="card">
        
        
        
        
        
        {this.state.data.map(function(item, key) {
            console.log("in here"+item.genre)
            if(item.genre===localStorage.getItem("genre") && JSON.stringify(item.id)===localStorage.getItem("quesmulti"))
            return(
                <ul class="list-group list-group-flush" key={key}>
                <h3>{item.question}</h3>
                <li class="list-group-item">
                {item.option1}
                <label class="switch ">
                <input type="checkbox" class="default" name="option1" value="1"/>
                <span class="slider"></span>
                </label> 
                </li>
                <li class="list-group-item">
                {item.option2}
                <label class="switch ">
                <input type="checkbox" class="primary" name="option2" value="2"/>
                <span class="slider"></span>
                </label>
                </li>
                <li class="list-group-item">
                {item.option3}
                <label class="switch ">
                <input type="checkbox" class="success" name="option3" value="3"/>
                <span class="slider"></span>
                </label>
                </li>
                <li class="list-group-item">
                {item.option4}
                <label class="switch ">
                <input type="checkbox" class="info" name="option4" value="4"/>
                <span class="slider"></span>
                </label>
                </li>
                </ul>
                
                
                )
                else{
                    return(
                        <div></div>
                        )
                    }
                })}
                
                
                
                
                
                
                
                <button type="submit" className="btn btn-default">Submit</button>
                </div> 
                </div>
                <div class="col-md-6">
                <div class="card" />
                </div>
                </div>
                </div>
                
                
                </form>
                
                
                
                );
            }
            
        }