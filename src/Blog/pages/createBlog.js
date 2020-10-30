import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Button, Select, List, Spin } from 'antd';
import { imageUrl } from '../thumbnail';
import '../Blog.css';
import { checkStorage } from '../../auth/utils/cookies';
import { categoryListAction } from '../../category_home_page/state/actions/Action';
import { createBlogs } from '../state/actions/actions';

const { Option } = Select;
const { TextArea } = Input;
const children = [];

for (let i = 10; i < 14; i++) {
  children.push(<Option key={i}>{i.toString(36)}</Option>);
}

class createBlog extends Component {
  state = {
    imageUrl: '',
    loading: false,
    response: null
  };
  componentDidMount() {
    this.props.categoryListAction();
  }
  handleSubmit = e => {
    e.preventDefault();
    let data = checkStorage();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ loading: true });
        values['Created_By'] = data.User_Id;
        this.props.createBlogs(values);
      }
    });
  };
  handleImageUrl = e => {
    debugger;
    this.setState({ imageUrl: e.target.src });
    console.log(e.target.src);
  };
  render() {
    const { addBlogState, uiState, categoryListState } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 10
        }
      }
    };
    if (addBlogState.Message === 'Blog Added Successfully...') {
      this.props.history.push('/dashboard/blog/list');
    }
    return (
      <div className="form-bg">
        <Spin spinning={uiState.loading}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Blog Title" hasFeedback>
              {getFieldDecorator('Blog_Title', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter blog heading!'
                  }
                ]
              })(<Input placeholder="Title not more than 50 words" />)}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Blog Description&nbsp;
                  <Tooltip title="It is a little detail about your blog">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
              hasFeedback
            >
              {getFieldDecorator('Blog_Subtitle', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter description!'
                  }
                ]
              })(<Input placeholder="Description not more than 50 words" />)}
            </Form.Item>
            <Form.Item label="Tags" hasFeedback>
              {getFieldDecorator('Tags', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter some Tags!'
                  }
                ]
              })(
                <Select
                  mode="tags"
                  placeholder="Like workfromhome,coding,technical etc"
                  style={{ width: '100%' }}
                  tokenSeparators={[',']}
                >
                  {children}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Blog Category" hasFeedback>
              {getFieldDecorator('Category_Id', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter category of blog!'
                  }
                ]
              })(
                <Select placeholder="select category of blog">
                  {children}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="content">
              {getFieldDecorator('Blog_Content', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter content of blog!'
                  }
                ]
              })(
                <TextArea
                  autoSize={{ minRows: 6 }}
                  placeholder="write content related to blog here!"
                />
              )}
            </Form.Item>
            <Form.Item label="Blog Image" hasFeedback>
              {getFieldDecorator('Image_Url', {
                initialValue: this.state.imageUrl,
                rules: [{}]
              })(
                <div className="scroll-container ">
                  <List
                    grid={{
                      xs: 1,
                      sm: 2,
                      md: 3,
                      lg: 3,
                      xl: 4,
                      xxl: 4
                    }}
                    dataSource={imageUrl}
                    renderItem={item => (
                      <List.Item>
                        <img
                          src={item}
                          onClick={this.handleImageUrl}
                          style={{ width: '180px', height: '200px' }}
                          alt="noimg"
                        />
                      </List.Item>
                    )}
                  />
                </div>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Create Blog
              </Button>
              <Button type="danger" ghost>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createBlogs: request => {
      dispatch(createBlogs(request));
    },
    categoryListAction: () => {
      dispatch(categoryListAction());
    }
  };
};
const mapStateToProps = state => {
  const {
    blogsState: { addBlogState, uiState },
    categoryState: { categoryListState }
  } = state;
  return { addBlogState, uiState, categoryListState };
};

createBlog = Form.create({ name: 'horizontal_form' })(createBlog);
export default connect(mapStateToProps, mapDispatchToProps)(createBlog);
