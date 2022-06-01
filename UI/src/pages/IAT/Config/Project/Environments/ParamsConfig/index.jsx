import { EditableProTable, ProCard } from '@ant-design/pro-components';
import React, { useState } from 'react';

import styles from './index.less'

export default (props) => {
  const [editableKeys, setEditableRowKeys] = useState(() => props.data?.map((item) => item.id));
  const [dataSource, setDataSource] = useState(() => props.data);
  const columns = [
    {
      title: '参数名',
      dataIndex: 'key',
      valueType: 'text',
    },
    {
      title: '类型',
      key: 'type',
      width: 100,
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        text: { text: '文本', status: 'Default' },
        file: { text: '文件', status: 'Warning' },
      },
    },
    {
      title: '参数值',
      dataIndex: 'value',
      valueType: "text",
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: "text",
    },
    {
      title: '操作',
      valueType: 'option',
      render: () => {
        return null;
      },
    },
  ];
  return (<>
    <EditableProTable
      columns={columns}
      rowKey="id"
      size={"small"}
      className={styles.editTable}
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
    />
  </>);
};
