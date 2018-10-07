import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import DashBoard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(err, info) {
    console.log(err, info);
    this.setState({
      hasError: true
    });
  }

  render() {
    return this.state.hasError ? (
      <h2>error</h2>
    ) : (
      <div>
        <AuthRoute />
        {/* 类似switch语句，命中一个路由就不在执行其他路由，若不加switch则，所有页面均会加载DashBoard组件 */}
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={DashBoard} />
        </Switch>
      </div>
    );
  }
}

export default App;
