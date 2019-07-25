import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Form, Select, Button, Input, Radio, TimePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import TreeTransfer from '../../components/TreeTransfer/index';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ system, task }) => ({
  system,
  task,
}))
@Form.create()
export default class DetailPage extends PureComponent {
  state={
    projectList: [],
    proxyConfigList: [],
    targetKeys: [],
    treeList: [],
    listTree: [],
    taskInfo: {},
  }

  componentWillMount() {
    const params = this.props.location.search;
    if (params.indexOf('?') !== -1) {
      const detailId = params.substr(1);
      this.queryProjectList(detailId);
      this.queryProxyConfigList(detailId);
      this.queryTaskInfo(detailId);
    }
  }

  handleGoList=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/goTimListPage',
    });
  };

  queryTaskInfo = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/queryTaskInfo',
      payload: {
        id,
      },
    })
      .then(() => {
        const { taskInfo } = this.props.task;
        this.setState({ taskInfo, targetKeys: taskInfo.taskCase }, () => {
          this.queryCaseTreeList(taskInfo.project);
        });
      });
  }

  queryCaseTreeList=(id, isRef = false) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/queryCaseTreeList',
      payload: {
        id,
      },
    })
      .then(() => {
        const { treeList } = this.props.task;
        const listTree = this.treeToList(treeList);
        this.setState({ treeList, listTree }, () => {
          if (isRef) {
            console.log('从外部链接过来的定位到加载节点');
          }
        });
      });
  };

  queryProjectList=(detailId = null) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryProjectList',
      payload: {
        status: '1',
      },
    })
      .then(() => {
        const { projectList } = this.props.system;
        this.setState({
          projectList,
        });
      });
  };

  queryProxyConfigList = (detailId = null) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryProxyConfigList',
      payload: {},
    })
      .then(() => {
        const { proxyConfigList } = this.props.system;
        this.setState({ proxyConfigList });
      });
  };

  handleBack=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/goTimListPage',
    });
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formatTime = moment(values.runTime).format('HH:mm');
        values.runTime = formatTime;
        const { listTree, taskInfo } = this.state;
        const newTargetKeys = [];
        const { taskCase } = values;
        if (taskCase) {
          taskCase.forEach(key => {
            listTree.forEach(item => {
              if (item.id === parseInt(key) && item.noteType === 2) {
                newTargetKeys.push(parseInt(key));
              }
            });
          });
          values.taskCase = newTargetKeys;
        }
        dispatch({
          type: 'task/queryUpdateTask',
          payload: { ...values, id: taskInfo.id },
        })
          .then(() => this.handleGoList());
      }
    });
  };

  handleProjectChange = id => {
    this.queryCaseTreeList(id);
  }

  treeToList=tree => {
    const listData = [];
    tree.forEach(item => {
      listData.push({
        id: item.id,
        name: item.name,
        noteType: item.noteType,
        indexId: item.indexId,
        pid: 0,
      });
    });
    const loop = (data, fatherPid) => data.children.forEach(item => {
      listData.push({
        id: item.id,
        name: item.name,
        noteType: item.noteType,
        indexId: item.indexId,
        pid: fatherPid,
      });
      if (item.children && item.children.length > 0) {
        loop(item, item.id);
      }
    });
    loop(tree[0], tree[0].id);
    return listData;
  };

  handleCaseChange = targetKeys => {
    const { listTree } = this.state;
    const newTargetKeys = [];
    targetKeys.forEach(key => {
      listTree.forEach(item => {
        if (item.id === parseInt(key) && item.noteType === 2) {
          newTargetKeys.push(parseInt(key));
        }
      });
    });
    this.setState({ targetKeys: newTargetKeys });
  };

  render() {
    const { projectList, proxyConfigList, targetKeys, treeList, taskInfo } = this.state;
    const {
      form: { getFieldValue, getFieldDecorator },
    } = this.props;
    const proxyList = proxyConfigList.filter(item => item.browserType === getFieldValue('browserType'));
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="任务类型">
              <div>
                {getFieldDecorator('taskType', {
                  rules: [
                    {
                      required: true,
                      message: '任务类型不可为空',
                    },
                  ],
                  initialValue: taskInfo.taskType,
                })(
                  <Radio.Group>
                    <Radio value={2}>即时任务</Radio>
                    <Radio value={3}>定时任务</Radio>
                  </Radio.Group>,
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('runTime', {
                    initialValue: moment(taskInfo.runTime, 'HH:mm'),
                  })(
                    <TimePicker
                      format="HH:mm"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('taskType') === 3 ? 'block' : 'none',
                      }}
                    />,
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="项目名称">
              {getFieldDecorator('project', {
                rules: [
                  {
                    required: true,
                    message: '项目名称不可为空',
                  },
                ],
                initialValue: taskInfo.project,
              })(
                <Select placeholder="请先选择项目" style={{ width: 280 }} onChange={value => this.handleProjectChange(value)}>
                  {projectList && projectList.map(item => (
                    <Option value={item.id} key={item.id} title={item.name}>{item.name}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="任务名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '任务名称不可为空',
                  }],
                initialValue: taskInfo.name,
              })(<Input placeholder="请输入任务名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="参数类型">
              {getFieldDecorator('valueType', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: taskInfo.valueType,
              })(
                <Radio.Group>
                  <Radio value={1}>正式版</Radio>
                  <Radio value={2} disabled>测试版</Radio>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="浏览器">
              {getFieldDecorator('browserType', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: taskInfo.browserType,
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value={1}>Firefox</Radio.Button>
                  <Radio.Button value={2}>Chrome</Radio.Button>
                  <Radio.Button value={3} disabled>Safari</Radio.Button>
                  <Radio.Button value={4} disabled>Internet Explorer</Radio.Button>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="全局代理">
              {getFieldDecorator('proxyType', {
                initialValue: taskInfo.proxyType,
              })(
                <Select placeholder="请先选择代理" style={{ width: 280 }}>
                  {proxyList && proxyList.map(item => (
                    <Option value={item.id} key={item.id} title={item.name}>{item.name}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="用例数据">
              {getFieldDecorator('taskCase', {
                rules: [
                  {
                    required: true,
                    message: '请勾选需要测试的用例',
                  },
                ],
                initialValue: taskInfo.taskCase,
              })(
                <TreeTransfer
                  dataSource={treeList}
                  targetKeys={targetKeys}
                  onChange={this.handleCaseChange}
                />,
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button onClick={() => this.handleBack()}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
                提交
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
