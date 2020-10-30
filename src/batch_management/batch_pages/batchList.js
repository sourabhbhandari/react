import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { getBatchList } from '../state/actions/actions';
import ListComponent from '../components/listComponent';
import Loading from '../../components/global/loading/loading';

class batchList extends Component {
  state = {
    noTitleKey: 'Active_Batch'
  };
  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ noTitleKey: key });
  };
  componentDidMount() {
    this.props.getBatchList({ Institute_Id: '1', User_Id: '63' });
  }

  handleClick = e => {
    this.setState({
      noTitleKey: 'Archive_Batch'
    });
  };

  render() {
    const { loading } = this.props;
    const tabListNoTitle = [
      {
        key: 'Active_Batch',
        tab: 'Active Batch'
      },
      {
        key: 'Archive_Batch',
        tab: 'Archive Batch'
      }
    ];

    const contentListNoTitle = {
      Active_Batch: <ListComponent Active={true} />,
      Archive_Batch: <ListComponent Active={false} />
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
    getBatchList: request => {
      dispatch(getBatchList(request));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(batchList);
