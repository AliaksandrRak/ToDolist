import React from "react";

import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from 'react-router-guards';

import ChatsClass from "./page/Chats";
import Login from "./page/Login";
import Users from "./page/Users";
import KnowledgeBase from "./page/KnowledgeBase";
import Menu from "./components/Menu";



const requireLogin = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (to.meta.auth) {
    if (user?._id) {
      next();
    }
    
    next.redirect('/login');
  } else {
    next();
  }
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu></Menu>
        <GuardProvider
          guards={[requireLogin]}
          // loading={Loading}
          // error={NotFound}
        >
          <Switch>
            <GuardedRoute exact path="/chats" component={ChatsClass} meta={{ auth: true }} />
            <GuardedRoute exact path="/login" component={Login} />
            <GuardedRoute exact path="/users" component={Users} meta={{ auth: true }} />
            <GuardedRoute exact path="/users/create" component={Users} meta={{ auth: true }} />
            <GuardedRoute exact path="/users/edite" component={Users} meta={{ auth: true }} />
            <GuardedRoute exact path="/knowledgeBase" component={KnowledgeBase} meta={{ auth: true }} />

            <Redirect from="/" to="/login" />
          </Switch>
        </GuardProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
