import React, {Component} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { CopyOutlined } from '@ant-design/icons';
import {Select, Button, Descriptions} from 'antd';
import {connect} from 'dva';

import styles from './index.less';
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
    const {} = this.state;
    return (
      <PageContainer
        header={{
          title: '获取首页banner',
          ghost: true,
          extra: [
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
            <ApiRequestInfo />
          </ProCard>
          <ProCard bordered title={'响应信息'}>
            <ApiResponseInfo />
          </ProCard>
          <ProCard bordered title={'测试用例'}>
            <ApiCaseList />
          </ProCard>
        </ProCard>
      </PageContainer>
    );
  }
}
