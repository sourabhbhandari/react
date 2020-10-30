import React, { Component } from 'react';
import { Descriptions, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import './question.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option_names: 'ABCDEFGHEI'
    };
  }

  showOptions = options => {
    let option_objects = [];
    let optionText = '';
    let Answer_Type = '';
    for (let index = 0; index < options.length; index++) {
      optionText = options[index].Option_Text;
      Answer_Type = options[index].Answer_Type;
      option_objects.push(
        <Descriptions.Item
          label={`Option ${this.state.option_names[index]}`}
          span={3}
        >
          {optionText}
          <br />
          {Answer_Type === '1' ? (
            <Button icon="check-circle" type="primary" size="small" ghost>
              Correct
            </Button>
          ) : null}
        </Descriptions.Item>
      );
    }
    return option_objects;
  };

  createTitle = id => {
    let titleObjects = [];
    const { active } = this.props;
    titleObjects.push(
      <>
        <Link
          to={`/dashboard/test/${id.testId}/question/${id.questionId}/edit`}
        >
          <Button
            type="primary"
            icon="edit"
            ghost
            disabled={active === '1' ? true : false}
          >
            Edit
          </Button>
        </Link>
        <Button
          type="danger"
          icon="delete"
          ghost
          disabled={active === '1' ? true : false}
        >
          Archive
        </Button>
      </>
    );
    return titleObjects;
  };
  render() {
    const { que, isMobile } = this.props;
    const layout = isMobile ? 'vertical' : 'horizontal';

    return (
      <div>
        <Divider>
          {que.library
            ? ''
            : this.createTitle({
                questionId: que.Question_Id,
                testId: que.Test_Id
              })}
        </Divider>
        <Descriptions
          size="small"
          layout={layout}
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Question" span={3}>
            {que.Question_Text}
          </Descriptions.Item>

          <Descriptions.Item label="Marks">
            {que.Question_Marks}
          </Descriptions.Item>
          <Descriptions.Item label="-Ve marks">
            {que.Negative_Mark}
          </Descriptions.Item>
          <Descriptions.Item label="Duration">
            {que.Question_Duration}
          </Descriptions.Item>
          <Descriptions.Item label="Difficulty level">
            {que.Question_Difficulty_Level}
          </Descriptions.Item>
          <Descriptions.Item label="Question Type">
            {que.Question_Type === '0' ? 'single correct' : 'multiple correct'}
          </Descriptions.Item>
          {this.showOptions(que.Question_Options)}
        </Descriptions>
      </div>
    );
  }
}

export default Question;
