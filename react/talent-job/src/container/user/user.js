import React from 'react';
import { connect } from 'react-redux';
import {
  Result,
  List,
  WhiteSpace,
  Button,
  WingBlank,
  Modal
} from 'antd-mobile';
import BrowerCookies from 'browser-cookies';
import { Redirect } from 'react-router-dom';

import { logoutSubmit } from '../../redux/user.redux';

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    const alert = Modal.alert;

    alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          BrowerCookies.erase('userid');
          this.props.logoutSubmit();
        }
      }
    ]);
  }

  render() {
    const Item = List.Item;
    const Brief = Item.Brief;

    return this.props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../../component/img/${this.props.avatar}.png`)}
              alt=""
              style={{ width: 50 }}
            />
          }
          title={this.props.user}
          message={this.props.type === 'boss' ? this.props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item wrap>
            {this.props.title}
            {this.props.desc.split('\n').map(v => (
              <Brief key={v}>{v}</Brief>
            ))}
            {this.props.money ? (
              <Brief>
                薪资：
                {this.props.money}
              </Brief>
            ) : null}
          </Item>
        </List>
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={this.logout}>
            退出登录
          </Button>
        </WingBlank>
      </div>
    ) : (
      <Redirect to={this.props.redirectPath} />
    );
  }
}

export default User;
