import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';
import { getBatchList } from '../state/actions/actions';
import BatchDashboard from '../components/batchDashboard/batchDashboard';
import Loading from '../../components/global/loading/loading';

class batchDetails extends Component {
  componentDidMount() {}
  render() {
    const {
      match: { params }
    } = this.props;
    const {
      uiState: { loading },
      batchListState: { active, inactive }
    } = this.props;
    let data =
      active.find(item => item.Batch_Id === params.id) ||
      inactive.find(item => item.Batch_Id === params.id);

    return (
      <div>
        {active ? (
          <div style={{ background: '#F5F5F5' }}>
            <div
              className=" bg-1"
              style={{
                backgroundImage: `url(${
                  data && data.Image_Url
                    ? data.Image_Url
                    : 'https://cdn.gillion.shufflehound.com/wp-content/uploads/2017/01/23.jpg'
                })`,
                maxWidth: '95%',
                margin: 'auto',
                borderRadius: '10px'
              }}
            >
              <div className="batch-detail-header">
                <Row>
                  <Col span={6}>
                    {' '}
                    <h1>{data ? data.Batch_Name : ''}</h1>
                    <h2
                      style={{
                        color: '#fff',
                        fontSize: '25px'
                      }}
                    >
                      {data ? data.Category_Name : ''}
                    </h2>
                  </Col>
                  <Col span={6}>
                    <Icon
                      type="calendar"
                      style={{
                        fontSize: '20px'
                      }}
                    />
                    <span
                      style={{
                        fontSize: '24px',

                        color: '#fff'
                      }}
                    >
                      {data.Batch_Start_Date}
                    </span>
                    <br />
                    <Icon
                      type="qrcode"
                      style={{
                        fontSize: '20px'
                      }}
                    />
                    <span
                      style={{
                        fontSize: '24px',

                        color: '#fff'
                      }}
                    >
                      {data ? data.Batch_Code : ''}
                    </span>
                  </Col>
                  <Col span={16}></Col>
                </Row>
              </div>
            </div>

            <div className="batch-detail-body" style={{ height: '65vh' }}>
              <BatchDashboard id={params.id} />
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: { batchListState, uiState }
  } = state;
  return { batchListState, uiState };
};
const mapDispatchToProps = dispatch => {
  return {
    getBatchList: request => {
      dispatch(getBatchList(request));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(batchDetails);
