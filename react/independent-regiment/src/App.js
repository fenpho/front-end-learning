import React from 'react';
import { connect } from 'react-redux';

import { addGun, delGun, addGunAsync } from './index.redux';

@connect(
    // 你要什么属性放到props里
    state => ({ num: state }),
    // 你要什么方法放到props里，会自动dispatch
    { addGun, delGun, addGunAsync }
)
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>现在有机关枪{this.props.num}把</h1>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.delGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        );
    }
}

export default App;