import React from 'react';
import { BrowserRouter,Link,Switch,Route } from 'react-router-dom'; 
import Dashboard from './pages/Dashboard/Dashboard';
import LandingPage from './pages/LandingPage/LandingPage';
import SignIn from './pages/SignIn/SignIn';
import PageNotFound from './pages/PageNotFound/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path='/' exact component={LandingPage}></Route>
      <Route path='/dashboard' component={Dashboard}></Route>
      <Route path='/signin' component={SignIn}></Route>
      <Route component={PageNotFound}></Route>
    </Switch>
    </BrowserRouter>
  );
};

export default App;
