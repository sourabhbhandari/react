import React, { Component } from 'react';
import { Checkbox, Button, List } from 'antd';
import { Link } from 'react-router-dom';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import './style.css';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
class Second extends Component {
  state = {
    disabled: true
  };
  render() {
    const {
      match: { params }
    } = this.props;

    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <div className="demo-infinite-container" style={{ height: '34.5em' }}>
          <h1 style={{ textAlign: 'center' }}>Terms and Conditions</h1>

          <List>
            <p>Last updated: December 12, 2019</p>

            <p>
              Please read these Terms and Conditions ("Terms", "Terms and
              Conditions") carefully before using the www.example.com website
              (the "Service") operated by test Engine ("us", "we", or "our").
            </p>

            <p>
              Your access to and use of the Service is conditioned on your
              acceptance of and compliance with these Terms. These Terms apply
              to all visitors, users and others who access or use the Service.
            </p>

            <p>
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the terms then you may not
              access the Service. The Terms and Conditions agreement for test
              Engine has been created with the help of{' '}
              <a href="https://www.termsfeed.com/terms-conditions-generator/">
                Terms and Conditions Generator
              </a>
              .
            </p>

            <h2>Accounts</h2>

            <p>
              When you create an account with us, you must provide us
              information that is accurate, complete, and current at all times.
              Failure to do so constitutes a breach of the Terms, which may
              result in immediate termination of your account on our Service.
            </p>

            <p>
              You are responsible for safeguarding the password that you use to
              access the Service and for any activities or actions under your
              password, whether your password is with our Service or a
              third-party service.
            </p>

            <p>
              You agree not to disclose your password to any third party. You
              must notify us immediately upon becoming aware of any breach of
              security or unauthorized use of your account.
            </p>

            <h2>Links To Other Web Sites</h2>

            <p>
              Our Service may contain links to third-party web sites or services
              that are not owned or controlled by test Engine.
            </p>

            <p>
              test Engine has no control over, and assumes no responsibility
              for, the content, privacy policies, or practices of any third
              party web sites or services. You further acknowledge and agree
              that test Engine shall not be responsible or liable, directly or
              indirectly, for any damage or loss caused or alleged to be caused
              by or in connection with use of or reliance on any such content,
              goods or services available on or through any such web sites or
              services.
            </p>

            <p>
              We strongly advise you to read the terms and conditions and
              privacy policies of any third-party web sites or services that you
              visit.
            </p>

            <h2>Changes</h2>

            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material we will try to
              provide at least 30 days notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>

            <p>
              By continuing to access or use our Service after those revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, please stop using the Service.
            </p>

            <h2>Contact Us</h2>

            <p>
              If you have any questions about these Terms, please contact us.
            </p>
          </List>
        </div>

        <div style={{ marginTop: '50px' }} />
        <Checkbox
          onChange={item =>
            this.state.disabled
              ? this.setState({ disabled: false })
              : this.setState({ disabled: true })
          }
          style={isMobile ? {} : { marginLeft: '70%', fontSize: '20px' }}
        >
          I have read the <a href="">agreement</a>
        </Checkbox>

        <div style={{ marginTop: '2%' }} />
        <Link to={`/First/Second/Third/${params.testLink}`}>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            icon="right-circle"
            disabled={this.state.disabled}
            style={
              isMobile
                ? {}
                : {
                    marginLeft: '80%',
                    width: '200px'
                  }
            }
          >
            Next
          </Button>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => {};
export default connect(mapStateToProps, mapDispatchToProps)(Second);
