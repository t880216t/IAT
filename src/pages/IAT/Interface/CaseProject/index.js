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
import FormKeyValuesCell from '../../../../components/FormKeyValuesCell/index';
import styles from './index.less';

@connect(({ interfaceCase }) => ({
  interfaceCase,
}))
@Form.create()
export default class ProjectPage extends Component {
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {
        projectRootInfo: {},
        globalValues: [],
        valueType: 1,
      };
    }

  componentWillMount() {
    const { selectNoteId } = this.props;
    this.queryProjectRootInfo(selectNoteId)
    this.queryProjectGlobalValues(selectNoteId);
  }

  queryProjectRootInfo=() => {
    const { dispatch, selectNoteId } = this.props;
    dispatch({
      type: 'interfaceCase/queryProjectRootInfo',
      payload: {
        id: selectNoteId,
      },
    })
      .then(() => {
        const { projectRootInfo } = this.props.interfaceCase;
        this.setState({ projectRootInfo });
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
      type: 'interfaceCase/queryUploadTreeName',
      payload: {
        id, name,
      },
    })
      .then(() => {
        this.queryProjectRootInfo();
        this.props.handleTreeUpdate();
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

  queryProjectGlobalValues = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryProjectGlobalValues',
      payload: {
        id,
      },
    })
      .then(() => {
        const { globalValues } = this.props.interfaceCase;
        this.setState({ globalValues });
      });
  }

  queryAddGlobalValues = (keyName, keyValue, projectId, valueType) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryAddGlobalValues',
      payload: {
        keyName, keyValue, projectId, valueType,
      },
    })
      .then(() => {
        this.queryProjectGlobalValues(projectId);
      });
  }

  queryUpdateGlobalValues = (id, keyName, keyValue) => {
    const { dispatch, selectNoteId } = this.props;
    dispatch({
      type: 'interfaceCase/queryUpdateGlobalValues',
      payload: {
        id, keyName, keyValue,
      },
    })
      .then(() => {
        this.queryProjectGlobalValues(selectNoteId);
      });
  }

  handleDeleteGlobalValue = id => {
    this.queryDeleteGlobalValues(id);
  }

  queryDeleteGlobalValues = id => {
    const { dispatch, selectNoteId } = this.props;
    dispatch({
      type: 'interfaceCase/queryDeleteGlobalValues',
      payload: {
        id,
      },
    })
      .then(() => {
        this.queryProjectGlobalValues(selectNoteId);
      });
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

  render() {
    const { projectRootInfo, valueType, globalValues } = this.state;
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
        sm: { span: 12 },
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
            initialValue: projectRootInfo.name,
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
