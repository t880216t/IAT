/* eslint-disable no-param-reassign,react/destructuring-assignment,consistent-return,array-callback-return */
import React, { PureComponent } from 'react';
import {
  Collapse, Icon, Row, Col, Input, Card,
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Scatter,
  Pie,
} from '@/components/Charts';
import styles from './index.less'

const { Panel } = Collapse;

@connect(({ iatSystem, iatTask, loading }) => ({
  iatSystem,
  iatTask,
  loading: loading.effects['iatTask/queryTaskResult']
}))

class immReport extends PureComponent {
  state={
    taskResult: {},
    charData: [{ title: '', x: 0, y: 0 }],
    result: [{
      x: '测试通过',
      y: 0
    }, {
      x: '测试失败',
      y: 0
    }],
  }

  componentWillMount() {
    const params = this.props.location.search;
    if (params.indexOf('?') !== -1) {
      const detailId = params.substr(1);
        this.queryTaskInfo(detailId)
    }
  }

  queryTaskInfo=id => {
    this.props.dispatch({
      type: 'iatTask/queryTaskResult',
      payload: { id }
    })
      .then(() => {
        const { iatTask } = this.props;
        const charData = []
        iatTask.taskResult.result && iatTask.taskResult.result.forEach(item => {
          charData.push({
            title: item.label,
            label: moment(item.timeStamp).format('H:mm:ss'),
            x: parseInt(item.timeStamp, 10),
            y: parseInt(item.elapsed, 10),
          })
        })
        this.setState({
          charData,
          taskResult: iatTask.taskResult,
          result: [{
            x: '测试通过',
            y: iatTask.taskResult.sucess
          }, {
            x: '测试失败',
            y: iatTask.taskResult.fail
          }],
        })
      })
  }

  render() {
    const { taskResult, result, charData } = this.state
    const { loading } = this.props;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          开始时间：{moment(parseInt(taskResult.startTime)).format('YYYY-MM-DD HH:mm:ss')}
        </p>
        <p>
          结束时间：{moment(parseInt(taskResult.endTime)).format('YYYY-MM-DD HH:mm:ss')}
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
          colors={['#2ecc71', '#e74c3c']}
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
              loading={loading}
              title="任务结果"
              bordered={false}
            >
              <Collapse className={styles.resultCollapse}>
                {taskResult.result && taskResult.result.map((item, index) => (
                    <Panel
                      header={<a target="_blank" rel="noopener noreferrer" href={`/case/api?${item.id}`}>{item.label}</a>}
                      key={index}
                      className={item.success === 'True' ? styles.caseSucess : styles.caseFail}
                    >
                      <p>{item.failureMessage}</p>
                    </Panel>
                  ))}
              </Collapse>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="请求耗时分析"
              bordered={false}
            >
              <div style={{ padding: '0 24px' }}>
                <Scatter
                  height={400}
                  data={charData}
                  titleMap={{
                    y1: 'test1',
                  }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
export default immReport
