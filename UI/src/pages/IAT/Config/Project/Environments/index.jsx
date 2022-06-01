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
import {
  queryEnvReqHeaderConfigAdd,
  queryEnvReqHeaderConfigDel,
  queryEnvRequestConfigUpdate
} from "@/pages/IAT/Config/service";


@connect(({iatConfig, loading}) => ({
  iatConfig,
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
    if (projectId){
      this.setState({projectId},() => this.queryProjectEnvList())
    }
  }

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
        })
      }
    });
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

  queryEnvReqHeaderConfig = () => {
    const {dispatch} = this.props;
    const {selectEnvId} = this.state;
    dispatch({
      type: 'iatConfig/queryEnvReqHeaderConfig',
      payload: {envId: selectEnvId},
    }).then(() => {
      const {envReqHerderConfig} = this.props.iatConfig;
      this.setState({
        envReqHerderConfig,
      });
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

  setVisible = (visible ) => {
    this.setState({visible})
  };

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

  handleEnvRequestConfigUpdate = (e) => {
    this.queryEnvRequestConfigUpdate(e)
  };

  handleAddReqHeader = () => {
    this.queryEnvReqHeaderConfigAdd()
  };

  handleDelReqHeader = (e) => {
    this.queryEnvReqHeaderConfigDel(e)
  };

  handleEnvReqHerderConfigUpdate = (e) => {
    this.queryEnvReqHeaderConfigUpdate(e)
  };

  handleEnvSelect = (e) => {
    this.setState({
      selectEnvId: e?.envId,
      envReqConfig: null,
      envReqHerderConfig: null,
    },()=>{
      this.queryEnvRequestConfigWithLoading()
      this.queryEnvReqHeaderConfig()
    })
  };

  render() {
    const {buttonType, text, loading} = this.props;
    const {visible, envList, selectEnvId, envReqHerderConfig, envReqConfig} = this.state;
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
          <Layout
            className={styles.layoutBackground}
          >
            <Sider width={200}>
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
                    {envReqHerderConfig && <HeaderConfig data={envReqHerderConfig} onAdd={this.handleAddReqHeader} onDel={this.handleDelReqHeader} onChange={this.handleEnvReqHerderConfigUpdate} />}
                  </TabPane>
                  <TabPane tab="全局变量" key="3">
                    <ParamsConfig />
                  </TabPane>
                  <TabPane tab="容器配置" key="2">
                    <HostConfig />
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
