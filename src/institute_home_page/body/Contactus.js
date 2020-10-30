import React, { Component } from 'react';
import Map from '../images/location.PNG';
import { Row, Col, Icon, Card, Button, Modal } from 'antd';
import Query from './queryForm';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class Contactus extends Component {
  state = {
    loading: false,
    visible: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { contactDetails } = this.props;
    const addressStyle = {
      fontSize: '24px',
      marginRight: '20px'
    };
    return (
      <div style={{ margin: '5%' }}>
        {!isMobile ? (
          <Row>
            <Col span={14}>
              <img src={Map} style={{ width: '700px' }} alt="no" />
            </Col>
            <Col span={8}>
              <div style={{ marginTop: '50px' }} />
              <Icon type="home" style={addressStyle} />
              <span style={{ fontSize: '24px' }}>
                {contactDetails.Institute_Address || 'Not available'}
              </span>
              <div style={{ marginTop: '20px' }} />
              <Icon type="mail" style={addressStyle} />
              <span style={{ fontSize: '24px' }}>
                {contactDetails.Institute_Email_Id || 'Not available'}
              </span>
              <div style={{ marginTop: '20px' }} />
              <Icon type="phone" style={addressStyle} />
              <span style={{ fontSize: '24px' }}>
                {contactDetails.Institute_Mobile_Number || 'Not available'}
              </span>

              <div style={{ marginTop: '20px' }} />
              <Button type="primary" size="large" onClick={this.showModal}>
                Submit Query
              </Button>
            </Col>
          </Row>
        ) : (
          <>
            <img src={Map} style={{ width: '100%' }} alt="no" />
            <div style={{ marginTop: '5%' }} />
            <Icon type="home" style={{ marginRight: '5%' }} />
            <span style={{ fontSize: '14px' }}>
              {' '}
              {contactDetails.Institute_Address}
            </span>
            <div style={{ marginTop: '5%' }} />
            <Icon
              type="phone"
              style={{
                marginRight: '5%'
              }}
            />
            <span style={{ fontSize: '14px' }}>
              {contactDetails.Institute_Mobile_Number}
            </span>
            <div style={{ marginTop: '5%' }} />
            <Icon type="mail" style={{ marginRight: '5%' }} />
            <span style={{ fontSize: '14px' }}>
              {contactDetails.Institute_Email_Id}
            </span>
            <div style={{ marginTop: '5%' }} />
            <Button type="primary" size="small" onClick={this.showModal}>
              Submit Query
            </Button>
          </>
        )}
        <queryForm />
        <div>
          <Modal
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
          >
            <Query handleCancel={this.handleCancel} />
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    instituteState: { testSeriesState }
  } = state;
  return {
    testSeriesState
  };
};
export default connect(mapStateToProps)(Contactus);
