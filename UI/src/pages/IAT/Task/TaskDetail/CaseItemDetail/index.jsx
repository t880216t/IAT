import React, {Component} from 'react';
import {Select} from 'antd';
import {connect} from 'dva';
import ProCard from "@ant-design/pro-card";

const {Option} = Select;

import styles from './index.less';

import CaseRequestConfigInfo from './CaseRequestConfigInfo';
import CaseParamsConfigInfo from './CaseParamsConfigInfo';
import CaseDependentInfo from './CaseDependentInfo';
import CaseScriptInfo from './CaseScriptInfo';
import CaseAssertionInfo from './CaseAssertionInfo';
import CaseValueExtractInfo from './CaseValueExtractInfo';

export default ()=> {
  return(
    <ProCard direction="column" ghost gutter={[0, 8]}>
      <ProCard bordered title={'请求配置'}>
        <CaseRequestConfigInfo />
      </ProCard>
      <ProCard bordered title={'参数配置'} bodyStyle={{padding: 0}}>
        <CaseParamsConfigInfo />
      </ProCard>
      <ProCard bordered title={'接口依赖'}>
        <CaseDependentInfo />
      </ProCard>
      <ProCard bordered title={'处理脚本'} bodyStyle={{padding: 5}}>
        <CaseScriptInfo />
      </ProCard>
      <ProCard bordered title={'用例断言'} bodyStyle={{padding: 0}}>
        <CaseAssertionInfo />
      </ProCard>
      <ProCard bordered title={'参数提取'} bodyStyle={{padding: 0}}>
        <CaseValueExtractInfo />
      </ProCard>
    </ProCard>
  )
}
