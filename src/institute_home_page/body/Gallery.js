import React, { Component } from "react";
import { List, Card, Carousel } from "antd";
import img_1 from "../images/img_1.jpg";
import img_2 from "../images/img_2.jpg";
import img_3 from "../images/img_3.jpg";
import img_4 from "../images/img_4.jpg";
import img_5 from "../images/img_5.jpg";
import img_6 from "../images/img_6.jpg";
import { enquireScreen } from "enquire-js";

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
let data = [img_1, img_2, img_3, img_4, img_5, img_6];
export default class Gallery extends Component {
  render() {
    return (
      <div style={{ marginTop: "5%" }}>
        {!isMobile ? (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <Card hoverable>
                  <img alt="example" src={item} style={{ width: "100%" }} />
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <Carousel autoplay>
            {data.map(item => (
              <Card hoverable>
                <img alt="example" src={item} style={{ width: "100%" }} />
              </Card>
            ))}
          </Carousel>
        )}
      </div>
    );
  }
}
