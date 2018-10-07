import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import reducer from './reducer';
import './config';

import './index.css';

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
    // window.devToolsExtension ? window.devToolsExtension() : () => {} // firefox 不识别
  )
);

// boss genius me msg 4个页面
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
// 服务端渲染有一个报错，待解决
// ReactDOM.hydrate(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById('root')
// );
