import React, { Component, PureComponent } from 'react';
import { Map } from 'immutable';

let obj1 = { name: 1, other: { title: 'test' } };
let obj2 = { name: 1, other: { title: 'test' } };

// 递归对比，复杂度太高，不可接受
// react建议只做浅层比较，去除递归部分
function compareObj(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (let k in obj1) {
    if (obj1[k] !== obj2[k]) {
      return false;
    }
    // if (typeof obj1[k] === 'object') {
    //   return compareObj(obj1[k], obj2[k]);
    // } else if (obj1[k] !== obj2[k]) {
    //   return false;
    // }
  }

  return true;
}

let obj3 = Map({
  name: 'imook',
  course: Map({
    name: 'react-redux'
  })
});
let obj4 = obj3.set('name', 'fenpho');
console.log(obj3.get('course') === obj4.get('course'));
console.log(obj3 === obj4);

// immutable 优点
// 1. 减少内存使用
// 2. 并发安全
// 3. 降低项目复杂度
// 4. 便于比较复杂数据，定制shouldComponentUpdate
// 5. 时间旅行功能
// 6. 函数式编程
// 缺点：
// 1. 学习成本
// 2. 库的大小
// 3. 对现有项目入侵太严重

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 1,
      title: 'test',
      age: 18
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }
  handleClick() {
    this.setState({
      num: this.state.num + 1
    });
  }

  handleTitleClick() {
    this.setState({
      title: this.state.title + '!'
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.num}</h2>
        {/* 推荐 */}
        <button onClick={this.handleClick}>Btn0</button>
        {/* 推荐 */}
        <button onClick={this.handleTitleClick}>BtnTitle</button>
        {/* 次之每一次渲染render 都要重新生成函数 */}
        <button onClick={() => this.handleClick()}>Btn1</button>
        {/* 不推荐 每一次渲染render bind都会执行一次 */}
        <button onClick={this.handleClick.bind(this)}>Btn2</button>
        {/* 推荐 */}
        <p style={demoStyle}>我是汉字</p>
        {/* 不推荐 每一次渲染render 都生成新的对象传递 */}
        <p style={{ color: 'red' }}>我是汉字</p>
        {/* 推荐，只传递需要的数据 */}
        <Demo title={this.state.title} />
        {/* 不推荐，传递多余数据 */}
        <Demo {...this.state} />
      </div>
    );
  }
}

class Demo extends Component {
  // 单一属性
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.title === this.props.title) {
  //     return false;
  //   }
  //   return true;
  // }
  // 多属性
  shouldComponentUpdate(nextProps, nextState) {
    console.log(compareObj(obj1, obj2));
    if (compareObj(nextProps, this.props)) {
      return false;
    }
    return true;
  }
  render() {
    const user = ['hello', 'my', 'name', 'is', 'Arthur'];
    return (
      <div>
        <h2>
          I'am Demo，
          {this.props.title}
        </h2>
        <ul>
          {user.map(v => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>
    );
  }
}

// 若组件无状态，只是根据传入props是否变化来更新，可使用PureComponent代替component自动判断是否要更新渲染，不用手写shouldComponentUpdate
// class Demo extends PureComponent {
//   render() {
//     return (
//       <h2>
//         I'am Demo，
//         {this.props.title}
//       </h2>
//     );
//   }
// }

export default App;

const demoStyle = {
  color: 'red'
};
