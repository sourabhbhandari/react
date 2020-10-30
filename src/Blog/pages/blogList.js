import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/global/loading/loading';
import BlogCards from '../component/BlogCards';
import { Row, Col } from 'antd';
import { checkStorage } from '../../auth/utils/cookies';
import { getUserBLog } from '../state/actions/actions';

class blogList extends Component {
  state = {
    loading: false,
    response: null
  };

  componentDidMount() {
    debugger;
    const user = checkStorage();
    this.props.getUserBLog(user.User_Id);
  }
  render() {
    const { blogListState, uiState } = this.props;
    debugger;

    return (
      <div>
        <Row style={{ marginTop: '5%' }}>
          <Col span={2}></Col>
          <Col span={20}>
            {uiState.loading ? (
              <Loading />
            ) : (
              <BlogCards blogList={blogListState.userBlogs} page="blogList" />
            )}
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    blogsState: { blogListState, uiState }
  } = state;
  return { blogListState, uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserBLog: request => {
      dispatch(getUserBLog(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(blogList);
