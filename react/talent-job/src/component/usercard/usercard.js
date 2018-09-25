import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends React.Component {
  handleClick(v) {
    this.props.history.push(`/chat/${v.user}`);
  }
  render() {
    return (
      <div>
        <WingBlank>
          <WhiteSpace />
          {this.props.userlist.map(
            v =>
              v.avatar ? (
                <div key={v._id} onClick={() => this.handleClick(v)}>
                  <WhiteSpace />
                  <Card>
                    <Card.Header
                      title={v.user}
                      thumb={require(`../../component/img/${v.avatar}.png`)}
                      extra={<span>{v.title}</span>}
                    />
                    <Card.Body>
                      <div>
                        {v.type === 'boss' ? (
                          <p>
                            公司：
                            {v.company}
                          </p>
                        ) : null}
                        {v.desc.split('\n').map(d => (
                          <p key={d}>{d}</p>
                        ))}
                        {v.type === 'boss' ? (
                          <p>
                            薪水：
                            {v.money}
                          </p>
                        ) : null}
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

export default UserCard;

UserCard.propTypes = {
  userlist: PropTypes.array.isRequired
};
