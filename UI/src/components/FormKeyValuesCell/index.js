import { Form, Input, Select, Button } from 'antd';
import React from 'react';
import styles from './index.less';

@Form.create()
export default class FormKeyValuesCell extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  handleValueChange = () => {
    const { form, handleValueChange } = this.props;
    handleValueChange(form.getFieldsValue());
  }

  render() {
    const {
      form: { getFieldDecorator },
      item,
      size,
    } = this.props;
    return (
      <div className={styles.cellContainer}>
        <Form.Item className={styles.cellMiddle}>
          {getFieldDecorator('keyName', {
            rules: [
              {
                required: false,
                message: '请输入参数名称',
              },
            ],
            initialValue: item.key,
          })(<Input size={size || 'default'} placeholder="参数名称" onBlur={this.handleValueChange}/>)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('keyValue', {
            rules: [
              {
                required: false,
                message: '请输入参数值',
              },
            ],
            initialValue: item.value,
          })(<Input size={size || 'default'} placeholder="参数值" onBlur={this.handleValueChange}/>)}
        </Form.Item>
        <Form.Item>
          <Button type="link" icon="minus-square" onClick={() => this.props.handleDeleteGlobalValue()} style={{ display: (item.id === 'empty' ? 'none' : '') }}/>
        </Form.Item>
      </div>
    );
  }
}
