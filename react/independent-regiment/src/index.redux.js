const ADD_GUN = '加机关枪';
const DEL_GUN = '减机关枪';

// reducer
export function counter(state=0, action) {
    switch(action.type) {
        case ADD_GUN:
            return state + 1;
        case DEL_GUN:
            return state - 1;
        default:
            return 10;
    }
}

// action creator
export function addGun() {
    return {type: ADD_GUN};
}

export function delGun() {
    return {type: DEL_GUN};
}

// thunk异步操作， 返回函数
export function addGunAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGun());
        }, 2000);
    }
}