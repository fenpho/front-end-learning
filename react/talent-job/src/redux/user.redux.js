import axios from 'axios';
import { getRedirectPath } from '../util';

const AUTH_SUCCESS = 'LOGIN_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
  msg: '',
  user: '',
  type: '',
  redirectPath: ''
};

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectPath: getRedirectPath(action.payload),
        ...action.payload
      };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case LOGOUT:
      return { ...initState, redirectPath: '/login' };
    default:
      return state;
  }
}

export function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

export function authSuccess(obj) {
  // 过滤属性
  const { pwd, _id, ...data } = obj;
  return { type: AUTH_SUCCESS, payload: data };
}

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('必须输入用户名密码');
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不一致');
  }

  return dispatch => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('必须输入用户名密码');
  }

  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function userData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function logoutSubmit() {
  return { type: LOGOUT };
}
