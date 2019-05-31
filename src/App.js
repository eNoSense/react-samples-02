import React from 'react';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import AV from  'leancloud-storage';

import './App.css';
import Signin from './Signin'
import Signup from './Signup'
import PageIndex from './PageIndex'

function App() {
  console.log('init app');
  AV.init({
    appId: 'FYCTcKYDOcOsKw2vnRmNvBwQ-gzGzoHsz',
    appKey: 'BVDwbxfu4n7ziAUpuEDnf2z3',
  })

  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => (
            <Redirect to="/signin"/>
          )}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/index" component={PageIndex}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
