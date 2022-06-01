import { DownOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { EditableProTable, ProCard, ProFormField, ProFormRadio } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React, {useRef, useState} from 'react';


import Environments from "./Environments"

import {
  queryProjectList,
  queryProjectAdd,
  queryProjectDel,
  queryProjectUpdate,
} from '../service'


export default () => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'project_name',
      width: "20%"
    },
    {
      title: '环境数量',
      readonly: true,
      dataIndex: 'env_count',
      render: (text, record) => (
        <Environments buttonType="link" text={text} projectId={record.id} />
      )
    },
    {
      title: '接口数量',
      readonly: true,
      dataIndex: 'api_count',
    },
    {
      title: '用例数量',
      readonly: true,
      dataIndex: 'case_count',
    },
    {
      title: '状态',
      readonly: true,
      dataIndex: 'status',
      valueEnum: {
        0: { text: '关闭', status: 'Error' },
        1: { text: '运行中', status: 'Processing' },
      },
    },
    {
      title: '创建者',
      readonly: true,
      dataIndex: 'add_user',
    },
    {
      title: "创建时间",
      readonly: true,
      key: 'add_time',
      dataIndex: 'add_time',
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="editable" onClick={() => {
          var _a;
          (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
        }}>
          编辑
        </a>,
        <Popconfirm
          placement="topRight"
          title={`您确认要删除此项目吗？`}
          onConfirm={()=>{queryProjectDel({projectId: record.id}).then(actionRef?.current.reload())}}
          okText="确认"
          cancelText="取消"
        >
          <a style={{color: 'red'}}>删除</a>
        </Popconfirm>
        ,
      ],
    },
  ];
  const actionRef = useRef();

  return (
    <EditableProTable
      headerTitle="项目列表"
      columns={columns}
      request={async (params) => {
        const response = await queryProjectList(params);
        return {
          data: response.content ? response.content.data : [],
          success: response.code === 0,
          total: response.content.total,
        };
      }}
      rowKey="id"
      recordCreatorProps={{
        position: 'bottom',
        record: () => ({ id: "new" }),
      }}
      actionRef={actionRef}
      value={dataSource}
      onChange={setDataSource}
      search={false}
      options={false}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (rowKey, data, row) => {
          if (rowKey === 'new'){
            queryProjectAdd({
              projectName: data.project_name
            }).then(()=>{
              actionRef?.current.reload();
            })
          }else {
            queryProjectUpdate({
              projectId: data.id,
              projectName: data.project_name
            }).then(()=>{
              actionRef?.current.reload();
            })
          }
        },
        onChange: setEditableRowKeys,
      }}
      dateFormatter="string"
    />);
};
