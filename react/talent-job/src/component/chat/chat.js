import React from 'react';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';

import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // socket.emit('sendmsg', { text: this.state.text });
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;

    this.props.sendMsg({ from, to, msg });
    this.setState({ text: '' });
  }

  fixCarousel() {
    // 用来修复antd grid组件高度bug
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
  }

  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  render() {
    const emoji = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👶 👦 👧 👨 👩 👴 👵'
      .split(' ')
      .filter(v => v) // 过滤空格
      .map(v => ({ text: v }));
    const userid = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null;
    }
    const chatid = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          className="fixed-header"
        >
          {users[userid].name}
        </NavBar>
        <QueueAnim
          style={{
            marginBottom: this.state.showEmoji ? 230 : 50,
            marginTop: '44px'
          }}
        >
          {chatmsgs.map(v => {
            const avatar = require(`../img/${users[v.from].avatar}.png`);

            return v.from === userid ? (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item className="chat-me" extra={<img src={avatar} alt="" />}>
                  {v.content}
                </Item>
              </List>
            );
          })}
        </QueueAnim>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => this.setState({ text: v })}
              extra={
                <div>
                  <span
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      });
                      this.fixCarousel();
                    }}
                    style={{ marginRight: '15px' }}
                    role="img"
                    aria-label="emojis"
                  >
                    👻
                  </span>
                  <span onClick={this.handleSubmit}>发送</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              isCarousel={true}
              carouselMaxRow={4}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Chat;
