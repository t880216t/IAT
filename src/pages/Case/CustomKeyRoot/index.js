import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
  message,
} from 'antd';
import { connect } from 'dva';

const { Option } = Select;

@connect(({ caseInfo }) => ({
  caseInfo,
}))
@Form.create()
export default class CustomKeyRoot extends Component {
  state={
    caseProjectConfig: {},
    libsList: [],
  }

  componentWillMount() {
    this.queryGetLibs();
  }

  handleLibsChange=value => {
    this.queryUpdateProjectLibConfig(value);
  }

  queryUpdateProjectLibConfig=libs => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryUpdateProjectLibConfig',
      payload: {
        id: this.props.selectNoteId,
        libs,
      },
    })
      .then(() => {
        this.queryCaseProjectConfig();
      });
  }

  queryCaseProjectConfig=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryCaseProjectConfig',
      payload: {
        id: this.props.selectNoteId,
      },
    })
      .then(() => {
        const { caseProjectConfig } = this.props.caseInfo;
        this.setState({ caseProjectConfig });
      });
  }

  queryGetLibs=() => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryGetLibs',
      payload: {
        status: 1,
      },
    })
      .then(() => {
        const { libsList } = this.props.caseInfo;
        this.setState({ libsList }, () => this.queryCaseProjectConfig());
      });
  }

  handleNameChange = value => {
    if (!value) {
      message.warning('名称不可为空');
      return;
    }
    this.queryUploadTreeName(this.props.selectNoteId, value);
  }

  queryUploadTreeName = (id, name) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryUploadTreeName',
      payload: {
        id, name,
      },
    })
      .then(() => {
        this.queryCaseProjectConfig();
        this.props.handleTreeUpdate();
      });
  }

  render() {
    const { caseProjectConfig, libsList } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    return (
      <Form {...formItemLayout} >
        <Form.Item label="项目名称">
          {getFieldDecorator('projectName', {
            rules: [
              {
                required: true,
                message: '请输入项目名称',
              },
            ],
            initialValue: caseProjectConfig.name,
          })(<Input onBlur={e => this.handleNameChange(e.target.value)}/>)}
        </Form.Item>
        <Form.Item label="依赖库">
          {getFieldDecorator('libs', {
            initialValue: caseProjectConfig.libs,
          })(
            <Select
              mode="multiple"
              placeholder="选择依赖库"
              onChange={this.handleLibsChange}
            >
              {libsList && libsList.map(item => (
                  <Option key={item.id} value={item.id}>{item.name}</Option>
                ))}
            </Select>,
          )}
        </Form.Item>
      </Form>
    );
  }
}
