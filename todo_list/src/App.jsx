import React from 'react';

import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

import ToDoPage from './page/ToDoPage';


function App() {


  return (
    
    <>
        <BrowserRouter >
          
          <Switch>
            <Route exact path='/todo'  component={ToDoPage} />
            <Redirect from='/' to='/todo' />
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
