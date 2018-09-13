import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import reducer from './reducer';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';

import './index.css';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/bossinfo" component={BossInfo} />
        <Route path="/geniusinfo" component={GeniusInfo} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
