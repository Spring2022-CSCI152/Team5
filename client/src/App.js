import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import AddPost from "./components/AddContact";
import EditContact from "./components/EditContact";
//import Friends from "./components/Friends";
import Friends from "./components/Friends/Friends";
//import "./styles.css";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Friends/Friends';
import Auth from './components/Auth/Auth';
import TimerPage from "./components/TimerPage/TimerPage";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
      <ToastContainer />
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/Pomo" />} />
          <Route path="/Pomo" exact component={() => < TimerPage/>} />
          <Route exact path="/add" component={() => <AddPost />} />
          <Route path="/auth" exact component={() => <Auth/>} />
          <Route path="/Friends" component={() => <Friends />} />
          <Route exact path="/edit/:id" component={() => <EditContact />} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/Pomo" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;