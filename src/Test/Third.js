import React, { Component } from 'react';
import './style.css';
import {
  Spin,
  Descriptions,
  Divider,
  Radio,
  Checkbox,
  Row,
  Col,
  List,
  Button,
  Progress,
  Drawer,
  Icon
} from 'antd';
import Report from './reportButton';
import { checkStorage } from './state/utils/Cookies';
import { answerSubmitAction } from './state/action/Action';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
// import {questionData} from '../components/forms/questions/question_data';
import { questionListAction } from './state/action/Action';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

const defaultCheckedList = [];
const QUESTION_START_INDEX = 0;

class Third extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '', // to change color
      value1: [], // to store all actions related to question
      questionListData: [],
      check: defaultCheckedList, // to store checked
      page: 1,
      pageSize: 1,
      currentQue: '1',
      percent: 0,
      seconds: 40,
      minutes: 30,
      totalTime: 1840,
      type: 'default',
      visible: false
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.timer();
    const data = checkStorage();
    const request = {
      Test_Id: params.testLink,
      User_Id: data.User_Id
    };
    this.props.getQuestionList(request);
    const { questionListData } = this.props;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.questionListData !== state.prevQuestionListData) {
      const data1 = props.questionListData.map((ele, index) => {
        return {
          id: index + 1,
          Question_Id: ele.Question_Id,
          answer: ele.Question_Type === '0' ? '' : [],
          notVisited: true,
          answeredQuestion: false,
          markedForReview: false,
          answeredAndMarkedForReview: false
        };
      });
      const data2 = props.questionListData.map((ele, index) => {
        return {
          ...ele,
          Sequence_Id: index + 1
        };
      });
      return {
        value1: data1,
        questionListData: data2,
        prevQuestionListData: props.questionListData
      };
    }
    return null;
  }

  tick = () => {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - min * 60;
    this.setState({
      minutes: min,
      seconds: sec,
      percent: (this.secondsRemaining / this.state.totalTime) * 100
    });
    // if (sec < 10) {
    //   this.setState({
    //     seconds: '0' + this.state.seconds
    //   });
    // }
    if (min < 5) {
      this.setState({
        minutes: '0' + min
      });
    }
    if ((min === 0) & (sec === 0)) {
      this.props.history.push(`/feedback`);
      clearInterval(this.intervalHandle);
    }
    this.secondsRemaining--;
  };

  timer = () => {
    this.setState({ visible: true });
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.minutes * 60 + this.state.seconds;
    this.secondsRemaining = time;
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  validateQuestion = queIndex => {
    //handles the last question
    // returns integer
    let { value1 } = this.state;
    if (parseInt(queIndex) >= value1.length) {
      queIndex = value1.length - 1;
    } else if (parseInt(queIndex) <= QUESTION_START_INDEX) {
      queIndex = QUESTION_START_INDEX + 1;
    }
    return queIndex;
  };

  handleCheckboxOptionChange = w => {
    this.setState({ check: w });
  };

  handleRadioOptionChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  getCorrectDefaultAnswer = que => {
    const { check, value, value1, currentQue } = this.state;
    let answer = '';
    // return answer;
    answer = value1.find(item => item.id === +currentQue + 1);
    if (que.Question_Type === '1' && answer && answer.answer) {
      const set = new Set();
      if (check.length > 0) {
        return check;
      } else {
        Array.isArray(answer.answer) &&
          answer.answer.forEach(item => set.add(item));
        check.forEach(item => set.add(item));
        return Array.from(set);
      }
    } else if (value) {
      return value;
    } else {
      return answer ? answer.answer : '';
    }
  };

  showOptions = (que, options, Question_Type, questionIndex) => {
    let correct_option_objects = [];
    let optionText = '';
    let optionId = '';
    let checkbox_choice = [];
    let radio_choice = [];
    for (let index = 0; index < options.length; index++) {
      optionText = options[index].Option_Text;
      optionId = options[index].Pk_Option_Id;
      if (Question_Type === '0') {
        radio_choice.push(
          <Row style={{ margin: '10px' }}>
            <Radio value={optionId}>{optionText}</Radio>
          </Row>
        );
      } else {
        checkbox_choice.push(
          <div>
            <Row style={{ margin: '10px' }}>
              <Checkbox value={optionId}>{optionText}</Checkbox>
            </Row>
          </div>
        );
      }
    }

    // eslint-disable-next-line no-lone-blocks
    {
      Question_Type === '0'
        ? correct_option_objects.push(
            <Descriptions.Item span={3}>
              <div>
                <Radio.Group
                  value={this.getCorrectDefaultAnswer(que)}
                  onChange={this.handleRadioOptionChange}
                >
                  {radio_choice}
                </Radio.Group>
              </div>
            </Descriptions.Item>
          )
        : correct_option_objects.push(
            <Descriptions.Item span={3}>
              <Checkbox.Group
                // value={this.state.check}
                value={this.getCorrectDefaultAnswer(que)}
                style={{ width: '100%' }}
                onChange={this.handleCheckboxOptionChange}
              >
                {checkbox_choice}
              </Checkbox.Group>
            </Descriptions.Item>
          );
    }
    return correct_option_objects;
  };

  handleSubmitTest = () => {
    let { value1 } = this.state;

    const {
      match: { params }
    } = this.props;
    const data = checkStorage();
    let userTest = {};
    let userAnswers = [];

    if (window.confirm('Do you want to submit the test?')) {
      value1.map(item => {
        userAnswers.push({
          Question_Id: item.Question_Id,
          User_Answer: item.answer.toString()
        });
      });
      userTest = {
        Test_Id: params.testLink,
        User_Id: data.User_Id,
        userAnswers
      };
      this.props.submitUserAnswer(userTest);
    } else {
    }
  };

  handleSaveNext = () => {
    let { value, check, page, value1, currentQue } = this.state;
    currentQue = String(this.validateQuestion(currentQue));
    const id = String(this.getPageNumberFromQuestionId(currentQue));
    if (value) {
      value1[id].answer = value;
    } else if (check.length > 0) {
      value1[id].answer = check;
    }
    value1[id].answeredQuestion = true;

    if (page < value1.length) {
      if (value || check || !value1[id].answer) {
        this.colorQue(currentQue);
      }
      this.setState({
        check: [],
        value1,
        value: '',
        currentQue: this.handleCurrentQuestionIncrement(this.state.currentQue),
        page: page + 1
      });
    } else {
      if (value || check.length > 0 || !value1[id].answer) {
        this.colorQue(currentQue);
      }
      this.setState({ value: '', currentQue: '1', page: 1 });
    }
  };

  handlePreviousQue = () => {
    let { value, check, page, value1, currentQue } = this.state;
    currentQue = String(this.validateQuestion(currentQue));
    let id = String(this.getPageNumberFromQuestionId(currentQue));
    if (id < QUESTION_START_INDEX) {
      id = QUESTION_START_INDEX;
    }
    value1[id].answeredQuestion = true;
    if (value) {
      value1[id].answer = value;
    } else if (check.length > 0) {
      value1[id].answer = check;
    }

    this.colorQue(currentQue);

    this.setState({
      value: '',
      check: [],
      value1,
      currentQue: this.handleCurrentQuestionDecrement(currentQue),
      page: page > 1 ? page - 1 : 1
    });
  };

  markReview = currentQue => {
    let { value1, page, value, check } = this.state;
    currentQue = String(this.validateQuestion(currentQue));
    const id = String(this.getPageNumberFromQuestionId(currentQue));
    value1[id].answeredQuestion = true;
    if (value) {
      value1[id].answeredAndMarkedForReview = true;
      value1[id].answer = value;
      this.colorQue(currentQue, '#9254de');
    } else if (check.length > 0) {
      value1[id].answeredAndMarkedForReview = true;
      value1[id].answer = check;
      this.colorQue(currentQue, '#9254de');
    } else if (value1[id].answer.length > 0) {
      value1[id].answeredAndMarkedForReview = true;
      this.colorQue(currentQue, '#9254de');
    } else {
      value1[id].markedForReview = true;
      this.colorQue(currentQue, '#ffec3d');
    }
    if (page < value1.length) {
      this.setState({
        value: '',
        value1,
        check: [],
        currentQue: this.handleCurrentQuestionIncrement(currentQue),
        page: page + 1
      });
    } else {
      this.setState({
        value: '',
        check: [],
        value1,
        page: 1,
        currentQue: '1'
      });
    }
  };
  s;
  handleQuestionChangeButton = que => {
    let { value, check, value1, currentQue } = this.state;
    que = parseInt(que) + 1;
    que = this.validateQuestion(que);
    currentQue = String(this.validateQuestion(currentQue));
    const id = String(this.getPageNumberFromQuestionId(currentQue));
    value1[id].answeredQuestion = true;
    if (value) {
      value1[id].answer = this.state.value;
    } else if (check.length > 0) {
      value1[id].answer = check;
    }
    this.colorQue(currentQue);
    this.setState({
      currentQue: que,
      value: '',
      check: [],
      value1,
      page: this.getPageNumberFromQuestionId(que)
    });

    if (isMobile) {
      this.setState({ visible: false });
    }
  };

  getPageNumberFromQuestionId = Question_Id => {
    return parseInt(Question_Id);
  };

  handleCurrentQuestionIncrement = currentQue => {
    let { value1 } = this.state;
    if (parseInt(currentQue) >= value1.length - 1) {
      return QUESTION_START_INDEX;
    }
    return String(parseInt(currentQue) + 1);
  };

  handleCurrentQuestionDecrement = currentQue => {
    let { value1 } = this.state;
    const que = parseInt(currentQue);
    return String(que < QUESTION_START_INDEX ? QUESTION_START_INDEX : que - 1);
  };

  colorSelector = que => {
    let { value1 } = this.state;
    const id = String(this.getPageNumberFromQuestionId(que));
    if (value1[id].answeredAndMarkedForReview) {
      return '#9254de'; //VOILET
    } else if (value1[id].answeredQuestion && value1[id].answer.length === 0) {
      return '#ffadd2'; //RED
    } else if (value1[id].answeredQuestion && value1[id].answer) {
      return '#95de64'; //GREEN
    } else if (value1[id].markedForReview) {
      return '#ffec3d'; //YELLOW
    }
    return '#ffadd2'; //RED
  };

  colorQue = (que, color) => {
    let COLOR = '';
    if (color) {
      COLOR = color;
    } else {
      COLOR = this.colorSelector(que);
    }
    document
      .getElementById(String(que))
      .setAttribute('style', `background-color:${COLOR}`);
  };

  render() {
    const { questionListData, loading } = this.props;
    const questionData = questionListData;
    const data = this.state.data2;
    const { userAnswerState } = this.props;
    const {
      match: { params }
    } = this.props;
    let { page, pageSize } = this.state;
    page--;
    const layout = isMobile ? 'vertical' : 'horizontal';
    if (userAnswerState.status) {
      this.props.history.push(`/feedback/${params.testLink}`);
    }
    return (
      <div className="layout">
        {loading ? (
          <Spin
            spinning={true}
            size="large"
            style={{ marginLeft: '48%', marginTop: '15%' }}
          />
        ) : (
          <Row>
            <Col span={isMobile ? 24 : 18}>
              {isMobile ? (
                <div
                  style={{
                    height: '100px',
                    width: '100%',
                    backgroundImage: 'linear-gradient(to right,#6a0dad,#1C3F6E)'
                  }}
                >
                  <Button
                    type="primary"
                    onClick={this.showDrawer}
                    style={{ margin: '30px' }}
                  >
                    <Icon type="menu" />
                  </Button>
                  <h3
                    style={{
                      color: '#fff',
                      float: 'right',
                      margin: '30px'
                    }}
                  >
                    {this.state.minutes}:{this.state.seconds}
                  </h3>
                  <Drawer
                    keyboard
                    title="Questions"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                  >
                    <List style={{}} grid={{ column: '1' }}>
                      <List.Item
                        style={{
                          fontSize: '24px',
                          fontWeight: '900',
                          marginLeft: '125px',
                          marginTop: '-68px'
                        }}
                      >
                        {this.state.minutes}:{this.state.seconds}
                      </List.Item>
                      <List.Item>
                        <Button
                          shape="circle"
                          size="small"
                          style={{ backgroundColor: '#95de64' }}
                        />
                        <p
                          style={{
                            marginTop: '-20px',
                            marginLeft: '30px',
                            fontSize: '12px'
                          }}
                        >
                          Answerd
                        </p>
                      </List.Item>
                      <List.Item>
                        <Button
                          shape="circle"
                          size="small"
                          style={{ backgroundColor: '#ffadd2' }}
                        />
                        <p
                          style={{
                            marginTop: '-20px',
                            marginLeft: '30px',
                            fontSize: '12px'
                          }}
                        >
                          Not Answered
                        </p>
                      </List.Item>
                      <List.Item>
                        <Button
                          shape="circle"
                          size="small"
                          style={{ backgroundColor: '#ff9900' }}
                        />
                        <p
                          style={{
                            marginTop: '-20px',
                            marginLeft: '30px',
                            fontSize: '12px'
                          }}
                        >
                          Marked for Review
                        </p>
                      </List.Item>
                      <List.Item>
                        <Button
                          shape="circle"
                          size="small"
                          style={{ backgroundColor: '#DCDCDC' }}
                        />
                        <p
                          style={{
                            marginTop: '-20px',
                            marginLeft: '30px',
                            fontSize: '12px'
                          }}
                        >
                          Not Visited
                        </p>
                      </List.Item>
                      <List.Item>
                        <Button
                          shape="circle"
                          size="small"
                          style={{ backgroundColor: '#9254de' }}
                        />
                        <p
                          style={{
                            marginTop: '-20px',
                            marginLeft: '30px',
                            fontSize: '12px'
                          }}
                        >
                          Answered Review
                        </p>
                      </List.Item>
                    </List>
                    <Divider />
                    <List
                      grid={{ column: 4 }}
                      dataSource={questionData}
                      renderItem={(item, index) => (
                        <List.Item>
                          <Button
                            id={index}
                            type={this.state.type}
                            shape="circle"
                            size="large"
                            onClick={() =>
                              this.handleQuestionChangeButton(String(index + 1))
                            }
                          >
                            {index + 1}
                          </Button>
                        </List.Item>
                      )}
                    />
                  </Drawer>
                </div>
              ) : (
                <div
                  style={{
                    height: '150px',
                    width: '100%',
                    color: 'white',
                    fontSize: 'xx-large',
                    textAlign: 'center',
                    backgroundImage: 'linear-gradient(to right,#6a0dad,#1C3F6E)'
                  }}
                >
                  Test Name
                </div>
              )}

              {questionListData
                .slice(page * pageSize, (page + 1) * pageSize)
                .map((que, index) => (
                  <div>
                    <div>
                      {/* <Divider>welcome to test</Divider> */}
                      <Row>
                        <Col span={20}>
                          <Descriptions
                            title={<h3>Question {page + 1}</h3>}
                            size="default"
                            layout={layout}
                            style={{ margin: '30px' }}
                          >
                            <Descriptions.Item span={3}>
                              <h4
                                style={{
                                  fontSize: '14px',
                                  marginBottom: '10px'
                                }}
                              >
                                {que.Question_Text}
                              </h4>
                            </Descriptions.Item>

                            {this.showOptions(
                              que,
                              que.Question_Options,
                              que.Question_Type,
                              index + 1
                            )}
                          </Descriptions>
                        </Col>
                        <Col span={4}>
                          <Button
                            style={{
                              background: '#00b300',

                              color: '#fff'
                            }}
                          >
                            +{que.Question_Marks} Marks
                          </Button>
                          <Button
                            style={{
                              background: '#ff2b00',

                              color: '#fff'
                            }}
                          >
                            -{que.Negative_Mark} Marks
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </div>
                ))}
              <div
                style={
                  !isMobile
                    ? {
                        position: 'fixed',
                        width: '50%',
                        bottom: '25px'
                      }
                    : {
                        position: 'fixed',
                        bottom: '25px'
                      }
                }
              >
                <Button
                  type="primary"
                  size={isMobile ? 'small' : 'large'}
                  style={
                    isMobile
                      ? { float: 'right', margin: '5px' }
                      : {
                          marginRight: '1%',
                          marginTop: '60px',
                          float: 'right'
                        }
                  }
                  onClick={this.handleSaveNext}
                >
                  Save and Next
                </Button>
                <Button
                  size={isMobile ? 'small' : 'large'}
                  style={
                    isMobile
                      ? {
                          float: 'right',
                          margin: '5px',
                          background: '#ff4000',
                          color: '#fff'
                        }
                      : {
                          marginRight: '1%',
                          marginTop: '60px',
                          float: 'right',
                          background: '#ff4000',
                          color: '#fff'
                        }
                  }
                  onClick={this.handleSaveNext}
                >
                  Clear Response
                </Button>
                <Button
                  type="primary"
                  size={isMobile ? 'small' : 'large'}
                  style={
                    isMobile
                      ? { float: 'right', margin: '5px' }
                      : {
                          marginRight: '1%',
                          float: 'right',
                          marginTop: '60px'
                        }
                  }
                  onClick={item => this.markReview(this.state.currentQue)}
                >
                  Mark for Review
                </Button>
                <Button
                  id="previous"
                  type="primary"
                  size={isMobile ? 'small' : 'large'}
                  style={
                    isMobile
                      ? { float: 'right', margin: '5px' }
                      : {
                          marginRight: '1%',
                          float: 'right',
                          marginTop: '60px'
                        }
                  }
                  onClick={this.handlePreviousQue}
                >
                  Previous
                </Button>
                <Button
                  type="danger"
                  size={isMobile ? 'small' : 'large'}
                  style={
                    isMobile
                      ? { float: 'right', margin: '5px' }
                      : {
                          marginRight: '1%',
                          marginTop: '60px',
                          float: 'right'
                        }
                  }
                  onClick={this.handleSubmitTest}
                >
                  Submit
                </Button>
              </div>
            </Col>

            {!isMobile ? (
              <Col span={6} style={{ borderLeft: '1px solid lightgrey' }}>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <Report style={{ marginLeft: '100%' }} />
                  <Progress
                    type="circle"
                    width={100}
                    status="active"
                    strokeColor={this.state.percent < 2 ? 'red' : ''}
                    successPercent={0}
                    percent={this.state.percent}
                    format={percent =>
                      `${this.state.minutes}:${this.state.seconds}  `
                    }
                    style={{
                      margin: '20px'
                    }}
                  />
                </div>

                <div style={{ margin: '40px' }} />
                <List style={{ margin: '20px' }} grid={{ column: '2' }}>
                  <List.Item>
                    <Button
                      shape="circle"
                      style={{
                        backgroundColor: '#95de64',
                        marginBottom: '10px'
                      }}
                    ></Button>
                    <p style={{ marginTop: '-35px', marginLeft: '40px' }}>
                      Answerd
                    </p>
                  </List.Item>
                  <List.Item>
                    <Button
                      shape="circle"
                      style={{
                        backgroundColor: '#DCDCDC',
                        marginBottom: '10px'
                      }}
                    />
                    <p style={{ marginTop: '-35px', marginLeft: '40px' }}>
                      Not Visited
                    </p>
                  </List.Item>
                  <List.Item>
                    <Button
                      shape="circle"
                      style={{
                        backgroundColor: '#ffadd2',
                        marginBottom: '10px'
                      }}
                    />
                    <p style={{ marginTop: '-35px', marginLeft: '40px' }}>
                      Not Answered
                    </p>
                  </List.Item>
                  <List.Item>
                    <Button
                      shape="circle"
                      style={{
                        backgroundColor: '#ffec3d',
                        marginBottom: '10px'
                      }}
                    />
                    <p style={{ marginTop: '-35px', marginLeft: '40px' }}>
                      To Review
                    </p>
                  </List.Item>
                  <List.Item>
                    <Button
                      shape="circle"
                      style={{
                        backgroundColor: '#9254de',
                        marginBottom: '10px'
                      }}
                    />
                    <p style={{ marginTop: '-35px', marginLeft: '40px' }}>
                      Answered Review
                    </p>
                  </List.Item>
                </List>
                <div style={{ marginTop: '50px' }} />
                <Divider />

                <List
                  style={{ margin: '20px' }}
                  grid={{ column: 5 }}
                  dataSource={questionListData}
                  renderItem={(item, index) => (
                    <List.Item>
                      <Button
                        id={index + 1}
                        style={{ backgroundColor: '#DCDCDC' }}
                        value={this.state.value}
                        shape="circle"
                        onClick={() => this.handleQuestionChangeButton(index)}
                      >
                        <h2 style={{ fontSize: '16px' }}>{index + 1}</h2>
                      </Button>
                    </List.Item>
                  )}
                />
              </Col>
            ) : (
              ''
            )}
          </Row>
        )}
        ;
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    userTestState: {
      userQuestionListState: { data: questionListData, loading },
      userRegisterState,
      userAnswerState
    }
  } = state;
  return { questionListData, loading, userRegisterState, userAnswerState };
};
const mapDispatchToProps = dispatch => {
  return {
    submitUserAnswer: request => {
      dispatch(answerSubmitAction(request));
    },
    getQuestionList: request => {
      dispatch(questionListAction(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Third);
