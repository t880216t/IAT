import React, { Component } from 'react';
import { Button, message, Input, Tooltip, Modal, Divider, Switch, Radio, Form, Select } from 'antd';
import AceEditor from 'react-ace';
import io from 'socket.io-client';
import { connect } from 'dva';

import 'brace/mode/java';
import 'brace/theme/dracula';
import styles from './index.less'

const InputGroup = Input.Group;
const { Option } = Select;

@connect(({ interfaceCase, loading }) => ({
  interfaceCase,
}))
@Form.create()
export default class ApiCaseInfoPage extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      caseData: {},
    };
  }

  componentWillMount() {
    const { selectNoteId } = this.props;
    this.queryCaseData(selectNoteId);
    // this.queryProjectRootInfo(selectNoteId)
    // this.queryProjectGlobalValues(selectNoteId);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.selectNoteId !== nextProps.selectNoteId) {
      console.log(nextProps.selectNoteId)
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

  queryCaseData=caseId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryCaseData',
      payload: {
        caseId,
      },
    })
      .then(() => {
        const { caseData } = this.props.interfaceCase;
        this.setState({
          caseData,
        });
      });
  };

  handleValueChange = () => {
    const { dispatch, selectNoteId, form } = this.props;
    const name = form.getFieldValue('name');
    dispatch({
      type: 'interfaceCase/queryUpdateFolderName',
      payload: {
        id: selectNoteId,
        name,
      },
    })
      .then(() => {
        // this.queryCaseData(selectNoteId);
        this.props.handleTreeUpdate();
      })
  }

  render() {
    const { getFieldDecorator,getFieldValue } = this.props.form;
    const { caseData } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 10 },
      },
    };
    return (
      <Form {...formItemLayout}>
        <Divider dashed orientation="left">基本信息</Divider>
        <Form.Item label="用例名称" >
          {getFieldDecorator('name', {
            initialValue: caseData.name || undefined,
          })(
            <Input
              size="small"
              onBlur={() => this.handleValueChange()}
              style={{ width: 300 }}
            />,
          )}
        </Form.Item>
        <Divider dashed orientation="left">请求设置</Divider>
        <Form.Item label="前置shell">
          <div>
            {getFieldDecorator('preShellType', {
              initialValue: false,
            })(
              <Switch size="small" />,
            )}
            <Form.Item style={{ marginBottom: 0 }}>
              {getFieldDecorator('preShellData', {
                initialValue: '',
              })(
                <AceEditor
                  mode="java"
                  theme="dracula"
                  style={{
                    margin: '8px 0',
                    display: getFieldValue('preShellType') ? 'block' : 'none',
                  }}
                  name="preShellInput"
                  editorProps={{ $blockScrolling: true }}
                  height="300px"
                  onBlur={newValue => this.handlePreShellChange(newValue)}
                />,
              )}
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item label="请求路径"  >
          <InputGroup compact size="small">
            <Select defaultValue="POST" size="small">
              <Option value="POST">POST</Option>
              <Option value="GET">GET</Option>
            </Select>
            <Input
              style={{ width: 300 }}
              placeholder="/path"
            />
          </InputGroup>
        </Form.Item>
        <Form.Item label="header设置"  >
          <Input
            style={{ width: 300 }}
            placeholder="/path"
          />
        </Form.Item>
        <Form.Item label="参数类型"  >
          <Radio.Group onChange={e => this.handleParamsFormatTypeChange(e)}>
            <Radio value={1}>
              x-www-form-urlencoded
            </Radio>
            <Radio value={2}>
              <Tooltip title="设置该类型参数后，将不支持任务中的全局默认参数设置">
                <a>json</a>
              </Tooltip>
            </Radio>
            <Radio value={3}>
              form-data
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="请求参数"  >
          <Input
            style={{ width: 300 }}
            placeholder="/path"
          />
        </Form.Item>
        <Form.Item label="后置shell">
          <div>
            {getFieldDecorator('postShellType', {
              initialValue: false,
            })(
              <Switch size="small" />,
            )}
            <Form.Item style={{ marginBottom: 0 }}>
              {getFieldDecorator('postShellData', {
                initialValue: '',
              })(
                <AceEditor
                  mode="java"
                  theme="dracula"
                  style={{
                    margin: '8px 0',
                    display: getFieldValue('postShellType') ? 'block' : 'none',
                  }}
                  name="postShellInput"
                  editorProps={{ $blockScrolling: true }}
                  height="300px"
                  onBlur={newValue => this.handlePreShellChange(newValue)}
                />,
              )}
            </Form.Item>
          </div>
        </Form.Item>
        <Divider dashed orientation="left">返回校验</Divider>
        <Divider dashed orientation="left">参数化设置</Divider>
      </Form>
    );
  }
}
