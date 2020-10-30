import React, {Component} from 'react';
import {Card, Icon, List, Row, Col} from 'antd';
import {Parallax} from 'rc-scroll-anim';
import Cards from './Card';
import Content from './Menu';
import svg1 from '../../images/success.svg';
import check from '../../images/check.svg';
import Forms from './Form';
import {enquireScreen} from 'enquire-js';
import {connect} from 'react-redux';
import Article from './Article';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class body extends Component {
  state = {
    current: 'Testseries',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };
  render() {
    const {category} = this.props;

    const IconText = ({type, text}) => (
      <span>
        <Icon type={type} style={{marginRight: 8}} />
        {text}
      </span>
    );
    const cardContent = {
      news: (
        <div id="news">
          <Article Data={category ? category[0].news : []} />
        </div>
      ),
      events: (
        <div id="events">
          <Card
            style={{
              borderStyle: 'none',
            }}
          >
            <Cards data={category ? category[0].event : []} />
          </Card>
        </div>
      ),
      Testseries: (
        <div id="TestSeries">
          <Cards data={category ? category[0].tests : []} />
        </div>
      ),
      article: (
        <div id="article">
          <Article Data={category ? category[0].article : []} />
        </div>
      ),
      examinfo: (
        <div id="examinfo">
          <Parallax
            animation={{x: 0, opacity: 1, playScale: [0.3, 0.8]}}
            style={{transform: 'translateX(-100px)', opacity: 0}}
          >
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {},
                pageSize: 3,
              }}
              dataSource={category ? category[0].ExamInfo : ''}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText
                      type="star-o"
                      text="156"
                      key="list-vertical-star-o"
                    />,
                    <IconText
                      type="like-o"
                      text="156"
                      key="list-vertical-like-o"
                    />,
                    <IconText
                      type="message"
                      text="2"
                      key="list-vertical-message"
                    />,
                  ]}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    title={item.heading}
                    description={item.body}
                  />
                </List.Item>
              )}
            />
          </Parallax>
        </div>
      ),
    };
    return (
      <div>
        {!isMobile ? (
          <>
            <Content
              handleClick={this.handleClick}
              current={this.state.current}
            />
            <Card style={{width: '100%'}}>
              {cardContent[this.state.current]}
            </Card>
            <div id="about-us">
              <h1 style={{margin: '10px', fontWeight: '600'}}>About Us</h1>

              <Row style={{marginTop: '5%'}}>
                <Col span={14}>
                  <Forms />
                </Col>

                <Col span={10} style={{marginTop: '60px'}}>
                  <span style={{fontSize: '42px', color: 'blue'}}>"</span>
                  <h3>
                    We have best practices and latest technology for managing
                    your online
                    <br />
                    examination process.It can be for entrance exam,recruitment
                    exam
                    <br />
                    ,university exams,aptitude tests.Please subscribe to enroll{' '}
                    <br />
                    youself in our product for best experience{' '}
                  </h3>
                  <span style={{fontSize: '42px', color: 'blue'}}>"</span>
                </Col>
              </Row>

              <Row style={{marginTop: '10%'}}>
                <Col span={12} style={{}}>
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
                  <img style={{width: '400px', marginTop: '5%'}} src={svg1} />
                </Col>
              </Row>
              <Row style={{marginBottom: '10%', marginTop: '10%'}}>
                <Col span={12}>
                  <img style={{width: '400px'}} src={check} />
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
              </Row>
            </div>
          </>
        ) : (
          <>
            <Content
              handleClick={this.handleClick}
              current={this.state.current}
            />
            <Card style={{width: '100%'}}>
              {cardContent[this.state.current]}
            </Card>
            <div style={{marginTop: '10%'}} />
            <span style={{fontSize: '42px', color: 'blue'}}>"</span>
            <h3>
              We have best practices and latest technology for managing your
              online
              <br />
              examination process.It can be for entrance exam,recruitment exam
              <br />
              ,university exams,aptitude tests.Please subscribe to enroll <br />
              youself in our product for best experience{' '}
            </h3>
            <span style={{fontSize: '42px', color: 'blue'}}>"</span>
            <div style={{marginTop: '10%'}} />
            <img style={{width: '250px', marginTop: '5%'}} src={svg1} />
            <div style={{marginTop: '10%'}} />
            <span style={{fontSize: '42px', color: 'blue'}}>"</span>
            <h3>
              The width can be set as a specific size (in px, pt, cm, em, etc)
              or by <br />
              using one of the three pre-defined values: thin, medium, or thick.
              <br />
              The border-width property can have from one to four values
              <br />
              (for the top border right border, bottom border,and the).
            </h3>
            <span style={{fontSize: '42px', color: 'blue'}}>"</span>
            <div style={{marginTop: '10%'}} />
            <img style={{width: '250px'}} src={check} />
            <div style={{marginBottom: '10%'}} />
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
export default connect(mapStateToProps)(body);
