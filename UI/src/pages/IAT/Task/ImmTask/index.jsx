import React, {useRef} from 'react';
import {FileDoneOutlined, EditOutlined, CopyOutlined, DeleteOutlined, LinkOutlined} from '@ant-design/icons';
import { Tag, message, Space, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { history, Link } from 'umi';
import {queryTaskList, queryTaskAdd, queryTaskDel, queryTaskCopy} from '../service'

import TaskAddModal from '../TaskAddModal'


const handleCreateTask = async (params, actionRef) => {
  const response = await queryTaskAdd(params)
  if (response && response.code === 0){
    message.success("提交成功")
    actionRef?.current.reload()
  }else {
    message.error(response?.msg)
  }
}

const handleActionClick = async (key, taskId, actionRef) => {
  console.log(key);
  switch (key) {
    case 'copy':
      await queryTaskCopy({taskId})
      actionRef?.current.reload()
      break;
    case 'del':
      await queryTaskDel({taskId})
      actionRef?.current.reload()
      break;
    return
  }
}

export default () => {
  const actionRef = useRef();
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '8%',
      hideInSearch: true,
    },
    {
      title: '任务名称',
      dataIndex: 'name',
      ellipsis: true,
      width: '20%',
      render: (text, record) => (
        <Link title={"查看详情"} key="detail" to={`/iat/task/detail?taskId=${record.id}`} target="_blank">
          {text}
        </Link>
      )
    },
    {
      disable: true,
      title: '项目',
      dataIndex: 'project_name',
      width: '10%',
      search: false,
      renderFormItem: (_, {defaultRender}) => {
        return defaultRender(_);
      },
      render: (_, record) => (<Tag color="blue">{record.project_name}</Tag>),
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      width: '10%',
      valueEnum: {
        all: {text: '全部', status: 'Default'},
        0: {
          text: '新任务',
          status: 'default',
        },
        1: {
          text: '开始运行',
          status: 'Processing',
        },
        2: {
          text: '运行中',
          status: 'Processing',
        },
        3: {
          text: '已完成',
          status: 'Success',
        },
        4: {
          text: '运行失败',
          status: 'Error',
        },
      },
    },
    {
      title: '更新人',
      key: 'updateUser',
      dataIndex: 'updateUser',
      hideInSearch: true,
      width: '10%'
    },
    {
      title: '更新时间',
      key: 'updateTime',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInSearch: true,
      width: '10%'
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: '15%',
      render: (_, record) => (
        <div>
          {record.status === 3 && (
            <Link title={"查看报告"} style={{marginRight: 10,marginBottom: 10}} key="report" to={`/iat/task/report?taskId=${record.id}&execId=${record.execId}`} target="_blank">
              <FileDoneOutlined />
            </Link>
          )}
          <Button
            size="small"
            icon={<CopyOutlined />}
            style={{marginRight: 10,marginBottom: 10}}
            onClick={() => handleActionClick('copy', record.id, actionRef)}
          >复制</Button>
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            style={{marginRight: 10,marginBottom: 10}}
            onClick={() => handleActionClick('del', record.id, actionRef)}
          >删除</Button>
        </div>
      )
    },
  ];
  return (
    <ProTable
      dateFormatter="string"
      headerTitle="任务列表"
      toolBarRender={() => [
        <TaskAddModal type="primary" onAdd={(values) => handleCreateTask(values, actionRef)} />
      ]}
      pagination={{
        pageSize: 20,
      }}
      polling={5000}
      columns={columns}
      actionRef={actionRef}
      cardBordered
      options={false}
      request={async (params = {}, sort, filter) => {
        const response = await queryTaskList({taskType: 1, ...params})
        return response?.content
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
    />);
};
