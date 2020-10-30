import React, {Component} from 'react';
import {Row, Col, Divider} from 'antd';
import logo from '../../images/vstudio.png';

export default class Footer extends Component {
  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '50vh',
          backgroundColor: 'rgb(0, 21, 41)',
        }}
      >
        <Row>
          <Col span={6}>
            <img src={logo} style={{width: '130px', marginTop: '30px'}} />
            <h2 style={{color: '#CCCCCC', marginTop: '20px'}}>
              Code Planet <br />
              Technologies Pvt. Ltd
            </h2>
          </Col>
          <Col span={6}>
            <h2
              style={{
                color: '#CCCCCC',
                marginTop: '70px',
                marginBottom: '30px',
              }}
            >
              Our Product
            </h2>
            <p style={{color: '#999999'}}>Product update record</p>
            <p style={{color: '#999999'}}>API documentation</p>
            <p style={{color: '#999999'}}>Quick start</p>
            <p style={{color: '#999999'}}>Reference guide</p>
          </Col>
          <Col span={6}>
            <h2
              style={{
                color: '#CCCCCC',
                marginTop: '70px',
                marginBottom: '30px',
              }}
            >
              On
            </h2>
            <p style={{color: '#999999'}}>FAQ</p>
            <p style={{color: '#999999'}}>Contact us</p>
          </Col>
          <Col span={6}>
            <h2
              style={{
                color: '#CCCCCC',
                marginTop: '70px',
                marginBottom: '30px',
              }}
            >
              Resources
            </h2>
            <p style={{color: '#999999'}}>Online Test</p>
            <p style={{color: '#999999'}}>Best Practice</p>
          </Col>
        </Row>
        <Divider style={{backgroundColor: '#999999', fontSize: '10px'}} />
        <p style={{color: '#999999'}}>
          ©2018 by <a href="codeplanet.co.in">Code Planet</a> All Rights
          Reserved
        </p>
      </div>
    );
  }
}
