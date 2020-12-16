import React, { useEffect, useContext } from "react";
import { render } from "react-dom";
import './index.css';
import './styles/grid.css';
import {Authentication, NewPassword, Activation, Message, UserSettings} from './authentication';
import {Navbar} from './components'
import {Admin} from './admin'
import {AuthenticationProvider, AuthenticationContext} from "./context"
import {BrowserRouter as Router, Switch, Route, useHistory, useLocation} from 'react-router-dom'

function App() {

  const {logged, user, message} = useContext(AuthenticationContext)

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
        if(!location.pathname.includes("/user/settings")){
          history.push("/rest_admin")
        }        
      }      
    }    
  }, [logged, user])
  return (
      <>
        {message && <Message />}
        {logged && <Navbar />}
        <Switch>
          <Route path="/" exact component={Authentication} />
          <Route path="/user/newPassword" component={NewPassword} />
          <Route path="/user/activation" component={Activation} />
          <Route path="/rest_admin" exact component={Admin} />
          <Route path="/user/settings" exact component={UserSettings} />
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