import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './components/Homepage';
import Profilepage from './components/Profilepage';
import Landingpage from './components/Landingpage';
import Loginpage from './components/Loginpage';
import Signuppage from './components/Signuppage';
import LeftLandingpage from './components/LeftLandingpage';
import RightLandingpage from './components/RightLandingpage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Landingpage leftpage={<LeftLandingpage />} rightpage={<RightLandingpage />} />
        </Route>
        <Route exact path="/a" component={ Homepage } />
        <Route exact path="/a/you" component={ Profilepage } />
        <Route path="/login">
          <Landingpage leftpage={<LeftLandingpage />} rightpage={<Loginpage />} />
        </Route>
        <Route path="/create-account">
          <Landingpage leftpage={<LeftLandingpage />} rightpage={<Signuppage />} />
        </Route>
        <Route path="*">
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
