import React, { Component } from 'react';
import { List, Avatar, Icon, Button, Divider } from 'antd';
import { connect } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import { getAllStudent, deleteStudent } from '../state/actions/actions';
import Loading from '../../components/global/loading/loading';
import { checkStorage } from '../../auth/utils/cookies';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
class studentList extends Component {
  state = {
    visible: false
  };
  componentDidMount() {
    this.props.getAllStudent({ Institute_Id: '1' });
  }
  handleDelete = Student_Id => {
    let user = checkStorage();
    debugger;
    let request = {
      User_Id: user.User_Id,
      Institute_Id: '1',
      Student_Id: Student_Id
    };
    this.props.deleteStudent(request);
    this.setState({ visible: true });
  };
  render() {
    const {
      uiState: { loading },
      remaining
    } = this.props;
    const layout = isMobile ? 'vertical' : 'horizontal';
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
                key={item.Student_Id}
                style={{ border: 'solid 1px', margin: '1%' }}
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={() => this.handleDelete(item.Student_Id)}
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
      studentState: { remaining }
    }
  } = state;
  return { uiState, remaining };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllStudent: request => {
      dispatch(getAllStudent(request));
    },
    deleteStudent: request => {
      dispatch(deleteStudent(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(studentList);
