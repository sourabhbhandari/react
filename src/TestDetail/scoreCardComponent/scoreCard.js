import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress, Row, Col } from 'antd';
import {
  getTestAnalyticsAction,
  getAttemptListAction
} from '../state/actions/Actions';
import { getResultAction } from '../../result/state/action/actions';
import ResultModal from './resultModal';
import TableData from './tableData';

class scoreCard extends Component {
  state = {
    visible: false,
    response: null,
    loading: false
  };
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.getAnalytics(params.testId);
    this.props.getStudentsList(params.testId);
  }
  resultModal = (resultId, User_Id) => {
    const {
      match: { params }
    } = this.props;
    this.setState({ visible: true });
    let request = {
      User_Id: User_Id,
      Test_Id: params.testId,
      Result_Id: resultId
    };
    this.props.getResultAction(request);
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
    const {
      match: { params }
    } = this.props;
    const { scoreCardState, Result } = this.props;
    return (
      <div>
        <Row gutter={0}>
          <Col span={7}>
            <div
              className="result-container"
              style={{ width: '400px', marginTop: '6%' }}
            >
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  lineHeight: '45px'
                }}
              >
                Test Details
              </p>
              <p style={{ marginBottom: '5%' }}>Overall info about test</p>
              <Row>
                <Col span={8}>
                  <span
                    style={{
                      fontSize: '34px',
                      fontWeight: '600',
                      margin: '13%'
                    }}
                  >
                    40
                  </span>
                  <p>Attempted By</p>
                </Col>
                <Col span={8}>
                  <span
                    style={{
                      fontSize: '34px',
                      fontWeight: '600',
                      margin: '13%'
                    }}
                  >
                    10
                  </span>
                  <p>Total Questions</p>
                </Col>
                <Col span={8}>
                  <span
                    style={{
                      fontSize: '34px',
                      fontWeight: '600',
                      margin: '13%'
                    }}
                  >
                    100
                  </span>
                  <p>Total Marks</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={17}>
            <div className="result-container">
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  lineHeight: '45px'
                }}
              >
                Overall statistics
              </p>
              <p style={{ marginBottom: '5%' }}>Test Analytics</p>
              <Row>{this.progressCharts(scoreCardState.Analytics)}</Row>
            </div>
          </Col>
        </Row>

        <TableData
          testId={params.testId}
          resultModal={this.resultModal}
          visible={this.state.visible}
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
    );
  }
}
const mapStateToProps = state => {
  const {
    testState: { scoreCardState },
    resultState: {
      userInfo: { Result }
    }
  } = state;
  return { scoreCardState, Result };
};
const mapDispatchToProps = dispatch => {
  return {
    getAnalytics: request => {
      dispatch(getTestAnalyticsAction(request));
    },
    getStudentsList: request => {
      dispatch(getAttemptListAction(request));
    },
    getResultAction: request => {
      dispatch(getResultAction(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(scoreCard);
