import React, {Component} from 'react';
import {Select} from 'antd';
import {connect} from 'dva';
import ProCard from "@ant-design/pro-card";

import styles from './index.less';
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
      <ProCard direction="column" ghost gutter={[0, 8]}>
        <ProCard bordered title={'请求配置'}>

        </ProCard>
        <ProCard bordered title={'接口依赖'}>

        </ProCard>
        <ProCard bordered title={'处理脚本'}>

        </ProCard>
        <ProCard bordered title={'用例断言'}>

        </ProCard>
      </ProCard>
    );
  }
}
