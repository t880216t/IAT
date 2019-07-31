import React, { PureComponent } from 'react';
import { message, Tree, Icon, Input, Menu } from 'antd';
import styles from './index.less';

const { TreeNode } = Tree;

export default class CaseTree extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      rightClickItem: null,
    };
    this.setDomTreeBoxRef = ref => (this.treeBox = ref);
  }

  componentWillMount() {
    document.addEventListener('mouseup', event => this.checkClickElement(event), false);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', event => this.checkClickElement(event), false);
  }

  getNodeTreeMenu() {
    const { pageX, pageY, noteType, dataRef } = { ...this.state.rightClickItem };
    const tmpStyle = {
      position: 'absolute',
      boxShadow: '3px 3px 1px #ecf0f1',
      border: '1px solid #ecf0f1',
      left: `${pageX}px`,
      top: `${pageY - 2}px`,
      zIndex: 999,
    };
    let menu;
    if (noteType === 1 && dataRef.indexId === 0) {
      menu = (
        <Menu id="right_menu" onClick={this.handleRightMenuClick} style={tmpStyle} className={styles.RightMenu}>
          <Menu.Item key="2">
            <Icon type="appstore" />
            {'添加用例集'}
          </Menu.Item>
        </Menu>
      );
    }
    if (noteType === 3 && dataRef.indexId === 1) {
      menu = (
        <Menu id="right_menu" onClick={this.handleRightMenuClick} style={tmpStyle} className={styles.RightMenu}>
          <Menu.Item key="3">
            <Icon type="usb" />
            {'添加关键词'}
          </Menu.Item>
        </Menu>
      );
    }
    if (noteType === 1 && dataRef.indexId !== 0) {
      menu = (
        <Menu id="right_menu" onClick={this.handleRightMenuClick} style={tmpStyle} className={styles.RightMenu}>
          <Menu.Item key="1">
            <Icon type="plus-square" />
            {'添加用例'}
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="minus-square-o" />
            {'删除用例集'}
          </Menu.Item>
        </Menu>
      );
    }
    if (noteType === 4) {
      menu = (
        <Menu id="right_menu" onClick={this.handleRightMenuClick} style={tmpStyle} className={styles.RightMenu}>
          <Menu.Item key="5">
            <Icon type="copy" />
            {'复制关键词'}
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="minus-square-o" />
            {'删除关键词'}
          </Menu.Item>
        </Menu>
      );
    }
    if (noteType === 2) {
      menu = (
        <Menu id="right_menu" onClick={this.handleRightMenuClick} style={tmpStyle} className={styles.RightMenu}>
          <Menu.Item key="5">
            <Icon type="copy" />
            {'复制用例'}
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="minus-square-o" />
            {'删除用例'}
          </Menu.Item>
        </Menu>
      );
    }

    return (this.state.rightClickItem && menu);
  }

  checkClickElement=event => {
    if (this.state.rightClickItem !== null) {
      try {
        if (document.getElementById('right_menu')){
          if (event.target.compareDocumentPosition(document.getElementById('right_menu')) !== 10) {
            this.setState({ rightClickItem: null });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  handleRightMenuClick = e => {
      const { rightClickItem } = this.state;
      const code = e.key;
      switch (code) {
        case '1':
          this.props.handleAddCase(rightClickItem)
            .then(() => this.clearMenu());
          break;
        case '2':
          this.props.handleAddSubFolder(rightClickItem)
            .then(() => this.clearMenu());
          break;
        case '3':
          this.props.handleAddCustomKeyword(rightClickItem)
            .then(() => this.clearMenu());
          break;
        case '4':
          this.props.handleDeleteSubFolder(rightClickItem)
            .then(() => {
              this.clearMenu();
              this.props.clearSelect();
            });
          break;
        case '5':
          this.props.handleCopyCase(rightClickItem)
            .then(() => this.clearMenu());
          break;
        case '6':
          this.props.hanldeDeleteCase(rightClickItem)
            .then(() => {
              this.clearMenu();
              this.props.clearSelect();
            });
          break;
        default:
          message.warning('出现了什么鬼');
      }
  };

  getXY = ele => {
    const { scrollTop } = this.treeBox;
    let top = ele.offsetTop - scrollTop;
    let left = ele.offsetLeft;
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

  handleOnRightClick=e => {
    const xy = this.getXY(e.event.currentTarget);
    const { x } = xy;
    const { y } = xy;
    this.setState({
      rightClickItem: {
        // pageX: x + e.event.currentTarget.clientWidth,
        pageX: x + 50,
        pageY: y + 10,
        id: e.node.props.eventKey,
        noteType: e.node.props.noteType,
        dataRef: e.node.props.dataRef,
      },
    });
  };

  clearMenu=() => {
    this.setState({ rightClickItem: null });
  };

  render() {
    const {
      treeList,
      submitAddCase,
      submitAddCustomKeyword,
      autoExpandParent,
      expandedKeys,
      selectedKeys,
      onExpandTree,
      submitAddFolder,
      onSelect,
    } = this.props;
    const { rightClickItem } = this.state;
    const loop = data => data.map(item => {
      if (item.noteType === 1 && item.indexId === 0) {
        return (
          <TreeNode
            icon={<Icon type="database" theme="filled" style={{ color: '#3498db' }} />}
            key={item.id}
            dataRef={item}
            title={item.name}
            noteType={item.noteType}
          >
            {item.children && loop(item.children)}
          </TreeNode>
        );
      }
      if (item.noteType === 1 && item.indexId !== 0) {
        return (
          <TreeNode
            icon={<Icon type="appstore" theme="filled" style={{ color: '#3498db' }} />}
            key={item.id}
            dataRef={item}
            title={item.name}
            noteType={item.noteType}
          >
            {item.children && loop(item.children)}
          </TreeNode>
        );
      }
      if (item.noteType === 3 && item.indexId === 1) {
        return (
          <TreeNode
            icon={<Icon type="project" theme="filled" style={{ color: '#f0932b' }} />}
            key={item.id}
            dataRef={item}
            title={item.name}
            noteType={item.noteType}
          >
            {item.children && loop(item.children)}
          </TreeNode>
        );
      }
      if (item.noteType === 4) {
        return (
          <TreeNode
            icon={<Icon type="usb" theme="filled" style={{ color: '#f0932b' }} />}
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
              icon={<Icon type="appstore" theme="filled" style={{ color: '#3498db' }} />}
              selectable={false}
              title={<Input size="small" style={{ width: 100 }} autoFocus onBlur={e => submitAddFolder(e.target.value)} onPressEnter={e => submitAddFolder(e.target.value)} />}
              key="0-0-1"
            />
          );
        }
        if (item.type === 'case') {
          return (
            <TreeNode
              icon={<Icon type="tag" theme="filled" />}
              selectable={false}
              title={<Input size="small" style={{ width: 100 }} autoFocus onBlur={e => submitAddCase(e.target.value)} onPressEnter={e => submitAddCase(e.target.value)} />}
              key="0-0-1"
            />
          );
        }
        if (item.type === 'keyword') {
          return (
            <TreeNode
              icon={<Icon type="usb" theme="filled" style={{ color: '#f0932b' }} />}
              selectable={false}
              title={<Input size="small" style={{ width: 100 }} autoFocus onBlur={e => submitAddCustomKeyword(e.target.value)} onPressEnter={e => submitAddCustomKeyword(e.target.value)} />}
              key="0-0-1"
            />
          );
        }
      }
      return (
        <TreeNode
          icon={<Icon type="tag" theme="filled" />}
          key={item.id}
          dataRef={item}
          title={item.name}
          noteType={item.noteType}
        />
      );
    });
    return (
      <div className={styles.container} ref={this.setDomTreeBoxRef}>
        <Tree
          showIcon
          draggable
          // expandAction="doubleClick"
          autoExpandParent={autoExpandParent}
          defaultExpandAll
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          onSelect={(treeSelectedKeys, info) => onSelect(treeSelectedKeys, info)}
          // onDrop={this.onDrop}
          // onCheck={this.onCheck}
          className={styles.custom_tree}
          onExpand={keys => onExpandTree(keys)}
          onRightClick={e => this.handleOnRightClick(e)}
        >
          {treeList && loop(treeList)}
        </Tree>
        {rightClickItem && this.getNodeTreeMenu()}
      </div>
    );
  }
}
