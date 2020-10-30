import React, { Component } from 'react';
import { Form, Button, TimePicker, Tooltip, Icon, Select, Spin } from 'antd';
import { connect, batch } from 'react-redux';
import { addSubject, getTeacherList } from '../../state/actions/actions';

const { Option } = Select;
class addSubjectForm extends Component {
  state = { options: [] };
  componentDidMount() {}
  handleSubmit = e => {
    e.preventDefault();
    debugger;
    const {
      batchId,
      batchListState: { active }
    } = this.props;
    let data = active.find(item => item.Batch_Id === batchId);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['Subject_Start_Time'] = values.Subject_Start_Time.format(
          'HH:mm'
        );
        values['Subject_End_Time'] = values.Subject_End_Time.format('HH:mm');
        values['Created_By'] = '63';
        values['Batch_Id'] = batchId;
        values['Institute_Id'] = '1';
        values['Category_Id'] = data.Category_Id;
        values['SubCategory_Id'] = data.SubCategory_Id;
        this.props.addSubject(values);
      }
    });
  };
  selectSubject = e => {
    debugger;
    const { batchId } = this.props;
    let request = {
      Institute_Id: '1',
      Batch_Id: batchId,
      Subject_Id: e
    };
    this.props.getTeacherList(request);
  };

  render() {
    const { subjectState, teacherState } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };

    const tailFormItemLayout = {
      wrapperCol: { span: 14, offset: 4 }
    };

    return (
      <div style={{ marginTop: '1%' }}>
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Form.Item label="Select Subject" hasFeedback>
            {getFieldDecorator('Subject_Id', {
              rules: [
                {
                  required: true,
                  message: 'Please Select Subject!'
                }
              ]
            })(
              <Select defaultValue="lucy" onChange={this.selectSubject}>
                {subjectState.remaining.map(item => (
                  <Option value={item.Subject_Id}>{item.Subject_Name}</Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label={
              <span>
                Batch Timing &nbsp;
                <Tooltip title="Time of batch">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            {getFieldDecorator('Subject_Start_Time')(
              <TimePicker
                style={{ marginRight: '2%' }}
                placeholder="starting time"
                format="HH:mm"
              />
            )}
            {getFieldDecorator('Subject_End_Time')(
              <TimePicker placeholder="end time" format="HH:mm" />
            )}
          </Form.Item>
          <Form.Item label="Select Faculty" hasFeedback>
            {getFieldDecorator(
              'Faculty_Id',
              {}
            )(
              <Select
                onChange={this.handleChange}
                disabled={teacherState.remaining[0] ? false : true}
              >
                {teacherState.remaining.map(item => (
                  <Option value={item.Faculty_Id}>{item.Email_Id}</Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add Subject
            </Button>
            <Button type="danger" ghost>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: { batchListState, subjectState, teacherState }
  } = state;
  return { batchListState, subjectState, teacherState };
};
const mapDispatchToProps = dispatch => {
  return {
    addSubject: request => {
      dispatch(addSubject(request));
    },
    getTeacherList: request => {
      dispatch(getTeacherList(request));
    }
  };
};
addSubjectForm = Form.create({ name: 'horizontal_login' })(addSubjectForm);
export default connect(mapStateToProps, mapDispatchToProps)(addSubjectForm);
