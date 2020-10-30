import React, { Component } from 'react';
import {
  Card,
  Checkbox,
  Collapse,
  Divider,
  Radio,
  Slider,
  Row,
  Col,
  Icon,
  InputNumber,
  Switch
} from 'antd';
import {
  getQuestionLibraryAction,
  sortQuestionLibraryAction
} from './state/actions/Actions';
import { connect } from 'react-redux';

const { Meta } = Card;

const { Panel } = Collapse;
class Filter extends Component {
  state = {
    disabled: false,
    minMarks: '0',
    maxMarks: '10',
    categories: '5,6,7',
    difficulty_level: '1,2,3',
    question_type: '0,1,2'
  };

  onChange = checkedValues => {};
  filter = {
    Page_Size: '25',
    Page_No: '1',
    Categories: this.state.categories,
    Question_Difficulty_Level: this.state.difficulty_level,
    Question_Type: this.state.question_type,
    Marks_Range: [this.state.minMarks, this.state.maxMarks].toString()
  };
  handleDisabledChange = () => {
    if (this.state.disabled) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
      this.filter.Marks_Range = '0,10';
    }
    this.props.getQuestionLibrary(this.filter);
  };
  onChangeMin = e => {
    this.setState({ minMarks: e });
    this.filter.Marks_Range = [e, this.state.maxMarks].toString();
    this.props.getQuestionLibrary(this.filter);
  };
  onChangeMax = e => {
    this.setState({ maxMarks: e });
    this.filter.Marks_Range = [this.state.minMarks, e].toString();
    this.props.getQuestionLibrary(this.filter);
  };
  onSliderChange = e => {
    this.setState({ minMarks: e[0], maxMarks: e[1] });
    this.filter.Marks_Range = e.toString();
    this.props.getQuestionLibrary(this.filter);
  };
  selectCategory = e => {
    if (e[0]) {
      this.setState({ categories: e.toString() });
      this.filter.Categories = e.toString();
    } else {
      this.filter.Categories = '5,6,7';
    }
    this.props.getQuestionLibrary(this.filter);
  };
  selectDifficultyLevel = e => {
    if (e[0]) {
      this.setState({ difficulty_level: e.toString() });
      this.filter.Question_Difficulty_Level = e.toString();
    } else {
      this.filter.Question_Difficulty_Level = '1,2,3';
    }
    this.props.getQuestionLibrary(this.filter);
  };
  selectQuestionType = e => {
    if (e[0]) {
      this.setState({ question_type: e.toString() });
      this.filter.Question_Type = e.toString();
    } else {
      this.filter.Question_Type = '0,1,2';
    }
    this.props.getQuestionLibrary(this.filter);
  };
  onSorting = e => {};
  render() {
    const MarksRange = () => {
      return (
        <>
          <Row>
            <Col span={12}>
              <span style={{ marginRight: '10px' }}> min :</span>
              <InputNumber
                disabled={this.state.disabled}
                min={0}
                max={this.state.maxMarks}
                value={this.state.minMarks}
                size="small"
                style={{ width: '50px' }}
                onChange={this.onChangeMin}
              />
            </Col>
            <Col span={12}>
              <span style={{ marginRight: '10px' }}> max :</span>
              <InputNumber
                disabled={this.state.disabled}
                min={this.state.minMarks}
                max={10}
                defaultValue={10}
                value={this.state.maxMarks}
                size="small"
                style={{ width: '50px' }}
                onChange={this.onChangeMax}
              />
            </Col>
          </Row>
          <div style={{ marginTop: '10px' }} />
          <Slider
            range
            step={1}
            disabled={this.state.disabled}
            defaultValue={[this.state.minMarks, this.state.maxMarks]}
            max="10"
            onChange={this.onSliderChange}
          />
          Disabled:{' '}
          <Switch
            size="small"
            checked={this.state.disabled}
            onChange={this.handleDisabledChange}
          />
        </>
      );
    };
    const radioStyle = {
      marginLeft: '10px',

      display: 'block',
      height: '33px',
      lineHeight: '20px'
    };
    return (
      <div>
        <Card
          style={{
            marginLeft: '5%',
            marginRight: '5%',
            height: '686px',
            background: '#F0F6F7FF'
          }}
        >
          <Meta
            title={
              <h4>
                Filters
                <Icon
                  type="filter"
                  theme="filled"
                  style={{ marginLeft: '70%', color: 'rgba(0, 0, 0, 0.65)' }}
                />
              </h4>
            }
          />

          <Divider />

          <Collapse
            defaultActiveKey="categories"
            accordion
            expandIconPosition={'right'}
            style={{
              borderStyle: 'none',
              width: '118%',
              marginTop: '-20px',
              marginLeft: '-20px',
              background: '#F0F6F7FF'
            }}
          >
            <Panel
              header={
                <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>Categories</span>
              }
              key="categories"
            >
              <Checkbox.Group onChange={this.selectCategory}>
                <Row>
                  <Col span={24}>
                    <Checkbox value="10" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>Programming</span>
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="11" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>Jee Advance</span>
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="12" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>Jee Main</span>
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="13" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>NEET UG</span>
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Panel>
            <Panel
              header={
                <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                  Difficulty Level
                </span>
              }
              key="difficulty_level"
            >
              <Checkbox.Group onChange={this.selectDifficultyLevel}>
                <Row>
                  <Col span={24}>
                    <Checkbox value="1,2" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>Easy</span>
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="3,4" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>Medium</span>
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="5" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>Hard</span>
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Panel>
            <Panel
              header={
                <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                  Question Types
                </span>
              }
              key="question_type"
            >
              <Checkbox.Group onChange={this.selectQuestionType}>
                <Row>
                  <Col span={24}>
                    <Checkbox value="0" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>Single Choice</span>
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="1" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>
                        Multiple Choice
                      </span>
                    </Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="2" style={{ margin: '5%' }}>
                      <span style={{ marginLeft: '20px' }}>
                        Fill in the blanks
                      </span>
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Panel>
            <Panel
              header={
                <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                  Marks Range
                </span>
              }
              key="marks_range"
            >
              <MarksRange />
            </Panel>
          </Collapse>
          <div style={{ marginTop: '35px' }} />
          <Meta title="Sort by" />
          <Divider />
          <div style={{ marginTop: '5px' }} />
          <Radio.Group onChange={this.onSorting}>
            <Radio style={radioStyle} value={1}>
              Alphebatically
            </Radio>
            <Radio style={radioStyle} value={2}>
              Difficulty Level
            </Radio>
            <Radio style={radioStyle} value={3}>
              Date and Time
            </Radio>
          </Radio.Group>
        </Card>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getQuestionLibrary: request => {
      dispatch(getQuestionLibraryAction(request));
    }
  };
};
const mapStateToProps = state => {
  const {
    libraryState: { questionLibraryState }
  } = state;
  return {
    questionLibraryState
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
