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
      this.props.onOk(values);
    }
  };

  renderTitle = (isAdd, isSub, isBro) => {
    if (isAdd) {
      if (isSub) {
        return '新增子模块';
      }
      if (isBro){
        return '新增模块';
      }
    } else {
      return '编辑模块';
    }
  };

  render() {
    const { visible, confirmLoading, itemInfo, isAdd, isSub, isBro } = this.props;
    return (
      <Modal
        title={this.renderTitle(isAdd, isSub, isBro)}
        visible={visible}
        destroyOnClose
        confirmLoading={confirmLoading}
        onOk={() => this.moduleFormRef.current.submit()}
        onCancel={this.handleCancel}
      >
        <Form ref={this.moduleFormRef} preserve={false} onFinish={this.onFinish}>
          <Form.Item name='name' label='名称' rules={[{ required: true }]}
                     initialValue={(!isAdd && itemInfo) ? itemInfo.text : undefined}>
            <Input autoFocus placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
