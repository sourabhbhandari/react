import React, {Component} from 'react';
import '../Home.css';
import sachin from '../images/sachin.JPG';
import nitesh from '../images/nitesh.jpg';
import divyanshu from '../images/junior.PNG';
import {List, Icon, Carousel} from 'antd';
import {enquireScreen} from 'enquire-js';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

export default class faculty extends Component {
  render() {
    const {faculty} = this.props;
    const data = [sachin, nitesh, divyanshu];
    return (
      <>
        {!isMobile ? (
          <List
            style={{marginLeft: '10%', marginRight: '10%', marginTop: '5%'}}
            grid={{gutter: 32, column: 3}}
            dataSource={faculty ? faculty : []}
            pagination={{
              onChange: page => {},
              pageSize: 3,
            }}
            renderItem={item => (
              <List.Item key={item.Faculty_Id}>
                <div className="our-team" style={{margin: '15%'}}>
                  <div className="picture">
                    <img
                      className="img-fluid"
                      src={divyanshu}
                      alt="no"
                      style={{width: '100%', height: '100%'}}
                    />
                  </div>
                  <div className="team-content">
                    <h3 className="name">{item.Faculty_Name}</h3>
                    <h4 class="title">{item.Faculty_Designation}</h4>
                  </div>
                  <ul className="social">
                    <li>
                      <a href={item.Faculty_Insta_Link} aria-hidden="true">
                        <Icon type="facebook" theme="filled" />
                      </a>
                    </li>
                    <li>
                      <a href={item.Faculty_Twitter_Link} aria-hidden="true">
                        <Icon type="twitter-square" theme="filled" />
                      </a>
                    </li>
                    <li>
                      <a href={item.Faculty_Linkdin_Link} aria-hidden="true">
                        <Icon type="google-plus-square" theme="filled" />
                      </a>
                    </li>
                  </ul>
                </div>
              </List.Item>
            )}
          />
        ) : (
          <Carousel autoplay>
            {faculty.map(item => (
              <div className="our-team" style={{margin: '5%', width: '100px'}}>
                <div className="picture">
                  <img
                    className="img-fluid"
                    src="https://picsum.photos/130/130?image=1027"
                    alt="no"
                  />
                </div>
                <div className="team-content">
                  <h3 className="name">{item.Faculty_Name}</h3>
                  <h4 class="title">{item.Faculty_Designation}</h4>
                </div>
                <ul className="social">
                  <li>
                    <a
                      href="https://codepen.io/collection/XdWJOQ/"
                      aria-hidden="true"
                    >
                      <Icon type="facebook" theme="filled" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://codepen.io/collection/XdWJOQ/"
                      aria-hidden="true"
                    >
                      <Icon type="twitter-square" theme="filled" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://codepen.io/collection/XdWJOQ/"
                      aria-hidden="true"
                    >
                      <Icon type="google-plus-square" theme="filled" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://codepen.io/collection/XdWJOQ/"
                      class="fa fa-linkedin"
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </div>
            ))}
          </Carousel>
        )}
      </>
    );
  }
}
