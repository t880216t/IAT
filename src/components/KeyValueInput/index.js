import React, { PureComponent } from 'react';
import {
  Form, Input, Select, Col,
} from 'antd';

const { Option } = Select;
const InputGroup = Input.Group;

export default class KeyValueInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      key: value.key || "",
      value: value.value || "",
    };
  }

  handleKeyChange = (e) => {
    const key = e.target.value;
    if (!key) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ key });
    }
    this.triggerChange({ key });
  }

  handleValueChange = (e) => {
    const value = e.target.value;
    if (!value) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange({ value });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <InputGroup size={size}>
        <Col span={10}>
          <Input
            placeholder="属性名"
            value={state.key}
            onChange={this.handleKeyChange}
          />
        </Col>
        <Col span={12}>
          <Input
            placeholder="属性值"
            value={state.value}
            onChange={this.handleValueChange}
          />
        </Col>
      </InputGroup>

      // <span>
      //   <Input
      //     type="text"
      //     size={size}
      //     value={state.number}
      //     onChange={this.handleNumberChange}
      //     style={{ width: '65%', marginRight: '3%' }}
      //   />
      //   <Select
      //     value={state.currency}
      //     size={size}
      //     style={{ width: '32%' }}
      //     onChange={this.handleCurrencyChange}
      //   >
      //     <Option value="rmb">RMB</Option>
      //     <Option value="dollar">Dollar</Option>
      //   </Select>
      // </span>
    );
  }
}
