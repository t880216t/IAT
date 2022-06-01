import { EditableProTable, ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';

export default (props) => {
  const [editableKeys, setEditableRowKeys] = useState(() => props.data?.map((item) => item.id));
  const [dataSource, setDataSource] = useState(() => props.data);
  const columns = [
    {
      title: 'ip',
      dataIndex: 'key',
      valueType: 'text',
    },
    {
      title: '域名',
      dataIndex: 'value',
      valueType: "text",
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      render: () => {
        return null;
      },
    },
  ];
  return (
    <EditableProTable
      columns={columns}
      rowKey="id"
      size={"small"}
      scroll={{
        y: 300,
        x: true,
      }}
      value={dataSource}
      onChange={setDataSource}
      recordCreatorProps={{
        creatorButtonText: "新增变量",
        record: () => {
          return { id: new Date().getTime().toString() };
        },
        onClick: () => {
          props.onAdd()
        },
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onDelete: (key) => {
          props.onDel({id: key});
        },
        onValuesChange: (record, recordList) => {
          if (record){
            props.onChange(record);
          }
        },
        onChange: setEditableRowKeys,
      }}
    />);
};
