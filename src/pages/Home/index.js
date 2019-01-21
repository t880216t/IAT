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
import {
  ChartCard,
  TimelineChart,
} from '@/components/Charts';
import {connect} from 'dva';

import Case from '../../assets/case.svg'
import project from '../../assets/project.svg'
import imm from '../../assets/imm.svg'
import tim from '../../assets/tim.svg'

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './index.less';

const offlineChartData = [{
  "x": 1547866715224,
  "y1": 39,
  "y2": 63
}, {
  "x": 1547868515224,
  "y1": 46,
  "y2": 37
}, {
  "x": 1547870315224,
  "y1": 59,
  "y2": 90
}, {
  "x": 1547872115224,
  "y1": 99,
  "y2": 23
}, {
  "x": 1547873915224,
  "y1": 80,
  "y2": 49
}, {
  "x": 1547875715224,
  "y1": 49,
  "y2": 18
}, {
  "x": 1547877515224,
  "y1": 10,
  "y2": 77
}, {
  "x": 1547879315224,
  "y1": 73,
  "y2": 19
}, {
  "x": 1547881115224,
  "y1": 39,
  "y2": 53
}, {
  "x": 1547882915224,
  "y1": 96,
  "y2": 83
}, {
  "x": 1547884715224,
  "y1": 21,
  "y2": 109
}, {
  "x": 1547886515224,
  "y1": 99,
  "y2": 44
}]

const searchData =  [{
  "index": 1,
  "keyword": "搜索关键词-0",
  "count": 872,
  "range": 2,
  "status": 0
}, {
  "index": 2,
  "keyword": "搜索关键词-1",
  "count": 985,
  "range": 78,
  "status": 1
}, {
  "index": 3,
  "keyword": "搜索关键词-2",
  "count": 260,
  "range": 57,
  "status": 0
}, {
  "index": 4,
  "keyword": "搜索关键词-3",
  "count": 938,
  "range": 71,
  "status": 0
}, {
  "index": 5,
  "keyword": "搜索关键词-4",
  "count": 155,
  "range": 45,
  "status": 0
}, {
  "index": 6,
  "keyword": "搜索关键词-5",
  "count": 423,
  "range": 60,
  "status": 1
}, {
  "index": 7,
  "keyword": "搜索关键词-6",
  "count": 184,
  "range": 61,
  "status": 1
}, {
  "index": 8,
  "keyword": "搜索关键词-7",
  "count": 261,
  "range": 42,
  "status": 1
}, {
  "index": 9,
  "keyword": "搜索关键词-8",
  "count": 884,
  "range": 73,
  "status": 1
}, {
  "index": 10,
  "keyword": "搜索关键词-9",
  "count": 600,
  "range": 26,
  "status": 0
}, {
  "index": 11,
  "keyword": "搜索关键词-10",
  "count": 226,
  "range": 78,
  "status": 0
}, {
  "index": 12,
  "keyword": "搜索关键词-11",
  "count": 637,
  "range": 85,
  "status": 1
}, {
  "index": 13,
  "keyword": "搜索关键词-12",
  "count": 754,
  "range": 31,
  "status": 1
}, {
  "index": 14,
  "keyword": "搜索关键词-13",
  "count": 110,
  "range": 51,
  "status": 0
}, {
  "index": 15,
  "keyword": "搜索关键词-14",
  "count": 288,
  "range": 58,
  "status": 0
}, {
  "index": 16,
  "keyword": "搜索关键词-15",
  "count": 794,
  "range": 5,
  "status": 0
}, {
  "index": 17,
  "keyword": "搜索关键词-16",
  "count": 409,
  "range": 48,
  "status": 1
}, {
  "index": 18,
  "keyword": "搜索关键词-17",
  "count": 359,
  "range": 7,
  "status": 1
}, {
  "index": 19,
  "keyword": "搜索关键词-18",
  "count": 663,
  "range": 32,
  "status": 1
}]

@connect(({ home,loading}) => ({
  home,
  loading:loading.effects["home/queryHomeData"]
}))
export default class Devtest extends PureComponent {
  state={
    caseCount:0,
    immTaskCount:0,
    projectCount:0,
    timTaskCount:0,
    mounthTask:[{x:0,y1:0,y2:0}],
    nearTask:[],
  };

  componentWillMount(){
    this.queryHomeData()
  }

  queryHomeData=()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'home/queryHomeData'
    })
      .then(()=>{
        const {home}=this.props;
        if (home.homeData){
          const formatResult = []
          home.homeData.mounthTask&&home.homeData.mounthTask.forEach((item)=>{
            formatResult.push({
              x:item.dayTime*1000,
              y1:item.total,
              y2:item.sucess,
            })
          })
          this.setState({
            caseCount:home.homeData.caseCount,
            immTaskCount:home.homeData.immTaskCount,
            projectCount:home.homeData.projectCount,
            timTaskCount:home.homeData.timTaskCount,
            nearTask:home.homeData.nearTask,
            mounthTask:formatResult,
          })
        }
      })
  };

  render() {
    const {caseCount,immTaskCount,projectCount,timTaskCount,mounthTask,nearTask} = this.state;
    const {loading} = this.props;
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
        render: (text,record) => (
          <div>
            {(record.taskType===1)&&(<a href={`#/task/immediate/detail?${record.id}`}>{text}</a>)}
            {(record.taskType===2)&&(<a href={`#/task/timing/detail?${record.id}`}>{text}</a>)}
          </div>
        ),
      },
      {
        title: "创建时间",
        dataIndex: 'addTime',
        key: 'addTime',
        align: 'center',
      },
      {
        title: '报告',
        dataIndex: 'status',
        key: 'status',
        align: 'right',
        render: (text,record) => (
          <div>
            {(record.status === 3&&record.taskType===1)&&(<a href={`#/task/immediate/report?${record.id}`}>报告</a>)}
            {(record.status === 3&&record.taskType===2)&&(<a href={`#/task/timing/report?${record.id}`}>报告</a>)}
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
                  <span style={{marginLeft:10}}>{caseCount}</span>
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
                  <span style={{marginLeft:10}}>{projectCount}</span>
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
                  <span style={{marginLeft:10}}>{timTaskCount}</span>
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
                  <span style={{marginLeft:10}}>{immTaskCount}</span>
                </div>
              }
            >

            </ChartCard>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="总体执行概览"
            >
              <div style={{ padding: '0 24px' }}>
                <TimelineChart
                  height={400}
                  data={mounthTask}
                  titleMap={{
                    y1: "执行用例数",
                    y2: "测试通过数",
                  }}
                />
              </div>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="最近任务"
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
