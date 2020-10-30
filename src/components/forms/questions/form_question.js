import React from 'react';
import { getTestListAction } from '../../../TestDetail/state/actions/Actions';
import { checkStorage } from '../../../auth/utils/cookies';
import {
  Form,
  Select,
  InputNumber,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Checkbox,
  Row,
  Col,
  Input,
  Spin,
  Cascader
} from 'antd';
import { getSubjectList } from '../../../batch_management/state/actions/actions';
import { connect } from 'react-redux';

import {
  addQuestionAction,
  editQuestionAction
} from './question-state/actions/questionActions';

const { Option } = Select;
const { TextArea } = Input;

let options = null;
class QuestionForm extends React.Component {
  constructor() {
    super();
    this.state = {
      option_names: 'ABCDEFGHEI',
      options: 0,
      single_correct_type: true,
      marks: 0,
      Test_Data: null
    };
  }

  componentDidMount() {
    const {
      questionList,
      testList,
      match: { params },
      form
    } = this.props;
    const user_details = checkStorage();
    const LEVEL = {
      1: 0,
      2: 50,
      3: 100
    };
    this.props.getTestListAction(user_details.User_Id);
    if (params.testId) {
      let Test_Data = testList.inactive.find(
        item => item.Test_Id === params.testId
      );
      this.setState({ Test_Data });
      let request = {
        SubCategory_Id: Test_Data.SubCategory_Id
      };
      this.props.getSubjectList(request);
    }
    if (params.questionId && questionList) {
      const selectedData = questionList.find(
        item => item.Question_Id === params.questionId
      );

      options = selectedData.Question_Options;
      this.setState({ options: options.length });
      selectedData.Question_Type === '1'
        ? this.setState({ single_correct_type: false })
        : this.setState({ single_correct_type: true });

      form.setFieldsValue({
        Question_Text: selectedData.Question_Text,
        Test_Name: selectedData.Test_Id,
        Category_Name: selectedData.Category_Id,
        Question_Difficulty_Level:
          LEVEL[selectedData.Question_Difficulty_Level],
        Negative_Mark: selectedData.Negative_Mark,
        Question_Duration: selectedData.Question_Duration,
        Question_Marks: selectedData.Question_Marks,
        Question_Options_Number: selectedData.Question_Options.length,
        Question_Type: selectedData.Question_Type === '1' ? 'b' : 'a'
      });
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
    const { questionList } = this.props;
    const {
      match: { params }
    } = this.props;
    const user_details = checkStorage();
    const LEVEL = {
      0: '0',
      50: '1',
      100: '2'
    };
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values['question_options'] = [];
        let answer = values.radio_group
          ? [values.radio_group]
          : values.checkbox_group;
        if (!params.questionId) {
          for (var i = 0; i < values.Question_Options_Number; i++) {
            if (answer.includes(this.state.option_names[i])) {
              values.question_options.push({
                Option_Text: values[this.state.option_names[i]],
                Answer_Type: 1,
                Created_By: user_details.User_Id
              });
            } else {
              values.question_options.push({
                Option_Text: values[this.state.option_names[i]],
                Answer_Type: 0,
                Created_By: user_details.User_Id
              });
            }
          }
        } else {
          for (var i = 0; i < values.Question_Options_Number; i++) {
            if (answer.includes(this.state.option_names[i])) {
              values.question_options.push({
                Pk_Option_Id: options[i].Pk_Option_Id,
                Option_Text: values[this.state.option_names[i]],
                Answer_Type: 1,
                Modified_By: user_details.User_Id
              });
            } else {
              values.question_options.push({
                Pk_Option_Id: options[i].Pk_Option_Id,
                Option_Text: values[this.state.option_names[i]],
                Answer_Type: 0,
                Modified_By: user_details.User_Id
              });
            }
          }
        }

        let request = {
          Test_Id: values.Test_Id,
          Question_Text: values.Question_Text,
          Question_Marks: values.Question_Marks,
          Negative_Mark: values.Negative_Mark,
          Question_Type: values.Question_Type,
          Question_Difficulty_Level: LEVEL[values.Question_Difficulty_Level],
          Question_Options_Number: values.Question_Options_Number,
          question_options: values.question_options,
          Question_Category_Id: values.SubCategory_Id
        };
        if (params.questionId) {
          request['Pk_Question_Id'] = params.questionId;
          request['Question_Modified_By'] = user_details.User_Id;
          this.props.editQuestionAction(request);
        } else {
          request['Question_Created_By'] = user_details.User_Id;
          this.props.addQuestionAction(request);
        }
      }
    });
  };

  normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  createOptions = options => {
    const { getFieldDecorator } = this.props.form;
    let option_objects = [];
    let optionText = '';

    for (let index = 0; index < this.state.options; index++) {
      optionText = this.state.option_names[index];
      option_objects.push(
        <Form.Item label={this.state.option_names[index]} hasFeedback>
          {getFieldDecorator(`${optionText}`, {
            initialValue: options ? options[index].Option_Text : null,
            rules: [
              { required: true, message: `Please enter option ${optionText}!` }
            ]
          })(
            <TextArea
              autoSize={{ minRows: 2, maxRows: 5 }}
              placeholder={`Please enter option ${optionText}!`}
            />
          )}
        </Form.Item>
      );
    }
    return option_objects;
  };

  createCorrectOptions = options => {
    let correct_option_objects = [];
    let multi_checklist_correct_option_objects = [];
    let radio_correct_option_objects = [];

    const { getFieldDecorator } = this.props.form;
    for (let index = 0; index < this.state.options; index++) {
      radio_correct_option_objects.push(
        <Radio value={this.state.option_names[index]}>
          {this.state.option_names[index]}
        </Radio>
      );
    }
    for (let index = 0; index < this.state.options; index++) {
      multi_checklist_correct_option_objects.push(
        <Col span={4}>
          <Checkbox value={this.state.option_names[index]}>
            {this.state.option_names[index]}
          </Checkbox>
        </Col>
      );
    }
    // eslint-disable-next-line no-lone-blocks
    {
      this.state.single_correct_type === true
        ? correct_option_objects.push(
            <Form.Item label="Correct option">
              {getFieldDecorator('radio_group', {
                rules: [
                  { required: true, message: 'Please select correct option!' }
                ]
              })(
                <Radio.Group hasFeedback>
                  {radio_correct_option_objects}
                </Radio.Group>
              )}
            </Form.Item>
          )
        : correct_option_objects.push(
            <Form.Item label="Correct options">
              {getFieldDecorator('checkbox_group', {
                rules: [
                  { required: true, message: 'Please select correct options!' }
                ]
              })(
                <Checkbox.Group style={{ width: '100%' }}>
                  <Row>{multi_checklist_correct_option_objects}</Row>
                </Checkbox.Group>
              )}
            </Form.Item>
          );
    }
    return correct_option_objects;
  };

  handle_change_options = e => {
    if (e <= 10) {
      this.setState({
        options: e
      });
    }
  };

  handle_multiple_options = e => {
    if (e.target.value === '0') {
      this.setState({
        single_correct_type: true
      });
    } else {
      this.setState({
        single_correct_type: false
      });
    }
  };
  selectCategory = e => {
    const {
      testList: { inactive }
    } = this.props;
    let Test_Data = inactive.find(item => item.Test_Id === e);
    this.setState({ Test_Data });
    this.props.getSubjectList({ SubCategory_Id: Test_Data.SubCategory_Id });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const {
      testList: { inactive },
      remaining,
      loaderState: { loading }
    } = this.props;
    const { Test_Data } = this.state;
    const {
      match: { params }
    } = this.props;

    return (
      <>
        <Spin spinning={loading}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Which Test" hasFeedback>
              {getFieldDecorator('Test_Id', {
                initialValue: params.testId ? params.testId : '',
                rules: [
                  {
                    required: true,
                    message: 'Please select your Test Name from List!'
                  }
                ]
              })(
                <Select
                  placeholder="Please select a Test Name from List"
                  disabled={params.testId ? true : false}
                  onSelect={this.selectCategory}
                >
                  {inactive.map(test => (
                    <Option value={test.Test_Id}>{test.Test_Name}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Select Category" hasFeedback>
              {getFieldDecorator('SubCategory_Id', {
                rules: [
                  {
                    required: true,
                    message: 'Please select category for your questions!'
                  }
                ]
              })(
                <Select placeholder="Please select Category of Question">
                  {remaining.map(item => (
                    <Option value={item.Subject_Id}>{item.Subject_Name}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item
              label="Question Text"
              placeholder="Please input the question!"
              hasFeedback
            >
              {getFieldDecorator('Question_Text', {
                rules: [{ required: true, message: 'Please input Question!' }]
              })(
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 8 }}
                  placeholder={`Please enter the question!`}
                />
              )}
            </Form.Item>
            <Form.Item label="Difficulty level">
              {getFieldDecorator('Question_Difficulty_Level', {
                rules: [
                  {
                    required: true,
                    message: 'Please select the difficulty level'
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
            <Form.Item label="Question marks">
              {getFieldDecorator('Question_Marks', {
                initialValue:
                  Test_Data && Test_Data.Is_Manual === '0'
                    ? parseInt(Test_Data.Total_Marks) /
                      parseInt(Test_Data.Number_Of_Questions)
                    : '',

                rules: [
                  {
                    required: true,
                    message: 'Please insert for your questions!'
                  }
                ]
              })(
                <InputNumber
                  min={0}
                  max={10}
                  step={0.25}
                  disabled={
                    Test_Data && Test_Data.Is_Manual === '0' ? true : false
                  }
                />
              )}
            </Form.Item>
            <Form.Item label="Negative marks">
              {getFieldDecorator('Negative_Mark', {
                initialValue:
                  Test_Data && Test_Data.Is_Manual === '0'
                    ? parseInt(Test_Data.Negative_Margin)
                    : '',
                rules: [
                  {
                    required: true,
                    message: 'Please insert for your questions!'
                  }
                ]
              })(
                <InputNumber
                  min={0}
                  max={10}
                  step={0.25}
                  disabled={
                    Test_Data && Test_Data.Is_Manual === '0' ? true : false
                  }
                />
              )}
            </Form.Item>
            <Form.Item label="Number of options">
              {getFieldDecorator('Question_Options_Number', {
                rules: [
                  {
                    required: true,
                    message: 'Please enter options'
                  }
                ]
              })(
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={this.state.options}
                  disabled={params.testId ? true : false}
                  onChange={this.handle_change_options}
                />
              )}
            </Form.Item>

            {this.createOptions(options)}

            <Form.Item label="Question type">
              {getFieldDecorator('Question_Type', {
                rules: [
                  {
                    required: true,
                    message: 'Please select category for your questions!'
                  }
                ]
              })(
                <Radio.Group defaultValue="0">
                  <Radio.Button
                    value="0"
                    onChange={this.handle_multiple_options}
                  >
                    single choice
                  </Radio.Button>
                  <Radio.Button
                    value="1"
                    onChange={this.handle_multiple_options}
                  >
                    multiple choice
                  </Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>

            {this.createCorrectOptions(options)}

            <Form.Item
              label="Upload"
              extra="Please upload the files for questions"
            >
              {getFieldDecorator('upload_file', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button onClick={this.handleReset}>Reset</Button>
            </Form.Item>
          </Form>
        </Spin>
      </>
    );
  }
}

const mapStateToProps = state => {
  const {
    questionState: { questionList, addQuestionList, loaderState },
    testState: { testList },
    batchState: {
      subjectState: { remaining }
    }
  } = state;
  return {
    questionList,
    addQuestionList,
    testList,
    remaining,
    loaderState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSubjectList: request => {
      dispatch(getSubjectList(request));
    },
    getTestListAction: request => {
      dispatch(getTestListAction(request));
    },
    addQuestionAction: request => {
      dispatch(addQuestionAction(request));
    },
    editQuestionAction: request => {
      dispatch(editQuestionAction(request));
    }
  };
};
QuestionForm = Form.create({ name: 'horizontal_login' })(QuestionForm);
export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
