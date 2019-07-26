import React, { PureComponent } from 'react';
import {
  List, Popconfirm, Select, Icon, Card, Divider, TimePicker, Button, Switch, Spin,
} from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './index.less';

const { Option } = Select;

@connect(({ system, task, loading }) => ({
  system,
  task,
  loading: loading.effects['task/queryTaskList'],
}))
class Timing extends PureComponent {
  state={
    taskList: [],
  };

  componentWillMount() {
    this.queryTaskList();
  }

  queryTaskList=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/queryTaskList',
      payload: {
        taskType: 3,
      },
    })
      .then(() => {
        const { taskList } = this.props.task;
        this.setState({ taskList });
      });
  };

  handleAddTask=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/goTimAddPage',
    });
  };

  handleStateChange=(checked, id) => {
    if (checked) {
      this.handleRunTask(id);
    } else {
      this.queryUpdateTaskStatus(id, 4);
    }
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

  queryUpdateTaskStatus=(id, status) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/queryUpdateTaskStatus',
      payload: {
        id,
        status,
      },
    })
      .then(() => {
        this.queryTaskList();
      });
  }

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

  handleGoReport= id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/goTimReportPage',
      payload: { id },
    });
  };

  render() {
    const { loading } = this.props;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          功能简介：每日任务定时执行，若要修改请先关闭任务。
        </p>
      </div>
    );
    const description = item => (
      <div className={styles.descriptionContainer}>
        <div className={styles.item_container}>
          <span>执行时间：</span>
          <span className={styles.taskRunTime}>{item.runTime}</span>
        </div>
        <div className={styles.item_container}>
          <span>创建信息：</span>
          <div> {item.add_user} | {item.add_time}</div>
        </div>
      </div>
    );
    const cardTitle = item => (
        <div className={styles.switchContainer}>
          <a target="_blank" rel="noopener noreferrer" href={`/task/ui/timing/detail?${item.id}`} style={{ color: '#40a9ff', fontWeight: 'bold' }}>
            {item.name}
          </a>
          <div className={styles.switchButton}>
            <Switch
              checkedChildren="开"
              unCheckedChildren="关"
              checked={!(item.status === 0 || item.status === 4)}
              onChange={checked => this.handleStateChange(checked, item.id)}
            />
          </div>
        </div>
      );
    const reportLink = item => {
      if (item.status === 3) {
        return (
          <Button type="link" icon="file-done" onClick={() => this.handleGoReport(item.id)}>查看报告</Button>
        );
      }
        return (
          <span><Icon type="file-done" />  暂无报告</span>
        );
    };
    return (
      <PageHeaderWrapper title="每日任务列表" content={content}>
        <div className={styles.cardList}>
          <List
            loading={loading}
            rowKey="id"
            grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
            dataSource={[...this.state.taskList, '']}
            renderItem={item =>
              (item ? (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <Popconfirm
                        title="确认删除该任务？"
                        onConfirm={() => this.handleDelTask(item.id)}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Icon className={styles.deleteIcon} type="delete" />
                      </Popconfirm>,
                      reportLink(item),
                    ]}
                  >
                    <Card.Meta title={cardTitle(item)} description={description(item)} />
                  </Card>
                </List.Item>
              ) : (
                <List.Item>
                  <Button
                    type="dashed"
                    className={styles.newButton}
                    onClick={() => this.handleAddTask()}
                  >
                    <Icon type="plus" /> 新增任务
                  </Button>
                </List.Item>
              ))
            }
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
export default Timing;
