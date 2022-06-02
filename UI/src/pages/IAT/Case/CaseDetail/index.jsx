import React, {Component} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { CopyOutlined } from '@ant-design/icons';
import {Select, Button, Descriptions, Space} from 'antd';
import {connect} from 'dva';

import styles from './index.less';
import ApiEnvInfo from './ApiEnvInfo';
import ApiCaseList from './ApiCaseList';
import ApiRequestInfo from './ApiRequestInfo';
import ApiResponseInfo from './ApiResponseInfo';

const {Option} = Select;

@connect(({model, loading}) => ({
  model,
  loading: loading.effects['model/queryFunction'],
}))
export default class Page extends Component {
  state = {};

  componentDidMount() {
    const { detailId, projectId } = this.props.location.query;
    console.log(detailId, projectId);
    this.setState({detailId, projectId})
  }

  queryFunction = params => {
    const {dispatch} = this.props;
    dispatch({
      type: 'model/function',
      payload: {},
    }).then(() => {
      const {value} = this.props.model;
      this.setState({
        value,
      });
    });
  };

  render() {
    const {detailId, projectId} = this.state;
    console.log(detailId, projectId);
    return (
      <PageContainer
        header={{
          title: '获取首页banner',
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
            <Descriptions.Item label="创建信息">丽丽 2017-01-10</Descriptions.Item>
            <Descriptions.Item label="更新信息">丽丽 2017-01-11</Descriptions.Item>
          </Descriptions>
        }
      >
        <ProCard direction="column" ghost gutter={[0, 8]}>
          <ProCard bordered title={'请求配置'}>
            <ApiEnvInfo />
          </ProCard>
          <ProCard bordered title={'参数配置'}>
            <ApiRequestInfo />
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
