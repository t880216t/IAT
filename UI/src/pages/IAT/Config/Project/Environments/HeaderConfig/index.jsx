import { EditableProTable, ProCard, ProForm, ProFormDependency, ProFormDigit, } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
export default (props) => {
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
    {
      title: '描述',
      width: 220,
      dataIndex: 'description',
      valueType: "text",
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
    <ProForm
      initialValues={{
        table: props.data,
      }}
      submitter={false}
    >
    <EditableProTable
      rowKey="id"
      scroll={{
        y: 300,
        x: true,
      }}
      size="small"
      value={dataSource}
      controlled
      formItemProps={{
        label: '默认请求头参数：',
      }}
      columns={columns}
      recordCreatorProps={{
        creatorButtonText: "新增参数",
        record: () => {
          return { id: new Date().getTime().toString() };
        },
        onClick: () => {
          props.onAdd()
        },
      }}
      onChange={e=>{
        console.log(e);
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
          }else {
            console.log(record);
          }
        },
        onChange: setEditableRowKeys,
      }}
    />
  </ProForm>);
};
