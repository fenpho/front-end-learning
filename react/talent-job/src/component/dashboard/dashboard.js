import React from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Route, Redirect } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';

import NavLink from '../navlink/navlink';
import Boss from '../../container/boss/boss';
import Genius from '../../container/genius/genius';
import User from '../../container/user/user';
import Msg from '../../container/msg/msg';
import { getMsgList, recvMsg } from '../../redux/chat.redux';

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class DashBoard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

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
    const currentPath = navList.find(v => v.path === pathname);

    return currentPath ? (
      <div>
        <NavBar className="fixed-header" mode="dark">
          {currentPath.title}
        </NavBar>
        <div style={{ marginTop: '45px' }}>
          {/* <Switch> */}
          <QueueAnim type="scaleX" leaveReverse>
            <Route
              key={currentPath.path}
              path={currentPath.path}
              component={currentPath.component}
            />
          </QueueAnim>
          {/* </Switch> */}
        </div>
        <NavLink data={navList} />
      </div>
    ) : (
      <Redirect to="/msg" />
    );
  }
}

export default DashBoard;
