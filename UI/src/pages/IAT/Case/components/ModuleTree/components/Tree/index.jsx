import React, { PureComponent } from 'react';
import { message, Modal } from 'antd';
import { BankFilled, AppstoreFilled, ApiFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import TreeView from 'devextreme-react/tree-view';
import ContextMenu from 'devextreme-react/context-menu';
import { connect } from 'dva';

const { confirm } = Modal;

import ModuleEditModal from '../TreeModal/ModuleEdit';
import 'devextreme/dist/css/dx.light.css';
import styles from './index.less';

@connect(({ model, loading }) => ({
  model,
  loading: loading.effects['model/queryFunction'],
}))
export default class Page extends PureComponent {
  constructor(props) {
    super(props);
    this.contextMenuRef = React.createRef();
    this.treeViewRef = React.createRef();

    this.state = {
      menuItems: [
        { id: 'rename', text: '重命名' },
        { id: 'copy', text: '复制' },
        { id: 'delete', text: '删除' },
        { id: 'expand', text: '展开' },
        { id: 'collapse', text: '收起' },
        { id: 'addModule', text: '添加模块' },
        { id: 'addKeyword', text: '添加关键词' },
      ],
      selectedTreeItem: undefined,
    };
  }

  componentDidMount() {
  }

  treeViewItemContextMenu = (e) => {
    this.setState({
      selectedTreeItem: e.itemData,
    });

    const isProjectRoot = ['project'].indexOf(e.itemData.id) > -1;
    const isKeyRoot = ['keywords'].indexOf(e.itemData.id) > -1;
    this.contextMenu.option('items[0].visible', !(isKeyRoot || isProjectRoot));
    this.contextMenu.option('items[1].visible', !(isKeyRoot || isProjectRoot));
    this.contextMenu.option('items[2].visible', !(isKeyRoot || isProjectRoot));

    this.contextMenu.option('items[3].visible', (isKeyRoot || isProjectRoot) && !e.node.expanded);
    this.contextMenu.option('items[4].visible', (isKeyRoot || isProjectRoot) && e.node.expanded);
    this.contextMenu.option('items[5].visible', !(isKeyRoot || e.itemData.type === 3));
    this.contextMenu.option('items[6].visible', (isKeyRoot || e.itemData.type === 3));
  };

  get treeView() {
    return this.treeViewRef.current.instance;
  }

  get contextMenu() {
    return this.contextMenuRef.current.instance;
  }

  contextMenuItemClick = (e) => {
    switch (e.itemData.id) {
      case 'expand': {
        this.treeView.expandItem(this.state.selectedTreeItem.id);
        break;
      }
      case 'collapse': {
        this.treeView.collapseItem(this.state.selectedTreeItem.id);
        break;
      }
      case 'addModule': {
        this.setState({ visible: true, isAdd: true, caseType: this.state.selectedTreeItem.type });
        break;
      }
      case 'addKeyword': {
        this.setState({ visible: true, isAdd: true, caseType: this.state.selectedTreeItem.type });
        break;
      }
      case 'rename': {
        this.setState({ visible: true, isAdd: false, caseType: this.state.selectedTreeItem.type });
        break;
      }
      case 'delete': {
        this.showDeleteConfirm(this.state.selectedTreeItem);
        break;
      }
      case 'copy': {
        this.queryCopyModule({ moduleId: this.state.selectedTreeItem.id });
        break;
      }
      default:
        break;
    }
  };

  showDeleteConfirm = (itemInfo) => {
    const that = this;
    confirm({
      title: '确认要删除这个模块吗?',
      icon: <ExclamationCircleOutlined />,
      content: '如果该模块下存在用例，将无法删除哦。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        that.queryDeleteModule(that, { moduleId: itemInfo.id });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  renderTreeViewItem = (item) => {
    let itemIcon = '';
    switch (item.type) {
      case 1:
        itemIcon = <BankFilled style={{ color: '#f0932b' }} />;
        break;
      case 2:
        itemIcon = <AppstoreFilled style={{ color: '#3498db' }} />
        break;
      case 3:
        itemIcon = <ApiFilled style={{ color: '#f0932b' }} />;
        break;
      default:
        itemIcon = '';
    }
    return <span className={styles.TreeNode}>{itemIcon}<span style={{ marginLeft: 5 }}>{item.text}</span></span>;
  }

  handleModalOk = (values, isAdd) => {
    const { projectId } = this.props;
    const { selectedTreeItem } = this.state;
    if (!projectId) {
      message.error('项目id异常，请刷新页面重试！');
      return;
    }
    if ([0, 2].indexOf(selectedTreeItem.type) > -1) {
      if (isAdd) {
        this.queryAddModule({
          name: values.name,
          projectId: projectId,
          type: 2,
        });
      } else {
        this.queryEditModule({
          name: values.name,
          moduleId: selectedTreeItem.id,
        });
      }
    }
    if ([1, 3].indexOf(selectedTreeItem.type) > -1) {
      if (isAdd) {
        this.queryAddModule({
          name: values.name,
          projectId: projectId,
          type: 3,
        });
      } else {
        this.queryEditModule({
          name: values.name,
          moduleId: selectedTreeItem.id,
        });
      }
    }
  };

  queryAddModule = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'uatCase/queryAddModule',
      payload: params,
    }).then(() => {
      this.handleModalCancel();
      if (this.props.refreshTree) {
        this.props.refreshTree();
      }
    });
  };

  queryCopyModule = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'uatCase/queryCopyModule',
      payload: params,
    }).then(() => {
      if (this.props.refreshTree) {
        this.props.refreshTree();
      }
    });
  };

  queryDeleteModule = (that, params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'uatCase/queryDeleteModule',
      payload: params,
    }).then(() => {
      if (that.props.refreshTree) {
        that.props.refreshTree();
      }
    });
  };

  queryEditModule = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'uatCase/queryEditModule',
      payload: params,
    }).then(() => {
      this.handleModalCancel();
      if (this.props.refreshTree) {
        this.props.refreshTree();
      }
    });
  };

  handleModalCancel = () => {
    this.setState({ visible: false, isAdd: false, caseType: undefined });
  };

  render() {
    const { visible, confirmLoading, menuItems, selectedTreeItem, isAdd, caseType } = this.state;
    const { treeData } = this.props;
    return (
      <>
        <TreeView
          id='treeview'
          ref={this.treeViewRef}
          items={treeData}
          width='100%'
          height='100%'
          onItemClick={({ itemData }) => this.props.onSelect(itemData)}
          onItemContextMenu={this.treeViewItemContextMenu}
          itemRender={this.renderTreeViewItem}
        />
        <ContextMenu
          ref={this.contextMenuRef}
          dataSource={menuItems}
          target='#treeview .dx-treeview-item'
          onItemClick={this.contextMenuItemClick}
        />
        <ModuleEditModal
          visible={visible}
          itemInfo={selectedTreeItem}
          isAdd={isAdd}
          caseType={caseType}
          confirmLoading={confirmLoading}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        />
      </>
    );
  }
}
