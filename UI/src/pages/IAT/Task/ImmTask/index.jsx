import React, {useRef} from 'react';
import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Dropdown, Menu, Space, Tag} from 'antd';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import request from 'umi-request';

import TaskAddModal from '../TaskAddModal'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    width: '8%',
    hideInSearch: true,
  },
  {
    title: '任务名称',
    dataIndex: 'title',
    ellipsis: true,
    width: '30%',
  },
  {
    disable: true,
    title: '项目',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, {defaultRender}) => {
      return defaultRender(_);
    },
    render: (_, record) => (<Space>
      {record.labels.map(({name, color}) => (<Tag color={color} key={name}>
        {name}
      </Tag>))}
    </Space>),
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum: {
      all: {text: '全部', status: 'Default'},
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '更新人',
    key: 'user',
    dataIndex: 'user',
    hideInSearch: true,
  },
  {
    title: '更新时间',
    key: 'updated_at',
    dataIndex: 'updated_at',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    width: '15%',
    render: (text, record, _, action) => [
      <a href={`/iat/task/report?taskId=${record.id}`} target="_blank" rel="noopener noreferrer" key="view">
        查看报告
      </a>,
      <a key="editable" href={`/iat/task/detail?taskId=${record.id}`} target="_blank" rel="noopener noreferrer">
        编辑
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action === null || action === void 0 ? void 0 : action.reload()}
        menus={[
          {key: 'copy', name: '复制'},
          {key: 'delete', name: '删除'},
        ]}/>,
    ],
  },
];
const menu = (<Menu>
  <Menu.Item key="1">1st item</Menu.Item>
  <Menu.Item key="2">2nd item</Menu.Item>
  <Menu.Item key="3">3rd item</Menu.Item>
</Menu>);
export default () => {
  const actionRef = useRef();
  return (
    <ProTable
      dateFormatter="string"
      headerTitle="任务列表"
      toolBarRender={() => [
        <TaskAddModal />,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined/>
          </Button>
        </Dropdown>,
      ]}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      options={false}
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        return request('https://proapi.azurewebsites.net/github/issues', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
    />);
};
