import React, { Component } from 'react';
import { Table, Button, Icon, Input, Spin } from 'antd';
import { connect } from 'react-redux';

class tableData extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon
        type="search"
        style={{ color: filtered ? '#1890ff' : undefined, fontSize: '16px' }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });
  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render() {
    const { StudentList, uiState, resultModal } = this.props;
    const columns = [
      {
        title: 'Students Name',
        dataIndex: 'First_Name',
        key: 'First_Name',
        width: '40%',
        ellipsis: true,
        ...this.getColumnSearchProps('First_Name')
      },
      {
        title: 'Email Id',
        dataIndex: 'Email_Id',
        key: 'Email_Id',
        width: '40%',
        ellipsis: true,
        ...this.getColumnSearchProps('Email_Id')
      },
      {
        title: 'Started At',
        dataIndex: 'Start_Time',
        key: 'Start_Time',
        width: '30%',
        ellipsis: true
      },

      {
        title: 'Questions Attempted',
        dataIndex: 'Number_Of_Question_Attempted',
        key: 'Number_Of_Question_Attempted',
        width: '30%',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.question_attempted - b.question_attempted,

        ellipsis: true
      },
      {
        title: 'TimeTaken (mins)',
        key: 'Time_Taken',
        width: '30%',
        defaultSortOrder: 'descend',
        sorter: (a, b) =>
          a.Time_Taken.split(':')[0] * 3600 +
          a.Time_Taken.split(':')[1] * 60 +
          a.Time_Taken.split(':')[2] -
          (b.Time_Taken.split(':')[0] * 3600 +
            b.Time_Taken.split(':')[1] * 60 +
            b.Time_Taken.split(':')[2]),

        ellipsis: true,
        render: record => record.Time_Taken.split('.')[0]
      },
      {
        title: 'View Result',
        key: 'action',
        width: '20%',
        render: record => (
          <Button
            type="primary"
            size="small"
            shape="circle"
            onClick={() => resultModal(record.Result_Id, record.Pk_User_Id)}
          >
            <Icon type="eye" theme="filled" />
          </Button>
        )
      }
    ];

    return (
      <div>
        <Spin spinning={uiState.loading}>
          <Table
            columns={columns}
            dataSource={StudentList}
            bordered
            onChange={this.handleChange}
          />
        </Spin>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    testState: {
      scoreCardState: { StudentList },
      uiState
    }
  } = state;
  return { StudentList, uiState };
};
export default connect(mapStateToProps)(tableData);
