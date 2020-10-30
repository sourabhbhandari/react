import React, { Component } from 'react';
import { Form, Input, Card, Button, Divider } from 'antd';

const { TextArea } = Input;
export default class Forms extends Component {
  state = {
    value: ''
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.state;
    return (
      <Card className="contactus">
        <h1
          style={{ textAlign: 'center', fontSize: '38px', fontWeight: '900' }}
        >
          Contact Us
        </h1>
        <Divider />
        <Form>
          <Form.Item label="Full Name(Required):">
            <Input placeholder="Please input your name" />
          </Form.Item>
          <Form.Item label="Mobile Number(Required):">
            <Input type="number" placeholder="Please input your number" />
          </Form.Item>

          <Form.Item label="Email Id(Required):">
            <Input placeholder="Please input your EmailId" />
          </Form.Item>

          <Form.Item label="Description(Required):">
            <TextArea
              value={value}
              onChange={this.onChange}
              placeholder="write in 500 words"
              autoSize={{ minRows: 6, maxRows: 12 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              shape="round"
              block
              icon="mail"
              style={{
                backgroundImage: ' linear-gradient(to right,#6a0dad,#1C3F6E)',
                fontSize: '18px'
              }}
            >
              SEND MESSAGE
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
