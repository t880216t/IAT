import React, { Component } from 'react';
import {
  Form,
  Input,
  message,
  Select,
  Button,
  Icon,
  Radio,
} from 'antd';
import { connect } from 'dva';
import FormKeyValuesCell from '../../../components/FormKeyValuesCell/index';
import styles from './index.less';

const { Option } = Select;

@connect(({ caseInfo, system }) => ({
  caseInfo,
  system,
}))
@Form.create()
export default class CaseProject extends Component {
  state={
    caseProjectConfig: {},
    globalValues: [],
    valueType: 1,
  }

  componentWillMount() {
    // this.queryGetLibs();
    this.queryCaseProjectConfig();
    this.queryProjectGlobalValues(this.props.selectNoteId);
  }

  // handleLibsChange=value => {
  //   this.queryUpdateProjectLibConfig(value);
  // }

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

  queryProjectGlobalValues = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryProjectGlobalValues',
      payload: {
        id,
      },
    })
      .then(() => {
        const { globalValues } = this.props.system;
        this.setState({ globalValues });
      });
  }

  handleAddGlobalValue = () => {
    const { globalValues, valueType } = this.state;
    const valueLength = globalValues.length || 0;
    if (valueLength > 0 && globalValues[valueLength - 1].id === 'empty') {
      return;
    }
    this.setState({ globalValues: [...globalValues, { id: 'empty', keyName: '', keyValue: '', valueType }] });
  }

  handleValueTypeChange = e => {
    this.setState({ valueType: e.target.value }, () => {
      const { globalValues } = this.state;
      if (globalValues.length > 0) {
        const lastIndex = globalValues.length - 1;
        if (globalValues[lastIndex].id === 'empty') {
          globalValues.splice(lastIndex, 1);
          this.setState({ globalValues });
        }
      }
    });
  }

  handleValueChange = (id, values) => {
    const { selectNoteId } = this.props;
    const { valueType } = this.state;
    if (id === 'empty') {
      if (values.keyName || values.keyValue) {
        this.queryAddGlobalValues(values.keyName, values.keyValue, selectNoteId, valueType);
      }
    } else if (values.keyName || values.keyValue) {
        this.queryUpdateGlobalValues(id, values.keyName, values.keyValue);
      }
  }

  queryUpdateGlobalValues = (id, keyName, keyValue) => {
    const { dispatch, selectNoteId } = this.props;
    dispatch({
      type: 'system/queryUpdateGlobalValues',
      payload: {
        id, keyName, keyValue,
      },
    })
      .then(() => {
        this.queryProjectGlobalValues(selectNoteId);
      });
  }

  queryAddGlobalValues = (keyName, keyValue, projectId, valueType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryAddGlobalValues',
      payload: {
        keyName, keyValue, projectId, valueType,
      },
    })
      .then(() => {
        this.queryProjectGlobalValues(projectId);
      });
  }

  handleDeleteGlobalValue = id => {
    this.queryDeleteGlobalValues(id);
  }

  queryDeleteGlobalValues = id => {
    const { dispatch, selectNoteId } = this.props;
    dispatch({
      type: 'system/queryDeleteGlobalValues',
      payload: {
        id,
      },
    })
      .then(() => {
        this.queryProjectGlobalValues(selectNoteId);
      });
  }

  render() {
    const { caseProjectConfig, globalValues, valueType } = this.state;
    const showValues = globalValues && globalValues.filter(item => item.valueType === valueType);
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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 12, offset: 4 },
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
          })(<Input onBlur={e => this.handleNameChange(e.target.value)} />)}
        </Form.Item>
        <Form.Item label="全局参数" className={styles.paramsContainer}>
          <Form.Item >
            <Radio.Group value={valueType} onChange={this.handleValueTypeChange}>
              <Radio value={1}>正式版</Radio>
              <Radio value={2}>测试版</Radio>
            </Radio.Group>
          </Form.Item>
          <div className={styles.valuesContainer}>
            {showValues && showValues.map(item => (
              <FormKeyValuesCell
                key={item.id}
                item={item}
                selectType={valueType}
                handleValueChange={values => this.handleValueChange(item.id, values)}
                handleDeleteGlobalValue={() => this.handleDeleteGlobalValue(item.id)}
              />
            ))}
          </div>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.handleAddGlobalValue} style={{ width: '60%' }}>
            <Icon type="plus" /> 添加全局参数
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
