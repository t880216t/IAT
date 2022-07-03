import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Button, Descriptions, Dropdown, Menu, Modal, Select, Badge } from 'antd';
import { connect } from 'dva';

import styles from './index.less';
import { DownOutlined, PlusOutlined } from '_@ant-design_icons@4.7.0@@ant-design/icons';
import { history } from 'umi';

const { Option } = Select;

@connect(({ iatTask, loading }) => ({
  iatTask,
  loading: loading.effects['iatTask/queryTaskList'],
}))
export default class Page extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      taskType: 3,
    };
    this.timer = null;
  }


  componentDidMount() {
    this.queryTaskList();
    this.timer = setInterval(() => this.queryTaskList(), 10000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  queryTaskList = () => {
    const { taskType } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'iatTask/queryTaskList',
      payload: { taskType },
    }).then(() => {
      const { taskList } = this.props.iatTask;
      if (taskList !== this.state.taskList) {
        this.setState({
          taskList: taskList.data,
        });
      }
    });
  };

  handleTaskAction = (key, item) => {
    switch (key) {
      case 'edit':
        this.handleEditTask(item.id);
        break;
      case 'stop':
        this.queryStopTimingTask({ taskId: item.id });
        break;
      case 'restart':
        this.queryExecTask({ taskId: item.id, taskType: item.taskType });
        break;
      case 'delete':
        Modal.confirm({
          title: '删除任务',
          content: '只有创建人和管理员有权限做此操作，您确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.queryDelTask({ taskId: item.id }),
        });
        break;
    }
  };

  queryStopTimingTask = (params) => {
    this.props
      .dispatch({
        type: 'iatTask/queryStopTimingTask',
        payload: { ...params },
      })
      .then(() => {
        this.queryTaskList();
      });
  };

  queryExecTask = (params) => {
    this.props
      .dispatch({
        type: 'iatTask/queryExecTask',
        payload: { ...params },
      })
      .then(() => {
        this.queryTaskList();
      });
  };

  queryDelTask = (params) => {
    this.props
      .dispatch({
        type: 'iatTask/queryDelTask',
        payload: { ...params },
      })
      .then(() => {
        this.queryTaskList();
      });
  };

  render_action_buttons = (item) => {
    const MoreBtn = ({ item }) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => this.handleTaskAction(key, item)}>
            {[0].indexOf(item.status) <= -1 && <Menu.Item key="stop">停止任务</Menu.Item>}
            <Menu.Item key="edit">编辑任务</Menu.Item>
            {item.status == 0 && (
              <Menu.Item key="delete" style={{ color: 'red' }}>
                删除任务
              </Menu.Item>
            )}
          </Menu>
        }
      >
        <a>
          更多操作 <DownOutlined />
        </a>
      </Dropdown>
    );
    const actons = [];
    if (item.status === 0) {
      if (item.lastLog && item.lastLog.total) {
        actons.push(
          <a
            key="start"
            onClick={(e) => {
              e.preventDefault();
              this.queryExecTask({ taskId: item.id, taskType: item.taskType });
            }}
          >
            再次执行
          </a>,
        );
      } else {
        actons.push(
          <a
            key="start"
            onClick={(e) => {
              e.preventDefault();
              this.queryExecTask({ taskId: item.id, taskType: item.taskType });
            }}
          >
            开始任务
          </a>,
        );
      }
    }
    if (item.status > 0 && item.lastLog.total) {
      actons.push(
        <a key="report" href={`/iat/task/report?taskId=${item.id}`} target="_blank" rel="noreferrer">
          查看报告
        </a>,
      );
    }
    actons.push(<MoreBtn key="more" item={item} />);
    return actons;
  };

  handleAddTask = () => {
    const path = '/iat/task/detail';
    window.open(`${window.routerBase}${path.replace(/^\//g, '')}`);
  };

  handleEditTask = (taskId) => {
    const path = `/iat/task/detail?taskId=${taskId}`;
    window.open(`${window.routerBase}${path.replace(/^\//g, '')}`);
  };

  render() {
    const { taskList } = this.state;
    const { loading } = this.props;

    const TaskCard = (task) => (
      <ProCard
        style={{ height: '100%' }}
        title={<span>{task.name}</span>}
        actions={this.render_action_buttons(task)}
      >
        <Descriptions size={'small'} column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
          {['0', '4'].indexOf(task.status.toString()) <= -1 && (
            <Descriptions.Item label='下次执行'>{task.nextTime}</Descriptions.Item>
          )}
          <Descriptions.Item label='创建信息'>
            {task.addUser} ｜ {task.addTime}
          </Descriptions.Item>
          <Descriptions.Item label='更新信息'>
            {task.updateUser} ｜ {task.updateTime}
          </Descriptions.Item>
          {task.lastLog && task.lastLog.total && (
            <Descriptions.Item label='最后执行结果'>
              总计 {task.lastLog.total} ｜ 失败 {task.lastLog.fail}
            </Descriptions.Item>
          )}
        </Descriptions>
      </ProCard>
    );
    return (
      <PageContainer title={'定时任务列表'}>
        <ProCard loading={loading} ghost gutter={[16, 16]} wrap>
          {taskList &&
          taskList.map((task) => (
            <ProCard
              colSpan={6}
              ghost
              key={task.id}
              className={styles.taskContainer}
              hoverable
            >
              {
                [0, 4].indexOf(task.status) <= -1 ? (
                  <Badge.Ribbon showZero={false} text='运行中'>
                    {TaskCard(task)}
                  </Badge.Ribbon>
                ) : task.status === 4 ? (
                  <Badge.Ribbon showZero={false} text='运行出错' color='red'>
                    {TaskCard(task)}
                  </Badge.Ribbon>
                ) : (
                  TaskCard(task)
                )
              }
            </ProCard>
          ))}
          <ProCard
            colSpan={6}
            className={styles.newTaskContainer}
            hoverable
            layout="center"
            bordered={false}
          >
            <Button type="dashed" className={styles.newButton} onClick={() => this.handleAddTask()}>
              <PlusOutlined /> 新增任务
            </Button>
          </ProCard>
        </ProCard>
      </PageContainer>
    );
  }
}