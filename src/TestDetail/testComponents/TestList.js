import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { getTestListAction } from '../state/actions/Actions';
import ListComponent from './listComponent';
import Loading from '../../components/global/loading/loading';

class testList extends Component {
  state = {
    noTitleKey: 'Active_Test'
  };
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ noTitleKey: key });
  };
  componentDidMount() {}

  handleClick = e => {
    this.setState({
      noTitleKey: 'Archive_Batch'
    });
  };

  render() {
    const { loading } = this.props;
    const tabListNoTitle = [
      {
        key: 'Active_Test',
        tab: 'Published Test'
      },
      {
        key: 'Archive_Test',
        tab: 'Unpublished Test'
      }
    ];

    const contentListNoTitle = {
      Active_Test: <ListComponent Active={true} />,
      Archive_Test: <ListComponent Active={false} />
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
          {!loading ? contentListNoTitle[this.state.noTitleKey] : <Loading />}
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    batchState: {
      uiState: { loading }
    }
  } = state;
  return {
    loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTestListAction: request => {
      dispatch(getTestListAction(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(testList);
