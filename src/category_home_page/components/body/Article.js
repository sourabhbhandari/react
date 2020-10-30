import React, {Component} from 'react';
import {List, Avatar, Icon} from 'antd';
import Loading from '../../../dashboard/loading/loading';

export default class Article extends Component {
  render() {
    const {Data} = this.props;

    const IconText = ({type, text}) => (
      <span>
        <Icon type={type} style={{marginRight: 8}} />
        {text}
      </span>
    );
    return (
      <div>
        <Loading>
          <List
            itemLayout="vertical"
            size="large"
            style={{textAlign: 'left', marginLeft: '5%', marginRight: '5%'}}
            pagination={{
              onChange: page => {},
              pageSize: 3,
            }}
            dataSource={Data}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={
                  item.Article_Title
                    ? [
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
                      ]
                    : ''
                }
                extra={
                  <img
                    width={item.Article_Title ? 250 : 150}
                    alt="logo"
                    src="https://www.hubspot.com/hs-fs/hubfs/GettyImages-950986656.jpg?width=1800&name=GettyImages-950986656.jpg"
                  />
                }
              >
                <List.Item.Meta
                  avatar={
                    item.Article_Title ? (
                      <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
                    ) : (
                      ''
                    )
                  }
                  title={
                    <a
                      href={item.href}
                      style={{fontWeight: '600', fontSize: '20px'}}
                    >
                      {item.Article_Title
                        ? item.Article_Title
                        : item.News_Tittle}
                    </a>
                  }
                />
                {item.Article_Description
                  ? item.Article_Description
                  : item.News_Description}
                <a>...Read More</a>
              </List.Item>
            )}
          />
        </Loading>
      </div>
    );
  }
}
