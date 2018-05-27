import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from './Auth.redux';

// 两个reducers，每个reducers都有一个state
@connect(
    state => state.auth,
    { login }
)
class Auth extends React.Component {
    render() {
        return (
            <div>
                { this.props.isAuth? <Redirect to='/dashboard'></Redirect> : null }
                <h2>您还没有登陆哦，需要登陆后才能进行操作</h2>
                <button onClick={this.props.login}>登陆</button>
            </div>
        );
    }
}

export default Auth;