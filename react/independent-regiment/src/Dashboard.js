import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import App from './App';
import { logout } from './Auth.redux';

function Erying() {
    return <h2>二营</h2>
}
function Qibinglian() {
    return <h2>骑兵连</h2>
}

@connect(
    state => state.auth,
    { logout }
)
class Dashboard extends React.Component {
    render() {
        const match = this.props.match;
        const redirectToLogin = <Redirect to='/login'></Redirect>
        const app = (
            <div>
                <h2>独立团</h2>
                <button onClick={this.props.logout}>注销</button>
                <ul>
                    <li>
                        <Link to={`${match.path}/`}>一营</Link>
                    </li>
                    <li>
                        <Link to={`${match.path}/erying`}>二营</Link>
                    </li>
                    <li>
                        <Link to={`${match.path}/qibinglian`}>骑兵连</Link>
                    </li>
                </ul>
                <Route path={`${match.path}/`} exact component={App}></Route>
                <Route path={`${match.path}/erying`} component={Erying}></Route>
                <Route path={`${match.path}/qibinglian`} component={Qibinglian}></Route>
            </div>
        );
        return this.props.isAuth? app : redirectToLogin;
    }
}

export default Dashboard;