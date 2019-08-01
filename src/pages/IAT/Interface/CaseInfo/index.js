import React, { Component } from 'react';
import { Button, Skeleton, Input, Tooltip, Icon, Divider, Switch, Radio, Form, Select, Row, Col } from 'antd';
import AceEditor from 'react-ace';
import io from 'socket.io-client';
import { connect } from 'dva';

import 'brace/mode/java';
import 'brace/theme/solarized_light';
import styles from './index.less'
import FormKeyValuesSearchCell from '../../../../components/FormKeyValuesSearchCell/index';
import FormKeyValuesCell from '../../../../components/FormKeyValuesCell/index';

const InputGroup = Input.Group;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ interfaceCase, loading }) => ({
  interfaceCase,
  loading: loading.effects['interfaceCase/queryCaseDataWithLoading'],
}))
@Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    // 表单项变化时请求数据
    // eslint-disable-next-line
    if(changedValues){
      props.handleFormValueChange(allValues)
    }
  },
})
export default class ApiCaseInfoPage extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      caseData: {},
      preShellData: null,
      postShellData: null,
      preShellChecked: false,
      postShellChecked: false,
    };
  }

  componentWillMount() {
    const { selectNoteId } = this.props;
    this.queryCaseDataWithLoading(selectNoteId);
    // this.queryProjectRootInfo(selectNoteId)
    // this.queryProjectGlobalValues(selectNoteId);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.selectNoteId !== nextProps.selectNoteId) {
      const { form } = this.props;
      form.resetFields();
      this.queryCaseDataWithLoading(nextProps.selectNoteId);
      return true;
    }
    if (this.props.form !== nextProps.form) {
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  queryCaseDataWithLoading=caseId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryCaseDataWithLoading',
      payload: {
        caseId,
      },
    })
      .then(() => {
        const { caseData } = this.props.interfaceCase;
        this.setState({
          caseData,
          postShellChecked: caseData.postShell !== null,
          preShellChecked: caseData.preShell !== null,
        });
      });
  };

  queryCaseData=caseId => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryCaseData',
      payload: {
        caseId,
      },
    })
      .then(() => {
        const { caseData } = this.props.interfaceCase;
        this.setState({
          caseData,
          postShellChecked: caseData.postShell !== null,
          preShellChecked: caseData.preShell !== null,
        });
      });
  };

  handleValueChange = () => {
    const { dispatch, selectNoteId, form } = this.props;
    const name = form.getFieldValue('name');
    dispatch({
      type: 'interfaceCase/queryUpdateFolderName',
      payload: {
        id: selectNoteId,
        name,
      },
    })
      .then(() => {
        // this.queryCaseData(selectNoteId);
        this.props.handleTreeUpdate();
      })
  }

  handleKeyValueChange = (valueId, values) => {
    const { dispatch } = this.props;
    const { id } = this.state.caseData;
    dispatch({
      type: 'interfaceCase/queryUpdateKeyValues',
      payload: {
        valueId, ...values,
      }
    })
      .then(() => {
        this.queryCaseData(id)
      })
  }

  handleExtractValueChange = (id, values) => {
    const { dispatch } = this.props;
    const { caseData } = this.state;
    dispatch({
      type: 'interfaceCase/queryUpdateGlobalValues',
      payload: {
        id, ...values,
      },
    })
      .then(() => {
        this.queryCaseData(caseData.id);
      });
  }

  handleAddEmptyValue = valueType => {
    const { dispatch } = this.props;
    const { id } = this.state.caseData;
    dispatch({
      type: 'interfaceCase/queryAddEmtpyValue',
      payload: {
        valueType, caseId: id,
      }
    })
      .then(() => {
        this.queryCaseData(id)
      })
  }

  queryAddEmptyGlobalValue = valueType => {
    const { dispatch } = this.props;
    const { id } = this.state.caseData;
    dispatch({
      type: 'interfaceCase/queryAddGlobalValues',
      payload: {
        keyName: '', keyValue: '', projectId: id, valueType, caseId: id,
      },
    })
      .then(() => {
        this.queryCaseData(id);
      });
  }

  handleDeleteValue = valueId => {
    const { dispatch } = this.props;
    const { id } = this.state.caseData;
    dispatch({
      type: 'interfaceCase/queryDeleteValue',
      payload: {
        valueId,
      }
    })
      .then(() => {
        this.queryCaseData(id)
      })
  }

  handleCaseShellChange = (caseId, shellType) => {
    const { preShellData, postShellData } = this.state;
    let editValue;
    if (shellType === 1) {
      editValue = preShellData;
    } else {
      editValue = postShellData;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryUpdateShellData',
      payload: {
        caseId, shellType, editValue,
      }
    })
      .then(() => {
        this.queryCaseData(caseId)
      })
  }

  handleCaseBodyDataChange = caseId => {
    console.log(caseId);
    const { bodyData } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryUpdateCaseBodyData',
      payload: {
        caseId, bodyData
      }
    })
      .then(() => {
        this.queryCaseData(caseId)
      })
  }

  handleCheckShell = (shellType, value) => {
    const { id } = this.state.caseData;
    if (shellType === 1) {
      this.setState({
        preShellChecked: value,
      }, () => {
        if (!value) {
          const { form } = this.props;
          this.setState({
            preShellData: null,
          })
          form.setFieldsValue({
            preShellData: '',
          }, () => {
            this.handleCaseShellChange(id, 1)
          });
        }
      })
    }
    if (shellType === 2) {
      this.setState({
        postShellChecked: value,
      }, () => {
        if (!value) {
          const { form } = this.props;
          this.setState({
            postShellData: null,
          })
          form.setFieldsValue({
            postShellData: '',
          }, () => {
            this.handleCaseShellChange(id, 2)
          });
        }
      });
    }
  }

  handleDeleteGlobalValue = id => {
    this.queryDeleteGlobalValues(id);
  }

  queryDeleteGlobalValues = id => {
    const { dispatch } = this.props;
    const { caseData } = this.state;
    dispatch({
      type: 'interfaceCase/queryDeleteGlobalValues',
      payload: {
        id,
      },
    })
      .then(() => {
        this.queryCaseData(caseData.id);
      });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { loading } = this.props;
    const { caseData, preShellChecked, postShellChecked, preShellData, postShellData } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 10 },
      },
    };
    return (
      <Skeleton loading={loading}>
        <Form {...formItemLayout}>
          <Divider dashed orientation="left">基本信息</Divider>
          <Form.Item label="用例名称" >
            {getFieldDecorator('name', {
              initialValue: caseData.name || undefined,
            })(
              <Input
                size="small"
                onBlur={() => this.handleValueChange()}
                style={{ width: 300 }}
              />,
            )}
          </Form.Item>
          <Divider dashed orientation="left">请求设置</Divider>
          <Form.Item label="前置shell">
            <div>
              {getFieldDecorator('preShellType', {
                initialValue: preShellChecked,
              })(
                <Switch
                  size="small"
                  checked={preShellChecked}
                  onChange={value => this.handleCheckShell(1, value)}
                />,
              )}
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('preShellData', {
                  initialValue: caseData.preShell || '',
                })(
                  <AceEditor
                    mode="java"
                    theme="solarized_light"
                    style={{
                      margin: '8px 0',
                      display: getFieldValue('preShellType') ? 'block' : 'none',
                    }}
                    value={preShellData}
                    name="preShellInput"
                    editorProps={{ $blockScrolling: true }}
                    height="300px"
                    onChange={newValue => this.setState({ preShellData: newValue })}
                    onBlur={() => this.handleCaseShellChange(caseData.id, 1)}
                  />,
                )}
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item label="请求域名" >
            {getFieldDecorator('domain', {
              initialValue: caseData.domain || '',
            })(
              <Input
                size="small"
                placeholder="请求域名. eg: http://www.test.com:5001"
                style={{ width: 400 }}
              />,
            )}
          </Form.Item>
          <Form.Item label="请求路径" >
            <InputGroup size="small">
              <Row gutter={8}>
                <Col span={5}>
                  {getFieldDecorator('method', {
                    initialValue: caseData.method || 'POST',
                  })(
                    <Select size="small" style={{ width: '100%' }}>
                      <Option title="POST" value="POST">POST</Option>
                      <Option title="GET" value="GET">GET</Option>
                    </Select>,
                  )}
                </Col>
                <Col span={8}>
                  {getFieldDecorator('path', {
                    initialValue: caseData.path || '',
                  })(
                    <Input
                      style={{ width: 300 }}
                      placeholder="/path"
                    />,
                  )}
                </Col>
              </Row>
            </InputGroup>
          </Form.Item>
          <Form.Item label="Header设置" className={styles.keyValueContainer}>
            {caseData.headerValues && caseData.headerValues.map(item => {
                if (item.type === 'add') {
                  return (
                    <Button key={item.type} type="dashed" size="small" onClick={() => this.handleAddEmptyValue(1)} style={{ width: '90%' }}>
                      <Icon type="plus" /> 添加请求头设置
                    </Button>)
                }
                return (
                  <FormKeyValuesSearchCell
                    size="small"
                    caseId={caseData.id}
                    key={item.id}
                    item={item}
                    handleValueChange={values => this.handleKeyValueChange(item.id, values)}
                    handleDeleteGlobalValue={() => this.handleDeleteValue(item.id)}
                  />)
              }
            )}
          </Form.Item>
          <Form.Item label="参数类型" >
            {getFieldDecorator('paramType', {
              initialValue: caseData.paramType || 1,
            })(
              <Radio.Group>
                <Radio value={1}>
                  x-www-form-urlencoded
                </Radio>
                <Radio value={3}>
                  form-data
                </Radio>
                <Radio value={2}>
                  <Tooltip title="设置该类型参数后，将不支持任务中的全局默认参数设置">
                    <a>json</a>
                  </Tooltip>
                </Radio>
                <Radio value={4}>
                  <Tooltip title="设置该类型参数后，将不支持任务中的全局默认参数设置">
                    <a>Body-data</a>
                  </Tooltip>
                </Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="请求参数" className={getFieldValue('paramType') !== 4 ? styles.keyValueContainer : ''}>
            {(getFieldValue('paramType') !== 4 && caseData.paramsValues) && caseData.paramsValues.map(item => {
                if (item.type === 'add') {
                  return (
                    <Button key={item.type} type="dashed" size="small" onClick={() => this.handleAddEmptyValue(2)} style={{ width: '90%' }}>
                      <Icon type="plus" /> 添加参数设置
                    </Button>)
                }
                return (
                  <FormKeyValuesSearchCell
                    size="small"
                    caseId={caseData.id}
                    key={item.id}
                    item={item}
                    handleValueChange={values => this.handleKeyValueChange(item.id, values)}
                    handleDeleteGlobalValue={() => this.handleDeleteValue(item.id)}
                  />)
              }
            )}
            {(getFieldValue('paramType') === 4) && (
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('bodyData', {
                  initialValue: caseData.bodyData || '',
                })(
                  <AceEditor
                    mode="json"
                    theme="solarized_light"
                    style={{
                      margin: '8px 0',
                    }}
                    value={caseData.bodyData || undefined}
                    name="bodyDataInput"
                    editorProps={{ $blockScrolling: true }}
                    height="300px"
                    onChange={newValue => this.setState({ bodyData: newValue })}
                    onBlur={() => this.handleCaseBodyDataChange(caseData.id)}
                  />,
                )}
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item label="后置shell">
            <div>
              {getFieldDecorator('postShellType', {
                initialValue: postShellChecked,
              })(
                <Switch
                  size="small"
                  checked={postShellChecked}
                  onChange={value => this.handleCheckShell(2, value)}
                />,
              )}
              <Form.Item style={{ marginBottom: 0 }}>
                {getFieldDecorator('postShellData', {
                  initialValue: caseData.postShell || '',
                })(
                  <AceEditor
                    mode="java"
                    theme="solarized_light"
                    style={{
                      margin: '8px 0',
                      display: getFieldValue('postShellType') ? 'block' : 'none',
                    }}
                    value={postShellData}
                    name="postShellInput"
                    editorProps={{ $blockScrolling: true }}
                    height="300px"
                    onChange={newValue => this.setState({ postShellData: newValue })}
                    onBlur={() => this.handleCaseShellChange(caseData.id, 2)}
                  />,
                )}
              </Form.Item>
            </div>
          </Form.Item>
          <Divider dashed orientation="left">返回校验</Divider>
          <Form.Item label="校验类型">
            <div>
              {getFieldDecorator('assertType', {
                initialValue: caseData.assertType || 1,
              })(
                <Radio.Group>
                  <Radio value={1}>
                    响应断言
                  </Radio>
                  <Radio value={2}>
                    JSON断言
                  </Radio>
                </Radio.Group>,
              )}
              <Form.Item className={styles.keyValueContainer}>
                {getFieldValue('assertType') === 1 ? (
                  <div style={{ marginTop: 10}}>
                    {
                      caseData.textAssertValues && caseData.textAssertValues.map(item => {
                          if (item.type === 'add') {
                            return (
                              <Button key={item.type} type="dashed" size="small" onClick={() => this.handleAddEmptyValue(3)} style={{ width: '90%' }}>
                                <Icon type="plus" /> 添加校验设置
                              </Button>)
                          }
                          return (
                            <div style={{ marginBottom: 10, display: 'flex', flexDirection: 'row' }} key={item.id}>
                            <TextArea
                              placeholder={'需要校验的返回值.eg: "code":0 '}
                              defaultValue={item.value}
                              autosize={{ minRows: 2, maxRows: 6 }}
                              onBlur={
                                e => this.handleKeyValueChange(item.id, { keyValue: e.target.value })
                              }
                            />
                              <div className={styles.section_delete}>
                                <Icon type="minus-circle" onClick={() => this.handleDeleteValue(item.id)} />
                              </div>
                            </div>)
                        }
                      )
                    }
                  </div>
                ) : (
                  caseData.jsonAssertValues && caseData.jsonAssertValues.map(item => {
                      if (item.type === 'add') {
                      return (
                      <Button key={item.type} type="dashed" size="small" onClick={() => this.handleAddEmptyValue(4)} style={{ width: '90%' }}>
                        <Icon type="plus" /> 添加校验设置
                      </Button>)
                    }
                    return (
                    <FormKeyValuesSearchCell
                      size="small"
                      caseId={caseData.id}
                      key={item.id}
                      item={item}
                      handleValueChange={values => this.handleKeyValueChange(item.id, values)}
                      handleDeleteGlobalValue={() => this.handleDeleteValue(item.id)}
                    />)
                  }
                  )
                )}
              </Form.Item>
            </div>
          </Form.Item>
          <Divider dashed orientation="left">参数化设置</Divider>
          <Form.Item label="提取方式">
            <div>
              {getFieldDecorator('extractType', {
                initialValue: caseData.extractType || 0,
              })(
                <Radio.Group>
                  <Radio value={0}>
                    不提取
                  </Radio>
                  <Radio value={1}>
                    JSON提取
                  </Radio>
                  <Radio value={2}>
                    正则提取
                  </Radio>
                </Radio.Group>,
              )}
              <Form.Item className={styles.keyValueContainer}>
                {getFieldValue('extractType') !== 0 && (
                  caseData.jsonExtractValues && caseData.jsonExtractValues.map(item => {
                      if (item.type === 'add') {
                        return (
                          <Button key={item.type} type="dashed" size="small" onClick={() => this.queryAddEmptyGlobalValue(3)} style={{ width: '90%' }}>
                            <Icon type="plus" /> 添加参数化设置
                          </Button>)
                      }
                      return (
                        <FormKeyValuesCell
                          size="small"
                          caseId={caseData.id}
                          key={item.id}
                          item={item}
                          handleValueChange={values => this.handleExtractValueChange(item.id, values)}
                          handleDeleteGlobalValue={() => this.handleDeleteGlobalValue(item.id)}
                        />)
                    }
                  )
                )}
              </Form.Item>
            </div>
          </Form.Item>
        </Form>
      </Skeleton>
    );
  }
}
