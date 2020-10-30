import React from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { enquireScreen } from 'enquire-js';
import { connect } from 'react-redux';
import BatchSlider from './batchSlider';
import BatchInformation from './batchInformation';
import '../../batch.css';

const { Content } = Layout;
let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class BatchDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: '2' };
  }
  handleClick = e => {
    debugger;
    this.setState({ item: e.key });
  };

  render() {
    const contentStyle = {
      padding: '10px',
      background: '#fff',
      height: '33.5em'
    };
    const { id } = this.props;

    return (
      <Layout>
        <BatchSlider id={id} handleClick={this.handleClick} />

        <Layout style={contentStyle}>
          <Content style={{ overflow: 'initial' }}>
            {/* <BatchContent
              isMobile={isMobile}
              path={this.state.url || window.location.pathname}
              id={id}
            /> */}
            <BatchInformation status={this.state.item} batchId={id} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const {
    dashboardState: {
      sider: { collapsed }
    },
    authState: { login }
  } = state;
  return {
    collapsed,
    login
  };
}

export default connect()(withRouter(BatchDashboard));
