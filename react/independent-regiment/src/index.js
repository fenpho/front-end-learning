import { createStore } from 'redux';

// 通过reducer建立store, 根据老的state和action生成新的state
function counter(state=0, action) {
    switch(action.type) {
        case '加机关枪':
            return state + 1;
        case '减机关枪':
            return state - 1;
        default:
            return 10;
    }
}

// 1.新建store
const store = createStore(counter);

const init = store.getState();
console.log(init);

// 2.订阅
function listener() {
    const current = store.getState();
    console.log(`现在有机关枪${current}把`);
}
store.subscribe(listener);

// 3.派发事件，传递action
store.dispatch({type:'加机关枪'});
store.dispatch({type:'加机关枪'});
store.dispatch({type:'减机关枪'});
