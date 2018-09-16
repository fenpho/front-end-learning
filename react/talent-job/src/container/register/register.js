import React from 'react';
import Logo from '../../component/logo/logo';
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { register } from '../../redux/user.redux';
import wrapperComp from '../../component/wrappercomp/wrappercomp';

@connect(
  state => state.user,
  { register }
)
@wrapperComp
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius');
  }

  handleRegister() {
    this.props.register(this.props.state);
  }

  render() {
    const RadioItem = Radio.RadioItem;

    return (
      <div>
        {this.props.redirectPath ? (
          <Redirect to={this.props.redirectPath} />
        ) : null}
        <Logo />
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <WingBlank>
          <List>
            <InputItem onChange={v => this.props.handleChange('user', v)}>
              用户名
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('repeatpwd', v)}
            >
              确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem
              checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}
            >
              Boss
            </RadioItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.handleRegister}>
              注册
            </Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
