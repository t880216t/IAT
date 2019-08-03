import React, { Component } from 'react';
import { Button, message, Input, Tooltip, Modal, Steps, Spin, Icon, Form, Select } from 'antd';
import io from 'socket.io-client';
import { connect } from 'dva';
import styles from './index.less';
import StepList from './CaseStepNew/index';

const { Search, TextArea } = Input;
const { Step } = Steps;

const targetExtensionId = 'podifkoefcjppjkokchkannclebaeoek'; // 插件的ID

@connect(({ caseInfo, loading }) => ({
  caseInfo,
}))
@Form.create()
export default class CaseContent extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      showDebugModal: false,
      runing: false,
      taskLog: null,
      hostname: '',
      caseData: {},
    };
    this.socket = null;
  }

  componentWillMount() {
    const urlParams = new URL(window.location.href);
    this.setState({ hostname: urlParams.hostname });
    this.socket = io(`ws://${urlParams.hostname}:5001/wstask`);
    this.socket.on('connect', () => {
      console.log('<= 连接调试服务器成功！');
    });
    this.queryCaseData(this.props.selectNoteId);
  }

  componentDidMount() {
    this.socket.on('setTaskStatus', status => {
      console.log('<= 收到任务状态', status);
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.selectNoteId !== nextProps.selectNoteId) {
      const { form } = this.props;
      form.resetFields();
      this.queryCaseData(nextProps.selectNoteId);
      return true;
    }
    if (this.props.form !== nextProps.form) {
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket.on('disconnect', () => {
      console.log('关闭连接');
    });
  }

  handleTestWebSite=url => {
    if (!url) {
      message.warning('请输入需测试网址');
      return;
    }
    console.log('打开测试网页：', url);
    chrome.runtime.sendMessage(targetExtensionId, { type: 'openTestWebSite', url }, WinId => {
      console.log(WinId);
    });
  }

  showModal = () => {
    this.setState({
      showDebugModal: true,
    });
  };

  handleOk = () => {
    this.setState({ showDebugModal: false });
  };

  handleCancel = () => {
    this.setState({
      showDebugModal: false,
      runing: false,
      taskLog: null,
    });
  };

  handleAddDebugTask = () => {
    this.setState({ runing: true });
    this.queryAddDebugTask(this.props.selectNoteId);
  }

  queryAddDebugTask = caseId => {
    const { dispatch, selectVersion } = this.props;
    dispatch({
      type: 'caseInfo/queryAddDebugTask',
      payload: {
        caseId,
        versionId: selectVersion,
      },
    })
      .then(() => {
        const { taskInfo } = this.props.caseInfo;
        this.getTaskInfo(taskInfo.taskid);
      });
  }

  queryCaseData=caseId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryCaseData',
      payload: {
        caseId,
      },
    })
      .then(() => {
        const { caseData } = this.props.caseInfo;
        this.setState({
          caseData,
        });
      });
  };

  getTaskInfo = taskId => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    let count = 1;
    this.timer = setInterval(() => {
      count += 1;
      this.socket.emit('taskInfo', { taskId }, taskInfo => {
        if ([3, 4].indexOf(taskInfo.status) > -1) {
          clearTimeout(this.timer);
          const taskLog = JSON.parse(taskInfo.taskLog);
          this.setState({ runing: false, taskLog });
        }
        if (count > 600) {
          clearTimeout(this.timer);
          this.setState({ runing: false });
          message.error('任务执行超时');
        }
      });
    }, 1000);
  }

  handleValueChange = () => {
    const { dispatch, selectNoteId, form } = this.props;
    dispatch({
      type: 'caseInfo/queryUpdateCaseInfo',
      payload: {
        id: selectNoteId,
        caseInfo: form.getFieldsValue(),
      },
    })
      .then(() => {
        this.queryCaseData(selectNoteId);
        this.props.handleTreeUpdate();
      });
  }

  handleSetUpChange = value => {
    const { form } = this.props;
    form.setFieldsValue({ setUp: value }, () => this.handleValueChange());
    return value;
  }

  handleTearDownChange = value => {
    const { form } = this.props;
    form.setFieldsValue({ tearDown: value }, () => this.handleValueChange());
    return value;
  }

  render() {
    const { showDebugModal, runing, taskLog, caseData } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.content_container}>
        <div className={styles.header_container}>
          <Search
            className={styles.open_website}
            placeholder="打开需测试的网站"
            enterButton="打开"
            onSearch={value => this.handleTestWebSite(value)}
          />
          <div className={styles.case_action_container}>
            <div className={styles.action_container}>
              <Tooltip placement="bottom" title="调试该用例">
                <Button type="link" icon="play-circle" size="small" className={styles.debug_button} onClick={() => this.showModal()} />
              </Tooltip>
            </div>
          </div>
        </div>
        <Form layout="inline">
          <Form.Item label="用例名称" labelAlign="left" >
            {getFieldDecorator('name', {
              initialValue: caseData.name || undefined,
            })(
              <Input onBlur={() => this.handleValueChange()} />,
            )}
          </Form.Item>
          <Form.Item label="前置处理" labelAlign="left" >
            {getFieldDecorator('setUp', {
              initialValue: caseData.setUp || [],
              getValueFromEvent: value => this.handleSetUpChange(value),
            })(
              <Select
                style={{ width: 300 }}
                mode="tags"
                placeholder="请输入前置处理关键词"
              />,
            )}
          </Form.Item>
        </Form>
        <Form layout="inline">
          <Form.Item label="更新用户" labelAlign="left" >
            <span>{caseData.userName || ''}</span>
          </Form.Item>
          <Form.Item label="更新时间" labelAlign="left" >
            <span>{caseData.update_time || ''}</span>
          </Form.Item>
        </Form>
        <Form.Item label="用例描述">
          {getFieldDecorator('doc', {
            initialValue: caseData.doc || '',
          })(
            <TextArea
              placeholder="请输入功能描述"
              autosize={{ minRows: 2, maxRows: 2 }}
              onBlur={() => this.handleValueChange()}
            />,
          )}
        </Form.Item>
        <Form.Item label="操作步骤">
          <StepList caseId={this.props.selectNoteId} versionId={this.props.selectVersion} />
        </Form.Item>
        <Form.Item label="后置处理" labelAlign="left" >
          {getFieldDecorator('tearDown', {
            initialValue: caseData.tearDown || [],
            getValueFromEvent: value => this.handleTearDownChange(value),
          })(
            <Select
              style={{ width: 300 }}
              mode="tags"
              placeholder="请输入后置处理关键词"
            />,
          )}
        </Form.Item>
        <Modal
          visible={showDebugModal}
          title="用例调试"
          width={800}
          closable={false}
          destroyOnClose
          maskClosable={false}
          keyboard={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
          ]}
        >
          <div className={styles.debug_start_container}>
            {runing && <Spin tip="正在执行任务..."/>}
            {(!runing && !taskLog) && (
              <Button type="primary" icon="play-circle" onClick={this.handleAddDebugTask}>
                开始调试
              </Button>
            )}
          </div>
          {taskLog && (
             <Steps direction="vertical" size="small">
               {taskLog[0].cases[0].steps.map((item, index) => {
                 if (item.status === 'PASS') {
                   return (<Step key={`${item.name}_${index}`} icon={<Icon type="check-circle" theme="filled" style={{ color: '#2ecc71' }} />} status="finish" title={item.name} description={item.msg} />);
                 }
                   return (<Step key={`${item.name}_${index}`} icon={<Icon type="close-circle" theme="filled" />} status="error" title={item.name} description={item.msg} />);
               })}
             </Steps>
          )}
        </Modal>
      </div>
    );
  }
}
