/* eslint-disable react/sort-comp,react/no-typos */
import React, { PureComponent } from 'react';
import {
  Layout, Table, Badge, Icon, Popconfirm, message, Input, Card, Divider, Col, Button, Radio, Spin
} from 'antd';
import { connect } from 'dva';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

@connect(({ iatTask, loading }) => ({
  iatTask,
  loading: loading.effects['iatTask/queryTaskList']
}))
class Immediate extends PureComponent {
  state={
    taskList: []
  }

  componentWillMount() {
    this.queryTaskList()
  }

  componentWillUnMount() {
    clearInterval(this.timer);
  }

  queryTaskList=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatTask/queryTaskList',
      payload: {
        taskType: 1,
      }
    })
      .then(() => {
        const { taskList } = this.props.iatTask;
        this.setState({ taskList })
      })
  }

  handleGoAdd=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatTask/goAddPage'
    })
  };

  handleRunTask=id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatTask/queryTaskExcute',
      payload: {
        id,
      }
    })
      .then(() => {
        this.queryTaskList()
        this.timer = setInterval(() => this.queryTaskList(), 10000);
      })
  };

  handleDelTask=id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatTask/queryTaskDelete',
      payload: {
        id,
      }
    })
      .then(() => {
        this.queryTaskList()
      })
  }

  renderStatus = status => {
    let result
    switch (status) {
      case 1:
        result = <Badge status="processing" text="获取任务信息" />
        break;
      case 2:
        result = <Badge status="processing" text="生成测试脚本" />
        break;
      case 3:
        result = <Badge status="success" text="执行完成" />
        break;
      case 4:
        result = <Badge status="error" text="获取任务信息失败" />
        break;
      case 5:
        result = <Badge status="error" text="执行任务失败" />
        break;
      default:
        result = <Badge status="default" text="新任务" />
    }
    return result
  };

  render() {
    const { taskList } = this.state;
    const { loading } = this.props;
    const columns = [{
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={`/task/api/immediate/detail?${record.id}`} style={{ color: '#2e86de', fontWeight: 'bold' }}>{text}</a>
    }, {
      title: '任务描述',
      dataIndex: 'taskDesc',
      key: 'taskDesc',
    }, {
      title: '新建人',
      dataIndex: 'add_user',
      key: 'add_user',
    }, {
      title: '新建时间',
      dataIndex: 'add_time',
      key: 'add_time',
    }, {
      title: '任务状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => this.renderStatus(record.status)
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div>
          {record.status === 0 && <a onClick={() => this.handleRunTask(record.id)}>开始执行</a>}
          {record.status === 3 && <a style={{ color: '#2e86de', fontWeight: 'bold' }} href={`/task/api/immediate/report?${record.id}`}>查看报告</a>}
          {([0, 3].indexOf(record.status) > -1) && <Divider type="vertical" />}
          {!([1, 2].indexOf(record.status) > -1) && (
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.handleDelTask(record.id)}>
              <a style={{ color: '#eb2f06' }}>删除</a>
            </Popconfirm>
          )}
        </div>
      )
    }]
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={() => this.handleGoAdd()}
            >
              <Icon type="plus" />
              新建任务
            </Button>
          </div>
          <Table dataSource={taskList} columns={columns} loading={loading} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Immediate
