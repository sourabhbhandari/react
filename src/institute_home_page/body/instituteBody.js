import React, {Component} from 'react';
import Content from './Menu';
import {Card, Row, Col, Spin} from 'antd';
// import { Parallax } from "rc-scroll-anim";
import Course from './Course';
import friend from '../images/friend.svg';
import bookshelve from '../images/bookshelve.svg';
import Faculty from './faculty';
import Cards from '../../category_home_page/components/body/Card';
import {seriesData} from './seriesData';

import Gallery from './Gallery';
import Contact from './Contactus';

import {enquireScreen} from 'enquire-js';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export default class instituteBody extends Component {
  state = {
    current: 'testseries',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    const {testSeriesState, instituteDetailState} = this.props;
    const testseries = testSeriesState[0] ? testSeriesState : [];
    const cardContent = {
      courses: (
        <div id="courses" style={{marginLeft: '5%'}}>
          <Card style={{borderStyle: 'none'}}>
            <Course course={instituteDetailState.course} />
          </Card>
        </div>
      ),
      testseries: (
        <div id="testseries">
          <Card style={{borderStyle: 'none'}}>
            <Cards data={testseries} />
          </Card>
        </div>
      ),
      faculties: (
        <div id="faculties">
          <Card style={{borderStyle: 'none'}}>
            <Faculty faculty={instituteDetailState.faculty} />
          </Card>
        </div>
      ),
      gallery: (
        <div id="gallery">
          <Card style={{borderStyle: 'none'}}>
            <Gallery />
          </Card>
        </div>
      ),
      contactus: (
        <div id="contactus">
          <Card style={{borderStyle: 'none'}}>
            <Contact contactDetails={instituteDetailState} />
          </Card>
        </div>
      ),
    };
    return (
      <div>
        <Content handleClick={this.handleClick} current={this.state.current} />
        <Card style={{width: '100%', borderStyle: 'none', position: 'static'}}>
          {cardContent[this.state.current]}
        </Card>

        {!isMobile ? (
          <>
            <Row>
              <Col span={12} style={{marginTop: '5%'}}>
                <span style={{fontSize: '42px', color: 'blue'}}>"</span>
                <h3>
                  The width can be set as a specific size (in px, pt, cm, em,
                  etc) or by <br />
                  using one of the three pre-defined values: thin, medium, or
                  thick.
                  <br />
                  The border-width property can have from one to four values
                  <br />
                  (for the top border right border, bottom border,and the).
                </h3>
                <span style={{fontSize: '42px', color: 'blue'}}>"</span>
              </Col>
              <Col span={12}>
                <img style={{width: '500px'}} src={friend} alt="no" />
              </Col>
            </Row>
            <Row style={{marginBottom: '10%', marginTop: '10%'}}>
              <Col span={12}>
                <img style={{width: '400px'}} src={bookshelve} alt="no" />
              </Col>
              <Col span={12}>
                <span style={{fontSize: '42px', color: 'blue'}}>"</span>
                <h3>
                  The width can be set as a specific size (in px, pt, cm, em,
                  etc) or by <br />
                  using one of the three pre-defined values: thin, medium, or
                  thick.
                  <br />
                  The border-width property can have from one to four values
                  <br />
                  (for the top border right border, bottom border,and the).
                </h3>
                <span style={{fontSize: '42px', color: 'blue'}}>"</span>
              </Col>
            </Row>{' '}
          </>
        ) : (
          <>
            <span style={{fontSize: '42px', color: 'blue'}}>"</span>
            <h4 style={{fontSize: '14px'}}>
              The width can be set as a specific size (in px, pt, cm, em, etc)
              or by <br />
              using one of the three pre-defined values: thin, medium, or thick.
              <br />
              The border-width property can have from one to four values
              <br />
              (for the top border right border, bottom border,and the).
            </h4>
            <span style={{fontSize: '42px', color: 'blue'}}>"</span>
            <div style={{marginTop: '30px'}} />
            <img style={{width: '300px'}} src={friend} alt="no" />
            <div style={{marginTop: '40px'}} />
            <span style={{fontSize: '42px', color: 'blue'}}>"</span>
            <h4 style={{fontSize: '14px'}}>
              The width can be set as a specific size (in px, pt,
              <br /> cm, em, etc) or by using one of the three pre-defined
              values: <br />
              thin, medium, or thick. The border-width property can have from{' '}
              <br />
              one to four values (for the top border right border, bottom
              border,and the).
            </h4>
            <span style={{fontSize: '42px', color: 'blue'}}>"</span>
            <div style={{marginTop: '30px'}} />
            <img style={{width: '250px'}} src={bookshelve} alt="no" />
            <div style={{marginTop: '50px'}} />
          </>
        )}
      </div>
    );
  }
}
