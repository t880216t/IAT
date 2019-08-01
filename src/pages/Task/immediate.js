import React, { PureComponent } from 'react';
import {
  Table, Badge, Icon, Popconfirm, Card, Divider, Button,
} from 'antd';
import { connect } from 'dva';
import io from 'socket.io-client';

import { PageHeaderWrapper } from '@ant-design/pro-layout';

@connect(({ system, task, loading }) => ({
  system,
  task,
  loading: loading.effects['task/queryTaskList'],
}))
class Immediate extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      taskList: [],
    };
    this.socket = null;
  }

  componentWillMount() {
    const urlParams = new URL(window.location.href);
    this.setState({ hostname: urlParams.hostname });
    this.socket = io(`ws://${urlParams.hostname}:5000/wstask`);
    this.socket.on('connect', () => {
      console.log('<= 连接调试服务器成功！');
    });
    this.queryTaskList();
    this.getTaskList();
  }

  componentDidMount() {
    this.socket.on('setTaskStatus', status => {
      console.log('<= 收到任务状态', status);
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.socket.on('disconnect', () => {
      console.log('关闭连接');
    });
  }

  queryTaskList=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/queryTaskList',
      payload: {
        taskType: 2,
      },
    })
      .then(() => {
        const { task } = this.props;
        this.setState({ taskList: task.taskList });
      });
  }

  handleGoAdd=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/goAddPage',
    });
  };

  handleDelTask=id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/queryTaskDelete',
      payload: {
        id,
      },
    })
      .then(() => {
        this.queryTaskList();
      });
  };

  handleRunTask=id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/queryTaskExcute',
      payload: {
        id,
      },
    })
      .then(() => {
      this.queryTaskList();
    });
  };

  getTaskList = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setInterval(() => {
      this.socket.emit('taskList', { taskType: 2 }, taskList => {
        this.setState({ taskList });
      });
    }, 2000);
  }

  renderStatus = status => {
    let result;
    switch (status) {
      case 1:
        result = <Badge status="processing" text="生成测试脚本" />;
        break;
      case 2:
        result = <Badge status="processing" text="正在执行" />;
        break;
      case 3:
        result = <Badge status="success" text="执行完成" />;
        break;
      case 4:
        result = <Badge status="error" text="执行任务失败" />;
        break;
      case 5:
        result = <Badge status="error" text="执行任务失败" />;
        break;
      default:
        result = <Badge status="default" text="新任务" />;
    }
    return result;
  };

  render() {
    const { taskList } = this.state;
    const { loading } = this.props;
    const columns = [{
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a target="_blank" rel="noopener noreferrer" href={`/task/ui/immediate/detail?${record.id}`} style={{ color: '#2e86de', fontWeight: 'bold' }}>{text}</a>,
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
      render: (text, record) => this.renderStatus(record.status),
    }, {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <div>
          {record.status === 0 && <a onClick={() => this.handleRunTask(record.id)}>开始执行</a>}
          {record.status === 3 && <a style={{ color: '#2e86de', fontWeight: 'bold' }} target="_blank" rel="noopener noreferrer" href={`/task/ui/immediate/report?${record.id}`}>查看报告</a>}
          {([0, 3].indexOf(record.status) > -1) && <Divider type="vertical" />}
          {!([1, 2].indexOf(record.status) > -1) && (
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.handleDelTask(record.id)}>
              <a style={{ color: '#eb2f06' }}>删除</a>
            </Popconfirm>
          )}
        </div>
      ),
    }];
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
          <Table rowKey="id" dataSource={taskList} columns={columns} loading={loading} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default Immediate;
