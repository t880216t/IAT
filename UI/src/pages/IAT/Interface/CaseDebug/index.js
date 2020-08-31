import React, { PureComponent } from 'react';
import { Spin, Icon, Button, Form, Input, Radio, message } from 'antd';
import io from 'socket.io-client';
import { connect } from 'dva';

import JSONPretty from 'react-json-pretty';
import styles from './index.less';

@connect(({ interfaceCase, loading }) => ({
  interfaceCase,
}))
@Form.create()
export default class CaseDebugPage extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      spinning: false,
      taskLog: [],
    };
    this.socket = null;
  }

  componentWillMount() {
    const hostname = window.location.host;
    this.setState({ hostname });
    this.socket = io(`ws://${hostname}/wstask`);
    this.socket.on('connect', () => {
      console.log('<= 连接调试服务器成功！');
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleApiDebug = () => {
    this.setState({ spinning: true }, () => {
      this.queryDebugCase();
    });
  }

  queryDebugCase = () => {
    const { dispatch, selectNoteId, form } = this.props;
    dispatch({
      type: 'interfaceCase/queryDebugCase',
      payload: {
        caseId: selectNoteId, ...form.getFieldsValue(),
      }
    })
      .then(() => {
        const { taskInfo } = this.props.interfaceCase;
        if (taskInfo.id) {
          this.getTaskInfo(taskInfo.id);
        }
      });
  }

  getTaskInfo = taskId => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    let count = 1;
    this.timer = setInterval(() => {
      count += 1;
      this.socket.emit('iatTaskInfo', { taskId }, taskInfo => {
        if ([3, 4, 5].indexOf(taskInfo.status) > -1) {
          clearTimeout(this.timer);
          const taskLog = JSON.parse(taskInfo.taskLog);
          this.setState({ spinning: false, taskLog });
        }
        if (count > 600) {
          clearTimeout(this.timer);
          this.setState({ spinning: false });
          message.error('任务执行超时');
        }
      });
    }, 1000);
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { spinning, taskLog } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
      },
    };
    return (
      <Spin
        wrapperClassName={styles.debugContainer}
        spinning={spinning}
        tip="正在调试..."
        size="large"
      >
        <Form.Item {...formItemLayout} label="调试域名" className={styles.keyValueContainer} >
          {getFieldDecorator('domain', {
            initialValue: '',
          })(
            <Input
              size="small"
              style={{ width: '100%' }}
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="代理设置" className={styles.keyValueContainer} >
          {getFieldDecorator('proxy', {
            initialValue: '',
          })(
            <Input
              size="small"
              style={{ width: '100%' }}
            />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="参数类型" className={styles.keyValueContainer} >
          {getFieldDecorator('valueType', {
            initialValue: 1,
          })(
            <Radio.Group>
              <Radio value={1}>
                正式版
              </Radio>
              <Radio value={2}>
                测试版
              </Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <div className={styles.debugHeaderAction}>
          <Button icon="caret-right" type="primary" size="small" onClick={() => this.handleApiDebug()}>调试接口</Button>
        </div>
        <div className={styles.item_container}>
          <div className={styles.debug_response_container}>
            {(taskLog.length > 0 && taskLog[0].response) && (
              <JSONPretty id="json-pretty" data={taskLog[0].response} />
            )}
          </div>
        </div>
        <div className={styles.item_container}>
          <div className={styles.debug_assert_container}>
            {(taskLog.length > 0 && taskLog[0].success === 'True') && (
              <div className={styles.success}>
                <Icon type="check-circle" theme="filled" style={{ fontSize: 22 }} />
                <div>测试通过</div>
              </div>
            )}
            {(taskLog.length > 0 && taskLog[0].success === 'False') && (
              <div className={styles.fail}>
                <Icon type="close-circle" theme="filled" style={{ fontSize: 22 }} />
                <div>测试失败</div>
              </div>
            )}
            {(taskLog.length === 0) && (
              <div className={styles.info}>
                <Icon type="info-circle" theme="filled" style={{ fontSize: 22 }}/>
                <div>调试结果</div>
              </div>
            )}
          </div>
        </div>
      </Spin>
    );
  }
}
