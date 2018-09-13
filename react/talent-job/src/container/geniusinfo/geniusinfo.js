import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AvatarSelector from '../../component/avatarselector/avatarselector';
import { update } from '../../redux/user.redux';

@connect(
  state => state.user,
  { update }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      avatar: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectPath;

    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={redirect} /> : null}
        <NavBar mode="dark">牛人完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgname => {
            this.setState({
              avatar: imgname
            });
          }}
        />
        <InputItem onChange={v => this.handleChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          title="个人简介"
          placeholder=""
          rows={3}
          onChange={v => this.handleChange('desc', v)}
          autoHeight
        />

        <Button onClick={() => this.props.update(this.state)} type="primary">
          保存
        </Button>
      </div>
    );
  }
}

export default GeniusInfo;
