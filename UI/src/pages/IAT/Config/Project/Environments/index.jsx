import { DeploymentUnitOutlined } from '@ant-design/icons';
import {
  ProCard,
} from '@ant-design/pro-components';
import { Button, Modal, Layout, Spin, Tabs } from 'antd';
import React from 'react';
import {connect} from 'dva';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

import EnvList from "./EnvList"
import RequestConfig from "./RequestConfig"
import HeaderConfig from "./HeaderConfig"
import ParamsConfig from "./ParamsConfig"
import HostConfig from "./HostConfig"
import styles from "./index.less"


@connect(({iatConfig, loading}) => ({
  iatConfig,
  listLoading: loading.effects['iatConfig/queryProjectEnvList'],
  loading: loading.effects['iatConfig/queryEnvRequestConfigWithLoading'],
}))
export default class Page extends React.Component {
  state = {
    visible: false,
    projectId: '',
    envList: [],
    selectEnvId: null,
  };

  componentDidMount() {
    const {projectId} = this.props;
    console.log(projectId);
    if (projectId){
      this.setState({projectId},() => this.queryProjectEnvList())
    }
  }

  /***
   * 环境配置
   * ***/

  handleEnvAdd = (e) => {
    this.queryProjectEnvAdd(e)
  };

  handleEnvUpdate = (e) => {
    this.queryProjectEnvUpdate(e)
  };

  handleEnvCopy = (e) => {
    this.queryProjectEnvCopy(e)
  };

  handleEnvDel = (e) => {
    this.queryProjectEnvDel(e)
  };

  handleEnvSelect = (e) => {
    this.setState({
      selectEnvId: e?.envId,
      envReqConfig: null,
      envReqHeaderConfig: null,
    },()=>{
      this.queryEnvRequestConfigWithLoading()
      this.queryEnvReqHeaderConfig()
      this.queryEnvParamsConfig()
      this.queryEnvHostConfig()
    })
  };

  queryProjectEnvList = () => {
    const {dispatch} = this.props;
    const {projectId} = this.state;
    dispatch({
      type: 'iatConfig/queryProjectEnvList',
      payload: {projectId},
    }).then(() => {
      const {envList} = this.props.iatConfig;
      this.setState({
        envList,
      });
      if (envList && envList.length > 0){
        this.setState({selectEnvId: envList[0].id},()=>{
          this.queryEnvRequestConfigWithLoading()
          this.queryEnvReqHeaderConfig()
          this.queryEnvParamsConfig()
          this.queryEnvHostConfig()
        })
      }
    });
  };

  queryProjectEnvUpdate = params => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatConfig/queryProjectEnvUpdate',
      payload: {...params},
    }).then(() => {
      this.queryProjectEnvList()
    });
  };

  queryProjectEnvAdd = params => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatConfig/queryProjectEnvAdd',
      payload: {...params},
    }).then(() => {
      this.queryProjectEnvList()
    });
  };

  queryProjectEnvCopy = params => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatConfig/queryProjectEnvCopy',
      payload: {...params},
    }).then(() => {
      this.queryProjectEnvList()
    });
  };

  queryProjectEnvDel = params => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatConfig/queryProjectEnvDel',
      payload: {...params},
    }).then(() => {
      this.queryProjectEnvList()
    });
  };

  /***
   * 请求配置
   * ***/

  handleEnvRequestConfigUpdate = (e) => {
    this.queryEnvRequestConfigUpdate(e)
  };

  queryEnvRequestConfig = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvRequestConfig',
      payload: {envId: selectEnvId},
    }).then(() => {
      const {envReqConfig} = this.props.iatConfig;
      this.setState({
        envReqConfig,
      });
    });
  };

  queryEnvRequestConfigWithLoading = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvRequestConfigWithLoading',
      payload: {envId: selectEnvId},
    }).then(() => {
      const {envReqConfig} = this.props.iatConfig;
      this.setState({
        envReqConfig,
      });
    });
  };

  queryEnvRequestConfigUpdate = (params) => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvRequestConfigUpdate',
      payload: {...params, envId: selectEnvId},
    }).then(() => {
      this.queryEnvRequestConfig()
    });
  };

  /***
   * 请求头配置
   * ***/

  handleAddReqHeader = () => {
    this.queryEnvReqHeaderConfigAdd()
  };

  handleDelReqHeader = (e) => {
    this.queryEnvReqHeaderConfigDel(e)
  };

  handleEnvReqHeaderConfigUpdate = (e) => {
    this.queryEnvReqHeaderConfigUpdate(e)
  };

  queryEnvReqHeaderConfig = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvReqHeaderConfig',
      payload: {envId: selectEnvId},
    }).then(() => {
      const {envReqHeaderConfig} = this.props.iatConfig;
      this.setState({
        envReqHeaderConfig,
      });
    });
  };

  queryEnvReqHeaderConfigAdd = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvReqHeaderConfigAdd',
      payload: {envId: selectEnvId},
    }).then(() => {
      this.queryEnvReqHeaderConfig()
    });
  };

  queryEnvReqHeaderConfigDel = params => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvReqHeaderConfigDel',
      payload: {...params, envId: selectEnvId},
    }).then(() => {
      this.queryEnvReqHeaderConfig()
    });
  };

  queryEnvReqHeaderConfigUpdate = params => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvReqHeaderConfigUpdate',
      payload: {...params, envId: selectEnvId},
    }).then(() => {
      this.queryEnvReqHeaderConfig()
    });
  };

  /***
   * 全局变量配置
   * ***/

  handleParamsConfigAdd = () => {
    this.queryEnvParamsConfigAdd()
  };

  handleParamsConfigDel = (e) => {
    this.queryEnvParamsConfigDel(e)
  };

  handleParamsConfigUpdate = (e) => {
    this.queryEnvParamsConfigUpdate(e)
  };

  queryEnvParamsConfig = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvParamsConfig',
      payload: {envId: selectEnvId},
    }).then(() => {
      const {envParamsConfig} = this.props.iatConfig;
      this.setState({
        envParamsConfig,
      });
    });
  };

  queryEnvParamsConfigAdd = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvParamsConfigAdd',
      payload: {envId: selectEnvId},
    }).then(() => {
      this.queryEnvParamsConfig()
    });
  };

  queryEnvParamsConfigDel = params => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvParamsConfigDel',
      payload: {...params, envId: selectEnvId},
    }).then(() => {
      this.queryEnvParamsConfig()
    });
  };

  queryEnvParamsConfigUpdate = params => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvParamsConfigUpdate',
      payload: {...params, envId: selectEnvId},
    }).then(() => {
      this.queryEnvParamsConfig()
    });
  };

  /***
   * 全局host配置
   * ***/

  handleHostConfigAdd = () => {
    this.queryEnvHostConfigAdd()
  };

  handleHostConfigDel = (e) => {
    this.queryEnvHostConfigDel(e)
  };

  handleHostConfigUpdate = (e) => {
    this.queryEnvHostConfigUpdate(e)
  };

  queryEnvHostConfig = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvHostConfig',
      payload: {envId: selectEnvId},
    }).then(() => {
      const {envHostConfig} = this.props.iatConfig;
      this.setState({
        envHostConfig,
      });
    });
  };

  queryEnvHostConfigAdd = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvHostConfigAdd',
      payload: {envId: selectEnvId},
    }).then(() => {
      this.queryEnvHostConfig()
    });
  };

  queryEnvHostConfigDel = params => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvHostConfigDel',
      payload: {...params, envId: selectEnvId},
    }).then(() => {
      this.queryEnvHostConfig()
    });
  };

  queryEnvHostConfigUpdate = params => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvHostConfigUpdate',
      payload: {...params, envId: selectEnvId},
    }).then(() => {
      this.queryEnvHostConfig()
    });
  };

  setVisible = (visible ) => {
    this.setState({visible})
  };

  render() {
    const {buttonType, text, loading, listLoading} = this.props;
    const {visible, envList, envHostConfig, envParamsConfig, envReqHeaderConfig, envReqConfig} = this.state;
    const isLinkButton = buttonType === "link"
    return (
      <>
        {isLinkButton?(
          <Button type="link" size="small" onClick={() => this.setVisible(true)}>
            {text || 0}
          </Button>
        ):(
          <Button type="primary" size="small" onClick={(e) => {
            this.setVisible(true)
          }}>
            <DeploymentUnitOutlined />
            环境设置
          </Button>
        )}
        <Modal
          title="环境管理"
          width={"80vw"}
          visible={visible}
          destroyOnClose
          onCancel={()=>this.setVisible(false)}
          maskClosable={false}
          footer={null}
        >
          <Layout className={styles.layoutBackground}>
            <Sider width={200} className={styles.layoutBackground}>
              <EnvList
                envList={envList}
                onAdd={this.handleEnvAdd}
                onUpdate={this.handleEnvUpdate}
                onCopy={this.handleEnvCopy}
                onDel={this.handleEnvDel}
                onClick={this.handleEnvSelect}
              />
            </Sider>
            <Content
              style={{
                padding: '0 20px',
                minHeight: 280,
              }}
            >
              <Spin spinning={loading}>
                <Tabs defaultActiveKey="1" type="card" size={"small"}>
                  <TabPane tab="请求配置" key="1">
                    {envReqConfig && <RequestConfig data={envReqConfig} onChange={this.handleEnvRequestConfigUpdate} />}
                    {envReqHeaderConfig && <HeaderConfig data={envReqHeaderConfig} onAdd={this.handleAddReqHeader} onDel={this.handleDelReqHeader} onChange={this.handleEnvReqHeaderConfigUpdate} />}
                  </TabPane>
                  <TabPane tab="全局变量" key="3">
                    {envParamsConfig && <ParamsConfig data={envParamsConfig} onAdd={this.handleParamsConfigAdd} onDel={this.handleParamsConfigDel} onChange={this.handleParamsConfigUpdate} />}
                  </TabPane>
                  <TabPane tab="容器配置" key="2">
                    {envHostConfig && <HostConfig data={envHostConfig} onAdd={this.handleHostConfigAdd} onDel={this.handleHostConfigDel} onChange={this.handleHostConfigUpdate} />}
                  </TabPane>
                </Tabs>
              </Spin>
            </Content>
          </Layout>
        </Modal>
      </>
    );
  }
}
