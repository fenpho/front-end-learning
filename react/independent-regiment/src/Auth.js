import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login, getUserData } from './Auth.redux';

// 两个reducers，每个reducers都有一个state
@connect(
    state => state.auth,
    { login, getUserData }
)
class Auth extends React.Component {
    componentDidMount() {
        this.props.getUserData();
    }
    render() {
        return (
            <div>
                <h2>我的名字是：{this.props.user}，年龄：{this.props.age}</h2>
                { this.props.isAuth? <Redirect to='/dashboard'></Redirect> : null }
                <h2>您还没有登陆哦，需要登陆后才能进行操作</h2>
                <button onClick={this.props.login}>登陆</button>
            </div>
        );
    }
}

export default Auth;