import React, { Component } from 'react';
import Question from './question';
import { enquireScreen } from 'enquire-js';
import { Pagination, Empty, Button } from 'antd';
import { connect } from 'react-redux';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 1
    };
  }

  handleShowQueSizeChange = (page, pageSize) => {
    this.setState({ page, pageSize });
  };

  handlePageChange = (page, pageSize) => {
    this.setState({ page });
  };

  render() {
    const { questionList, active } = this.props;
    const numberOfQue = questionList.length;
    let { page, pageSize } = this.state;
    page--;
    let data = questionList;
    return (
      <>
        <b style={{ fontSize: '20px' }}> Question List: </b>

        {numberOfQue !== 0 ? (
          data.slice(page * pageSize, (page + 1) * pageSize).map(que => (
            <>
              <Question isMobile={isMobile} que={que} active={active} />
              <br />
              <br />
            </>
          ))
        ) : (
          <>
            <Empty
              description={
                <p>
                  Question List is Empty.Please add question using question{' '}
                  <br />
                  library or create manually{' '}
                </p>
              }
            />
          </>
        )}

        <Pagination
          showSizeChanger
          onChange={this.handlePageChange}
          onShowSizeChange={this.handleShowQueSizeChange}
          pageSizeOptions={['1', '2', '5', '10', '15']}
          defaultPageSize={1}
          defaultCurrent={1}
          total={numberOfQue}
        />
      </>
    );
  }
}

const mapStateToProps = state => {};
export default connect(mapStateToProps)(QuestionList);
