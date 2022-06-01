import React, {Component} from 'react';
import {Button, Descriptions, Select} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {connect} from 'dva';
import ProCard from '@ant-design/pro-card';
import {CaretRightOutlined} from "@ant-design/icons";


import styles from './index.less';
import CaseDragList from '../components/CaseDragList';
import CaseItemDetail from '../components/CaseItemDetail';

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
        // ghost
        header={{
          title: '获取首页banner',
          extra: [
            <Button key="copy" icon={<CaretRightOutlined />}>
              环境配置
            </Button>,
            <Button key="exec" type="primary" icon={<CaretRightOutlined />}>
              开始执行
            </Button>
          ]
        }}
        content={
          <Descriptions column={3}>
            <Descriptions.Item label="所属项目">

            </Descriptions.Item>
            <Descriptions.Item label="任务类型">

            </Descriptions.Item>
            <Descriptions.Item label="参数类型">

            </Descriptions.Item>
            <Descriptions.Item label="创建信息">丽丽 2017-01-10</Descriptions.Item>
            <Descriptions.Item label="更新信息">丽丽 2017-01-11</Descriptions.Item>
          </Descriptions>
        }
        tabList={[
          {
            tab: '用例编排',
            key: 'caseList',
            closable: false,
          },
          {
            tab: '执行记录',
            key: 'execList',
            closable: false,
          },
        ]}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard gutter={6} ghost>
            <ProCard colSpan={6} title={"用例列表"} >
              <CaseDragList />
            </ProCard>
            <ProCard ghost colSpan={18}>
              <CaseItemDetail />
            </ProCard>
          </ProCard>
        </ProCard>
      </PageContainer>
    );
  }
}
