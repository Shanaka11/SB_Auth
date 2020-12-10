import React, { useEffect, useContext } from "react";
import { render } from "react-dom";
import './index.css';
import {Authentication, NewPassword, Activation} from './authentication';
import {Admin} from './admin'
import {AuthenticationProvider, AuthenticationContext} from "./context"
import {BrowserRouter as Router, Switch, Route, useHistory, useLocation} from 'react-router-dom'

function App() {

  const {logged, user, currentUser} = useContext(AuthenticationContext)

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if(!logged){
      if(!location.pathname.includes("/user/newPassword") || !location.pathname.includes("/user/activation")){
        history.push("/")
      }
    }

    if(logged){
      // Get user info      
      // If logged Restrict depending on the user role
      // If user is yet to be verified
      if(user["verified"] === false){
        history.push("/user/activation")
      }else{
        history.push("/rest_admin")
      }      
    }    
  }, [logged, user])
  return (
      <>
        <Switch>
          <Route path="/" exact component={Authentication} />
          <Route path="/user/newPassword" component={NewPassword} />
          <Route path="/user/activation" component={Activation} />
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