import {DragSortTable} from '@ant-design/pro-components';
import {message} from 'antd';
import {useState} from 'react';

const data = [
  {
    key: 'key1',
    name: 'John Brown',
    index: 0,
  },
  {
    key: 'key2',
    name: 'Jim Green',
    index: 1,
  },
  {
    key: 'key3',
    name: 'Joe Black',
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
      title: '用例名称',
      dataIndex: 'name',
      width: '60%',
      className: 'drag-visible',
    },
    {
      title: '操作',
      width: '20%',
      dataIndex: 'action',
      render: (dom, rowData, index) => (
        <a href="">
          删除
        </a>
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
