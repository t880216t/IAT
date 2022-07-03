import { EditableProTable, ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';
export default (props) => {
  const {isCase} = props;
  const [editableKeys, setEditableRowKeys] = useState(() => props.data?.map((item) => item.id));
  const [dataSource, setDataSource] = useState(() => props.data);
  const columns = [
    {
      title: '参数名',
      dataIndex: 'key',
      valueType: 'text',
      width: 200,
    },
    {
      title: '参数值',
      dataIndex: 'value',
      valueType: "text",
      width: 200,
      ellipsis: true,
    },
  ];
  return (
    <EditableProTable
      rowKey="id"
      scroll={{
        y: 300,
      }}
      size="small"
      value={dataSource}
      controlled
      columns={columns}
      recordCreatorProps={false}
      editable={false}
    />);
};
