import React, { Component } from 'react';
import { Button, List } from 'antd-mobile';

class App extends Component {
  render() {
    const boss = '李云龙';
    return (
      <div>
        <h2>独立团，团长{boss}</h2>
        <一营 老大='张大喵' />
        <骑兵连 老大='孙德胜' />
      </div>
    )
  }
}

// 实际开发中请勿使用中文做变量名
class 一营 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solders: ['虎子', '柱子', '王根生']
    }
    // this.addSolder = this.addSolder.bind(this);
  }

  componentWillMount() {
    console.log('组件马上就要加载了');
  }

  componentDidMount(){
    console.log('组件加载完毕');
  }

  addSolder = () => {
    console.log('Hello add solder');
    this.setState({
      solders: [...this.state.solders, '新兵蛋子' + Math.random()]
    })
  }

  render() {
    console.log('组件正在加载');
    return (
      <div>
        <h2>一营营长，{this.props.老大}</h2>
        <Button type='primary' onClick={this.addSolder}>新兵入伍</Button>
        <List renderHeader={() => '士兵列表'}>
          {this.state.solders.map(v => {
            return (
              <List.Item key={v}>{v}</List.Item>
            )
          })}
        </List>
      </div>
    )
  }
}

// 函数组件
function 骑兵连(props) {
  return <h2>骑兵连连长{props.老大}，冲啊！</h2>
}

export default App;
