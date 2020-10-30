import React, { Component } from 'react';
import { addTestAction, editTestAction } from '../state/actions/Actions';
import { getCategoryList } from '../../batch_management/state/actions/actions';
import { checkStorage } from '../../auth/utils/cookies';
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Button,
  Slider,
  Radio,
  Spin,
  Dropdown,
  DatePicker,
  Menu,
  Icon,
  Cascader
} from 'antd';
import { connect } from 'react-redux';

const { TextArea } = Input;
class TestDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Redirect: false,
      Automatic: true,
      update: '',
      status: false,
      loading: false,
      resultDate: 'Immediately After Test',
      editData: []
    };
  }
  componentDidMount = () => {
    const {
      testList: { inactive },
      match: { params },
      form
    } = this.props;
    this.props.getCategoryList();

    if (params.id) {
      const id = params.id;
      let editData = inactive.find(item => item.Test_Id === id);
      this.setState({
        editData: editData,
        Redirect: false,
        Automatic: editData.Is_Manual === '0' ? true : false
      });
      debugger;
      const LEVEL = {
        Easy: 0,
        Medium: 50,
        Hard: 100
      };
      form.setFieldsValue({
        Test_Name: editData.Test_Name,
        Test_Description: editData.Test_Description,
        Test_Duration: editData.Test_Duration,
        Test_Category: [editData.Category_Id, editData.SubCategory_Id],
        Test_Difficulty_Level: LEVEL[editData.Test_Difficulty_Level],
        Number_Of_Questions: editData.Number_Of_Questions,
        Total_Marks: editData.Total_Marks,
        Negative_Margin: editData.Negative_Margin,
        Result_Declaration: editData.Result_Declaration,
        No_Of_Attempt: editData.No_Of_Attempt
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const {
      match: { params }
    } = this.props;
    const user = checkStorage();
    const user_Id = user.isGoogle ? user.User_Id : user.Pk_User_Id;
    const LEVEL = { 0: 'Easy', 50: 'Medium', 100: 'Hard' };
    this.setState({ Redirect: true });
    debugger;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });

        values['Instruction_Id'] = '3,2,1';
        values['Instruction_Order_Number'] = '3,2,1';
        values['Test_Link'] = 'mock_Test';
        values['Test_Difficulty_Level'] = LEVEL[values.Test_Difficulty_Level];
        values['Test_Type'] = '1';
        values['Result_Declaration'] = this.state.resultDate;
        values['Category_Id'] = values.Test_Category[0];
        values['SubCategory_Id'] = values.Test_Category[1];
        values['Is_Manual'] = this.state.Automatic ? '0' : '1';
        if (!values.Total_Marks) {
          values['Total_Marks'] = '0';
          values['Negative_Margin'] = '0';
        }
        if (params.id) {
          values['Test_Id'] = params.id;
          values['Modified_By'] = user_Id;
          this.props.editTestAction(values);
        } else {
          values['Created_By'] = user_Id;
          this.props.addTestAction(values);
        }

        this.handleReset();
      }
    });
  };

  utilFormReset = () => {
    this.props.form.resetFields();
  };

  handleReset = e => {
    this.utilFormReset();
  };
  handleAutomatic = automatic => {
    this.setState({ Automatic: automatic });
  };

  selectResultDeclaration = e => {
    debugger;
    if (e.key === '1') {
      this.setState({ resultDate: 'Immediately After Test' });
    }
  };
  onChange = (value, dateString) => {
    this.setState({ resultDate: dateString });
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
  render() {
    const {
      match: { params }
    } = this.props;
    const {
      addTestList,
      Category,
      uiState: { loading }
    } = this.props;
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
          span: 16,
          offset: 8
        }
      }
    };
    const menu = (
      <Menu mode="vertical" onClick={this.selectResultDeclaration}>
        <Menu.Item key="1">Immediately After Test</Menu.Item>
        <Menu.Item key="2">
          <DatePicker
            showTime
            placeholder="Select Time"
            onChange={this.onChange}
            onOk={this.onOk}
          />
        </Menu.Item>
      </Menu>
    );

    if (addTestList.Message === 'success' && this.state.Redirect) {
      this.props.history.push('/dashboard/test/list');
    }
    return (
      <div>
        <Spin spinning={loading}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Test Name">
              {getFieldDecorator('Test_Name', {
                rules: [
                  {
                    required: true,
                    message: 'Please insert test name!'
                  }
                ]
              })(<TextArea autoSize={{ minRows: 2, maxRows: 8 }} />)}
            </Form.Item>
            <Form.Item label="Test Description">
              {getFieldDecorator('Test_Description', {
                rules: [
                  {
                    required: true,
                    message: 'Please insert test description!'
                  }
                ]
              })(<TextArea autoSize={{ minRows: 2, maxRows: 8 }} />)}
            </Form.Item>
            <Form.Item label="Test category" hasFeedback>
              {getFieldDecorator('Test_Category', {
                rules: [
                  {
                    required: true,
                    message: 'Please select the test category'
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
            <Form.Item label="Test Difficulty level">
              {getFieldDecorator('Test_Difficulty_Level', {
                initialValue: 50,
                rules: [
                  {
                    required: true,
                    message: 'Please select the test difficulty level'
                  }
                ]
              })(
                <Slider
                  step={50}
                  marks={{
                    0: 'Easy',
                    50: 'Medium',
                    100: 'Hard'
                  }}
                />
              )}
            </Form.Item>
            <Row>
              <Col span={12} style={{ marginLeft: '12%' }}>
                <Form.Item
                  label="Result Declaration"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 14 }}
                >
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Button style={{ margin: 'auto' }}>
                      {this.state.resultDate
                        ? this.state.resultDate
                        : 'Please select from dropdown'}
                      <Icon type="down" />
                    </Button>
                  </Dropdown>
                </Form.Item>
              </Col>
              <Col span={12} style={{ marginLeft: '-12%' }}>
                <Form.Item
                  label="Number Of Attempts"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 6 }}
                >
                  {getFieldDecorator('No_Of_Attempt', {
                    rules: [
                      {
                        required: true,
                        message: 'Please select correct options!'
                      }
                    ]
                  })(<InputNumber min={0} max={2000} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ marginLeft: '7.9%' }}>
                <Form.Item
                  label="Duration of Test (in minutes):"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 14 }}
                >
                  {getFieldDecorator('Test_Duration', {
                    rules: [
                      {
                        required: true,
                        message: 'Please select correct options!'
                      }
                    ]
                  })(<InputNumber min={0} max={2000} />)}
                </Form.Item>
              </Col>
              <Col span={12} style={{ marginLeft: '-7.9%' }}>
                <Form.Item
                  label="Number of Questions:"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 6 }}
                >
                  {getFieldDecorator('Number_Of_Questions', {
                    rules: [
                      {
                        required: true,
                        message: 'Please select correct options!'
                      }
                    ]
                  })(<InputNumber min={0} max={200} />)}
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Marks Allotment">
              <Radio.Group defaultValue={this.state.Automatic ? 'a' : 'b'}>
                <Radio.Button
                  disabled={
                    this.state.editData &&
                    this.state.editData.Number_Of_Questions_Added > 0
                      ? true
                      : false
                  }
                  value="a"
                  onChange={() => this.handleAutomatic(true)}
                >
                  Automatic
                </Radio.Button>
                <Radio.Button
                  value="b"
                  disabled={
                    this.state.editData &&
                    this.state.editData.Number_Of_Questions_Added > 0
                      ? true
                      : false
                  }
                  onChange={() => this.handleAutomatic(false)}
                >
                  Manually
                </Radio.Button>
              </Radio.Group>
            </Form.Item>

            {this.state.Automatic ? (
              <>
                <Row>
                  <Col span={12} style={{ marginLeft: '8%' }}>
                    <Form.Item
                      label="Total Marks:"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 14 }}
                    >
                      {getFieldDecorator('Total_Marks', {
                        rules: [
                          {
                            required: true,
                            message: 'Please select correct options!'
                          }
                        ]
                      })(<InputNumber min={0} max={2000} />)}
                    </Form.Item>
                  </Col>
                  <Col span={12} style={{ marginLeft: '-12%' }}>
                    <Form.Item
                      label="Negative Marks per Question:"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 6 }}
                    >
                      {getFieldDecorator('Negative_Margin', {
                        rules: [
                          {
                            required: true,
                            message: 'Please select correct options!'
                          }
                        ]
                      })(<InputNumber min={0} max={2000} />)}
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ) : null}

            <Form.Item {...tailFormItemLayout}>
              <Button type={params.id ? 'danger' : 'primary'} htmlType="submit">
                {params.id ? 'UPDATE' : 'SUBMIT'}
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button onClick={this.handleReset}>Reset</Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    testState: { testList, addTestList, uiState },
    batchState: {
      createBatchState: { Category }
    },
    authState: { login }
  } = state;
  return {
    testList,
    addTestList,
    Category,
    login,
    uiState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getCategoryList: () => {
      dispatch(getCategoryList());
    },
    editTestAction: request => {
      dispatch(editTestAction(request));
    },
    addTestAction: request => {
      dispatch(addTestAction(request));
    }
  };
};
TestDetail = Form.create({ name: 'horizontal_login' })(TestDetail);
export default connect(mapStateToProps, mapDispatchToProps)(TestDetail);
