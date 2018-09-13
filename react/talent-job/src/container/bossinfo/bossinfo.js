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
class BossInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      company: '',
      money: '',
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
        <NavBar mode="dark">Boss完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgname => {
            this.setState({
              avatar: imgname
            });
          }}
        />
        <InputItem onChange={v => this.handleChange('title', v)}>
          职位名称
        </InputItem>
        <InputItem onChange={v => this.handleChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.handleChange('money', v)}>
          薪资范围
        </InputItem>
        <TextareaItem
          title="职位要求"
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

export default BossInfo;
