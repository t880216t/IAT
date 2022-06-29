import React, {Component} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { CopyOutlined } from '@ant-design/icons';
import {Select, Button, Descriptions, Space, Switch, Form} from 'antd';
import {connect} from 'dva';

import styles from './index.less';
import ApiRequestConfig from './ApiRequestConfig';
import ApiCaseList from './ApiCaseList';
import ApiRequestParamsConfig from './ApiRequestParamsConfig';
import ApiResponseInfo from './ApiResponseInfo';
import ApiCaseInfoModal from './ApiCaseInfoModal';
import {queryApiCaseMake} from "@/pages/IAT/Case/service";

const {Option} = Select;

@connect(({iatCase, loading}) => ({
  iatCase,
  loading: loading.effects['iatCase/queryApiInfo'],
}))
export default class Page extends Component {
  state = {
    detailId: null,
    projectId: null,
    apiInfo: {},
  };

  componentDidMount() {
    const { detailId, projectId } = this.props.location.query;
    this.setState({detailId, projectId}, () => this.queryApiInfo())
  }

  queryApiInfo = () => {
    const {dispatch} = this.props;
    const {detailId} = this.state;
    dispatch({
      type: 'iatCase/queryApiInfo',
      payload: {caseId: detailId},
    }).then(() => {
      const {apiInfo} = this.props.iatCase;
      this.setState({
        apiInfo,
      });
    });
  };

  queryApiCaseAdd = (params) => {
    const {dispatch} = this.props;
    const {detailId} = this.state;
    dispatch({
      type: 'iatCase/queryApiCaseAdd',
      payload: {apiId: detailId, ...params},
    }).then(() => {
      this.queryApiInfo()
    });
  };

  queryApiCaseMake = () => {
    const {dispatch} = this.props;
    const {detailId} = this.state;
    dispatch({
      type: 'iatCase/queryApiCaseMake',
      payload: {apiId: detailId},
    }).then(() => {
      this.queryApiInfo()
    });
  };

  render() {
    const {detailId, projectId, apiInfo} = this.state;
    const {loading} = this.props;
    return (
      <PageContainer
        loading={loading}
        header={{
          title: apiInfo?.case_name,
          ghost: true,
          extra: [
            <Button key="history" icon={<CopyOutlined />}>
              接口变更记录
            </Button>,
            <Button key="history" icon={<CopyOutlined />}>
              操作记录
            </Button>,
            <Button key="copy" type="primary" icon={<CopyOutlined />}>
              复制接口
            </Button>
          ]
        }}
        content={
          <Descriptions column={2}>
            <Descriptions.Item label="创建信息">{`${apiInfo?.add_user} ${apiInfo?.add_time}`}</Descriptions.Item>
            <Descriptions.Item label="更新信息">{`${apiInfo?.update_user} ${apiInfo?.update_time}`}</Descriptions.Item>
            <Descriptions.Item span={2} label="描述信息">{apiInfo?.description}</Descriptions.Item>
          </Descriptions>
        }
      >
        <ProCard direction="column" ghost gutter={[0, 8]}>
          <ProCard
            bordered title={'请求配置'}
            extra={
              <Form.Item label={"自定义域名"}>
                <Switch checked={apiInfo?.request_config?.isCustomHost} onChange={isCustomHost=>console.log(isCustomHost)} />
              </Form.Item>
            }
          >
            {apiInfo?.request_config && <ApiRequestConfig data={apiInfo?.request_config} />}
          </ProCard>
          <ProCard bordered title={'参数配置'}>
            {apiInfo?.request_config && <ApiRequestParamsConfig isCase={false} data={apiInfo?.request_config} />}
          </ProCard>
          <ProCard bordered title={'响应信息'}>
            <ApiResponseInfo />
          </ProCard>
          <ProCard
            bordered
            title={'测试用例'}
            bodyStyle={{padding: 0}}
            extra={
              <Space>
                <Button onClick={()=>this.queryApiCaseMake()} >生成正交用例</Button>
                <ApiCaseInfoModal projectId={projectId} apiId={detailId} onAdd={this.queryApiCaseAdd} />
              </Space>
            }
          >
            <ApiCaseList projectId={projectId} detailId={detailId} />
          </ProCard>
        </ProCard>
      </PageContainer>
    );
  }
}
