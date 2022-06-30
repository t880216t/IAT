import {DragSortTable} from '@ant-design/pro-components';
import {message, Space} from 'antd';
import {useState} from 'react';

import ScriptModal from './ScriptModal'

const data = [
  {
    key: 'key1',
    name: 'John Brown',
    type: 1,
    index: 0,
  },
  {
    key: 'key2',
    name: 'Jim Green',
    type: 1,
    index: 1,
  },
  {
    key: 'key3',
    name: 'Joe Black',
    type: 2,
    index: 2,
  },
];
export default () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'sort',
      width: '20%',
      render: (dom, rowData, index) => {
        return <span>{rowData.key}</span>;
      },
    },
    {
      title: '脚本名称',
      dataIndex: 'name',
      width: '40%',
      className: 'drag-visible',
    },
    {
      title: '脚本类型',
      dataIndex: 'type',
      width: '20%',
      className: 'drag-visible',
    },
    {
      title: '操作',
      width: '20%',
      dataIndex: 'action',
      render: (dom, rowData, index) => (
        <Space>
          <ScriptModal text={'编辑'} data={rowData} />
          <a href="">
            删除
          </a>
        </Space>

      ),
    },
  ];

  const [dataSource1, setDatasource1] = useState(data);
  const handleDragSortEnd1 = (newDataSource) => {
    console.log('排序后的数据', newDataSource);
    setDatasource1(newDataSource);
    message.success('修改列表排序成功');
  };

  return (
    <DragSortTable
      columns={columns}
      rowKey="key"
      pagination={false}
      search={false}
      headerTitle={false}
      options={false}
      size={'small'}
      dataSource={dataSource1}
      dragSortKey="sort"
      onDragSortEnd={handleDragSortEnd1}
    />
  );
};
