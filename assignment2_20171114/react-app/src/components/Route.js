import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound"
import Login from "./Login";
import AppliedRoute from "./AppliedRoutes";
import Signup from "./Signup";
import Genre from "./Genre";
import Main from "./main";
import Admin from "./Admin";
import MakeAdmin from "./MakeAdmin";
import Createquiz from "./Createquiz";
import CreateGenre from "./Creategenre";
import DelteQuiz from "./Deletequiz";
import Inter from "./Inter";
import Main2 from "./main2";
import Inter2 from "./Inter2";
import Createquizmulti from "./Createquizmulti";
import DelteQuizMulti from "./Deletequizmulti";
import Inter3 from "./Inter3";
import UserHistory from "./UserHistory";
import LeaderBoard from "./Leaderboard";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps}/>
    <AppliedRoute path="/Leaderboard" exact component={LeaderBoard} props={childProps}/>
    
    
    {localStorage.getItem("authentication").toString()==="true" ?
    <Switch>
    <AppliedRoute path="/genre" exact component={Genre} props={childProps}/>
    <AppliedRoute path="/main" exact component={Main} props={childProps}/>
    <AppliedRoute path="/admin" exact component={Admin} props={childProps}/>
    <AppliedRoute path="/makeadmin" exact component={MakeAdmin} props={childProps}/>
    <AppliedRoute path="/createquiz" exact component={Createquiz} props={childProps}/>
    <AppliedRoute path="/createquizmulti" exact component={Createquizmulti} props={childProps}/>
    <AppliedRoute path="/creategenre" exact component={CreateGenre} props={childProps}/>
    <AppliedRoute path="/deletequiz" exact component={DelteQuiz} props={childProps}/>
    <AppliedRoute path="/deletequizmulti" exact component={DelteQuizMulti} props={childProps}/>
    <AppliedRoute path="/inter" exact component={Inter} props={childProps}/>
    <AppliedRoute path="/inter2" exact component={Inter2} props={childProps}/>
    <AppliedRoute path="/inter3" exact component={Inter3} props={childProps}/>
    <AppliedRoute path="/main2" exact component={Main2} props={childProps}/>
    <AppliedRoute path="/userhistory" exact component={UserHistory} props={childProps}/>
    
    </Switch>
    :
    <Route component={NotFound} />
    }
    
    
    
    
  
    
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

  
