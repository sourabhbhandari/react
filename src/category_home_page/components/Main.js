import React, {Component} from 'react';

import './App.css';
import {enquireScreen} from 'enquire-js';
import Body from './body/body';
import Header from './header/Header';
import {HomeFooterDataSource} from '../../landing/Home/data.source';
import Footer from 'landing/Home/home_footer';

import {selectCategoryAction} from '../state/actions/Action';
import {Spin} from 'antd';
import {connect} from 'react-redux';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // Create a ref object
  }

  componentDidMount = () => {
    const {
      match: {params},
    } = this.props;
    const category = params.category;

    this.props.dispatch(selectCategoryAction(category));
  };
  render() {
    const {
      match: {params},
    } = this.props;
    const {selectCategoryState} = this.props;
    const category = params.category;
    return (
      <div className="App">
        <Spin
          spinning={!selectCategoryState.status}
          style={{marginTop: '20%'}}
          size="large"
        >
          {selectCategoryState.status ? (
            <>
              <Header
                category={
                  selectCategoryState ? selectCategoryState.data : category
                }
              />
              <Body
                category={
                  selectCategoryState ? selectCategoryState.data : category
                }
              />
              <Footer
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
    categoryState: {selectCategoryState},
  } = state;
  return {selectCategoryState};
};

export default connect(mapStateToProps)(Main);
