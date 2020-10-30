import React, { Component } from 'react';
import { Rate, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { checkStorage } from './state/utils/Cookies';
import { userFeedbackAction, getResultAction } from './state/action/Action';
const { TextArea } = Input;

const imageStyle = {
  width: '100%',
  height: '200px'
};

const formStyle = {
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  backgroundColor: '#87e8de'
};
const FeedbackHeader = () => {
  return (
    <div style={imageStyle}>
      <div style={{ padding: '50px' }}>
        <h3>Thank You!</h3>
        <h4>
          <a href="http://localhost:3000/">Open University</a> wish you all the
          best for your bright future
        </h4>
      </div>
    </div>
  );
};

const FeedbackFooter = () => {
  return (
    <div style={imageStyle}>
      <div style={{ padding: '50px' }}>
        <h3>
          Powered by <a href="http://localhost:3000/">Code Planet </a>
        </h3>
        <h4>
          We help you practice with the best sample papers for any exams of your
          choice
        </h4>
      </div>
    </div>
  );
};

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    const user = checkStorage();
    this.props.getResultAction({ Test_Id: params.id, User_Id: user.User_Id });
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      match: { params }
    } = this.props;

    const data = checkStorage();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const Data = {
          Test_Id: params.id,
          User_Id: data.User_Id,
          Rating: values.rate,
          Message: values.feedback
        };
        this.props.submitFeedback(Data);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      match: { params }
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const { userFeedbackState } = this.props;
    if (userFeedbackState.status) {
      this.props.history.push(`/`);
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <FeedbackHeader />
        <h2>We value your feedback</h2>
        <Form
          style={formStyle}
          {...formItemLayout}
          onSubmit={this.handleSubmit}
        >
          <Form.Item style={{ width: '250px' }} label="Rate">
            {getFieldDecorator('rate', {
              initialValue: 0
            })(<Rate />)}
          </Form.Item>

          <Form.Item style={{ width: '100%' }} label="Feedback">
            {getFieldDecorator('feedback', {
              initialValue: 0
            })(
              <TextArea
                placeholder="Write your feedback here"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            )}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <FeedbackFooter />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    userTestState: { userRegisterState, userFeedbackState }
  } = state;
  return { userRegisterState, userFeedbackState };
};
const mapDispatchToProps = dispatch => {
  return {
    submitFeedback: request => {
      dispatch(userFeedbackAction(request));
    },
    getResultAction: request => {
      dispatch(getResultAction(request));
    }
  };
};
Feedback = Form.create({ name: 'validate_feedback' })(Feedback);
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
