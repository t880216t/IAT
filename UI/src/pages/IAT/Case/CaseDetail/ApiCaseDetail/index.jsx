import React, { Component } from 'react';
import {Button, message, Space} from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormDateRangePicker, ProFormSelect, } from '@ant-design/pro-form';
import {EditFilled, CaretRightOutlined, PlusOutlined} from '@ant-design/icons';
import ProCard from "@ant-design/pro-card";
import {connect} from 'dva';

import ApiRequestConfig from "../ApiRequestConfig";
import ApiRequestParamsConfig from "../ApiRequestParamsConfig";
import ApiResponseInfo from "../ApiResponseInfo";
import CaseRequestConfigInfo from "@/pages/IAT/Task/TaskDetail/CaseItemDetail/CaseRequestConfigInfo";
import CaseDependent from "./CaseDependent";
import CaseScripts from "./CaseScripts";
import CaseAssertion from "./CaseAssertion";
import CaseValueExtract from "./CaseValueExtract";
import ScriptModal from "./CaseScripts/ScriptModal";
import Environments from "@/pages/IAT/Config/Project/Environments"

import styles from './index.less';


@connect(({iatCase, loading}) => ({
  iatCase,
  loading: loading.effects['iatCase/queryApiCaseInfo'],
}))
export default class Page extends Component {
  constructor() {
    super();
    this.state = {
      caseInfo: {}
    }
    this.formRef = React.createRef();
  }

  componentDidMount() {
  }

  queryApiCaseInfo = caseId => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatCase/queryApiCaseInfo',
      payload: {caseId},
    }).then(() => {
      const {caseInfo} = this.props.iatCase;
      this.setState({
        caseInfo,
      });
    });
  };

  render() {
    const {caseInfo} = this.state;
    const {caseId, projectId, loading} = this.props

    return (
      <DrawerForm
        size="small"
        title={caseInfo?.case_name}
        formRef={this.formRef}
        width={"80vw"}
        trigger={
          <Button type="primary" size="small" icon={<EditFilled />} onClick={() => this.queryApiCaseInfo(caseId)}>
            编辑
          </Button>
        }
        autoFocusFirstInput
        submitter={false}
        drawerProps={{
          placement: "left",
          destroyOnClose: true,
          bodyStyle: {
            background: '#f1f2f6'
          },
          extra: (
            <Space>
              <Environments size={'normal'} text={"默认环境"} projectId={projectId} />
              <Button type="primary" icon={<CaretRightOutlined />} onClick={(e) => {
                e.stopPropagation();
              }}>
                调试
              </Button>
            </Space>
          )
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values.name);
          message.success('提交成功');
          return true;
        }}
      >
        <ProCard direction="column" ghost gutter={[0, 8]} loading={loading}>
          <ProCard bordered title={'请求配置'} collapsible defaultCollapsed>
            {caseInfo?.request_config && <CaseRequestConfigInfo isCase={true} data={caseInfo?.request_config} />}
          </ProCard>
          <ProCard bordered title={'参数配置'} bodyStyle={{padding: 0}}>
            {caseInfo?.request_config && <ApiRequestParamsConfig isCase={true} data={caseInfo?.request_config} />}
          </ProCard>
          <ProCard bordered title={'响应信息'} collapsible defaultCollapsed bodyStyle={{padding: 0}}>
            <ApiResponseInfo />
          </ProCard>
          <ProCard bodyStyle={{padding: 5}} bordered title={'接口依赖'} extra={<Button icon={<PlusOutlined/>} type="primary">添加</Button>}>
            <CaseDependent />
          </ProCard>
          <ProCard bordered title={'处理脚本'} extra={<ScriptModal />}>
            <CaseScripts />
          </ProCard>
          <ProCard bordered title={'返回值断言'} bodyStyle={{padding: 0}} extra={<Button icon={<PlusOutlined/>} type="primary">添加</Button>}>
            <CaseAssertion />
          </ProCard>
          <ProCard bordered title={'参数化提取'} bodyStyle={{padding: 0}} extra={<Button icon={<PlusOutlined/>} type="primary">添加</Button>}>
            <CaseValueExtract />
          </ProCard>
        </ProCard>
      </DrawerForm>
    );
  }
}
