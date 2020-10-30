import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Form,
  Button,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  DatePicker,
  TimePicker,
  Cascader,
  Row,
  Col,
  Spin
} from 'antd';
import {
  createBatch,
  getCategoryList,
  updateBatch
} from '../state/actions/actions';

const { RangePicker } = DatePicker;
class CreateBatch extends Component {
  state = {
    Redirect: false
  };
  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.children = [];
    targetOption.subCategory.map(item => {
      targetOption.children.push({
        label: item.Category_Name,
        value: item.Category_Id
      });
    });
  };
  componentDidMount() {
    this.props.getCategoryList();
    const {
      batchListState: { active },
      match: { params },
      form
    } = this.props;

    if (params.id && active.length != 0) {
      let batch = active.find(item => item.Batch_Id === params.id);
      form.setFieldsValue({
        Batch_Name: batch.Batch_Name,
        Batch_Description: batch.Batch_Description,
        Course_Category: [batch.Category_Id, batch.SubCategory_Id],
        range_picker: [
          moment(batch.Batch_Start_Date, 'YYYY/MM/DD'),
          batch.Batch_End_Date ? moment(batch.Batch_End_Date, 'YYYY/MM/DD') : ''
        ],

        Course_Days: ['1', '2']
      });
    } else {
      this.props.history.push('/dashboard/batch/create');
    }
  }
  utilFormReset = () => {
    this.props.form.resetFields();
  };

  handleReset = e => {
    e.preventDefault();
    this.utilFormReset();
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      match: { params }
    } = this.props;
    this.setState({ Redirect: true });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const rangeValue = values['range_picker'];
        values['Batch_Active_Days'] = values.Course_Days.toString();
        values['Category_Id'] = values.Course_Category[0]
          ? values.Course_Category[0]
          : '';
        values['SubCategory_Id'] = values.Course_Category[1]
          ? values.Course_Category[1]
          : '';
        values['Institute_Id'] = '1';

        values['Batch_Start_Date'] = rangeValue[0].format('YYYY-MM-DD');
        values['Batch_End_Date'] = rangeValue[1].format('YYYY-MM-DD');

        if (params.id) {
          values['Batch_Id'] = params.id;
          values['Maintained_By'] = '63';
          values['Modified_By'] = '63';
          this.props.updateBatch(values);
        } else {
          values['Created_By'] = '63';
          this.props.createBatch(values);
        }
      }
    });
  };

  render() {
    const days = [
      { key: 0, day: 'Mo' },
      { key: 1, day: 'Tu' },
      { key: 2, day: 'We' },
      { key: 3, day: 'Th' },
      { key: 4, day: 'Fr' },
      { key: 5, day: 'Sa' },
      { key: 6, day: 'Su' }
    ];
    const { getFieldDecorator } = this.props.form;
    const {
      createBatchState: { Category, response },
      uiState: { loading },
      match: { params }
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    const tailFormItemLayout = {
      wrapperCol: { span: 12, offset: 6 }
    };
    if (
      (response.Message === 'Batch updated Successfully...' ||
        response.Message === 'Batch Added Successfully...') &&
      this.state.Redirect
    ) {
      this.props.history.push('/dashboard/batch/list');
    }
    return (
      <div>
        <Spin spinning={loading}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Batch Name" hasFeedback>
              {getFieldDecorator('Batch_Name', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter batch name!'
                  }
                ]
              })(<Input placeholder="Title not more than 25 words" />)}
            </Form.Item>
            <Form.Item label="Batch Description" hasFeedback>
              {getFieldDecorator('Batch_Description', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter content of blog!'
                  }
                ]
              })(<Input placeholder="" />)}
            </Form.Item>
            <Form.Item label="Course Category" hasFeedback>
              {getFieldDecorator('Course_Category', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter content of blog!'
                  }
                ]
              })(
                <Cascader
                  options={Category}
                  loadData={this.loadData}
                  changeOnSelect
                />
              )}
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Batch Duration &nbsp;
                  <Tooltip title="Duration of batch">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
              hasFeedback
            >
              {getFieldDecorator('range_picker')(<RangePicker />)}
            </Form.Item>

            <Form.Item label="Active Days">
              {getFieldDecorator('Course_Days', {
                rules: [
                  {
                    required: true,
                    message: 'Please Select days !'
                  }
                ]
              })(
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row>
                    {days.map(item => (
                      <Col span={3}>
                        <Checkbox value={item.key}>{item.day}</Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type={params.id ? 'danger' : 'primary'} htmlType="submit">
                {params.id ? 'Update Batch' : 'Create Batch'}
              </Button>
              <Button type="danger" ghost onClick={this.handleReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}

CreateBatch = Form.create({ name: 'horizontal-form' })(CreateBatch);
const mapStateToProps = state => {
  const {
    batchState: { createBatchState, batchListState, uiState }
  } = state;
  return {
    createBatchState,
    batchListState,
    uiState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createBatch: request => {
      dispatch(createBatch(request));
    },
    getCategoryList: () => {
      dispatch(getCategoryList());
    },
    updateBatch: request => {
      dispatch(updateBatch(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateBatch);
