import React from 'react';
import { Transfer, Tree } from 'antd';

const { TreeNode } = Tree;

export default class TreeTransfer extends React.Component {

  render() {
    const { dataSource, targetKeys, ...restProps } = this.props;
    // Customize Table Transfer
    const isChecked = (selectedKeys, eventKey) => {
      return selectedKeys.indexOf(eventKey) !== -1;
    };

    const generateTree = (treeNodes = [], checkedKeys = []) => {
      return treeNodes.map(item => (
        <TreeNode key={item.id} title={item.name}>
          {generateTree(item.children, checkedKeys)}
        </TreeNode>
      ));
    };

    const transferDataSource = [];
    function flatten(list = []) {
      list.forEach(item => {
        transferDataSource.push(item);
        flatten(item.children);
      });
    }
    flatten(dataSource);
    return (
      <Transfer
        {...restProps}
        rowKey={record => record.id}
        targetKeys={targetKeys}
        dataSource={transferDataSource}
        className="tree-transfer"
        render={item => item.name}
        showSelectAll={false}
      >
        {({ direction, selectedKeys, onItemSelectAll }) => {
          if (direction === 'left') {
            const checkedKeys = [...selectedKeys, ...targetKeys];
            return (
              <Tree
                blockNode
                checkable
                defaultExpandAll
                checkedKeys={checkedKeys}
                onCheck={(treeCheckedKeys, { node: { props: { eventKey } } }) => {
                  onItemSelectAll(treeCheckedKeys, !isChecked(checkedKeys, eventKey));
                }}
                onSelect={(treeCheckedKeys, { node: { props: { eventKey } } }) => {
                  onItemSelectAll(treeCheckedKeys, !isChecked(checkedKeys, eventKey));
                }}
              >
                {generateTree(dataSource, targetKeys)}
              </Tree>
            );
          }
        }}
      </Transfer>
    );
  }
}
