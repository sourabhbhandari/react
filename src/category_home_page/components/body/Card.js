import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  List,
  Card,
  Descriptions,
  Button,
  Rate,
  Row,
  Col,
  Modal,
  Divider,
  Carousel
} from 'antd';
import { enquireScreen } from 'enquire-js';
import Loading from '../../../dashboard/loading/loading';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
const { Meta } = Card;

export default class Cards extends Component {
  state = {
    modal1Visible: false,
    Id: ''
  };

  setModal1Visible(modal1Visible, id) {
    this.setState({ modal1Visible: modal1Visible, Id: id });
  }
  render() {
    const { data } = this.props;

    //to show empty component
    let information = data
      ? data.filter(item => item.Test_Id === this.state.Id)[0]
      : '';
    // let a = information ? information.Test_Title : null;

    return (
      <div>
        {!isMobile ? (
          <Loading>
            <List
              style={{
                marginTop: '3%'
              }}
              grid={{ gutter: 32, column: 4 }}
              pagination={{
                onChange: page => {},
                pageSize: 8
              }}
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <Card
                    hoverable
                    style={{
                      width: '300px'
                      // backgroundImage: "linear-gradient(to top left,#FFF,#1FC8DB)"
                    }}
                  >
                    <Meta title={item.Test_Name} />
                    <h4 style={{ marginTop: '20%' }}>
                      Posted:-
                      <span
                        style={{
                          fontWeight: '400',
                          fontSize: '13px'
                        }}
                      >
                        {item.Created_Data} By {item.Created_By}
                      </span>
                    </h4>
                    <h4>
                      Total Questions:-{' '}
                      <span
                        style={{
                          fontWeight: '400',
                          fontSize: '13px'
                        }}
                      >
                        {item.Number_Of_Questions}
                      </span>
                    </h4>
                    <h4>
                      Duration:-
                      <span
                        style={{
                          fontWeight: '400',
                          fontSize: '13px'
                        }}
                      >
                        {item.Test_Duration}
                      </span>
                    </h4>
                    <h4>{item.Test_Difficulty_Level}</h4>
                    <Rate disabled defaultValue={item.Test_Rating} />
                    <Row style={{ marginTop: '5%' }}>
                      <Col span={12}>
                        <Link to={`/first/${item.Test_Link}`}>
                          <Button type="primary" size="small">
                            Start Test Now
                          </Button>
                        </Link>
                      </Col>
                      <Col span={12}>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() =>
                            this.setModal1Visible(true, item.Test_Id)
                          }
                        >
                          More Detail
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </List.Item>
              )}
            />
          </Loading>
        ) : (
          <Carousel autoplay>
            {data.map(item => (
              <Card hoverable>
                <Meta title={item.Test_Name} />
                <h4 style={{ marginTop: '20%' }}>
                  Posted:-
                  <span
                    style={{
                      fontWeight: '400',
                      fontSize: '13px'
                    }}
                  >
                    {item.Created_Data} By {item.Created_By}
                  </span>
                </h4>
                <h4>
                  Total Questions:-{' '}
                  <span
                    style={{
                      fontWeight: '400',
                      fontSize: '13px'
                    }}
                  >
                    {item.Number_Of_Questions}
                  </span>
                </h4>
                <h4>
                  Duration:-
                  <span
                    style={{
                      fontWeight: '400',
                      fontSize: '13px'
                    }}
                  >
                    {item.Test_Duration}
                  </span>
                </h4>
                <h4>{item.Test_Difficulty_Level}</h4>
                <Rate disabled defaultValue={item.Test_Rating} />
                <Row style={{ marginTop: '5%' }}>
                  <Col span={12}>
                    <Link to={`/first/${item.Test_Id}`}>
                      <Button type="primary" size="small">
                        Start Test Now
                      </Button>
                    </Link>
                  </Col>
                  <Col span={12}>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => this.setModal1Visible(true, item.Test_Id)}
                    >
                      More Detail
                    </Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Carousel>
        )}

        <Modal
          title={<h3 style={{ textAlign: 'center' }}>More Information</h3>}
          style={{ top: 20 }}
          width={1000}
          footer={null}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <Descriptions
            layout={isMobile ? 'vertical' : ''}
            bordered
            title={
              <h4>
                Posted on{' '}
                <span style={{ fontWeight: '400', fontSize: '14px' }}>
                  {information ? information.Created_Date : ''}
                </span>{' '}
                by{' '}
                <span style={{ fontWeight: '400', fontSize: '14px' }}>
                  {information ? information.Created_By : ''}
                </span>
              </h4>
            }
          >
            <Descriptions.Item label="Test Name">
              {information ? information.Test_Name : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Creator of Test">
              {information ? information.Created_By : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Total Questions">
              {information ? information.Number_Of_Questions : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Time Duration">
              {information ? information.Test_Duration : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Number Of Attempt Allowed">
              {information ? information.No_Of_Attempt : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Total Marks">
              {information ? information.Total_Marks : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Negative Marks">
              {information ? information.Negative_Margin : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Result Declaration">
              {information ? information.Result_Declaration : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Category">
              {information ? information.Test_Difficulty_Level : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {information ? information.Test_Description : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Rating">
              <Rate
                disabled
                defaultValue={information ? information.Test_Rating : ''}
              />
            </Descriptions.Item>
          </Descriptions>
          <Divider style={{ height: '1px', background: '#000' }} />
        </Modal>
      </div>
    );
  }
}
