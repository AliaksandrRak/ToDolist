import React from 'react';

import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

import Chats from './page/Chats';
import Login from './page/Login';
import Users from './page/Users';
import KnowledgeBase from './page/KnowledgeBase';
import Menu from './components/Menu';

function App() {


  return (
    
    <>
        <BrowserRouter >
          <Menu></Menu>
          <Switch>
            <Route exact path='/chats'  component={Chats} />
            <Route exact path='/login'  component={Login} />
            <Route exact path='/users'  component={Users} />
            <Route exact path='/users/create'  component={Users} />
            <Route exact path='/users/edite'  component={Users} />
            <Route exact path='/knowledgeBase'  component={KnowledgeBase} />

            <Redirect from='/' to='/login' />
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
