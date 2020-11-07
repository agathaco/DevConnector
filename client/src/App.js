import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard"
import PrivateRoute from "./components/routing/PrivateRoute"
import ProfileForm from "./components/profile-forms/ProfileForm";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from './components/profile/Profile';



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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/profile-form" component={ProfileForm} />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
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
