import React, { Component } from 'react';
import { enquireScreen } from 'enquire-js';
import Footer from '../category_home_page/components/footer/Footer';
import InstituteHeader from './header/instituteHeader';
import InstituteFooter from 'landing/Home/home_footer';
import InstituteBody from './body/instituteBody';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import {
  instituteStartAction,
  testSeriesAction
} from './state/actions/Actions';
import { HomeFooterDataSource } from '../landing/Home/data.source';
import './Home.css';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class Institute extends Component {
  componentDidMount() {
    this.props.dispatch(instituteStartAction());
    this.props.dispatch(testSeriesAction());
  }
  render() {
    const {
      match: { params }
    } = this.props;
    const { instituteDetailState, testSeriesState } = this.props;
    return (
      <div className="Institute">
        <Spin
          spinning={!instituteDetailState.status}
          style={{ marginTop: '20%' }}
          size="large"
        >
          {instituteDetailState.status ? (
            <>
              {' '}
              <InstituteHeader
                instituteDetailState={
                  instituteDetailState.data ? instituteDetailState.data[0] : []
                }
              />
              <InstituteBody
                testSeriesState={
                  testSeriesState.data ? testSeriesState.data : []
                }
                instituteDetailState={
                  instituteDetailState.data ? instituteDetailState.data[0] : []
                }
              />
              <InstituteFooter
                id="HomeFooter_0"
                key="HomeFooter_0"
                dataSource={HomeFooterDataSource}
                isMobile={isMobile}
              />
            </>
          ) : (
            ''
          )}
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    instituteState: { testSeriesState, instituteDetailState }
  } = state;
  return {
    testSeriesState,
    instituteDetailState
  };
};
export default connect(mapStateToProps)(Institute);
