import React, { Component } from 'react';
import { List, Card, Icon, Avatar, Row, Col, Switch, Divider } from 'antd';
import { connect } from 'react-redux';
import { checkStorage } from '../../auth/utils/cookies';
import ClapIcon from './clapIcon';
import SaveIcon from './saveIcon';
import { publishBlog, getCategoryBlog } from '../state/actions/actions';

import '../Blog.css';

const { Meta } = Card;
class BlogCards extends Component {
  state = {
    checked: '',
    loading: false,
    response: null
  };
  selectCategory = categoryId => {
    const { page } = this.props;
    debugger;
    if (page === 'blogHome') {
      this.props.getCategoryBlog(categoryId);
    }
  };
  getTimeDetails = Time => {
    var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    var d = new Date(Time);
    let time = `${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()}`;
    return time;
  };
  onChange = blogId => {
    debugger;
    let user = checkStorage();
    this.setState({ loading: true });
    let request = { Blog_Id: blogId, Created_By: user.User_Id.toString() };
    this.props.publishBlog(request);
  };
  render() {
    const { blogList, page } = this.props;
    return (
      <div>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3
          }}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 12
          }}
          dataSource={blogList}
          renderItem={item => (
            <List.Item>
              <Card
                className="card-style"
                hoverable
                style={{ height: 440 }}
                cover={
                  <img
                    alt="example"
                    src={item.Image_Url}
                    className="blog-list-img"
                  />
                }
              >
                <p style={{ marginBottom: '10px' }}>
                  <Icon type="folder-open" />
                  <span
                    style={{ marginRight: '10%', marginLeft: '2%' }}
                    onClick={() => this.selectCategory(item.Category_Id)}
                  >
                    {item.Category_Name}
                  </span>
                  <Icon type="calendar" />
                  <span style={{ marginLeft: '2%' }}>
                    {this.getTimeDetails(item.Created_Date)}
                  </span>
                </p>
                <p></p>
                <Meta
                  title={
                    <a href={`/blog/${item.Blog_Id}`}>{item.Blog_Title}</a>
                  }
                  description={item.Blog_Subtitle}
                />
                {page === 'blogHome' ? (
                  <>
                    <Row>
                      <Col span={16}>
                        <Avatar src="https://cdn.gillion.shufflehound.com/wp-content/uploads/2017/01/13.jpg" />
                        <span style={{ fontSize: '16px', marginLeft: '4%' }}>
                          {item.Publisher}
                        </span>
                      </Col>
                      <Col span={8}>
                        <Icon
                          component={ClapIcon}
                          style={{ marginRight: '1%' }}
                        />
                        {item.Likes_Count}
                        <Divider type="vertical" />
                        <Icon
                          component={SaveIcon}
                          style={{ marginRight: '1%' }}
                        />
                      </Col>
                    </Row>
                  </>
                ) : null}
                <br />

                {page === 'blogHome' ? null : (
                  <>
                    <Switch
                      onChange={() => this.onChange(item.Blog_Id)}
                      defaultChecked={item.Is_Active == 1 ? true : false}
                    />

                    <span style={{ marginRight: '10%' }}>
                      For Publish/UnPublish
                    </span>
                  </>
                )}
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { blogsState } = state;
};
const mapDispatchToprops = dispatch => {
  return {
    publishBlog: request => {
      dispatch(publishBlog(request));
    },
    getCategoryBlog: request => {
      dispatch(getCategoryBlog(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToprops)(BlogCards);
