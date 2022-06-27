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

const {Option} = Select;

@connect(({iatCase, loading}) => ({
  iatCase,
  loading: loading.effects['iatCase/queryCaseInfo'],
}))
export default class Page extends Component {
  state = {
    detailId: null,
    projectId: null,
    caseInfo: {},
  };

  componentDidMount() {
    const { detailId, projectId } = this.props.location.query;
    this.setState({detailId, projectId}, () => this.queryCaseInfo())
  }

  queryCaseInfo = () => {
    const {dispatch} = this.props;
    const {detailId} = this.state;
    dispatch({
      type: 'iatCase/queryCaseInfo',
      payload: {caseId: detailId},
    }).then(() => {
      const {caseInfo} = this.props.iatCase;
      this.setState({
        caseInfo,
      });
    });
  };

  render() {
    const {detailId, projectId, caseInfo} = this.state;
    const {loading} = this.props;
    console.log(caseInfo);
    return (
      <PageContainer
        loading={loading}
        header={{
          title: caseInfo?.case_name,
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
            <Descriptions.Item label="创建信息">{`${caseInfo?.add_user} ${caseInfo?.add_time}`}</Descriptions.Item>
            <Descriptions.Item label="更新信息">{`${caseInfo?.update_user} ${caseInfo?.update_time}`}</Descriptions.Item>
            <Descriptions.Item span={2} label="描述信息">{caseInfo?.description}</Descriptions.Item>
          </Descriptions>
        }
      >
        <ProCard direction="column" ghost gutter={[0, 8]}>
          <ProCard
            bordered title={'请求配置'}
            extra={
              <Form.Item label={"自定义域名"}>
                <Switch checked={caseInfo?.request_config?.isCustomHost} onChange={isCustomHost=>console.log(isCustomHost)} />
              </Form.Item>
            }
          >
            {caseInfo?.request_config && <ApiRequestConfig data={caseInfo?.request_config} />}
          </ProCard>
          <ProCard bordered title={'参数配置'}>
            {caseInfo?.request_config && <ApiRequestParamsConfig isCase={false} data={caseInfo?.request_config} />}
          </ProCard>
          <ProCard bordered title={'响应信息'}>
            <ApiResponseInfo />
          </ProCard>
          <ProCard bordered title={'测试用例'} extra={
            <Space>
              <Button >生成正交用例</Button>
              <Button type="primary">新建用例</Button>
            </Space>
          }>
            <ApiCaseList projectId={projectId} />
          </ProCard>
        </ProCard>
      </PageContainer>
    );
  }
}
