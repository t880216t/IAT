import React, { PureComponent } from 'react';
import { Card, Table, Select } from 'antd';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ system, loading }) => ({
  system,
  loading: loading.effects['system/queryProjectList'],
}))
class Users extends PureComponent {
  state = {
    userList: [],
  };

  componentWillMount() {
    this.queryUserList();
  }

  queryUserList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryUserList',
    }).then(() => {
      const { userList } = this.props.system;
      this.setState({
        userList,
      });
    });
  };

  querySetUserStatus = (id, statusCode) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/querySetUserStatus',
      payload: {
        id,
        status: statusCode,
      },
    }).then(() => {
      this.queryUserList();
    });
  };

  querySetUserType = (id, accountType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/querySetUserType',
      payload: {
        id,
        accountType,
      },
    }).then(() => {
      this.queryUserList();
    });
  };

  handleSetClassStatus = record => {
    if (record.status === 1) {
      this.querySetUserStatus(record.id, 0);
    }
  };

  handleTypeChange = (id, value) => {
    this.querySetUserType(id, value);
  }

  render() {
    const { userList, } = this.state;
    const { loading } = this.props;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '用户身份',
        dataIndex: 'account_type',
        key: 'account_type',
        render: (text, record) => (
          <Select value={record.account_type} style={{ width: 120 }} size="small" onChange={value => this.handleTypeChange(record.id, value)}>
            <Option value={0}>用户</Option>
            <Option value={1}>管理员</Option>
          </Select>
        ),
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '创建时间',
        dataIndex: 'add_time',
        key: 'add_time',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
            <div>
              {record.status === 1 ? (
                <a onClick={() => this.handleSetClassStatus(record)}>删除</a>
              ) : (
                <a onClick={() => this.handleSetClassStatus(record)}>启用</a>
              )}
            </div>
          ),
      },
    ];
    return (
      <div>
        <Card title="用户列表" bordered={false}>
          <Table rowKey="id" loading={loading} dataSource={userList} columns={columns} />
        </Card>
      </div>
    );
  }
}
export default Users;
