import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(state => state)
class Msg extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1];
  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last;
    });
    const userId = this.props.user._id;
    const userInfo = this.props.chat.users;

    return (
      <div>
        {chatList.map(v => {
          const lastItem = this.getLast(v);
          const targetId =
            lastItem.from === userId ? lastItem.to : lastItem.from;
          const unReadNum = v.filter(v => !v.read && v.to === userId).length;
          if (!userInfo[targetId]) {
            return null;
          }
          return (
            <List key={lastItem._id}>
              <Item
                extra={<Badge text={unReadNum} />}
                thumb={require(`../../component/img/${
                  userInfo[targetId].avatar
                }.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`);
                }}
              >
                {lastItem.content}
                <Brief>{userInfo[targetId].name}</Brief>
              </Item>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Msg;
