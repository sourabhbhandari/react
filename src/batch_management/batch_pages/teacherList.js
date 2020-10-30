import React, { Component } from 'react';
import { List, Button, Icon, Avatar, Divider } from 'antd';
import { enquireScreen } from 'enquire-js';
import { checkStorage } from '../../auth/utils/cookies';
import { connect } from 'react-redux';
import { getInstituteTeacher, deleteTeacher } from '../state/actions/actions';
import Loading from '../../components/global/loading/loading';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
class teacherList extends Component {
  state = {
    response: null
  };
  componentDidMount() {
    this.props.getInstituteTeacher({ Institute_Id: '1' });
  }
  handleDelete = facultyId => {
    let user = checkStorage();
    let request = {
      User_Id: user.User_Id,
      Institute_Id: '1',
      Faculty_Id: facultyId
    };
    this.props.deleteTeacher(request);
  };
  render() {
    const layout = isMobile ? 'vertical' : 'horizontal';
    const {
      uiState: { loading },
      remaining
    } = this.props;
    return (
      <div>
        <Divider>
          <Avatar icon="user" size={80} />
        </Divider>
        {!loading ? (
          <List
            style={isMobile ? { textAlign: 'center' } : { margin: '20px' }}
            itemLayout={layout}
            pagination={{
              onChange: page => {},
              pageSize: 6
            }}
            dataSource={remaining}
            renderItem={item => (
              <List.Item
                key={item.Faculty_Id}
                style={{ border: 'solid 1px', margin: '1%' }}
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={() => this.handleDelete(item.Faculty_Id)}
                  >
                    <Icon type="delete" theme="filled" />
                  </Button>
                ]}
              >
                <List.Item.Meta
                  style={{ marginLeft: '2%', fontSize: '8px' }}
                  avatar={<Avatar icon="user" />}
                  title={
                    <span style={{ textTransform: 'capitalize' }}>
                      {item.Email_Id}
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: {
      uiState,
      teacherState: { remaining }
    }
  } = state;
  return { uiState, remaining };
};
const mapDispatchToProps = dispatch => {
  return {
    getInstituteTeacher: request => {
      dispatch(getInstituteTeacher(request));
    },
    deleteTeacher: request => {
      dispatch(deleteTeacher(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(teacherList);
