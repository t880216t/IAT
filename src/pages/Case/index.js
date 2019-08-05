import React, { PureComponent } from 'react';
import { Card, message, Select } from 'antd';
import { Resizable } from 're-resizable';
import { connect } from 'dva';

import styles from './index.less';
import CaseContent from './case';
import CustomKeyword from './keyword';
import CaseTree from './CaseTree/index';
import CaseProject from './CaseProject/index';
import CaseSuite from './CaseSuite/index';
import CustomKeyRoot from './CustomKeyRoot/index';

const { Option } = Select;

@connect(({ caseInfo, system, loading }) => ({
  caseInfo,
  system,
}))
export default class CasePage extends PureComponent {
  state={
    clickId: null,
    expandedKeys: [],
    selectedKeys: [],
    autoExpandParent: false,
    project: null,
    treeList: [],
    projectList: [],
    versionList: [],
    selectNoteType: null,
    selectNoteId: null,
    selectVersion: null,
  }

  componentWillMount() {
    const params = this.props.location.search;
    if (params.indexOf('?') !== -1) {
      const detailInfo = params.substr(1).split('&');
      const detailId = detailInfo[0].split('=')[1];
      const projectId = detailInfo[1].split('=')[1]
      this.queryProjectList(parseInt(projectId), detailId);
    } else {
      this.queryProjectList();
    }
  }

  queryProjectList=(project = null, detailId = null) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryProjectList',
      payload: {
        status: '1',
      },
    })
      .then(() => {
        const { projectList } = this.props.system;
        this.setState({
          projectList,
        }, () => {
          if (project) {
            this.setState({ project }, () => {
              this.queryTreeList(project, detailId);
            });
          }
        });
      });
  };

  treeToList=tree => {
    const listData = [];
    tree.forEach(item => {
      listData.push({
        id: item.id,
        name: item.name,
        noteType: item.noteType,
        indexId: item.indexId,
        pid: 0,
      });
    })
    const loop = (data, fatherPid) => data.children.forEach(item => {
      listData.push({
        id: item.id,
        name: item.name,
        noteType: item.noteType,
        indexId: item.indexId,
        pid: fatherPid,
      });
      if (item.children && item.children.length > 0) {
        loop(item, item.id);
      }
    });
    tree.forEach(treeItem => {
      loop(treeItem, treeItem.id)
    });
    return listData;
  };

  handleAddCase=rightClickItem => new Promise((resolve, reject) => {
      const clickId = rightClickItem.dataRef.id;
      const { treeList } = this.state;
      const listData = this.treeToList(treeList);
      listData.push({
        id: null,
        name: '',
        type: 'case',
        noteType: 0,
        indexId: 99,
        pid: clickId,
      });
      const listToTree = pid => {
        const result = [];
        listData.forEach(item => {
          if (pid !== null && item.pid === pid) {
            result.push({
              id: item.id,
              name: item.name,
              indexId: item.indexId,
              type: item.type,
              noteType: item.noteType,
              children: listToTree(item.id),
            });
          }
        });
        return result;
      };
      const newTree = listToTree(0);
      this.setState({
        treeList: newTree,
        expandedKeys: this.state.expandedKeys.concat([clickId.toString()]),
        clickId,
        autoExpandParent: true,
      }, () => resolve());
    });

  handleAddSubFolder=rightClickItem => new Promise((resolve, reject) => {
    const clickId = rightClickItem.dataRef.id;
    const { treeList } = this.state;
    const listData = this.treeToList(treeList);
    listData.push({
      id: null,
      name: '',
      type: 'folder',
      noteType: 0,
      indexId: 99,
      pid: clickId,
    });
    const listToTree = pid => {
      const result = [];
      listData.forEach(item => {
        if (pid !== null && item.pid === pid) {
          result.push({
            id: item.id,
            name: item.name,
            indexId: item.indexId,
            type: item.type,
            noteType: item.noteType,
            children: listToTree(item.id),
          });
        }
      });
      return result;
    };
    const newTree = listToTree(0);
    this.setState({
      treeList: newTree,
      expandedKeys: [clickId.toString()],
      clickId,
      autoExpandParent: true,
    }, () => resolve());
  });

  handleAddCustomKeyword=rightClickItem => new Promise((resolve, reject) => {
    const clickId = rightClickItem.dataRef.id;
    const { treeList } = this.state;
    const listData = this.treeToList(treeList);
    listData.push({
      id: null,
      name: '',
      type: 'keyword',
      noteType: 0,
      indexId: 99,
      pid: clickId,
    });
    const listToTree = pid => {
      const result = [];
      listData.forEach(item => {
        if (pid !== null && item.pid === pid) {
          result.push({
            id: item.id,
            name: item.name,
            indexId: item.indexId,
            type: item.type,
            noteType: item.noteType,
            children: listToTree(item.id),
          });
        }
      });
      return result;
    };
    const newTree = listToTree(0);
    this.setState({
      treeList: newTree,
      expandedKeys: [clickId.toString()],
      clickId,
      autoExpandParent: true,
    }, () => resolve());
  });

  queryTreeList=(id, detailId = null) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryTreeList',
      payload: {
        id,
      },
    })
      .then(() => {
        const { treeList } = this.props.caseInfo;
        this.setState({ treeList }, () => {
          if (detailId) {
            let selectNoteType = null;
            let selectNoteId = null;
            let selectIndexId = null;
            const listTree = this.treeToList(treeList);
            listTree.forEach(item => {
              if (item.id === parseInt(detailId)){
                selectNoteType = item.noteType;
                selectNoteId = item.id;
                selectIndexId = item.indexId;
              }
            })
            this.setState({
              autoExpandParent: true,
              expandedKeys: [detailId],
              selectedKeys: [detailId],
              selectNoteType,
              selectNoteId,
              selectIndexId,
            });
          }
        });
      });
  };

  handleTreeUpdate = () => {
    this.queryTreeList(this.state.project);
  }

  submitAddCase=(clickId, value) => {
    if (!value) {
      message.warning('名称不可为空');
      this.queryTreeList(this.state.project);
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryAddCase',
      payload: {
        id: clickId,
        name: value,
      },
    })
      .then(() => {
        this.queryTreeList(this.state.project);
      });
  };

  submitAddCustomKeyword=(clickId, value) => {
    if (!value) {
      message.warning('名称不可为空');
      this.queryTreeList(this.state.project);
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryAddCustomKeyword',
      payload: {
        id: clickId,
        name: value,
      },
    })
      .then(() => {
        this.queryTreeList(this.state.project);
      });
  };

  submitAddFolder=(clickId, value) => {
    if (!value) {
      message.warning('名称不可为空');
      this.queryTreeList(this.state.project);
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryAddSubFolder',
      payload: {
        id: clickId,
        name: value,
      },
    })
      .then(() => {
        this.queryTreeList(this.state.project);
      });
  };

  handleDeleteSubFolder=rightClickItem => new Promise((resolve, reject) => {
    const deleteId = rightClickItem.dataRef.id;
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryDeleteFolder',
      payload: {
        id: deleteId,
      },
    })
      .then(() => {
        resolve();
        this.queryTreeList(this.state.project);
      })
      .catch(e => {
        reject(e);
      });
  });

  hanldeDeleteCase=rightClickItem => new Promise((resolve, reject) => {
    const deleteId = rightClickItem.dataRef.id;
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryDeleteCase',
      payload: {
        id: deleteId,
      },
    })
      .then(() => {
        resolve();
        this.queryTreeList(this.state.project);
      })
      .catch(e => {
      reject(e);
    });
  });

  handleCopyCase=rightClickItem => new Promise((resolve, reject) => {
    const { id } = rightClickItem.dataRef;
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryCopyCase',
      payload: {
        id,
      },
    })
      .then(() => {
        resolve();
        this.queryTreeList(this.state.project);
      })
      .catch(e => {
        reject(e);
      });
  });

  handleProjectChange=project => {
    this.setState({ project, selectVersion: null },
      () => {
        this.queryTreeList(project);
        this.queryProjectVersionList(project);
        this.clearSelect();
      },
    );
  }

  handleVersionChange=selectVersion => {
    this.setState({ selectVersion },
      () => {
        this.clearSelect();
      },
    );
  }

  queryProjectVersionList = (projectId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryProjectVersionList',
      payload: {
        status: 1,projectId,
      },
    }).then(() => {
      const { versionList } = this.props.system;
      this.setState({
        versionList,
      });
    });
  };

  onExpandTree=expandedKeys => {
    this.setState({ expandedKeys, autoExpandParent: false });
  };

  onSelect=(selectedKeys, info) => {
    const { noteType, id, indexId } = info.node.props.dataRef;
    this.setState({
      selectNoteType: noteType,
      selectNoteId: id,
      selectIndexId: indexId,
      selectedKeys,
    });
  };

  clearSelect = () => {
    this.setState({
      selectNoteType: null,
      selectNoteId: null,
      selectIndexId: null,
    });
  }

  render() {
    const {
      treeList,
      versionList,
      clickId,
      autoExpandParent,
      expandedKeys,
      selectedKeys,
      project,
      projectList,
      selectNoteType,
      selectNoteId,
      selectIndexId,
      selectVersion,
    } = this.state;
    return (
      <div className={styles.container}>
        <Resizable
          className={styles.left_res_container}
          enable={{ right: true }}
          defaultSize={{
            width: 300,
          }}
          maxWidth={800}
        >
          <Select placeholder="请选择项目" value={project || undefined} className={styles.select_container} size="small" onChange={e => this.handleProjectChange(e)}>
            {projectList && projectList.map(item => (
              <Option value={item.id} key={item.id}>{item.name}</Option>
            ))}
          </Select>
          {project && (
            <Select placeholder="请选择版本" value={selectVersion || undefined} className={styles.version_select_container} size="small" onChange={e => this.handleVersionChange(e)}>
              <Option value={null} key={null}>主分支</Option>
              {versionList && versionList.map(item => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          )}
          <CaseTree
            treeList={treeList}
            handleAddCase={item => this.handleAddCase(item)}
            handleCopyCase={item => this.handleCopyCase(item)}
            hanldeDeleteCase={item => this.hanldeDeleteCase(item)}
            handleDeleteSubFolder={item => this.handleDeleteSubFolder(item)}
            handleAddSubFolder={item => this.handleAddSubFolder(item)}
            handleAddCustomKeyword={item => this.handleAddCustomKeyword(item)}
            submitAddCase={value => this.submitAddCase(clickId, value)}
            submitAddCustomKeyword={value => this.submitAddCustomKeyword(clickId, value)}
            submitAddFolder={value => this.submitAddFolder(clickId, value)}
            autoExpandParent={autoExpandParent}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onExpandTree={this.onExpandTree}
            onSelect={this.onSelect}
            clearSelect={this.clearSelect}
          />
        </Resizable>
        <Card bordered={false} className={styles.content_container}>
          {(selectNoteType === 1 && selectIndexId === 0) && (
            <CaseProject
              selectNoteId={selectNoteId}
              handleTreeUpdate={() => this.handleTreeUpdate()}
            />)
          }
          {(selectNoteType === 1 && selectIndexId !== 0) && (
            <CaseSuite
              selectNoteId={selectNoteId}
              handleTreeUpdate={() => this.handleTreeUpdate()}
            />
          )}
          {selectNoteType === 2 && (
            <CaseContent
              selectNoteId={selectNoteId}
              selectVersion={selectVersion}
              handleTreeUpdate={() => this.handleTreeUpdate()}
            />)}
          {selectNoteType === 3 && (
            <CustomKeyRoot
              selectNoteId={selectNoteId}
              handleTreeUpdate={() => this.handleTreeUpdate()}
            />
          )}
          {(selectNoteType === 4) && (
            <CustomKeyword
              selectNoteId={selectNoteId}
              selectVersion={selectVersion}
              handleTreeUpdate={() => this.handleTreeUpdate()}
            />)}
        </Card>
      </div>
    );
  }
}
