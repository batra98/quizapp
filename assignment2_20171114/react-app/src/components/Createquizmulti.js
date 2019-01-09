import React, { Component } from "react";
import "./Genre.css";


export default class Genre extends Component {
    
    constructor() {
        super();
        this.state = {
            formData: {
                id: 0,
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                question: "",
                genre: "",
                answeroption1: 0,
                answeroption2: 0,
                answeroption3: 0,
                answeroption4: 0,
            },
            submitted: false,
        }
        this.handleGChange = this.handleGChange.bind(this);
        this.handleQChange = this.handleQChange.bind(this);
        this.handleO1Change = this.handleO1Change.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleO2Change = this.handleO2Change.bind(this);
        this.handleO3Change = this.handleO3Change.bind(this);
        this.handleO4Change = this.handleO4Change.bind(this);
        this.handleansop1Change = this.handleansop1Change.bind(this);
        this.handleansop2Change = this.handleansop2Change.bind(this);
        this.handleansop3Change = this.handleansop3Change.bind(this);
        this.handleansop4Change = this.handleansop4Change.bind(this);
    }
    
    handleSubmit (event) {
        event.preventDefault();
        this.state.formData.id=parseInt(localStorage.getItem("lastidmulti"))+1;
        console.log(this.state.formData);
        fetch('http://localhost:8080/createquizmulti', {
        method: 'POST',
        body: JSON.stringify(this.state.formData),
    })
    .then(response => {
        if(response.status >= 200 && response.status < 300){
            localStorage.setItem("lastidmulti",JSON.stringify(parseInt(localStorage.getItem("lastidmulti"))+1));
            this.setState({submitted:true});
        }else if(response.status>=400){
            alert('create genre first');

        }

        window.location.reload();
        
    });
    
    //console.log(this.state.formData);
}

handleGChange(event) {
    this.state.formData.genre = event.target.value;
}
handleQChange(event) {
    this.state.formData.question = event.target.value;
}
handleO1Change(event) {
    this.state.formData.option1 = event.target.value;
}
handleO2Change(event) {
    this.state.formData.option2 = event.target.value;
}
handleO3Change(event) {
    this.state.formData.option3 = event.target.value;
}
handleO4Change(event) {
    this.state.formData.option4 = event.target.value;
}
handleansop1Change(event) {
    this.state.formData.answeroption1 = parseInt(event.target.value);
}
handleansop2Change(event) {
    this.state.formData.answeroption2 = parseInt(event.target.value);
}
handleansop3Change(event) {
    this.state.formData.answeroption3 = parseInt(event.target.value);
}
handleansop4Change(event) {
    this.state.formData.answeroption4 = parseInt(event.target.value);
}

render() {
    
    return (
        <div className="App">
        <header className="App-header">
        <h1 className="App-title">Create a New Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label>Genre</label>
        <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGChange}/>
        </div>
        <div className="form-group">
        <label>Question</label>
        <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
        </div>
        <div className="form-group">
        <label>Option1</label>
        <input type="text" className="form-control" value={this.state.option1} onChange={this.handleO1Change}/>
        </div>
        <div className="form-group">
        <label>Option2</label>
        <input type="text" className="form-control" value={this.state.option2} onChange={this.handleO2Change}/>
        </div>
        <div className="form-group">
        <label>Option3</label>
        <input type="text" className="form-control" value={this.state.option3} onChange={this.handleO3Change}/>
        </div>
        <div className="form-group">
        <label>Option4</label>
        <input type="text" className="form-control" value={this.state.option4} onChange={this.handleO4Change}/>
        </div>
        <div className="form-group">
        <label>AnswerOption1</label>
        <input type="text" className="form-control" value={this.state.answeroption1} onChange={this.handleansop1Change}/>
        </div>
        <div className="form-group">
        <label>AnswerOption2</label>
        <input type="text" className="form-control" value={this.state.answeroption2} onChange={this.handleansop2Change}/>
        </div>
        <div className="form-group">
        <label>AnswerOption3</label>
        <input type="text" className="form-control" value={this.state.answeroption3} onChange={this.handleansop3Change}/>
        </div>
        <div className="form-group">
        <label>AnswerOption4</label>
        <input type="text" className="form-control" value={this.state.answeroption4} onChange={this.handleansop4Change}/>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
        </form>
        </div>
        
        {this.state.submitted &&
            <div>
            <h2>
            New question successfully added.
            </h2>
            
            </div>
        }
        
        </div>
        );
    }
}