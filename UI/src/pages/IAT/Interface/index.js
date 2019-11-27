/* eslint-disable react/prefer-stateless-function,no-return-assign,no-param-reassign,no-var,prefer-destructuring,react/destructuring-assignment,react/no-access-state-in-setstate,prefer-const */
/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import {
  Layout,
  Tree,
  Select,
  Icon,
  Menu,
  message,
  Input,
  Card,
  Divider,
  Col,
  Button,
  Radio,
  Spin,
  Switch,
  Tooltip,
  Empty,
} from 'antd';
import { connect } from 'dva';
import { Resizable } from 're-resizable';
import { setTage, getTage } from '@/services/tags';
import styles from './index.less';
import CaseProject from './CaseProject/index';
import CaseInfo from './CaseInfo/index';
import CaseDebug from './CaseDebug/index';

import 'brace/mode/java';
import 'brace/theme/dracula';

const { Content, Sider } = Layout;
const { TreeNode } = Tree;
const { Option } = Select;
const InputGroup = Input.Group;
const { TextArea } = Input;

@connect(({ iatSystem, interfaceCase, loading }) => ({
  iatSystem,
  interfaceCase,
  loading: loading.effects['interfaceCase/queryTreeInfo'],
}))
class Interface extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      projectList: [],
      project: null,
      clickId: null,
      caseId: null,
      treeList: [],
      rightClickItem: null,
      selectNoteType: null,
      selectIndexId: null,
      selectNoteId: null,
      infoName: '',
      autoExpandParent: true,
      info: {
        name: '',
        path: '',
        method: 'GET',
        paramType: 1,
        params: [],
        asserts: {
          assertsType: 1,
          assertData: [],
        },
        extract: {
          extractType: 0,
          extractData: [],
        },
        preShellType: 0,
        preShellData: '',
        postShellType: 0,
        postShellData: '',
      },
    };
    this.setDomTreeBoxRef = ref => (this.treeBox = ref);
  }

  componentWillMount() {
    const params = this.props.location.search;
    if (params.indexOf('?') !== -1) {
      const caseId = params.substr(1);
      if (caseId) {
        this.setState({ caseId, selectNoteId: caseId });
      }
      this.queryProjectList(caseId);
    } else {
      this.queryProjectList();
    }
    document.addEventListener('mouseup', event => this.checkClickElement(event), false);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', event => this.checkClickElement(event), false);
  }

  checkClickElement=event => {
    if (this.state.rightClickItem !== null) {
      try {
        if (document.getElementById('right_menu')) {
          if (event.target.compareDocumentPosition(document.getElementById('right_menu')) !== 10) {
            this.setState({ rightClickItem: null });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  getNodeTreeMenu() {
    const { pageX, pageY, noteType } = { ...this.state.rightClickItem };
    const tmpStyle = {
      position: 'absolute',
      boxShadow: '3px 3px 1px #ecf0f1',
      border: '1px solid #ecf0f1',
      left: `${pageX}px`,
      top: `${pageY - 2}px`,
      zIndex: 999,
    };

    const menu =
      noteType === 1 ? (
        <Menu id="right_menu" onClick={this.handleRightMenuClick} style={tmpStyle} className={styles.RightMenu}>
          <Menu.Item key="1">
            <Icon type="plus-circle" />
            添加用例
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="folder-add" />
            添加子目录
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="minus-square-o" />
            删除目录
          </Menu.Item>
        </Menu>
      ) : (
        <Menu id="right_menu" onClick={this.handleRightMenuClick} style={tmpStyle} className={styles.RightMenu}>
          <Menu.Item key="5">
            <Icon type="copy" />
            复制用例
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="minus-square-o" />
            删除用例
          </Menu.Item>
        </Menu>
      );
    return this.state.rightClickItem && menu;
  }

  handleRightMenuClick = e => {
    const code = e.key;
    switch (code) {
      case '1':
        this.handleAddCase();
        break;
      case '2':
        this.handleAddSubFolder();
        break;
      case '4':
        this.handleDeleteSubFolder();
        break;
      case '5':
        this.handleCopyCase();
        break;
      case '6':
        this.hanldeDeleteCase();
        break;
      default:
        message.warning('出现了什么鬼');
    }
  };

  treeToList = tree => {
    const listData = [
      {
        id: tree[0].id,
        name: tree[0].name,
        noteType: tree[0].noteType,
        index_id: tree[0].index_id,
        pid: 0,
      },
    ];
    const loop = (data, fatherPid) =>
      data.children.forEach(item => {
        listData.push({
          id: item.id,
          name: item.name,
          noteType: item.noteType,
          index_id: item.index_id,
          pid: fatherPid,
        });
        if (item.children && item.children.length > 0) {
          loop(item, item.id);
        }
      });
    loop(tree[0], tree[0].id);
    return listData;
  };

  handleAddCase = () => {
    const clickId = this.state.rightClickItem.dataRef.id;
    const { treeList } = this.state;
    const listData = this.treeToList(treeList);
    listData.push({
      id: null,
      name: '',
      type: 'case',
      noteType: 0,
      index_id: 99,
      pid: clickId,
    });
    const listToTree = pid => {
      const result = [];
      listData.forEach(item => {
        if (pid !== null && item.pid === pid) {
          result.push({
            id: item.id,
            name: item.name,
            index_id: item.index_id,
            type: item.type,
            noteType: item.noteType,
            children: listToTree(item.id),
          });
        }
      });
      return result;
    };
    const newTree = listToTree(0);
    this.setState(
      {
        treeList: newTree,
        expandedKeys: [clickId.toString()],
        clickId,
        autoExpandParent: true,
      },
      () => this.clearMenu(),
    );
  };

  handleAddSubFolder = () => {
    const clickId = this.state.rightClickItem.dataRef.id;
    const { treeList } = this.state;
    const listData = this.treeToList(treeList);
    listData.push({
      id: null,
      name: '',
      type: 'folder',
      noteType: 0,
      index_id: 99,
      pid: clickId,
    });
    const listToTree = pid => {
      const result = [];
      listData.forEach(item => {
        if (pid !== null && item.pid === pid) {
          result.push({
            id: item.id,
            name: item.name,
            index_id: item.index_id,
            type: item.type,
            noteType: item.noteType,
            children: listToTree(item.id),
          });
        }
      });
      return result;
    };
    const newTree = listToTree(0);
    this.setState(
      {
        treeList: newTree,
        expandedKeys: [clickId.toString()],
        clickId,
        autoExpandParent: true,
      },
      () => this.clearMenu(),
    );
  };

  handleDeleteSubFolder = () => {
    const deleteId = this.state.rightClickItem.dataRef.id;
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryDeleteFolder',
      payload: {
        id: this.state.rightClickItem.dataRef.id,
      },
    }).then(() => {
      this.queryTreeList(this.state.project);
      this.clearMenu();
      this.clearSelect(deleteId);
    });
  };

  hanldeDeleteCase = () => {
    const deleteId = this.state.rightClickItem.dataRef.id;
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryDeleteCase',
      payload: {
        id: deleteId,
      },
    }).then(() => {
      this.queryTreeList(this.state.project);
      this.clearMenu();
      this.clearSelect(deleteId);
    });
  };

  handleCopyCase = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryCopyCase',
      payload: {
        id: this.state.rightClickItem.dataRef.id,
      },
    }).then(() => {
      this.queryTreeList(this.state.project);
      this.clearMenu();
    });
  };

  queryProjectList = (caseId = null) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatSystem/queryProjectList',
      payload: {
        status: '1',
      },
    }).then(() => {
      const { projectList } = this.props.iatSystem;
      this.setState(
        {
          projectList,
        },
        () => {
          const localStorage = getTage();
          console.log('localStorage:', localStorage)
          console.log('caseId:', caseId)
          if (caseId) {
            this.querySampleInfo(caseId, true);
          } else if (localStorage) {
            const project = localStorage.projectId;
            this.setState({ project }, () => {
              console.log('project:', project)
              this.handleProjectChange(this.state.project);
            });
          }
        },
      );
    });
  };

  querySampleInfo=(id, isRef = false) => {
    this.setState(
      {
        selectedKeys: [id],
        expandedKeys: [id],
        selectNoteId: id,
        selectNoteType: 2,
        infoName: '',
      },
      () => {
        if (isRef) {
          this.queryTreeInfo(id, true);
        }
      },
    );
  };

  handleTreeUpdate = () => {
    this.queryTreeList(this.state.project);
  };

  queryTreeList = (id, isRef = false) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryTreeList',
      payload: {
        id,
      },
    }).then(() => {
      const { interfaceCase } = this.props;
      this.setState({ treeList: interfaceCase.treeList }, () => {
        if (isRef) {
          this.setState({
            selectedKeys: [this.state.caseId],
            expandedKeys: [this.state.caseId],
          });
        }
      });
    });
  };

  queryTreeInfo = (id, isRef = false) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryTreeInfo',
      payload: {
        id,
      },
    }).then(() => {
      const { name, projectId } = this.props.interfaceCase.infoData;
      let { info } = this.state;
      info.name = name;
      this.setState({ info, infoName: name },()=>{
        if (isRef) {
          this.setState({ project: projectId }, () => {
            this.handleProjectChange(this.state.project);
            this.queryTreeList(projectId)
          });
        }
      });
    });
  };

  handleProjectChange = value => {
    this.setState({ project: value }, () => {
      setTage({ projectId: this.state.project });
      this.queryTreeList(value);
    });
  };

  onDrop = info => {
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryUpdateTreeIndex',
      payload: {
        dropKey,
        dragKey,
      },
    }).then(() => {
      this.queryTreeList(this.state.project);
    });
  };

  onSelect = (selectedKeys, info) => {
    if (selectedKeys.length > 0) {
      const { noteType, id, index_id } = info.node.props.dataRef;
      this.setState(
        {
          selectedKeys,
          selectNoteId: id,
          selectNoteType: noteType,
          selectIndexId: index_id,
          infoName: '',
        },
        () => {
          this.queryTreeInfo(this.state.selectedKeys[0]);
        },
      );
    }
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  getXY = ele => {
    const scrollTop = this.treeBox.scrollTop;
    var top = ele.offsetTop - scrollTop;
    var left = ele.offsetLeft;
    // while (ele.offsetParent) {
    //   ele = ele.offsetParent;
    //   if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
    //     top += ele.offsetTop;
    //     left += ele.offsetLeft;
    //   } else {
    //     top += ele.offsetTop + ele.clientTop;
    //     left += ele.offsetLeft + ele.clientLeft;
    //   }
    // }
    return { x: left, y: top };
  };

  handleOnRightClick = e => {
    const xy = this.getXY(e.event.currentTarget);
    const x = xy.x;
    const y = xy.y;
    this.setState({
      rightClickItem: {
        // pageX: x + e.event.currentTarget.clientWidth,
        pageX: x + 50,
        pageY: y + 12,
        id: e.node.props.eventKey,
        noteType: e.node.props.noteType,
        dataRef: e.node.props.dataRef,
      },
    });
  };

  clearMenu = () => {
    this.setState({ rightClickItem: null });
  };

  clearSelect = id => {
    if (this.state.selectedKeys) {
      if (this.state.selectedKeys[0] === id.toString()) {
        this.setState({ selectedKeys: null });
      }
    }
  };

  submitAddFolder = value => {
    if (!value) {
      message.warning('名称不可为空');
      this.queryTreeList(this.state.project);
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryAddSubFolder',
      payload: {
        id: this.state.clickId,
        name: value,
      },
    }).then(() => {
      this.queryTreeList(this.state.project);
    });
  };

  submitAddCase = value => {
    if (!value) {
      message.warning('名称不可为空');
      this.queryTreeList(this.state.project);
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryAddCase',
      payload: {
        id: this.state.clickId,
        name: value,
      },
    }).then(() => {
      this.queryTreeList(this.state.project);
    });
  };

  hanldeNameChange = e => {
    this.setState({ infoName: e.target.value }, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'interfaceCase/queryUpdateFolderName',
        payload: {
          id: this.state.selectedKeys[0],
          name: this.state.infoName,
        },
      }).then(() => {
        this.queryTreeList(this.state.project);
      });
    });
  };

  onExpandTree = expandedKeys => {
    this.setState({ expandedKeys, autoExpandParent: false });
  };

  handleFormValueChange = allValues => {
    const { selectNoteId } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'interfaceCase/queryUpdateCaseData',
      payload: {
        caseId: selectNoteId,
        caseInfo: allValues,
      },
    });
  };

  render() {
    const {
      projectList,
      project,
      treeList,
      rightClickItem,
      expandedKeys,
      selectedKeys,
      autoExpandParent,
      selectNoteType,
      infoName,
      selectNoteId,
      selectIndexId,
    } = this.state;
    const { loading } = this.props;
    const loop = data =>
      data.map(item => {
        if (item.noteType === 1) {
          return (
            <TreeNode
              icon={<Icon type="folder" theme="filled" style={{ color: '#3498db' }} />}
              key={item.id}
              dataRef={item}
              title={item.name}
              noteType={item.noteType}
            >
              {item.children && loop(item.children)}
            </TreeNode>
          );
        }
        if (item.noteType === 0) {
          if (item.type === 'folder') {
            return (
              <TreeNode
                icon={<Icon type="folder" theme="filled" style={{ color: '#3498db' }} />}
                selectable={false}
                title={
                  <Input
                    size="small"
                    style={{ width: 100 }}
                    autoFocus
                    onBlur={e => this.submitAddFolder(e.target.value)}
                    onPressEnter={e => this.submitAddFolder(e.target.value)}
                  />
                }
                key="0-0-1"
              />
            );
          }
          if (item.type === 'case') {
            return (
              <TreeNode
                icon={<Icon type="api" theme="filled" />}
                selectable={false}
                title={
                  <Input
                    size="small"
                    style={{ width: 100 }}
                    autoFocus
                    onBlur={e => this.submitAddCase(e.target.value)}
                    onPressEnter={e => this.submitAddCase(e.target.value)}
                  />
                }
                key="0-0-1"
              />
            );
          }
        }
        return (
          <TreeNode
            icon={<Icon type="api" theme="filled" />}
            key={item.id}
            dataRef={item}
            title={item.name}
            noteType={item.noteType}
          />
        );
      });
    const Folder = (
      <Card loading={loading} bordered={false}>
        <div className={styles.item_container}>
          <div className={styles.item_label_container}>
            <span>目录名称：</span>
          </div>
          <div className={styles.item_content_container}>
            <Input
              placeholder="标题名称"
              size="small"
              value={infoName}
              onChange={e => {
                this.setState({ infoName: e.target.value });
              }}
              onBlur={e => this.hanldeNameChange(e)}
              className={styles.item_item}
            />
          </div>
        </div>
        <Divider />
      </Card>
    );
    return (
      <Content>
        <div className={styles.contentContainer}>
          <Resizable
            className={styles.left_res_container}
            enable={{ right: true }}
            defaultSize={{ height: '90vh' }}
            size={{ height: '90vh' }}
          >
            <Select
              placeholder="请选择项目"
              value={project || undefined}
              style={{ width: '100%' }}
              size="small"
              onChange={this.handleProjectChange}
            >
              {projectList &&
                projectList.map(item => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
            <div className={styles.left_container} ref={this.setDomTreeBoxRef}>
              <Tree
                showIcon
                draggable
                autoExpandParent={autoExpandParent}
                defaultExpandAll
                selectedKeys={selectedKeys}
                expandedKeys={expandedKeys}
                onSelect={this.onSelect}
                onDrop={this.onDrop}
                onCheck={this.onCheck}
                onExpand={this.onExpandTree}
                onRightClick={e => this.handleOnRightClick(e)}
              >
                {treeList && loop(treeList)}
              </Tree>
            </div>
          </Resizable>
          <div className={styles.rightContentContainer}>
            <Content
              style={{
                background: '#fff',
                padding: 10,
                height: '90vh',
                width: '70%',
                borderRight: '1px solid #e8e8e8',
              }}
            >
              <div className={styles.right_container}>
                {!(selectedKeys && selectedKeys.length > 0) && <Empty />}
                {selectedKeys && selectNoteType === 1 && selectIndexId === 0 && (
                  <CaseProject
                    selectNoteId={selectNoteId}
                    handleTreeUpdate={() => this.handleTreeUpdate()}
                  />
                )}
                {selectedKeys && selectNoteType === 1 && selectIndexId !== 0 && Folder}
                {selectedKeys && selectNoteType === 2 && (
                  <CaseInfo
                    selectNoteId={selectNoteId}
                    handleTreeUpdate={() => this.handleTreeUpdate()}
                    handleFormValueChange={this.handleFormValueChange}
                  />
                )}
              </div>
            </Content>
            <Content style={{ background: '#fff', padding: 10, height: '90vh', width: '30%' }}>
              <div className={styles.right_container}>
                {selectedKeys && selectNoteType === 2 && <CaseDebug selectNoteId={selectNoteId} />}
              </div>
            </Content>
          </div>
        </div>
        {rightClickItem && this.getNodeTreeMenu()}
      </Content>
    );
  }
}

export default Interface;
