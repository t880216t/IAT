import React, { Component } from 'react';
import { Button, message, Input, Tooltip, Select, Form, Spin } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import StepList from './CustomKeyword/index';

const { Search } = Input;
const { TextArea } = Input;

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
      keywordInfo: {},
    };
  }

  componentWillMount() {
    this.queryGetKeywordInfo(this.props.selectNoteId);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.selectNoteId !== nextProps.selectNoteId) {
      const { form } = this.props;
      form.resetFields();
      this.queryGetKeywordInfo(nextProps.selectNoteId);
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    if (this.props.form !== nextProps.form) {
      return true;
    }
    return false;
  }

  queryGetKeywordInfo = caseId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryGetKeywordInfo',
      payload: {
        caseId,
      },
    })
      .then(() => {
        const { keywordInfo } = this.props.caseInfo;
        this.setState({ keywordInfo });
      });
  };

  handleTestWebSite=url => {
    if (!url) {
      message.warning('请输入需测试网址');
      return;
    }
    console.log('打开测试网页：', url);
    chrome.runtime.sendMessage(targetExtensionId, { type: 'openTestWebSite', url }, WinId => {
      console.log(WinId);
    });
  };

  handleParamsChange = value => {
    const { form } = this.props;
    if (value && value.length > 0) {
      const newValue = [];
      value.forEach(item => {
        let formatItem = item;
        if (item.indexOf('${') === -1) {
          formatItem = `$\{${item}\}`;
        }
        newValue.push(formatItem);
      });
      form.setFieldsValue({ params: newValue }, () => this.handleValueChange());
      return newValue;
    }
    form.setFieldsValue({ params: value }, () => this.handleValueChange());
    return value;
  }

  handleReturnsChange = value => {
    const { form } = this.props;
    if (value && value.length > 0) {
      const newValue = [];
      value.forEach(item => {
        let formatItem = item;
        if (item.indexOf('${') === -1) {
          formatItem = `$\{${item}\}`;
        }
        newValue.push(formatItem);
      });
      form.setFieldsValue({ returns: newValue }, () => this.handleValueChange());
      return newValue;
    }
    form.setFieldsValue({ returns: value }, () => this.handleValueChange());
    return value;
  }

  handleValueChange = () => {
    const { form, dispatch, selectNoteId } = this.props;
    dispatch({
      type: 'caseInfo/queryUpdateKeywordInfo',
      payload: {
        caseId: selectNoteId,
        keywordInfo: form.getFieldsValue(),
      },
    })
      .then(() => {
        this.queryGetKeywordInfo(selectNoteId);
        this.props.handleTreeUpdate();
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { keywordInfo } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className={styles.content_container}>
        <div className={styles.header_container}>
          <Search
            className={styles.open_website}
            placeholder="打开需测试的网站"
            enterButton="打开"
            onSearch={value => this.handleTestWebSite(value)}
          />
        </div>
        <Form layout="inline">
          <Form.Item label="关键字名称" labelAlign="left" >
            {getFieldDecorator('name', {
              initialValue: keywordInfo.name || undefined,
            })(
              <Input onBlur={() => this.handleValueChange()}/>,
            )}
          </Form.Item>
          <Form.Item label="传入参数" labelAlign="left" >
            {getFieldDecorator('params', {
              initialValue: keywordInfo.params || [],
              getValueFromEvent: value => this.handleParamsChange(value),
            })(
              <Select
                style={{ minWidth: 200, width: '100%' }}
                mode="tags"
                placeholder="请输入传入参数"
              />,
            )}
          </Form.Item>
        </Form>
        <Form.Item label="功能描述">
          {getFieldDecorator('doc', {
            initialValue: keywordInfo.doc || '',
          })(
            <TextArea
              placeholder="请输入功能描述"
              autosize={{ minRows: 2, maxRows: 6 }}
              onBlur={() => this.handleValueChange()}
            />,
          )}
        </Form.Item>
        <Form.Item label="操作步骤">
          <StepList caseId={this.props.selectNoteId} />
        </Form.Item>
        <Form.Item label="返回参数">
          {getFieldDecorator('returns', {
            initialValue: keywordInfo.returns || [],
            getValueFromEvent: value => this.handleReturnsChange(value),
          })(
            <Select
              style={{ width: 400 }}
              mode="tags"
              placeholder="请输入回传参数"
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}
