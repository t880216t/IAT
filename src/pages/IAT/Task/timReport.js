/* eslint-disable no-param-reassign,react/destructuring-assignment,consistent-return,array-callback-return */
import React, { PureComponent } from 'react';
import {
  Form, Tree ,Collapse,Icon,Row,Col,Input,Card,Divider,TimePicker ,Button,Radio,Spin
} from 'antd';
import {
  Scatter,
  Pie,
  Curved,
  CurvedTwo,
} from '@/components/Charts';
import moment from 'moment';
import {connect} from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import styles from './index.less'

const Panel = Collapse.Panel;

@connect(({ system,task,loading }) => ({
  system,
  task,
  loading:loading.effects["task/queryTaskResult"]
}))
class timReport extends PureComponent {
  state={
    taskResult:{},
    charData:[{title:'',x:0,y:0}],
    result:[{
      "x": "测试通过",
      "y": 0
    }, {
      "x": "测试失败",
      "y": 0
    }],
    dailyResult:[{
      "failCount": 0,
      "runTime": 0,
      "day": "00000",
      "taskCount": 0,
      "avrageElapsed": 0
    }],
  }

  componentWillMount(){
    const params = this.props.location.search;
    if (params.indexOf('?') !== -1) {
      const detailId = params.substr(1);
        this.queryTaskInfo(detailId)
    }
  }

  queryTaskInfo=(id)=>{
    this.props.dispatch({
      type:'task/queryTaskResult',
      payload:{id}
    })
      .then(()=>{
        const {task} = this.props;
        const charData = []
        task.taskResult.result&&task.taskResult.result.forEach((item)=>{
          charData.push({
            title:item.label,
            label:moment(item.timeStamp).format('H:mm:ss'),
            x:parseInt(item.timeStamp, 10),
            y:parseInt(item.elapsed, 10),
          })
        })
        this.setState({
          charData,
          taskResult:task.taskResult,
          result:[{
            "x": "测试通过",
            "y": task.taskResult.sucess
          }, {
            "x": "测试失败",
            "y": task.taskResult.fail
          }],
          dailyResult:task.taskResult.daily_result,
        })
      })
  }

  render() {
    const {taskResult,result,dailyResult} = this.state
    const {loading} = this.props;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          开始时间：{moment(taskResult.startTime).format('YYYY-MM-DD HH:mm:ss')}
        </p>
        <p>
          结束时间：{moment(taskResult.endTime).format('YYYY-MM-DD HH:mm:ss')}
        </p>
        <p>
          用例统计：<span className={styles.total}>{taskResult.total}</span> 总数<span className={styles.sucess}>{taskResult.sucess}</span> 成功<span className={styles.fail}>{taskResult.fail}</span> 失败
        </p>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <Pie
          data={result}
          colors={["#2ecc71","#e74c3c"]}
          height={160}
          lineWidth={4}
        />
      </div>
    );
    return (
      <PageHeaderWrapper title={taskResult.testname} content={content} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="本次任务结果"
              bordered={false}
              loading={loading}
            >
              <Collapse className={styles.resultCollapse}>
                {taskResult.result&&taskResult.result.map((item,index)=>{
                  return(
                    <Panel
                      header={<a target="_blank" rel="noopener noreferrer" href={`#/interface/index?${item.id}`}>{item.label}</a>}
                      key={index}
                      className={item.success==="True"?styles.caseSucess:styles.caseFail}
                    >
                      <p>{item.failureMessage}</p>
                    </Panel>
                  )
                })}
              </Collapse>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="每日耗时数据对比"
              bordered={false}
              loading={loading}
            >
              <div style={{ padding: '0 24px' }}>
                <Curved data={dailyResult} />
              </div>
            </Card>
            <Card
              style={{marginTop:10}}
              title="每日用例执行情况"
              bordered={false}
              loading={loading}
            >
              <div style={{ padding: '0 24px' }}>
                <CurvedTwo data={dailyResult} />
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
export default timReport
