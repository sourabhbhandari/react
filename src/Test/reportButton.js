import React, {Component} from 'react';
import {Button, Modal, Checkbox, Input, Row, Col} from 'antd';

export default class reportButton extends Component {
  state = {
    modalVisible: false,
    disable: false,
  };
  handleReport = () => {
    this.setState({modalVisible: true});
  };
  setModalVisible = e => {
    this.setState({modalVisible: false});
  };
  onChange(checkedValues) {
    if (checkedValues === '4') {
      this.setState({disable: true});
    }
    console.log('checked = ', checkedValues);
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleReport} type="danger">
          Report
        </Button>
        <Modal
          centered
          footer={null}
          visible={this.state.modalVisible}
          onOk={this.setModalVisible}
          onCancel={this.setModalVisible}
        >
          <div style={{marginTop: '5%'}} />
          <Checkbox.Group style={{width: '100%'}} onChange={this.onChange}>
            <Row>
              <Col span={8} style={{marginBottom: '5%'}}>
                <Checkbox value="A">Problem 1</Checkbox>
              </Col>
              <Col span={8} style={{marginBottom: '5%'}}>
                <Checkbox value="B">Problem 2</Checkbox>
              </Col>
              <Col span={8} style={{marginBottom: '5%'}}>
                <Checkbox value="C">Problem 3</Checkbox>
              </Col>
              <Col span={8} style={{marginBottom: '5%'}}>
                <Checkbox value="D">Problem 4</Checkbox>
              </Col>
              <Col span={8} style={{marginBottom: '5%'}}>
                <Checkbox value="E">Problem 5</Checkbox>
              </Col>
              <Col span={8} style={{marginBottom: '5%'}}>
                <Checkbox value="E">Problem 6</Checkbox>
              </Col>
              <Col span={8} style={{marginBottom: '5%'}}>
                <Checkbox value="E">other</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Modal>
      </div>
    );
  }
}
