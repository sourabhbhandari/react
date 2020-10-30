import React, { Component } from "react";
import PersonalInfo from "../personalInfo";
import OtherInfo from "../otherInfo";
import "./userProfile.css";
import { Row, Col } from "antd";

class UserProfile extends Component {
  

  render() {
    return (
      <div className="main">
        <Row gutter={16}>
          <Col span={6}>
            <PersonalInfo />
          </Col>
          <Col span={18}>
            <OtherInfo
             
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default UserProfile;
