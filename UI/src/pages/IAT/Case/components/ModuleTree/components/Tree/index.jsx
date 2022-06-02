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
        { id: 'addSubModule', text: '添加子模块' },
        { id: 'addBroModule', text: '添加同级模块' },
      ],
      selectedTreeItem: undefined,
    };
  }

  componentDidMount() {
  }

  queryModuleAdd = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryModuleAdd',
      payload: params,
    }).then(() => {
      this.handleModalCancel();
      if (this.props.refreshTree) {
        this.props.refreshTree();
      }
    });
  };

  queryModuleCopy = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryModuleCopy',
      payload: params,
    }).then(() => {
      if (this.props.refreshTree) {
        this.props.refreshTree();
      }
    });
  };

  queryModuleDel = (that, params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryModuleDel',
      payload: params,
    }).then(() => {
      if (that.props.refreshTree) {
        that.props.refreshTree();
      }
    });
  };

  queryModuleUpdate = (params) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryModuleUpdate',
      payload: params,
    }).then(() => {
      this.handleModalCancel();
      if (this.props.refreshTree) {
        this.props.refreshTree();
      }
    });
  };

  treeViewItemContextMenu = (e) => {
    this.setState({
      selectedTreeItem: e.itemData,
    });
    const isDisabled = e.itemData.disabled
    this.contextMenu.option('items[0].visible', !(isDisabled));
    this.contextMenu.option('items[1].visible', !(isDisabled));
    this.contextMenu.option('items[2].visible', !(isDisabled));
    this.contextMenu.option('items[3].visible', !(isDisabled));
    this.contextMenu.option('items[4].visible', !(isDisabled));
  };

  get treeView() {
    return this.treeViewRef.current.instance;
  }

  get contextMenu() {
    return this.contextMenuRef.current.instance;
  }

  contextMenuItemClick = (e) => {
    switch (e.itemData.id) {
      case 'rename': {
        this.setState({ visible: true, isAdd: false });
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
      case 'addBroModule': {
        this.setState({ visible: true, isAdd: true, isBro: true, isSub: false});
        break;
      }
      case 'addSubModule': {
        this.setState({ visible: true, isAdd: true, isBro: false, isSub: true });
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
    });
  };

  renderTreeViewItem = (item) => {
    let itemIcon = <AppstoreFilled style={{ color: '#3498db' }} />;
    return <span className={styles.TreeNode}>{itemIcon}<span style={{ marginLeft: 5 }}>{item.text}</span></span>;
  }

  handleModalOk = (values) => {
    const { projectId } = this.props;
    const { selectedTreeItem, isAdd, isBro, isSub} = this.state;
    if (!projectId) {
      message.error('项目id异常，请刷新页面重试！');
      return;
    }
    if (isAdd) {
      if (isBro){
        this.queryAddModule({
          name: values.name,
          pid: selectedTreeItem.pid,
        });
      }
      if (isSub){
        this.queryAddModule({
          name: values.name,
          pid: selectedTreeItem.id,
        });
      }
    } else {
      this.queryEditModule({
        name: values.name,
        moduleId: selectedTreeItem.id,
      });
    }
  };

  handleModalCancel = () => {
    this.setState({ visible: false, isAdd: false });
  };

  render() {
    const { visible, confirmLoading, menuItems, selectedTreeItem, isAdd, isBro, isSub } = this.state;
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
          isBro={isBro}
          isSub={isSub}
          confirmLoading={confirmLoading}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        />
      </>
    );
  }
}
