import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Icon,
  Table,
  Card,
  Tooltip,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  TimelineChart,
  MiniArea,
  MiniBar,
  Gauge,
  Field,
  CurvedTwo,
} from '@/components/Charts';
import { connect } from 'dva';

import Case from '../../assets/case.svg';
import project from '../../assets/project.svg';
import imm from '../../assets/imm.svg';
import tim from '../../assets/tim.svg';

import styles from './index.less';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects['home/queryHomeData'],
}))
export default class Home extends PureComponent {
  state={
    homeData: {},
    executeData: [],
    caseMountAddData: [],
    failCaseData: [],
    todayExecuteTaskCount: 0,
    "visitData2": [{
      "x": "2019-07-23",
      "y": 1
    }, {
      "x": "2019-07-24",
      "y": 6
    }, {
      "x": "2019-07-25",
      "y": 4
    }, {
      "x": "2019-07-26",
      "y": 8
    }, {
      "x": "2019-07-27",
      "y": 3
    }, {
      "x": "2019-07-28",
      "y": 7
    }, {
      "x": "2019-07-29",
      "y": 2
    }],
    dailyResult: [{
      "avrageElapsed": 219,
      "day": "20190101",
      "failCount": 22,
      "runTime": 1546332476000,
      "taskCount": 23
    }, {
      "avrageElapsed": 233,
      "day": "20190102",
      "failCount": 11,
      "runTime": 1546418876000,
      "taskCount": 30
    }, {
      "avrageElapsed": 259,
      "day": "20190103",
      "failCount": 21,
      "runTime": 1546505276000,
      "taskCount": 33
    }, {
      "avrageElapsed": 239,
      "day": "20190104",
      "failCount": 3,
      "runTime": 1546591676000,
      "taskCount": 35
    }, {
      "avrageElapsed": 269,
      "day": "20190105",
      "failCount": 2,
      "runTime": 1546678076000,
      "taskCount": 34
    }, {
      "avrageElapsed": 239,
      "day": "20190106",
      "failCount": 21,
      "runTime": 1546764476000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190107",
      "failCount": 2,
      "runTime": 1546850876000,
      "taskCount": 37
    }, {
      "avrageElapsed": 239,
      "day": "20190108",
      "failCount": 25,
      "runTime": 1546937276000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190109",
      "failCount": 26,
      "runTime": 1547023676000,
      "taskCount": 37
    }, {
      "avrageElapsed": 239,
      "day": "20190110",
      "failCount": 27,
      "runTime": 1547110076000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190111",
      "failCount": 28,
      "runTime": 1547196476000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190112",
      "failCount": 23,
      "runTime": 1547282876000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190113",
      "failCount": 22,
      "runTime": 1547369276000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190114",
      "failCount": 2,
      "runTime": 1547455676000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190115",
      "failCount": 2,
      "runTime": 1547542076000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190116",
      "failCount": 2,
      "runTime": 1547628476000,
      "taskCount": 36
    }, {
      "avrageElapsed": 239,
      "day": "20190117",
      "failCount": 2,
      "runTime": 1547714876000,
      "taskCount": 36
    }],
  };

  componentWillMount() {
    this.queryHomeData();
    this.queryHomeFailCase();
  }

  queryHomeData=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/queryHomeData',
    })
      .then(() => {
        const { homeData } = this.props.home;
        const executeData = []
        if (homeData) {
          homeData.nearOneMonthData && homeData.nearOneMonthData.forEach(item => {
            executeData.push({
              x: item.day,
              y: item.runTaskCount,
            });
          })
          this.setState({
            homeData,
            executeData,
            todayExecuteTaskCount: executeData.length > 0 ? executeData[0].y : 0,
            dailyResult: homeData.nearOneMonthData,
            caseMountAddData: homeData.caseMountAddData,
          });
        }
      });
  };

  queryHomeFailCase=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/queryHomeFailCase',
    })
      .then(() => {
        const { failCaseData } = this.props.home;
        this.setState({ failCaseData });
      });
  };

  render() {
    const {
      homeData,
      caseMountAddData,
      executeData,
      todayExecuteTaskCount,
      dailyResult,
      failCaseData,
    } = this.state;
    const { loading } = this.props;

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
        width: '60%',
        render: (text, record) => (
          <a className={styles.failCase} target="_blank" rel="noopener noreferrer" href={`/case?id=${record.id}&projectId=${record.project}`}>{text}</a>
        ),
      },
      {
        title: 'add_time',
        dataIndex: 'add_time',
        key: 'add_time',
        width: '40%',
      },
    ];

    return (
      <div>
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
                  <span style={{ marginLeft: 10 }}>{homeData.caseCount}</span>
                </div>
              }
              contentHeight={40}
            >
              <div />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="项目总数"
              contentHeight={40}
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
                  <span style={{ marginLeft: 10 }}>{homeData.projectCount}</span>
                </div>
              }
            >
              <div />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="定时任务总数"
              contentHeight={40}
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
                  <span style={{ marginLeft: 10 }}>{homeData.timTaskCount}</span>
                </div>
              }
            >
              <div />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="即时任务总数"
              contentHeight={40}
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
                  <span style={{ marginLeft: 10 }}>{homeData.immTaskCount}</span>
                </div>
              }
            >
              <div />
            </ChartCard>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Row gutter={24}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <ChartCard
                  bordered={false}
                  title="每日执行结果"
                  contentHeight={300}
                >
                  <CurvedTwo data={dailyResult} height={300} />
                </ChartCard>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <ChartCard
                  bordered={false}
                  title="最近30天用例执行通过率"
                  contentHeight={300}
                >
                  <Gauge title="通过率" height={240} percent={homeData.monthExecutePre} />
                </ChartCard>
              </Col>
            </Row>

            <Row gutter={24} className={styles.rowContainer}>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <ChartCard
                  bordered={false}
                  title="任务执行数量"
                  footer={<Field label="今日执行任务数量" value={numeral(todayExecuteTaskCount).format('0,0')} />}
                  contentHeight={200}
                >
                  <MiniArea color="#975FE4" data={executeData.reverse()} />
                </ChartCard>
              </Col>
              <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                <ChartCard
                  bordered={false}
                  title="用例新增数量"
                  footer={<Field label="本月用例新增数量" value={numeral(homeData.thisMonth).format('0,0')} />}
                  contentHeight={200}
                >
                  <MiniBar data={caseMountAddData} />
                </ChartCard>
              </Col>
            </Row>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              title="失败的用例"
              className={styles.failContainer}
            >
              <Table
                size="small"
                rowKey="id"
                scroll={{ y: 580 }}
                dataSource={failCaseData}
                columns={columns}
                showHeader={false}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
