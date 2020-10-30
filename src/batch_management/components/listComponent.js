import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { enquireScreen } from 'enquire-js';
import { List, Icon, Switch, Card } from 'antd';
import Loading from '../../components/global/loading/loading';
import { checkStorage } from '../../auth/utils/cookies';
import { getBatchList, activeBatch } from '../state/actions/actions';
import '../batch.css';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class listComponent extends Component {
  state = {
    response: null,
    loading: false
  };

  componentDidMount() {
    debugger;
  }
  activeBatch = batchId => {
    debugger;
    let user = checkStorage();
    let request = {
      Batch_Id: batchId,
      User_Id: user.User_Id,
      Institute_Id: '1'
    };
    this.props.activeBatch(request);
  };
  render() {
    const { Active, batchListState } = this.props;

    return (
      <div className="batch-card-container">
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3
          }}
          dataSource={Active ? batchListState.active : batchListState.inactive}
          renderItem={item => (
            <List.Item key={item.Batch_Code}>
              <div
                className="batch-card"
                style={{
                  backgroundImage: `url(${
                    item.Image_Url
                      ? item.Image_Url
                      : 'https://cdn.gillion.shufflehound.com/wp-content/uploads/2017/01/23.jpg'
                  })`
                }}
              >
                <Switch
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="close" />}
                  loading={false}
                  checked={item.Is_Active === '1' ? true : false}
                  onChange={() => this.activeBatch(item.Batch_Id)}
                  style={{ float: 'right', margin: '-2% 2% 0 0' }}
                  size={isMobile ? 'small' : 'default'}
                />
                <h1>{item.Batch_Name}</h1>
                <p style={{ textTransform: 'uppercase' }}>{item.Batch_Code}</p>
              </div>

              <div className="batch-card-details">
                <div className="batch-edit-view">
                  <Icon
                    type="edit"
                    style={{ fontSize: '20px', marginRight: '8%' }}
                  />
                  <Link to={`/dashboard/batch/create/${item.Batch_Id}`}>
                    Edit Details
                  </Link>
                </div>
                <div className="batch-edit-view">
                  <Icon
                    type="eye"
                    style={{ fontSize: '20px', marginRight: '8%' }}
                  />
                  <Link to={`/dashboard/batch/details/${item.Batch_Id}`}>
                    View Details
                  </Link>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    batchState: { batchListState }
  } = state;
  return {
    batchListState
  };
};
const mapDispatchToProps = dispatch => {
  return {
    activeBatch: request => {
      dispatch(activeBatch(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(listComponent);
