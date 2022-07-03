import {ProTable} from '@ant-design/pro-components';
import {useState} from 'react';

const columns = [
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name',
    width: '50%'
  },
  {
    title: '脚本类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (_, record) => (
      <a href="">查看</a>
    )
  },
];

export default () => {

  return (
    <ProTable
      columns={columns}
      request={(params) => Promise.resolve({
        data: [],
        success: true,
      })}
      size={'small'}
      options={false}
      rowKey="key"
      search={false}
      headerTitle={false}
      pagination={false}
    />);
};
