import React, { Component } from 'react';
import {
  List,
  Button,
  Icon,
  Rate,
  message,
  Dropdown,
  Menu,
  Switch
} from 'antd';
import { enquireScreen } from 'enquire-js';
import { NavLink, Link } from 'react-router-dom';
import { checkStorage } from '../../auth/utils/cookies';
import Loading from '../../components/global/loading/loading';
import { connect } from 'react-redux';
import '../test.css';
import {
  deleteTestAction,
  getTestListAction,
  publishTest
} from '../state/actions/Actions';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
const createMenu = testId => {
  return (
    <Menu>
      <Menu.Item key="1">
        <span>
          <Icon type="read" style={{ fontSize: '18px' }} />

          <span>
            <NavLink
              to={`/dashboard/questionlibrary/${testId}`}
              activeClassName="selected"
            >
              Add from Question Library
            </NavLink>
          </span>
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <Icon type="file-unknown" style={{ fontSize: '18px' }} />

          <span>
            <NavLink
              to={`/dashboard/test/${testId}/question/create`}
              activeClassName="selected"
            >
              Create Question Manually
            </NavLink>
          </span>
        </span>
      </Menu.Item>
    </Menu>
  );
};

const DummyComponent = props => {
  return (
    <>
      {props.active === '0' ? (
        <Dropdown overlay={() => createMenu(props.id)}>
          <Button type="primary">
            Add Question <Icon type="down" style={{ fontSize: '16px' }} />
          </Button>
        </Dropdown>
      ) : (
        <Link to={`/dashboard/test/${props.id}/scorecard`}>
          <Button type="primary">Score Card</Button>
        </Link>
      )}

      <Link to={`/dashboard/test/${props.id}/details`}>
        <Button type="primary" ghost>
          Show Details
        </Button>
      </Link>
    </>
  );
};
class TestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleDelete = tesId => {
    this.props.deleteTestAction(tesId);
  };
  componentDidMount = () => {
    const user_details = checkStorage();
    const user_Id = user_details.isGoogle
      ? user_details.User_Id
      : user_details.Pk_User_Id;

    this.props.getTestListAction(user_Id);
  };
  publishTest = testId => {
    debugger;
    this.props.publishTest(testId);
  };
  copyOnClipBoard = testLink => {
    navigator.clipboard.writeText(`http://localhost:3000/first/${testLink}`);
    message.info('Link Copied!!!');
  };
  render() {
    const layout = isMobile ? 'vertical' : 'horizontal';
    const {
      testList: { active, inactive },
      uiState: { loading },
      Active
    } = this.props;
    return (
      <div>
        {/* <Divider>
          <Icon type="file-text" theme="twoTone" style={{ fontSize: '50px' }} />
          <h3 style={{ textAlign: 'center' }}>Test List</h3>
        </Divider> */}
        {!loading ? (
          <List
            style={isMobile ? { textAlign: 'center' } : {}}
            itemLayout={layout}
            pagination={{
              onChange: page => {},
              pageSize: 5
            }}
            dataSource={Active ? active : inactive}
            renderItem={item => (
              <List.Item
                className="test-list"
                key={item.Test_Id}
                actions={[
                  item.Is_Link_Active === '0' ? (
                    <>
                      <Link to={`/dashboard/test/${item.Test_Id}/edit/`}>
                        <Button type="primary" size="small" shape="circle">
                          <Icon type="edit" theme="filled" />
                        </Button>
                      </Link>
                      <Button
                        type="primary"
                        size="small"
                        shape="circle"
                        onClick={() => this.handleDelete(item.Test_Id)}
                      >
                        <Icon type="delete" theme="filled" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="primary"
                      size="small"
                      shape="circle"
                      onClick={() => this.copyOnClipBoard(item.Test_Link)}
                    >
                      <Icon type="share-alt" />
                    </Button>
                  )
                ]}
              >
                <List.Item.Meta
                  title={
                    <div className="test-details">
                      {item.Test_Name}

                      <Switch
                        size="small"
                        checked={item.Is_Link_Active === '1' ? true : false}
                        onChange={() => this.publishTest(item.Test_Id)}
                        checkedChildren={<Icon type="check" />}
                        unCheckedChildren={<Icon type="close" />}
                        style={{ marginLeft: '2%' }}
                        disabled={
                          item.Number_Of_Questions ===
                          item.Number_Of_Questions_Added
                            ? false
                            : true
                        }
                      />
                    </div>
                  }
                  description={
                    <>
                      <DummyComponent
                        id={item.Test_Id}
                        active={item.Is_Link_Active}
                      />
                    </>
                  }
                />
                <Rate
                  disabled
                  defaultValue={item.Test_Rating}
                  style={{ fontSize: '18px' }}
                />
                <p>{item.Number_Of_Questions}</p>
                <span>Questions</span>
                <p>{item.Test_Duration}</p>
                <span>Minutes</span>
                <p>{item.No_Of_Attempt}</p>
                <span>Attempts</span>
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
    testState: { testList, uiState }
  } = state;
  return { testList, uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    publishTest: request => {
      dispatch(publishTest(request));
    },
    getTestListAction: request => {
      dispatch(getTestListAction(request));
    },
    deleteTestAction: request => {
      dispatch(deleteTestAction(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TestList);
