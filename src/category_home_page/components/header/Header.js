import React, {Component} from 'react';
import './Header.css';
import {Row, Col} from 'antd';
import stud from '../../images/stud.png';
import {enquireScreen} from 'enquire-js';
import {connect} from 'react-redux';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class Header extends Component {
  render() {
    const {category} = this.props;
    return (
      <div className="header">
        {!isMobile ? (
          <>
            <Row>
              <Col span={12}>
                <h1
                  style={{
                    fontSize: '52px',
                    fontWeight: '600',
                    color: '#fff',
                    marginTop: '20%',
                  }}
                >
                  {category ? category[0].Category_Name.toUpperCase() : ''}
                </h1>
                <h2
                  style={{
                    fontWeight: '600',
                    fontSize: '44px',
                    color: '#fff',
                    textAlign: 'center',
                    marginTop: '50px',
                  }}
                >
                  Welcome !!!
                </h2>
                <p
                  className="CategoryDescription"
                  style={{
                    marginTop: '10%',
                    marginLeft: '7%',
                    marginRight: '10%',
                  }}
                >
                  {category ? category[0].Category_Description + '...' : ''}
                  We help our clients with Website Design, Software Development,
                  Mobile Apps, Digital Marketing, Graphics Design, Social Media,
                  Video Production, & Consultancy service to conquer your
                  digital landscape and outrank your competitor. Contact us
                  today to learn how SEO Audit Agency can help you to grow your
                  online business.
                </p>
              </Col>
              <Col span={12}>
                <img
                  style={{width: '600px', marginTop: '80px'}}
                  src={stud}
                  alt="no-img"
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <h1 style={{fontWeight: '900', color: '#fff', marginTop: '20%'}}>
              {category}
            </h1>
            <div style={{marginTop: '10%'}} />
            <h2 style={{color: '#fff'}}>WELCOME</h2>
            <div style={{marginTop: '10%'}} />
            <p
              className="CategoryDescription"
              style={{
                textAlign: 'center',
                color: '#fff',
                marginTop: '5%',
              }}
            >
              We help our clients with Website Design, Software Development,
              Mobile Apps, Digital Marketing, Graphics Design, Social Media,
              Video Production, & Consultancy service to conquer your digital
            </p>
            <div style={{marginTop: '10%'}} />
            <img
              src={stud}
              style={{width: '280px', marginTop: '6%'}}
              alt="no-img"
            />
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    categoryState: {selectCategoryState},
  } = state;
  return {selectCategoryState};
};
export default connect(mapStateToProps)(Header);
