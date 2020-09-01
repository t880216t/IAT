import { Form, Input, AutoComplete, Button } from 'antd';
import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

const { Option } = AutoComplete;

@connect(({ interfaceCase, loading }) => ({
  interfaceCase,
}))
@Form.create()
export default class FormKeyValuesCell extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      searchKeywords: [],
    };
  }

  handleValueChange = () => {
    const { form, handleValueChange } = this.props;
    handleValueChange(form.getFieldsValue());
  }

  handleSearch = value => {
    // let result;
    // if (!value || value.indexOf('@') >= 0) {
    //   result = [];
    // } else {
    //   result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    // }
    // this.setState({ result });
    const { caseId } = this.props;
    this.querySearchKeywords(caseId, value);
  };

  querySearchKeywords= (caseId, words) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/querySearchKeywords',
      payload: {
        caseId, words,
      },
    })
      .then(() => {
        const { searchKeywords } = this.props.interfaceCase;
        this.setState({
          searchKeywords,
        });
      });
  };

  render() {
    const {
      form: { getFieldDecorator },
      item,
      size,
    } = this.props;
    const { searchKeywords } = this.state;
    const children = searchKeywords.map(searchItem => <Option key={searchItem.id} value={searchItem.key_name}>{searchItem.key_name}</Option>);
    return (
      <div className={styles.cellContainer}>
        <Form.Item className={styles.cellMiddle} style={{ width: '45%' }}>
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
        <Form.Item style={{ width: '45%' }}>
          {getFieldDecorator('keyValue', {
            rules: [
              {
                required: false,
                message: '请输入参数值',
              },
            ],
            initialValue: item.value,
          })(
            <AutoComplete size={size || 'default'} onSearch={this.handleSearch} placeholder="参数值" onBlur={this.handleValueChange}>
              {children}
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="link" icon="minus-square" onClick={() => this.props.handleDeleteGlobalValue()} style={{ display: (item.id === 'empty' ? 'none' : '') }}/>
        </Form.Item>
      </div>
    );
  }
}
