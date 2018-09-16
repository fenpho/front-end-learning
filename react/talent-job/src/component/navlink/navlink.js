import React from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class NavLink extends React.Component {
  render() {
    const { pathname } = this.props.location;
    const navList = this.props.data.filter(v => !v.hide);
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            key={v.path}
            title={v.text}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path);
            }}
          />
        ))}
      </TabBar>
    );
  }
}

export default NavLink;

NavLink.propTypes = {
  data: PropTypes.array.isRequired
};
