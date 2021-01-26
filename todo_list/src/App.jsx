import React from 'react';

import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

import Support from './page/Support';


function App() {


  return (
    
    <>
        <BrowserRouter >
          
          <Switch>
            <Route exact path='/support'  component={Support} />
            <Redirect from='/' to='/support' />
          </Switch>
        </BrowserRouter>
    </>
  );
}

export default App;
