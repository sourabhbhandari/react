import React, { Component } from 'react';
import { Modal, Row, Col, Progress, Descriptions } from 'antd';
import medal from '../medal1.png';
import Item from 'antd/lib/list/Item';

class resultModal extends Component {
  state = {
    Accuracy: 0,
    Attempted: 0,
    Correct: 0,
    Performance: 0
  };
  componentDidMount() {
    const { result } = this.props;
  }
  render() {
    const { visible, handleOk, handleCancel, result } = this.props;
    return (
      <div>
        <Modal
          visible={visible}
          onOk={handleOk}
          width={1000}
          onCancel={handleCancel}
          footer={null}
        >
          <Row>
            <Col span={8} style={{ padding: '15px' }}>
              <Progress
                width={120}
                strokeWidth={15}
                status="active"
                type="dashboard"
                style={{ margin: 'auto' }}
                strokeColor={{
                  '0%': '#108ee9'
                }}
                percent={parseInt(
                  (result.Total_Correct / result.Number_Of_Question_Attempt) *
                    100
                )}
              />
              <span
                style={{ fontSize: '16px', fontWeight: '600', padding: '10px' }}
              >
                Accuracy
              </span>
              <br />
              <Progress
                strokeWidth={15}
                status="active"
                type="dashboard"
                style={{ margin: 'auto' }}
                strokeColor={{
                  '0%': '#87d068'
                }}
                percent={parseInt(
                  (result.Number_Of_Question_Attempt / result.Total_Questions) *
                    100
                )}
              />
              <span
                style={{ fontSize: '16px', fontWeight: '600', padding: '10px' }}
              >
                Attempted
              </span>
              <br />
              <Progress
                strokeWidth={15}
                status="active"
                type="dashboard"
                style={{ margin: 'auto' }}
                strokeColor={{
                  '0%': '#FF7F50'
                }}
                percent={parseInt(
                  (result.Total_Correct / result.Total_Questions) * 100
                )}
              />
              <span
                style={{ fontSize: '16px', fontWeight: '600', padding: '10px' }}
              >
                Correct
              </span>
              <br />
            </Col>
            <Col span={16}>
              <img
                src={medal}
                alt="no-img"
                style={{ marginLeft: '30%', width: '45px' }}
              />
              <span style={{ fontSize: '20px', fontWeight: '700' }}>
                {result.Rank} Rank
              </span>

              <Descriptions
                style={{ marginTop: '5%' }}
                size="small"
                bordered
                column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
              >
                <Descriptions.Item label="Name">
                  {result.User_Name}
                </Descriptions.Item>
                <Descriptions.Item label="Attempted">
                  {result.Number_Of_Question_Attempt}
                </Descriptions.Item>
                <Descriptions.Item label="Email Id">
                  {result.Email_Id}
                </Descriptions.Item>
                <Descriptions.Item label="Attempted by">
                  {result.Total_Students_Attempted} Students
                </Descriptions.Item>
                <Descriptions.Item label="Correct">
                  {result.Total_Correct} Questions
                </Descriptions.Item>
                <Descriptions.Item label="Time Taken">
                  {result.Time_Taken.split('.')[0]}
                </Descriptions.Item>
                <Descriptions.Item label="Maximum Marks">
                  {result.Total_Marks} Marks
                </Descriptions.Item>
                <Descriptions.Item label="Marks Obtained">
                  {result.Marks_Obtained} Marks
                </Descriptions.Item>
                <Descriptions.Item label="Percentage">
                  {parseFloat(result.Percentage).toFixed(2)}%
                </Descriptions.Item>
              </Descriptions>
              <p
                style={{
                  marginTop: '10%',
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '5%'
                }}
              >
                OverAll Performance
              </p>
              <Progress
                percent={parseFloat(result.Percentage).toFixed(2)}
                strokeWidth={15}
                status="active"
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default resultModal;
