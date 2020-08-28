/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import { connect } from 'dva';
import {
  ChartCard,
  TimelineChart,
} from '@/components/Charts';

import Case from '../../assets/case.svg'
import project from '../../assets/project.svg'
import imm from '../../assets/imm.svg'
import tim from '../../assets/tim.svg'

import GridContent from '@/components/GridContent';
import styles from './index.less';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects['home/queryHomeData']
}))
export default class Home extends PureComponent {
  state={
    caseCount: 0,
    immTaskCount: 0,
    projectCount: 0,
    timTaskCount: 0,
    mounthTask: [{ x: 0, y1: 0, y2: 0 }],
    nearTask: [],
  };

  componentWillMount() {
    this.queryHomeData()
  }

  queryHomeData=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/queryHomeData'
    })
      .then(() => {
        const { home } = this.props;
        if (home.homeData) {
          const formatResult = []
          home.homeData.mounthTask && home.homeData.mounthTask.forEach(item => {
            formatResult.push({
              x: item.dayTime * 1000,
              y1: item.total,
              y2: item.sucess,
            })
          })
          this.setState({
            caseCount: home.homeData.caseCount,
            immTaskCount: home.homeData.immTaskCount,
            projectCount: home.homeData.projectCount,
            timTaskCount: home.homeData.timTaskCount,
            nearTask: home.homeData.nearTask,
            mounthTask: formatResult,
          })
        }
      })
  };

  render() {
    const { caseCount, immTaskCount, projectCount, timTaskCount, mounthTask, nearTask } = this.state;
    const { loading } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'left',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        align: 'left',
        render: (text, record) => (
          <div>
            {(record.taskType === 1) && (<a href={`#/task/immediate/detail?${record.id}`}>{text}</a>)}
            {(record.taskType === 2) && (<a href={`#/task/timing/detail?${record.id}`}>{text}</a>)}
          </div>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'addTime',
        key: 'addTime',
        align: 'center',
      },
      {
        title: '报告',
        dataIndex: 'status',
        key: 'status',
        align: 'right',
        render: (text, record) => (
          <div>
            {(record.status === 3 && record.taskType === 1) && (<a href={`#/task/immediate/report?${record.id}`}>报告</a>)}
            {(record.status === 3 && record.taskType === 2) && (<a href={`#/task/timing/report?${record.id}`}>报告</a>)}
          </div>
        ),
      },
    ];

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="用例总数"
              action={
                <Tooltip
                  title="系统中的用例总数"
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              total={
                <div>
                  <img src={Case} alt="empty" className={styles.header_image} />
                  <span style={{ marginLeft: 10 }}>{caseCount}</span>
                </div>
              }
            >

            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="项目总数"
              action={
                <Tooltip
                  title="系统中的项目总数"
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              total={
                <div>
                  <img src={project} alt="empty" className={styles.header_image} />
                  <span style={{ marginLeft: 10 }}>{projectCount}</span>
                </div>
              }
            >

            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="定时任务总数"
              action={
                <Tooltip
                  title="系统中的定时任务总数"
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              total={
                <div>
                  <img src={tim} alt="empty" className={styles.header_image} />
                  <span style={{ marginLeft: 10 }}>{timTaskCount}</span>
                </div>
              }
            >

            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="即时任务总数"
              action={
                <Tooltip
                  title="系统中的即时任务总数"
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              loading={loading}
              total={
                <div>
                  <img src={imm} alt="empty" className={styles.header_image} />
                  <span style={{ marginLeft: 10 }}>{immTaskCount}</span>
                </div>
              }
            >

            </ChartCard>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="本月执行概览"
            >
              <div style={{ padding: '0 24px' }}>
                {(mounthTask && mounthTask.length > 1) && (
                  <TimelineChart
                    height={400}
                    data={mounthTask}
                    titleMap={{
                      y1: '执行用例数',
                      y2: '测试通过数',
                    }}
                  />
                )}
              </div>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="最近20条任务"
            >
              <Table
                loading={loading}
                className={styles.taskList}
                rowKey={record => record.id}
                size="small"
                columns={columns}
                dataSource={nearTask}
                scroll={{ y: 390 }}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}
