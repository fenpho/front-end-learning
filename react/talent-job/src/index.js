import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { 
    BrowserRouter, 
    Route, 
    Switch, 
    Redirect 
} from 'react-router-dom';

import reducer from './reducer'
import './config';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => { }
));

// 登录
// 没有登录信息，统一跳转到login
// 页面 导航+显示+注销
// 一营
// 二营
// 骑兵连
// router+redux

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);