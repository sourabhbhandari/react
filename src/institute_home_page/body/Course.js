import React, {Component} from 'react';
import {List, Card, Button, Modal, Collapse, Carousel, Icon} from 'antd';

//import { data } from './Syllabus';
import {enquireScreen} from 'enquire-js';
import {connect} from 'react-redux';
import data1 from '../images/data.png';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

const {Panel} = Collapse;
class Courses extends Component {
  state = {
    Course: '',
    modal1Visible: false,
    Topic_Description: [],
  };

  setModal1Visible(modalVisible, course) {
    this.setState({modal1Visible: modalVisible});
    course ? this.setState({Course: course}) : this.setState({Course: ''});
  }

  render() {
    const {course} = this.props;
    let selectedCourse = course.filter(
      item => item.Course_Id === this.state.Course
    )[0];
    const syllabus = selectedCourse ? selectedCourse.topic : '';
    const Course_Description = syllabus
      ? syllabus[0].Topic_Description.split('\n')
      : '';
    return (
      <div>
        {!isMobile ? (
          <List
            style={{marginLeft: '40px', marginTop: '3%'}}
            grid={{gutter: 32, column: 3}}
            dataSource={course ? course : []}
            pagination={{
              onChange: page => {},
              pageSize: 3,
            }}
            renderItem={item => (
              <List.Item>
                <Card className="card">
                  <div className="face face1">
                    <div className="content">
                      <img src={data1} alt="" />
                      <h2>{item.Course_Name}</h2>
                    </div>
                  </div>

                  <div className="face face2">
                    <div className="content">
                      <p className="text">{item.Course_Description}</p>
                      <Button
                        type="primary"
                        style={{marginTop: '35px'}}
                        onClick={() =>
                          this.setModal1Visible(true, item.Course_Id)
                        }
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <>
            <Carousel autoplay>
              {course.map(item => (
                <Card hoverable style={{borderStyle: 'none'}}>
                  <img src={data1} alt="" style={{margin: 'auto'}} />
                  <h2>{item.Course_Name}</h2>
                  <p style={{marginTop: '40px'}} className="text1">
                    {item.Course_Description}
                  </p>
                  <Button
                    type="primary"
                    style={{marginTop: '40px'}}
                    onClick={() => this.setModal1Visible(true, item.Course_Id)}
                  >
                    Read More
                  </Button>
                </Card>
              ))}
            </Carousel>
          </>
        )}

        <Modal
          style={{top: 20}}
          width={1000}
          footer={null}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
        >
          <h3 style={{marginBottom: '5%'}}>SYLLABUS:- </h3>
          <List
            dataSource={syllabus}
            renderItem={item => (
              <Collapse
                accordion
                defaultActiveKey={syllabus[0].Heading}
                expandIcon={({isActive}) => (
                  <Icon
                    type="right-square"
                    theme="twoTone"
                    rotate={isActive ? 90 : 0}
                    style={{fontSize: '18px'}}
                  />
                )}
              >
                <Panel
                  header={
                    <span style={{marginLeft: '10px'}}>
                      {item.Topic_Name.toUpperCase()}
                    </span>
                  }
                  key={item.Topic_Id}
                >
                  <List
                    size="small"
                    dataSource={Course_Description}
                    renderItem={item => (
                      <List.Item>
                        <Icon
                          type="check-circle"
                          theme="twoTone"
                          style={{marginRight: '20px'}}
                          size="large"
                        />
                        {item}
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            )}
          />

          <h3 style={{marginBottom: '5%', marginTop: '5%'}}>
            DURATION:-{' '}
            <span style={{fontWeight: '400'}}>
              {selectedCourse
                ? selectedCourse.Course_Duration
                : 'Not Available'}
            </span>
          </h3>
          <h3 style={{marginBottom: '5%'}}>
            FEES STRUCTURE:-
            <span style={{fontWeight: '400'}}>
              {' '}
              {selectedCourse ? selectedCourse.Course_Fees : 'Not Available'}
            </span>
          </h3>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    instituteState: {testSeriesState},
  } = state;
  return {
    testSeriesState,
  };
};
export default connect(mapStateToProps)(Courses);
