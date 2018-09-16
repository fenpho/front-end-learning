import React from 'react';
import PropTypes from 'prop-types';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class UserCard extends React.Component {
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
