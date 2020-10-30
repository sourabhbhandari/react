import React, { Component } from 'react';
import { Button, List, Row, Col, Progress, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_HOST } from '../../constants';
import { checkStorage } from '../../auth/utils/cookies';
import ResultModal from '../../TestDetail/scoreCardComponent/resultModal';
import { getResultAction } from '../state/action/actions';
import '../result.css';

class Results extends Component {
  state = {
    visible: false,
    response: null
  };
  resultModal = (resultId, Test_Id) => {
    this.setState({ visible: true });
    let user = checkStorage();
    let request = {
      User_Id: user.User_Id,
      Test_Id: Test_Id,
      Result_Id: resultId
    };
    this.props.getUserResult(request);
  };

  handleCancel = e => {
    this.setState({ visible: false });
  };
  progressCharts = data => {
    const charts = [];
    data.map(item => {
      charts.push(
        <Col span={6}>
          <Progress
            type="dashboard"
            width={100}
            strokeWidth={15}
            status="active"
            style={{ margin: 'auto' }}
            strokeColor={{
              '0%': item.color
            }}
            percent={item.percentage}
          />
          <p style={{ margin: 'auto auto auto 13%' }}>{item.name}</p>
        </Col>
      );
    });
    return charts;
  };
  render() {
    const { attempted, Analytics, Result } = this.props;
    return (
      <>
        <div className="result-container">
          <p
            style={{ fontSize: '16px', fontWeight: '600', lineHeight: '45px' }}
          >
            Overall statistics
          </p>
          <p style={{ marginBottom: '5%' }}>About Tests Information</p>
          <Row>{this.progressCharts(Analytics)}</Row>
        </div>
        <div>
          <List
            pagination={{
              onChange: page => {},
              pageSize: 5
            }}
            dataSource={attempted}
            renderItem={item => (
              <List.Item
                className="test-list"
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={() =>
                      this.resultModal(item.Result_Id, item.Test_Id)
                    }
                  >
                    <Icon
                      type={item.visible ? 'eye-invisible' : 'eye'}
                      theme="filled"
                    />
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={<div className="test-details">{item.Test_Name}</div>}
                />
                <p>{item.Total_Questions}</p>
                <span>Questions</span>
                <p>{item.Number_Of_Question_Attempt}</p>
                <span>Attempted</span>
                <p style={{ fontSize: '14px' }}>
                  {item.Start_Time.split('.')[0]}
                </p>
                <span>Started At </span>
                <p style={{ fontSize: '14px' }}>
                  {item.Time_Taken.split('.')[0]}
                </p>
                <span>Time Taken </span>
              </List.Item>
            )}
          />
          {Result ? (
            <ResultModal
              visible={this.state.visible}
              handleOk={this.handleOk}
              handleCancel={this.handleCancel}
              result={Result}
            />
          ) : null}
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  const {
    testState: {
      testList: { attempted }
    },
    resultState: {
      userInfo: { Analytics, Result }
    }
  } = state;
  return {
    attempted,
    Analytics,
    Result
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserResult: request => {
      dispatch(getResultAction(request));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
