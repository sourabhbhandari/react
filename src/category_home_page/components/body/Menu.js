import React, {Component} from 'react';
import {Card, List, Avatar, Icon} from 'antd';
import Category from '../../Category';
import {Affix, Button} from 'antd';
import {Menu, Divider} from 'antd';
import {Data} from '../data';

export default class Content extends Component {
  state = {
    top: 10,
    bottom: 10,
    // current: "news"
  };
  // handleClick = e => {
  //
  //   this.setState({
  //     current: e.key
  //   });
  // };

  render() {
    const {handleClick, current} = this.props;
    return (
      <div>
        <Affix offsetTop={this.state.top}>
          <Menu
            style={{height: '50px', marginTop: '-10px'}}
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item key="news" style={{fontSize: '16px'}}>
              <a href="#news">
                <Icon type="read" />
                News
              </a>
            </Menu.Item>
            <Divider type="vertical" />
            <Menu.Item key="events" style={{fontSize: '16px'}}>
              <a href="#events">
                <Icon type="notification" />
                Events
              </a>
            </Menu.Item>
            <Divider type="vertical" />
            <Menu.Item key="Testseries" style={{fontSize: '16px'}}>
              <a href="#Testseries">
                <Icon type="snippets" />
                Test Series
              </a>
            </Menu.Item>
            <Divider type="vertical" />
            <Menu.Item key="article" style={{fontSize: '16px'}}>
              <a href="#testseries">
                <Icon type="book" />
                Article
              </a>
            </Menu.Item>
            <Divider type="vertical" />
            <Menu.Item key="examinfo" style={{fontSize: '16px'}}>
              <a href="#examinfo">
                <Icon type="form" />
                Exam Info
              </a>
            </Menu.Item>
          </Menu>
        </Affix>
      </div>
    );
  }
}
