import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkStorage} from '../../auth/utils/cookies';
import {Card, Icon, Divider, Button, Progress} from 'antd';
import './user-profile/userProfile.css';
import {enquireScreen} from 'enquire-js';

const {Meta} = Card;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class PersonalInfo extends Component {
  render() {
    const data = checkStorage();
    return (
      <div>
        {isMobile ? (
          <div>
            <img
              style={{
                width: '150px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                marginLeft: '60px',

                marginTop: '30px',
              }}
              alt="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              src={
                data.imageUrl
                  ? data.imageUrl
                  : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
            />
            <Card
              style={{
                width: '290px',
                borderStyle: 'none',
                marginTop: '40px',
              }}
            >
              <Meta
                style={{textAlign: 'center'}}
                title={
                  data
                    ? data.isGoogle
                      ? data.fullName
                      : data.First_Name + ' ' + data.Last_Name
                    : 'Not Logged in'
                }
              />
              <Divider style={{color: 'red', fontWeight: '900'}} />

              <Meta
                avatar={
                  <Icon
                    type="mail"
                    theme="outlined"
                    style={{fontSize: '18px', color: ' #db4a39'}}
                  />
                }
                description={data ? data.Email_Id : 'Not Logged in'}
              />
              <div style={{margin: '24px 0'}} />
              <Meta
                avatar={
                  <Icon
                    type="user"
                    style={{fontSize: '18px', color: ' #80C271'}}
                  />
                }
                description="Student"
              />
              <div style={{margin: '24px 0'}} />
              <Meta
                avatar={
                  <Icon
                    type="calendar"
                    theme="filled"
                    style={{fontSize: '18px', color: ' #5AACCF'}}
                  />
                }
                description="date of birth"
              />
              <div style={{margin: '24px 0'}} />
              <Meta
                avatar={
                  <Icon
                    type="reconciliation"
                    style={{fontSize: '18px', color: ' red'}}
                  />
                }
                description="software"
              />
              <div style={{margin: '24px 0'}} />
              <Meta
                avatar={<Icon type="home" theme="filled" />}
                description="Address"
              />
              <Button
                type="primary"
                shape="round"
                icon="edit"
                size="small"
                style={{float: 'right'}}
              ></Button>
              <Divider />
            </Card>

            <div style={{width: 250, marginLeft: '10px'}}>
              <h3 style={{marginBottom: '20px'}}> SKILLS</h3>
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
              <h3
                style={{
                  marginTop: '20px',
                  marginBottom: '30px',
                  marginLeft: '10px',
                }}
              >
                {' '}
                Overall Performance
              </h3>
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
            </div>
          </div>
        ) : (
          <Card
            className="Personal"
            style={{
              margin: '20px',
              borderRadius: '20px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            }}
            cover={
              <img
                style={{
                  width: '150px',
                  borderRadius: '50%',
                  backgroundColor: '#6a0dad',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginBottom: '10%',
                  marginTop: '20%',
                }}
                alt="no"
                src={
                  data.imageUrl
                    ? data.imageUrl
                    : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                }
              />
            }
          >
            <Meta
              style={{textAlign: 'center'}}
              title={
                data
                  ? data.isGoogle
                    ? data.fullName
                    : data.First_Name + ' ' + data.Last_Name
                  : 'Not Logged in'
              }
            />
            <Divider style={{color: 'red', fontWeight: '900'}} />

            <Meta
              avatar={
                <Icon
                  type="mail"
                  theme="outlined"
                  style={{fontSize: '18px', color: ' #db4a39'}}
                />
              }
              description={data ? data.Email_Id : 'Not Logged in'}
            />
            <div style={{margin: '24px 0'}} />
            <Meta
              avatar={
                <Icon
                  type="user"
                  style={{fontSize: '18px', color: ' #80C271'}}
                />
              }
              description="Student"
            />
            <div style={{margin: '24px 0'}} />
            <Meta
              avatar={
                <Icon
                  type="calendar"
                  theme="filled"
                  style={{fontSize: '18px', color: ' #5AACCF'}}
                />
              }
              description="date of birth"
            />
            <div style={{margin: '24px 0'}} />
            <Meta
              avatar={
                <Icon
                  type="reconciliation"
                  style={{fontSize: '18px', color: ' red'}}
                />
              }
              description="software"
            />
            <div style={{margin: '24px 0'}} />
            <Meta
              avatar={<Icon type="home" theme="filled" />}
              description="Address"
            />
            <Divider />
            <Meta title="Other Details" description="description" />
          </Card>
        )}
      </div>
    );
  }
}
export default connect()(PersonalInfo);
