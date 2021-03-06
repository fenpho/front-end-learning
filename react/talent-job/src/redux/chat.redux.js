import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:8888');

// 获取聊天列表
const MSG_LIST = 'MSG_LIST';
// 读取信息
const MSG_RECV = 'MSG_RECV';
//  标识已读
const MSG_READ = 'MSG_READ';

const initState = {
  chatmsg: [],
  unread: 0,
  users: {}
};

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(
          v => !v.read && v.to === action.payload.userid
        ).length,
        users: action.payload.users
      };
    case MSG_RECV:
      const unreaDiff = action.payload.msg.to === action.payload.userid ? 1 : 0;
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: state.unread + unreaDiff
      };
    case MSG_READ:
      const { from, num } = action.payload;
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({
          ...v,
          read: v.from === from ? true : v.read
        })),
        unread: state.unread - num
      };
    default:
      return state;
  }
}

function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } };
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg });
  };
}

function msgRecv(msg, userid) {
  return { type: MSG_RECV, payload: { msg, userid } };
}

export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      const userid = getState().user._id;
      dispatch(msgRecv(data, userid));
    });
  };
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      const userid = getState().user._id;
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs, res.data.users, userid));
      }
    });
  };
}

function msgRead({ from, userid, num }) {
  return { type: MSG_READ, payload: { from, userid, num } };
}

// export function readMsg(from) {
//   return (dispatch, getState) => {
//     axios.post('/user/readmsg', { from }).then(res => {
//       const userid = getState().user._id;
//       if (res.status === 200 && res.data.code === 0) {
//         dispatch(msgRead({ from, userid, num: res.data.num }));
//       }
//     });
//   };
// }

// async + await 改写
export function readMsg(from) {
  return async (dispatch, getState) => {
    const res = await axios.post('/user/readmsg', { from });
    const userid = getState().user._id;
    if (res.status === 200 && res.data.code === 0) {
      dispatch(msgRead({ from, userid, num: res.data.num }));
    }
  };
}
