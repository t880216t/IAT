import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useState } from 'react';

import styles from './index.less'

const defaultData = new Array(20).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: `活动名称${index}`,
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  };
});
export default () => {
  const [editableKeys, setEditableRowKeys] = useState(() => defaultData.map((item) => item.id));
  const [dataSource, setDataSource] = useState(() => defaultData);
  const columns = [
    {
      title: '参数名',
      dataIndex: 'key',
      valueType: 'text',
      width: 200,
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
        newRecordType: 'dataSource',
        record: () => ({
          id: Date.now(),
        }),
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
          setDataSource(recordList);
        },
        onChange: setEditableRowKeys,
      }}
    />
  </>);
};
