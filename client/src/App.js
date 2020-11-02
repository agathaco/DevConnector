import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';



import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    // check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
    // });
  }, []); // empty array makes sure it only runs once and we don't get stuck in an infinite loop

  return (
      <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <section className="container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </section>
        <Alert/>
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
  )

};

export default App;
