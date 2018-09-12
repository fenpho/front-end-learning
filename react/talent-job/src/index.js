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

import './index.css';

function Boss() {
  return <h2>boss page</h2>;
}
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
        <Route path="/boss" component={Boss} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
