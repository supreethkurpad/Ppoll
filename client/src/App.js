import React, { createContext, useReducer, useEffect, useContext } from 'react';
import Home from './components/Home';
import './App.css';
import MyMenu from './components/Menu';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import CreatePoll from './components/CreatePoll';
import Discover from './components/Discover';
import Mypolls from './components/Mypolls';
import Pollroute from './components/Pollroute';
import Checkprofile from './components/Checkprofile';
import { reducer, initalState } from './userReducer'

export const UserContext = createContext();



const Routing = () => {

  const history = useHistory();
  const { dispatch } = useContext(UserContext);

  window.addEventListener('storage', (e) => {
    dispatch({ type: "CLEAR" })
    history.push("/")
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/");
    }
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />


      <Route path="/signup" component={Signup} />


      <Route path="/signin" component={Signin} />


      <Route path="/createpoll" component={CreatePoll} />


      <Route path="/discover" component={Discover} />


      <Route path="/mypolls" component={Mypolls} />

      <Route path="/polls/:id" component={Pollroute} />

      <Route path="/users/:id" component={Checkprofile} />

    </Switch >
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initalState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>

      <BrowserRouter>
        <MyMenu />
        <Routing />
      </BrowserRouter>

    </UserContext.Provider>
  );
}

export default App;
