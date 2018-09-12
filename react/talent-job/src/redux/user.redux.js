import axios from 'axios';
import { getRedirectPath } from '../util';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  type: '',
  redirectTo: ''
};

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        isAuth: true,
        redirectPath: getRedirectPath(action.payload),
        ...action.payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        isAuth: true,
        redirectPath: getRedirectPath(action.payload),
        ...action.payload
      };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    default:
      return state;
  }
}

export function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

export function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

export function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data };
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('必须输入用户名密码');
  }

  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
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
        dispatch(registerSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
