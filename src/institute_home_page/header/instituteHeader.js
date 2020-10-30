import React, {Component} from 'react';
import './Header.css';
import {Row, Col, Carousel} from 'antd';
import math from '../images/education.png';
import cap from '../images/cap.svg';
import {connect} from 'react-redux';
import {enquireScreen} from 'enquire-js';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export default class Header extends Component {
  render() {
    const {instituteDetailState} = this.props;

    return (
      <div className="Header">
        {!isMobile ? (
          <Row>
            <Col span={12}>
              <img
                src={cap}
                style={{
                  width: '150px',
                  transform: 'rotate(-30deg)',
                  marginLeft: '-500px',
                  marginTop: '100px',
                }}
                alt="institute-banner"
              />
              <h1
                style={{
                  fontWeight: '900',
                  textAlign: 'center',
                  fontSize: '52px',
                  marginTop: '-20px',
                }}
              >
                {instituteDetailState
                  ? instituteDetailState.Institute_Name
                  : 'Institute Home Page'}
              </h1>
              <h2
                style={{
                  fontWeight: '600',
                  fontSize: '44px',
                  textAlign: 'center',
                  marginTop: '20px',
                }}
              >
                Welcome !!!
              </h2>
              <h3
                className="instituteHeader"
                style={{
                  textAlign: 'center',
                  color: '#000',
                  marginLeft: '10%',
                  marginRight: '10%',
                  marginTop: '5%',
                }}
              >
                {instituteDetailState.Institute_Description}
              </h3>
            </Col>
            <Col span={12}>
              <img
                src={math}
                style={{width: '600px', marginLeft: '10%'}}
                alt="no-img"
              />
            </Col>
          </Row>
        ) : (
          <>
            <img
              src={cap}
              style={{
                width: '80px',
                transform: 'rotate(-30deg)',
                marginLeft: '-250px',
              }}
              alt="institute-banner"
            />
            <h1 style={{fontWeight: '900'}}>
              {instituteDetailState
                ? instituteDetailState.Institute_Name
                : 'Institute Home Page'}
            </h1>
            <div style={{marginTop: '10%'}} />
            <h2>WELCOME</h2>
            <div style={{marginTop: '10%'}} />
            <p
              className="instituteHeader"
              style={{
                textAlign: 'center',
                color: '#000',
                marginTop: '5%',
              }}
            >
              {instituteDetailState.Institute_Description
                ? instituteDetailState.Institute_Description
                : 'nothing to know'}
            </p>
            <img
              src={math}
              style={{width: '230px', marginTop: '6%'}}
              alt="no-img"
            />
          </>
        )}
      </div>
    );
  }
}
