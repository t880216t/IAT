import React, { Component } from 'react';
import { Form, Input, Modal } from 'antd';

import styles from './index.less';

export default class Page extends Component {
  constructor() {
    super();
    this.caseFormRef = React.createRef();
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

  render() {
    const { title, width, visible, confirmLoading, label } = this.props;
    return (
      <Modal
        title={title}
        width={width}
        visible={visible}
        destroyOnClose
        confirmLoading={confirmLoading}
        onOk={() => this.caseFormRef.current.submit()}
        onCancel={this.handleCancel}
      >
        <Form ref={this.caseFormRef} preserve={false} onFinish={this.onFinish}>
          <Form.Item name='name' label={label} rules={[{ required: true }]}>
            <Input placeholder={`请输入${label}`} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
