import React, { PureComponent } from 'react';
import {
  Collapse, Row, Col, Card, Icon, Steps,
} from 'antd';
import {
  Scatter,
  Pie,
} from '@/components/Charts';
import { connect } from 'dva';
import Zmage from 'react-zmage';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import styles from './index.less';

const { Panel } = Collapse;
const { Step } = Steps;

@connect(({ system, task, loading }) => ({
  system,
  task,
  loading: loading.effects['task/queryTaskResult'],
}))

class ImmReport extends PureComponent {
  state={
    taskResult: {},
    result: [{
      x: '测试通过',
      y: 45,
    }, {
      x: '测试失败',
      y: 1,
    }],
  }

  componentWillMount() {
    const params = this.props.location.search;
    if (params.indexOf('?') !== -1) {
      const detailId = params.substr(1);
        this.queryTaskReport(detailId);
    }
  }

  queryTaskReport = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/queryTaskReport',
      payload: {
        id,
      },
    })
      .then(() => {
        const { taskResult } = this.props.task;
        this.setState({
          taskResult,
          result: [{
            x: '测试通过',
            y: taskResult.sucess,
          }, {
            x: '测试失败',
            y: taskResult.fail,
          }],
        });
      });
  }

  render() {
    const { taskResult, result } = this.state;
    const { loading } = this.props;
    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          开始时间：{taskResult.startTime}
        </p>
        <p>
          结束时间：{taskResult.endTime}
        </p>
        <p>
          用例统计：
          <span className={styles.total}>{taskResult.total}</span> 总数
          <span className={styles.sucess}>{taskResult.sucess}</span> 成功
          <span className={styles.fail}>{taskResult.fail}</span> 失败
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

    const stepImage = item => (
      <div>
        <span>{item.msg}</span>
        <div>
          <Zmage key={item.capture} src={`/img/${item.capture}`} alt="" className={styles.pre_image} />
        </div>
      </div>
    )
    return (
      <PageHeaderWrapper title={taskResult.name} content={content} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              title="任务结果"
              bordered={false}
            >
              <Collapse
                bordered={false}
                className={styles.resultCollapse}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
              >
                {taskResult.testSuites && taskResult.testSuites.map( item => (
                    <Panel
                      header={<a target="_blank" rel="noopener noreferrer" href={`/case/ui?id=${item.id}&projectId=${taskResult.project}`}>{item.name}</a>}
                      key={item.id}
                      className={[item.status === 'PASS' ? styles.caseSucess : styles.caseFail, styles.customPanelStyle]}
                    >
                      <Collapse
                        bordered={false}
                        className={styles.resultCollapse}
                        expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
                      >
                        {item.testCase && item.testCase.map(caseItem => (
                          <Panel
                            header={<a target="_blank" rel="noopener noreferrer" href={`/case/ui?id=${caseItem.id}&projectId=${taskResult.project}`}>{caseItem.name}</a>}
                            key={caseItem.id}
                            className={[caseItem.status === 'PASS' ? styles.caseSucess : styles.caseFail, styles.customPanelStyle]}
                          >
                            <Steps direction="vertical" size="small" className={styles.stepBox}>
                              {caseItem.caseSteps && caseItem.caseSteps.map((stepItem, index) => {
                                if (stepItem.status === 'PASS') {
                                  return (
                                    <Step
                                      key={`${stepItem.name}_${index}`}
                                      status="finish"
                                      icon={<Icon type="check-circle" theme="filled" style={{ color: '#2ecc71' }} />}
                                      title={stepItem.name}
                                      description={stepItem.msg}
                                    />);
                                }
                                if (stepItem.capture) {
                                  return (<Step key={`${stepItem.name}_${index}`} status="error" icon={<Icon type="close-circle" theme="filled" />} title={stepItem.name} description={stepImage(stepItem)} />);
                                }
                                return (<Step key={`${stepItem.name}_${index}`} status="error" icon={<Icon type="close-circle" theme="filled" />} title={stepItem.name} description={stepItem.msg} />);
                              })}
                            </Steps>
                          </Panel>
                        ))}
                      </Collapse>
                    </Panel>
                  ))}
              </Collapse>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}
export default ImmReport;
