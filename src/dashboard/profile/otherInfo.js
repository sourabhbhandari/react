import React, {Component} from 'react';
import {
  Descriptions,
  Icon,
  Card,
  Divider,
  Button,
  Progress,
  Row,
  Col,
  Modal,
} from 'antd';
import {enquireScreen} from 'enquire-js';

const {Meta} = Card;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});
export default class OtherInfo extends Component {
  render() {
    return (
      <div>
        {!isMobile ? (
          <div style={{marginTop: '220px'}}>
            <Descriptions title="User Information" style={{margin: '20px'}}>
              <Descriptions.Item>
                <Card style={{borderStyle: 'none'}}>
                  <Meta
                    avatar={
                      <Icon
                        type="user"
                        style={{fontSize: '24px', color: ' #80C271'}}
                      />
                    }
                    description="Username"
                  />
                </Card>
              </Descriptions.Item>
              <Descriptions.Item>
                <Card style={{borderStyle: 'none'}}>
                  <Meta
                    avatar={
                      <Icon
                        type="unlock"
                        theme="filled"
                        style={{fontSize: '24px'}}
                      />
                    }
                    description="Change Password"
                  />
                </Card>
              </Descriptions.Item>
              <Descriptions.Item>
                <Card style={{borderStyle: 'none'}}>
                  <Meta
                    avatar={
                      <Icon
                        type="mobile"
                        theme="filled"
                        style={{fontSize: '24px'}}
                      />
                    }
                    description="Mobile Number"
                  />
                </Card>
              </Descriptions.Item>
              <Descriptions.Item>
                <Card style={{borderStyle: 'none'}}>
                  <Meta
                    avatar={
                      <Icon
                        type="edit"
                        theme="filled"
                        style={{fontSize: '24px'}}
                      />
                    }
                    description="Enrolled Exam Categories"
                  />
                </Card>
              </Descriptions.Item>
              <Descriptions.Item>
                <Card style={{borderStyle: 'none'}}>
                  <Meta
                    avatar={
                      <Icon
                        type="bank"
                        theme="filled"
                        style={{fontSize: '24px'}}
                      />
                    }
                    description="Education"
                  />
                </Card>
              </Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              shape="round"
              icon="edit"
              size="large"
              style={{float: 'right', margin: '20px'}}
            >
              Edit
            </Button>
            <Divider />
            <h2>Other details</h2>

            <Row gutter={32}>
              <Col span={12}>
                <div style={{width: 300, margin: '20px'}}>
                  <h3 style={{marginTop: '30px', marginBottom: '20px'}}>
                    {' '}
                    SKILLS
                  </h3>
                  Java
                  <Progress
                    percent={60}
                    strokeWidth="12px"
                    status="active"
                    style={{marginBottom: '10px'}}
                  />
                  Python
                  <Progress
                    percent={30}
                    strokeWidth="12px"
                    status="active"
                    strokeColor="red"
                    style={{marginBottom: '10px'}}
                  />
                  C++
                  <Progress
                    percent={50}
                    strokeWidth="12px"
                    status="active"
                    strokeColor="orange"
                    style={{marginBottom: '10px'}}
                  />
                  React js
                  <Progress
                    percent={100}
                    strokeWidth="12px"
                    status="active"
                    strokeColor="green"
                    style={{marginBottom: '10px'}}
                  />
                </div>
              </Col>
              <h3 style={{marginTop: '20px', marginBottom: '30px'}}>
                {' '}
                Overall Performance
              </h3>
              <Col span={12} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Progress
                  strokeColor={{
                    '0': '#87d068',
                    '30%': '#108ee9',
                    '50%': 'orange',
                    '100%': 'red',
                  }}
                  type="dashboard"
                  width="200px"
                  status="active"
                  percent={90}
                />
              </Col>
            </Row>
          </div>
        ) : null}
      </div>
    );
  }
}
