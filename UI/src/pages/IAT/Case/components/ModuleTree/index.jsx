import React, { PureComponent } from 'react';
import { Select, Card, Empty, Spin, message } from 'antd';
import { Resizable } from 're-resizable';
import { connect } from 'dva';

import { getLocalSave, setLocalSave, IAT_PROJECT_KEY } from '@/utils/localSave';
import Tree from './components/Tree';
import styles from './index.less';

const { Option } = Select;

@connect(({ iatCase, loading }) => ({
  iatCase,
  loading: loading.effects['iatCase/queryProjectTreeData'],
}))
export default class Page extends PureComponent {
  state = {
    selectProject: undefined,
    projectList: [],
    treeData: [],
  };

  componentDidMount() {
    this.setDefaultProjectKey();
  }

  setDefaultProjectKey = () => {
    const localProjectKey = getLocalSave(IAT_PROJECT_KEY);
    const { projectId } = this.props.location.query;
    const urlProjectKey = projectId;
    if (urlProjectKey) {
      this.setState({ selectProject: urlProjectKey }, () => {
        this.queryProjectList(urlProjectKey);
        this.queryProjectTreeData(urlProjectKey);
      });
    } else if (localProjectKey) {
      this.setState({ selectProject: Number(localProjectKey) }, () => {
        this.queryProjectList(localProjectKey);
        this.queryProjectTreeData(localProjectKey);
      });
    } else {
      message.info('请先选择项目！');
      this.queryProjectList();
    }
  };

  queryProjectList = (selectProject = null) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryProjectListPre',
      payload: {},
    }).then(() => {
      const { projectList } = this.props.iatCase;
      this.setState(
        {
          projectList,
        },
        () => {
          if (selectProject) {
            this.setState({ selectProject });
          } else {
            if (projectList) {
              this.setState({ selectProject: projectList[0].id });
            }
          }
        },
      );
    });
  };

  queryProjectTreeData = (projectId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryProjectTreeData',
      payload: { projectId },
    }).then(() => {
      const { treeData } = this.props.iatCase;
      this.setState(
        {
          treeData,
        },
        () => {
          if (this.props.setModuleList && treeData.length > 0 && treeData[0].id === 'project') {
            this.props.setModuleList(treeData[0].items);
          }
        },
      );
    });
  };

  handleProjectChange = (value) => {
    this.setState({ selectProject: value }, () => {
      setLocalSave(IAT_PROJECT_KEY, value);
      this.queryProjectTreeData(value);
    });
  };

  handleTreeSelect = (item) => {
    if (this.props.onSelect) {
      this.props.onSelect(item, this.state.selectProject);
    }
  };

  render() {
    const { selectProject, projectList, treeData } = this.state;
    const { loading } = this.props;
    return (
      <Resizable className={styles.resizWarpper}>
        <Card bodyStyle={{ padding: 10 }} bordered={false} className={styles.treeWarpper}>
          <Select
            value={selectProject}
            placeholder="请选择项目"
            style={{ width: '100%',marginBottom: 10 }}
            onChange={(e) => this.handleProjectChange(e)}
          >
            {projectList &&
              projectList.map((item) => (
                <Option key={item.id.toString()} value={item.id.toString()}>
                  {item.name}
                </Option>
              ))}
          </Select>
          <Spin spinning={loading} className={styles.treeContainer} tip="加载中...">
            {treeData && treeData.length > 0 && (
              <Tree
                treeData={treeData}
                projectId={selectProject}
                refreshTree={() => this.queryProjectTreeData(selectProject)}
                onSelect={(item) => this.handleTreeSelect(item)}
              />
            )}
            {treeData && treeData.length === 0 && <Empty />}
          </Spin>
        </Card>
      </Resizable>
    );
  }
}
