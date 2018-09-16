import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';

import { getUserList } from '../../redux/chatuser.redux';

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.getUserList('genius');
  }

  render() {
    return (
      <div>
        <WingBlank>
          <WhiteSpace />
          {this.props.userlist.map(
            v =>
              v.avatar ? (
                <div key={v._id}>
                  <WhiteSpace />
                  <Card>
                    <Card.Header
                      title={v.user}
                      thumb={require(`../../component/img/${v.avatar}.png`)}
                      extra={<span>{v.title}</span>}
                    />
                    <Card.Body>
                      <div>
                        {v.desc.split('\n').map(v => (
                          <p key={v}>{v}</p>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                  <WhiteSpace />
                </div>
              ) : null
          )}
        </WingBlank>
      </div>
    );
  }
}

export default Boss;
