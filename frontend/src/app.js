import React, { useEffect, useContext } from "react";
import { render } from "react-dom";
import './index.css';
import {Login} from './authentication';
import {Admin} from './admin'
import {AuthenticationProvider, AuthenticationContext} from "./context"
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'

function App() {

  const {logged, currentUser} = useContext(AuthenticationContext)
  // const history = useHistory()

  const history = useHistory()

  useEffect(() => {        
    if(!logged){
      history.push("/")
    }

    if(logged){
      // If logged Restrict depending on the user role
      //if(role === ""){
      //  currentUser()
      //}else{
        //if(role === "ADMIN"){
          //history.push("/admin/")
        //}else if(role === "CLIENT"){
          history.push("/rest_admin")
        //}  
      //}
    }    
  })

  return (
      <>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/rest_admin" exact component={Admin} />
        </Switch>
      </>
  );
}

export default App;

const container = document.getElementById("app");
render( <AuthenticationProvider>
          <Router>
            <App />
          </Router>
        </AuthenticationProvider>, 
        container);