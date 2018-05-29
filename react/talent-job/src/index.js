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

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);