import React, { Component } from 'react';
import { Table, Spin, Tag, Modal } from 'antd';
import '../Library.css';
import { connect } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import Question from '../../components/forms/questions/question';
import { selectQuestionsAction } from '../state/actions/Actions';

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class QuestionTable extends Component {
  state = {
    questionLibrary: [],
    selectedRowKeys: [],
    selectedQuestion: { library: true },
    modal2Visible: false // Check here to configure the default column
  };
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
    this.props.selectQuestions(selectedRowKeys);
  };
  handleQuestion = e => {
    const { questionLibraryState } = this.props;
    const selectedQuestion = questionLibraryState.data[0].filter(
      item => e === item.Question_Text
    );
    this.setState({
      selectedQuestion: { library: true, ...selectedQuestion[0] },
      modal2Visible: true
    });
  };
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  onPagination = page => {
    const { onPageChange } = this.props;
    onPageChange(page);
  };
  render() {
    const { selectedRowKeys } = this.state;
    const { questionLibrary, test_id } = this.props;
    const rowSelection = {
      selectedRowKeys,
      type: test_id ? '' : 'radio',

      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.props.selectQuestions(newSelectedRowKeys);
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          }
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.props.selectQuestions(newSelectedRowKeys);
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          }
        }
      ]
    };
    const columns = [
      {
        title: 'Question Text',
        dataIndex: 'Question_Text',

        ellipsis: true,

        render: text => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            onClick={() => this.handleQuestion(text)}
            style={{
              fontWeight: '600',
              textDecoration: 'underline'
            }}
          >
            {text}
          </a>
        )
      },
      {
        title: 'Question Type',
        dataIndex: 'question_type'
      },
      {
        title: 'Created On',
        dataIndex: 'created_on'
      },
      {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </span>
        )
      },

      {
        title: 'Created By',
        dataIndex: 'created_by'
      }
    ];
    return (
      <div>
        <Spin
          size="large"
          style={{ marginTop: '15%' }}
          spinning={questionLibrary.loading}
        >
          <Table
            scroll={{ y: 500 }}
            dataSource={
              questionLibrary.status ? questionLibrary.questionData : []
            }
            columns={columns}
            bordered
            // pagination={{
            //   onChange: page => {
            //     this.onPagination(page);
            //   },
            //   pageSize: 10
            // }}
            size="large"
            rowSelection={rowSelection}
          />
        </Spin>
        {questionLibrary.status ? (
          <Modal
            centered
            width={1000}
            visible={this.state.modal2Visible}
            onOk={() => this.setModal2Visible(false)}
            onCancel={() => this.setModal2Visible(false)}
          >
            <Question isMobile={isMobile} que={this.state.selectedQuestion} />
          </Modal>
        ) : (
          ''
        )}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    selectQuestions: item => {
      dispatch(selectQuestionsAction(item));
    }
  };
};
const mapStateToProps = state => {
  const {
    libraryState: { selectQuestionsState, questionLibraryState }
  } = state;
  return {
    selectQuestionsState,
    questionLibraryState
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionTable);
