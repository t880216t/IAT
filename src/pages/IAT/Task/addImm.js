/* eslint-disable no-param-reassign */
import React, { PureComponent } from 'react';
import {
  Form, Tree, Select, Icon, Transfer, message, Input, Card, Divider, TimePicker, Button, Radio, Spin
} from 'antd';
import moment from 'moment';
import { connect } from 'dva';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import KeyValueInput from '@/components/KeyValueInput'
import styles from './index.less'

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

let headerId = 0;
let paramId = 0;

@connect(({ iatSystem, iatTask }) => ({
  iatSystem,
  iatTask,
}))
@Form.create({
  onValuesChange(props, changedValues, allValues) {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    if(changedValues){
      for (const changeKey in changedValues) {
        if (changeKey === 'project') {
          const projectId = allValues.project
          console.log('projectId:', projectId)
          const { dispatch } = props;
          dispatch({
            type: 'iatTask/queryProjectCaseList',
            payload: {
              id: projectId,
            }
          })
        }
      }
    }
  },
})
class AddImm extends PureComponent {
  state={
    projectList: [],
  }

  componentWillMount() {
    this.queryProjectList()
  }

  queryProjectList=() => {
    const { dispatch } = this.props
    dispatch({
      type: 'iatSystem/queryProjectList',
      payload: {
        status: '1',
      }
    })
      .then(() => {
        const { iatSystem } = this.props
        this.setState({
          projectList: iatSystem.projectList,
        })
      })
  };

  handleBack=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatTask/goListPage',
    })
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formatTime = moment(values.runTime).format('HH:mm')
        values.runTime = formatTime
        dispatch({
          type: 'iatTask/queryAddTask',
          payload: {
            info: values,
          }
        })
      }
    });
  };

  addHeader = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('headerkeys');
    const nextKeys = keys.concat(++headerId);
    // important! notify form to detect changes
    form.setFieldsValue({
      headerkeys: nextKeys,
    });
  }

  addParam = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('paramkeys');
    const nextKeys = keys.concat(++paramId);
    // important! notify form to detect changes
    form.setFieldsValue({
      paramkeys: nextKeys,
    });
  }

  removeHeader = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('headerkeys');
    // can use data-binding to set
    form.setFieldsValue({
      headerkeys: keys.filter(key => key !== k),
    });
  }

  removeParam = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('paramkeys');
    // can use data-binding to set
    form.setFieldsValue({
      paramkeys: keys.filter(key => key !== k),
    });
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      iatTask,
    } = this.props;
    const { projectList } = this.state;
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
    getFieldDecorator('headerkeys', { initialValue: [] });
    const headerkeys = getFieldValue('headerkeys');
    const headerItems = headerkeys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : submitFormLayout)}
        label={index === 0 ? '请求头参数' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`headers[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
        })(
          <KeyValueInput />
        )}
        {headerkeys.length > 0 ? (
          <Icon
            className={styles.dynamic_delete_button}
            type="minus-circle-o"
            onClick={() => this.removeHeader(k)}
          />
        ) : null}
      </Form.Item>
    ));
    getFieldDecorator('paramkeys', { initialValue: [] });
    const paramkeys = getFieldValue('paramkeys');
    const paramItems = paramkeys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : submitFormLayout)}
        label={index === 0 ? '全局参数' : ''}
        required={false}
        key={k}
      >
        {getFieldDecorator(`params[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
        })(
          <KeyValueInput />
        )}
        {paramkeys.length > 0 ? (
          <Icon
            className={styles.dynamic_delete_button}
            type="minus-circle-o"
            onClick={() => this.removeParam(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="项目名称">
              {getFieldDecorator('project', {
                rules: [
                  {
                    required: true,
                    message: '项目名称不可为空',
                  },
                ],
              })(
                <Select placeholder="请先选择项目" style={{ width: 220 }}>
                  {projectList && projectList.map(item => (
                      <Option value={item.id} key={item.id} title={item.name}>{item.name}</Option>
                    ))}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="任务类型">
              <div>
                {getFieldDecorator('taskType', {
                  rules: [
                    {
                      required: true,
                      message: '任务类型不可为空',
                    },
                  ],
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">即时任务</Radio>
                    <Radio value="2">定时任务</Radio>
                  </Radio.Group>
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('runTime', {
                    initialValue: moment('12:08', 'HH:mm'),
                  })(
                    <TimePicker
                      format="HH:mm"
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('taskType') === '2' ? 'block' : 'none',
                      }}
                    />
                  )}
                </FormItem>
              </div>
            </FormItem>
            <FormItem {...formItemLayout} label="任务名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '任务名称不可为空',
                  },
                ],
              })(<Input placeholder="请输入任务名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="任务描述">
              {getFieldDecorator('taskDesc', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder="请输入任务描述"
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="参数类型">
              {getFieldDecorator('valueType', {
                rules: [
                  {
                    required: true,
                  },
                ],
                initialValue: 1,
              })(
                <Radio.Group>
                  <Radio value={1}>正式版</Radio>
                  <Radio value={2} disabled>测试版</Radio>
                </Radio.Group>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="测试域名">
              {getFieldDecorator('domain', {
                rules: [
                  {
                    required: true,
                    message: '测试域名不可为空',
                  },
                ],
              })(<Input placeholder="请输入测试域名 .eg: https://app.xxx.com:8080" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="代理设置">
              {getFieldDecorator('proxy', {
              })(
                <Input placeholder="格式: user:password@server:port" />
              )}
            </FormItem>
            <Form.Item
              className={styles.listForm}
            >
              {headerItems}
              <Form.Item {...submitFormLayout}>
                <Button type="dashed" onClick={this.addHeader} style={{ width: '100%' }}>
                  <Icon type="plus" /> 设置请求头参数
                </Button>
              </Form.Item>
            </Form.Item>
            <Form.Item
              className={styles.listForm}
            >
              {paramItems}
              <Form.Item {...submitFormLayout}>
                <Button type="dashed" onClick={this.addParam} style={{ width: '100%' }}>
                  <Icon type="plus" /> 添加全局默认参数
                </Button>
              </Form.Item>
            </Form.Item>
            <FormItem {...formItemLayout} label="用例设置">
              {getFieldDecorator('case', {
                rules: [
                  {
                    required: true,
                    message: '任务用例不可为空',
                  },
                ],
              })(
                <Transfer
                  dataSource={iatTask.caseData}
                  titles={['项目用例', '任务用例']}
                  targetKeys={getFieldValue('case')}
                  render={item => item.name}
                />
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
export default AddImm
