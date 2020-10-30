import React from 'react';
import { Result } from 'antd'; // for js

import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './page_not_found.css';

class PageNotFound extends React.Component {
  redirectBack = () => {
    const { back } = this.props;
    this.props.history.replace(back);
  };
  render() {
    const { back } = this.props;

    return (
      <div className="page-not-found">
        <Result
          status="404"
          title="404"
          subTitle="You landed on another planet, we don't know where you are"
          extra={
            <Button type="primary" onClick={this.redirectBack}>
              <Link to={back ? back : '/'}>Back</Link>
            </Button>
          }
        />
      </div>
    );
  }
}

export default withRouter(PageNotFound);
