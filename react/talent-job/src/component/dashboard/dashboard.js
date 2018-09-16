import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Switch, Route } from 'react-router-dom';

import NavLink from '../navlink/navlink';
import Boss from '../../container/boss/boss';

function Genius() {
  return <h2>Genius</h2>;
}
function Msg() {
  return <h2>msg</h2>;
}
function User() {
  return <h2>User</h2>;
}

@connect(state => state)
class DashBoard extends React.Component {
  render() {
    const pathname = this.props.location.pathname;
    const user = this.props.user;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ];

    return (
      <div>
        <NavBar className="fixed-header" mode="dark">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: '45px' }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLink data={navList} />
      </div>
    );
  }
}

export default DashBoard;
