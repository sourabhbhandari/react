import React, { Component } from 'react';
import '../Blog.css';
import { Row, Col, Button, BackTop, Spin } from 'antd';
import { connect } from 'react-redux';
import Footer from '../../landing/Home/home_footer';
import { HomeFooterDataSource } from '../../landing/Home/data.source';
import { enquireScreen } from 'enquire-js';
import BlogCards from '../component/BlogCards';
import Header from '../component/BlogHeader';
import { getBlogList } from '../state/actions/actions';

import noimg from '../noimg.jpg';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
export class CardDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minValue: 0,
      maxValue: 9,
      loading: false,
      response: null
    };
  }
  componentDidMount() {
    this.props.getBlogList();
  }
  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 9
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 9
      });
    }
  };

  render() {
    const { blogListState, uiState } = this.props;
    return (
      <>
        <Header />
        <BackTop style={{ right: '40px', bottom: '100px' }} />
        <div style={{ background: '#F5F5F5' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '5%' }}>
            Latest Article's
          </h1>
          <Row>
            <Col span={isMobile ? 2 : 4}>
              {isMobile ? null : (
                <div style={{ margin: '40% 25% auto 25%' }}>
                  <h4
                    style={{
                      fontWeight: 700,
                      color: 'rgba(0, 0, 0, 0.84)',
                      lineHeight: '40px'
                    }}
                  >
                    TestEngine
                  </h4>
                  <p>Best Platform for online test</p>
                  <Button ghost type="primary" style={{ marginLeft: '-1%' }}>
                    Follow
                  </Button>
                </div>
              )}
            </Col>
            <Col span={isMobile ? 20 : 16}>
              <Spin spinning={uiState.loading}>
                <BlogCards blogList={blogListState.allBlogs} page="blogHome" />
              </Spin>
            </Col>
            <Col span={isMobile ? 2 : 4}></Col>
          </Row>
          <Footer
            id="HomeFooter_0"
            key="HomeFooter_0"
            dataSource={HomeFooterDataSource}
            isMobile={isMobile}
          />
        </div>
      </>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getBlogList: () => {
      dispatch(getBlogList());
    }
  };
};
const mapStateToProps = state => {
  const {
    blogsState: { blogListState, uiState }
  } = state;
  return {
    blogListState,
    uiState
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardDisplay);
