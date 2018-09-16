import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../redux/user.redux';
import wrapperComp from '../../component/wrappercomp/wrappercomp'

@connect(
  state => state.user,
  { login }
)
@wrapperComp
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  register() {
    this.props.history.push('/register');
  }

  handleLogin() {
    this.props.login(this.props.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectPath && this.props.redirectPath !== '/login' ? (
          <Redirect to={this.props.redirectPath} />
        ) : null}
        <Logo />
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <WingBlank>
          <List>
            <InputItem onChange={v => this.props.handleChange('user', v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}
            >
              密码
            </InputItem>
          </List>
          <Button onClick={this.handleLogin} type="primary">
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
