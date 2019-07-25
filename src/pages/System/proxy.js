import React, { PureComponent } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Table, Form, Button, Input, Modal, Icon, Upload, Radio, message } from 'antd';
import { connect } from 'dva';
import chromeLogo from '../../assets/chrome.png';
import firefoxLogo from '../../assets/firefox.png';
import styles from './proxy.less';

const FormItem = Form.Item;

@connect(({ system }) => ({
  system,
}))
export default class Devtest extends PureComponent {
  state={
    visibleAddProxy: false,
    proxyName: null,
    proxyPath: null,
    browserType: 1,
    fileList: [],
    proxyConfigList: [],
  }

  componentWillMount() {
    this.queryProxyConfigList();
  }

  handleCancel = () => {
    this.setState({
      visibleAddProxy: false,
      proxyName: null,
      proxyPath: null,
      browserType: 1,
      fileList: [],
    });
  }

  handleAddOk = () => {
    // this.setState({ visibleAddProxy: false });
    let filePath;
    const { proxyName, browserType, fileList, proxyPath } = this.state;
    if (!proxyName) {
      message.warning('请填写代理名称');
      return;
    }
    if (browserType === 1 && fileList.length === 0) {
      message.warning('请上传火狐代理配置文件');
      return;
    }
    if (browserType === 2 && !proxyPath) {
      message.warning('请填写配置信息');
      return;
    }
    if (browserType === 1) {
      filePath = fileList[0].response.content.filePath;
    }
    this.queryAddProxyConfig(proxyName, browserType, filePath, proxyPath);
  }

  queryAddProxyConfig = (proxyName, browserType, filePath, proxyPath) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryAddProxyConfig',
      payload: {
        proxyName, browserType, filePath, proxyPath,
      },
    })
      .then(() => {
        this.queryProxyConfigList();
        this.handleCancel();
      });
  };

  queryProxyConfigList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryProxyConfigList',
      payload: {},
    })
      .then(() => {
        const { proxyConfigList } = this.props.system;
        this.setState({ proxyConfigList });
      });
  };

  handleTypeChange = value => {
    this.setState({ browserType: value, fileList: [], proxyPath: null });
  }

  handleUploadChange = info => {
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

  handleRemoveFile = () => {
    this.setState({ fileList: [] });
  }

  queryDeleteProxyConfig = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryDeleteProxyConfig',
      payload: {
        id,
      },
    })
      .then(() => {
        this.queryProxyConfigList();
      });
  }

  render() {
    const { visibleAddProxy, browserType, proxyName, proxyPath, proxyConfigList } = this.state;
    const columns = [
      {
        title: '类型',
        dataIndex: 'browserType',
        key: 'browserType',
        render: (text, record) => (
          record.browserType === 1 ? (
            <img src={firefoxLogo} alt="" className={styles.browserLogo}/>
          )
            :
          (
            <img src={chromeLogo} alt="" className={styles.browserLogo}/>
          )
        ),
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      },
      {
        title: '配置信息',
        dataIndex: 'path',
        key: 'path',
        width: '30%',
      },
      {
        title: '新建人',
        dataIndex: 'add_user',
        key: 'add_user',
      },
      {
        title: '新建时间',
        dataIndex: 'add_time',
        key: 'add_time',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <div>
            <a onClick={() => this.queryDeleteProxyConfig(record.id)}>删除</a>
          </div>
        ),
      },
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 18 },
      },
    };
    const props = {
      name: 'file',
      action: '/api/UAT/project/uploadFile',
      accept: '.zip',
      onChange: this.handleUploadChange,
      onRemove: this.handleRemoveFile,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={() => this.setState({ visibleAddProxy: true })}
            >
              <Icon type="plus" />
              添加代理
            </Button>
          </div>
          <Table rowKey="id" dataSource={proxyConfigList} columns={columns} />
        </Card>
        <Modal
          title="添加代理"
          visible={visibleAddProxy}
          width={600}
          destroyOnClose
          onOk={this.handleAddOk}
          onCancel={this.handleCancel}
        >
          <FormItem {...formItemLayout} label="名称">
            <Input value={proxyName} onChange={e => this.setState({ proxyName: e.target.value })}/>
          </FormItem>
          <FormItem {...formItemLayout} label="浏览器">
            <Radio.Group value={browserType} onChange={e => this.handleTypeChange(e.target.value)}>
              <Radio value={1}>火狐</Radio>
              <Radio value={2}>谷歌</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem {...formItemLayout} label="配置">
            {browserType === 1 && (
              <Upload {...props} fileList={this.state.fileList}>
                <Button>
                  <Icon type="upload" /> zip配置压缩文件
                </Button>
              </Upload>
            )}
            {browserType === 2 && (
              <Input
                placeholder="eg:localhost:8888"
                value={proxyPath}
                onChange={e => this.setState({ proxyPath: e.target.value })}
              />)}
          </FormItem>
        </Modal>
      </PageHeaderWrapper>
      );
  }
}
