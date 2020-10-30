import React, {Component} from 'react';
import {Card, List, Avatar, Icon} from 'antd';

import {Affix, Button} from 'antd';
import {Menu, Divider} from 'antd';

export default class Content extends Component {
  state = {
    top: 10,
    bottom: 10,
  };

  Color = e => {
    //document.getElementsByClassName("ant-menu").style.background = "#162876";
  };

  render() {
    const {handleClick, current} = this.props;
    return (
      <div>
        <Affix offsetTop={this.state.top}>
          <Menu
            id="menu"
            style={{
              height: '50px',
              marginTop: '-10px',
            }}
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="courses" style={{fontSize: '16px'}}>
              <a href="#courses">
                <Icon type="read" />
                Courses
              </a>
            </Menu.Item>
            <Divider type="vertical" />
            <Menu.Item key="testseries" style={{fontSize: '16px'}}>
              <a href="#testseries">
                <Icon type="notification" />
                Test Series
              </a>
            </Menu.Item>
            <Divider type="vertical" />
            <Menu.Item key="faculties" style={{fontSize: '16px'}}>
              <a href="#faculties">
                <Icon type="snippets" />
                Faculties
              </a>
            </Menu.Item>
            <Divider type="vertical" />
            <Menu.Item key="gallery" style={{fontSize: '16px'}}>
              <a href="#gallery">
                <Icon type="book" />
                Gallery
              </a>
            </Menu.Item>
            <Divider type="vertical" />
            <Menu.Item key="contactus" style={{fontSize: '16px'}}>
              <a href="#contactus">
                <Icon type="form" />
                Contact Us
              </a>
            </Menu.Item>
          </Menu>
        </Affix>
      </div>
    );
  }
}
