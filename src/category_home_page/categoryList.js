import React, { Component } from 'react';
import { List, Card, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import ssc from './images/vstudio.png';
import logo from './images/icon.svg';
import iit from './images/iit.jpg';

class categoryList extends Component {
  render() {
    const { categoryListState } = this.props;
    const list = [ssc, logo, iit, ssc, logo, iit, ssc, logo];
    return (
      <div>
        <h1
          style={{
            textAlign: 'center',
            paddingTop: '3%',
            paddingBottom: '5%',
            color: 'rgba(0, 0, 0, 0.65)'
          }}
        >
          Category
        </h1>
        <Row>
          <Col span={3}></Col>
          <Col span={18}>
            {' '}
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4
              }}
              dataSource={categoryListState}
              renderItem={item => (
                <List.Item key={item.Category_Id} className="category-list">
                  <Link to={`/category/${item.Category_Id}`}>
                    <Card>
                      <div className="category-img-container">
                        <img
                          alt="example"
                          src={list[categoryListState.indexOf(item)]}
                        />
                      </div>
                      <p>Hello my name is khan.im not a terrorist </p>
                      <div className="category-body">
                        <Divider style={{ margin: '10px 0' }} />
                        <Link>View Details</Link>
                        <h3>{item.Category_Name}</h3>
                      </div>
                    </Card>
                  </Link>
                </List.Item>
              )}
            />
          </Col>
          <Col span={3}></Col>
        </Row>
      </div>
    );
  }
}

export default categoryList;
