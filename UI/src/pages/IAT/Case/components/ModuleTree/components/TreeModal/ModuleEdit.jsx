import React, { Component } from 'react';
import { Form, Modal, Input } from 'antd';

import styles from './index.less';

export default class Page extends Component {
  constructor() {
    super();
    this.state = {};
    this.moduleFormRef = React.createRef();
  }

  componentDidMount() {
  }


  handleCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onFinish = (values) => {
    if (this.props.onOk) {
      this.props.onOk(values, this.props.isAdd);
    }
  };

  renderTitle = (isAdd, caseType) => {
    if (isAdd) {
      if ([0, 2].indexOf(caseType) > -1) {
        return '新增模块';
      }
      if ([1, 3].indexOf(caseType) > -1) {
        return '新增关键词';
      }
    } else {
      if ([0, 2].indexOf(caseType) > -1) {
        return '编辑模块';
      }
      if ([1, 3].indexOf(caseType) > -1) {
        return '编辑关键词';
      }
    }
  };

  render() {
    const { visible, confirmLoading, itemInfo, isAdd, caseType } = this.props;
    return (
      <Modal
        title={this.renderTitle(isAdd, caseType)}
        visible={visible}
        destroyOnClose
        confirmLoading={confirmLoading}
        onOk={() => this.moduleFormRef.current.submit()}
        onCancel={this.handleCancel}
      >
        <Form ref={this.moduleFormRef} preserve={false} onFinish={this.onFinish}>
          <Form.Item name='name' label='名称' rules={[{ required: true }]}
                     initialValue={(!isAdd && itemInfo) ? itemInfo.text : undefined}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
