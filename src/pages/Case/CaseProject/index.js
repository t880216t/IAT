import React, { Component } from 'react';
import {
  Form,
  Input,
  message,
  Select,
  Button,
  Icon,
  Radio,
  Modal,
  Upload,
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
    showAddFileModal: false,
    fileList: []
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

  handleAddFile = () => {
    this.setState({ showAddFileModal: true });
  }

  handleUploadFileChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  handleUploadOk = () => {
    const { fileList, uploadName } = this.state;
    if (!uploadName) {
      message.warning('请输入参数名');
      return;
    }
    const { id } = this.state.caseProjectConfig;
    if (fileList.length > 0) {
      const { filePath, fileName } = fileList[0].response.content;
      this.queryAddGlobalFile(uploadName, filePath, fileName, id)
      this.handleCancel()
    }
  }

  handleCancel = () => {
    this.setState({
      uploadName: '',
      showAddFileModal: false,
      fileList: [],
    })
  }

  handleDeleteFileValue = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryDeleteGlobalFile',
      payload: {
        id,
      },
    })
      .then(() => {
        this.queryCaseProjectConfig();
      });
  }

  queryAddGlobalFile = (keyName, keyValue, fileName, projectId) => {
    const { dispatch } = this.props;
    const { id } = this.state.caseProjectConfig;
    dispatch({
      type: 'caseInfo/queryAddGlobalFile',
      payload: {
        keyName, keyValue, fileName, projectId,
      },
    })
      .then(() => {
        this.queryCaseProjectConfig();
      });
  }

  render() {
    const { caseProjectConfig, globalValues, valueType, showAddFileModal, fileList, uploadName } = this.state;
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
    const props = {
      name: 'file',
      action: '/api/UAT/project/uploadTestFile',
      onChange: this.handleUploadFileChange,
      multiple: false,
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
        <Form.Item label="文件参数" className={styles.paramsContainer}>
          {caseProjectConfig.globalFiles && caseProjectConfig.globalFiles.map(item => (
            <Form key={item.id} layout="inline">
              <Form.Item labelAlign="left" >
                <span className={styles.keyName}>{item.keyName || ''}</span>
              </Form.Item>
              <Form.Item labelAlign="left" >
                <span>{item.fileName || ''}</span>
              </Form.Item>
              <Form.Item>
                <Button type="link" icon="minus-square" onClick={() => this.handleDeleteFileValue(item.id)}/>
              </Form.Item>
            </Form>)
          )}
          <Button type="dashed" onClick={() => this.handleAddFile()} style={{ width: '90%' }}>
            <Icon type="plus" /> 添加文件参数
          </Button>
        </Form.Item>
        <Modal
          title="上传文件参数"
          visible={showAddFileModal}
          onOk={this.handleUploadOk}
          onCancel={this.handleCancel}
          destroyOnClose
          closable
        >
          <Form.Item label="参数名称" labelAlign="left" >
            <Input placeholder="请输入参数名称" value={uploadName} onChange={e => this.setState({ uploadName: e.target.value })} />
          </Form.Item>
          <Form.Item label="上传文件" labelAlign="left" >
            <div>
              <Upload {...props} fileList={fileList}>
                <Button>
                  <Icon type="upload" /> 上传文件
                </Button>
              </Upload>
            </div>
          </Form.Item>
        </Modal>
      </Form>
    );
  }
}
