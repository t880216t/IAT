import { EditableProTable, ProCard, ProForm, ProFormDependency, ProFormDigit, } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
const defaultData = [
  {
    id: 624748504,
    associate: '题库名称一',
    questionsNum: 10,
    type: 'text',
    scoringMethod: 'continuous',
    fraction: 20,
  },
  {
    id: 624691229,
    associate: '题库名称二',
    questionsNum: 10,
    scoringMethod: 'continuous',
    type: 'file',
    fraction: 20,
  },
  {
    id: 624748503,
    associate: '题库名称三',
    questionsNum: 10,
    type: 'judge',
    scoringMethod: 'continuous',
    fraction: 20,
  },
  {
    id: 624691220,
    associate: '题库名称四',
    questionsNum: 10,
    scoringMethod: 'continuous',
    type: 'vacant',
    fraction: 20,
  },
];
export default () => {
  const [editableKeys, setEditableRowKeys] = useState(() => defaultData.map((item) => item.id));
  const formRef = useRef();
  const actionRef = useRef();
  const editableFormRef = useRef();
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
      rowKey="id"
      scroll={{
        y: 300,
        x: true,
      }}
      size="small"
      headerTitle={"Hosts:"}
      editableFormRef={editableFormRef}
      controlled
      actionRef={actionRef}
      name="table"
      columns={columns}
      recordCreatorProps={{
        record: (index) => {
          return { id: index + 1 };
        },
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onChange: setEditableRowKeys,
      }}
    />);
};
