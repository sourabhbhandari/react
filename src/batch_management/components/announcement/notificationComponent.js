import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { enquireScreen } from 'enquire-js';
import { Card, Icon, List, Button, Spin, ConfigProvider } from 'antd';
import { checkStorage } from '../../../auth/utils/cookies';
import AddAnnouncement from './addAnnouncement';
import {
  getAnnouncementList,
  deleteAnnouncement
} from '../../state/actions/actions';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class notificationComponent extends Component {
  state = {
    noTitleKey: 'Create'
  };
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ noTitleKey: key });
    if (key === 'List') {
      const { batchId } = this.props;
      this.props.getAnnouncementList({ Institute_Id: '1', Batch_Id: batchId });
    }
  };
  componentDidMount() {
    // const { batchId } = this.props;
    // this.props.getAnnouncementList({ Institute_Id: '1', Batch_Id: batchId });
  }
  handleDelete = announcementId => {
    let user = checkStorage();
    let request = {
      Announcement_Id: announcementId,
      Institute_Id: '1',
      Created_By: user.User_Id
    };
    this.props.deleteAnnouncement(request);
  };
  customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <Icon
        type="notification"
        theme="twoTone"
        style={{ fontSize: 40, marginBottom: '2%' }}
      />
      <p>No Announcement is made yet!!</p>
    </div>
  );
  render() {
    const {
      batchId,
      uiState: { loading },
      announcementState
    } = this.props;
    const layout = isMobile ? 'vertical' : 'horizontal';
    const tabListNoTitle = [
      {
        key: 'Create',
        tab: 'Create'
      },
      {
        key: 'List',
        tab: 'List'
      }
    ];

    const contentListNoTitle = {
      Create: <AddAnnouncement batchId={batchId} />,
      List: (
        <ConfigProvider renderEmpty={this.customizeRenderEmpty}>
          <List
            style={isMobile ? { textAlign: 'center' } : { margin: '20px' }}
            itemLayout={layout}
            pagination={{
              onChange: page => {},
              pageSize: 3
            }}
            dataSource={announcementState}
            renderItem={item => (
              <List.Item
                key={item.Announcement_Id}
                style={{ border: 'solid 1px', margin: '1%' }}
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={() => this.handleEdit(item.Announcement_Id)}
                  >
                    <Icon type="edit" />
                  </Button>,
                  <Button
                    type="primary"
                    size="small"
                    shape="circle"
                    onClick={() => this.handleDelete(item.Announcement_Id)}
                  >
                    <Icon type="delete" theme="filled" />
                  </Button>
                ]}
              >
                <List.Item.Meta
                  style={{ marginLeft: '2%', fontSize: '8px' }}
                  title={
                    <span style={{ textTransform: 'capitalize' }}>
                      <Icon
                        type="sound"
                        theme="twoTone"
                        style={{ marginRight: '1%' }}
                      />
                      {item.Announcement_Title}
                    </span>
                  }
                  description={item.Announcement_Description}
                />
              </List.Item>
            )}
          />
        </ConfigProvider>
      )
    };

    return (
      <div>
        <Card
          style={{ width: '100%' }}
          tabList={tabListNoTitle}
          activeTabKey={this.state.noTitleKey}
          onTabChange={key => {
            this.onTabChange(key, 'noTitleKey');
          }}
        >
          <Spin spinning={loading}>
            {contentListNoTitle[this.state.noTitleKey]}
          </Spin>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: { uiState, announcementState }
  } = state;
  return { uiState, announcementState };
};
const mapDispatchToProps = dispatch => {
  return {
    getAnnouncementList: request => {
      dispatch(getAnnouncementList(request));
    },
    deleteAnnouncement: request => {
      dispatch(deleteAnnouncement(request));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(notificationComponent);
