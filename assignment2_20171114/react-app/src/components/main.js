import React, { Component } from "react";
import "./main.css"

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
        //console.log("aslkdja");
        localStorage.setItem("number",JSON.stringify(parseInt(localStorage.getItem("number"))+1));
        this.state.number+=1;
        var current = document.querySelector('input[name="q_answer"]:checked').value;
        
        
        console.log(current);
        console.log(this.state.data[this.state.ques-1].answer);
        
        if(current===this.state.data[this.state.ques-1].answer)
        {
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
	const request = new Request('http://127.0.0.1:8080/quiz/'+localStorage.getItem("genre"));
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
    localStorage.setItem("lastid",JSON.stringify(this.state.data.length));
    console.log(this.state.batra);
    var randomValue = this.state.batra[Math.floor(Math.random() * this.state.batra.length)];
    //var randomInt = require('random-int');
    this.state.ques=randomValue;
    localStorage.setItem("ques",JSON.stringify(this.state.ques));
    console.log(this.state.check);
    console.log(this.state.data);
    return(
        <form onSubmit = {this.handleSubmit}>
        <div class="container-fluid bg-info">
        <div class="modal-dialog">
        
        <div class="modal-content">
        <div class="modal-header">
        <h3><span class="label label-warning" id="qid">{this.state.ques}</span>{localStorage.getItem("genre")}</h3>
        </div>
        
        
        
        
        
        
        
        {this.state.data.map(function(item, key) {
            console.log("in here"+item.genre)
            if(item.genre===localStorage.getItem("genre") && JSON.stringify(item.id)===localStorage.getItem("ques"))
            return (
                <div key={key} class="quiz" id="quiz" data-toggle="buttons">
                <h3>{item.question}</h3>
                <label class="element-animation1 btn btn-lg btn-primary btn-block">
                <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value={item.option1}/>{item.option1}
                </label>
                <label class="element-animation1 btn btn-lg btn-primary btn-block">
                <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value={item.option2}/>{item.option2}
                </label>
                <label class="element-animation1 btn btn-lg btn-primary btn-block">
                <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value={item.option3}/>{item.option3}
                </label>
                <label class="element-animation1 btn btn-lg btn-primary btn-block">
                <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span> <input type="radio" name="q_answer" value={item.option4}/>{item.option4}
                </label>
                
                </div>
                
                
                
                )
                else{
                    return(
                        <div></div>
                        )
                    }
                })}
                
                
                
                </div>
                <div class="modal-footer text-muted">
                <span id="answer"></span>
                <button type="submit" className="btn btn-default">Submit</button>
                
                </div>
                </div>
                </div>
                </form>
                
                
                
                );
            }
            
        }