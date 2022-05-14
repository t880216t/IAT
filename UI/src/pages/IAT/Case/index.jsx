import React, {Component} from 'react';
import ProCard from '@ant-design/pro-card';
import { Empty } from 'antd';
import {connect} from 'umi';

import styles from './index.less';
import ModuleTree from './components/ModuleTree';
import CaseList from './components/CaseList';

@connect(({iatCase, loading}) => ({
  iatCase,
  loading: loading.effects['model/queryFunction'],
}))
export default class Page extends Component {
  state = {
    selectItem: undefined,
    projectId: undefined,
    moduleList: [],
  };

  handleTreeSelect = (selectItem, projectId) => {
    this.setState({ selectItem, projectId });
  };

  setModuleList = (moduleList) => {
    this.setState({ moduleList });
  };

  render() {
    const {selectItem, moduleList, projectId} = this.state;
    return (
      <div className={styles.caseContainer}>
        <ModuleTree onSelect={this.handleTreeSelect} location={this.props.location}
                    setModuleList={e => this.setModuleList(e)} />
        <ProCard size={'small'} layout={!selectItem ? 'center' : undefined} ghost={!selectItem ? true : false} bordered>
          {selectItem && [2].indexOf(selectItem.type) > -1 && <CaseList moduleList={moduleList} selectItem={selectItem} projectId={projectId} />}
          {!selectItem && <Empty description={'请先选择模块'} />}
        </ProCard>
      </div>
    );
  }
}
