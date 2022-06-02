import React, { Component, useRef } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, message, Popconfirm, TreeSelect } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { connect } from 'dva';

import AddCaseModal from '../AddCaseModal';
import styles from './index.less';
import { queryCaseList } from '../../service';

@connect(({ iatCase, loading }) => ({
  iatCase,
  loading: loading.effects['model/queryFunction'],
}))
export default class Page extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyword: '',
    };
    this.tableRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.selectItem != nextProps.selectItem) {
      if (this.tableRef) {
        this.tableRef.current.reset();
        // if (nextProps.selectItem) {
        //   this.queryModuleList(nextProps.selectItem.projectId);
        // }
      }
    }
    return true;
  }

  /***
   * 用例列表管理
   * ***/

  handleSearchCase = (value) => {
    this.setState({ searchKeyword: value }, () => this.tableRef.current.reload());
  };

  handleCaseMove = (key, selectRowKeys) => {
    this.queryCaseMove(key, selectRowKeys);
  };

  handleCaseCopy = (caseIds) => {
    this.queryCaseCopy(caseIds);
  };

  handleCaseDelete = (caseIds) => {
    this.queryCaseDelete(caseIds);
  };

  handleUpdateCaseList = async (params) => {
    const { selectItem } = this.props;
    const { searchKeyword } = this.state;
    if (!selectItem) {
      message.info('请先选择模块！');
      return;
    }
    const response = await queryCaseList({
      type: 1,
      keyword: searchKeyword,
      page: params.current,
      pageSize: params.pageSize,
      moduleId: selectItem.id,
    });
    return {
      data: response.content ? response.content.data : [],
      success: response.code === 0,
      total: response.content.total,
    };
  };

  handleModalOk = (values) => {
    const { selectItem } = this.props;
    this.queryCaseAdd(selectItem.id, values.name);
  };

  handleModalCancel = () => {
    this.setState({ visible: false });
  };

  queryCaseAdd = (moduleId, caseName) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryCaseAdd',
      payload: { moduleId, caseName, type: 1 },
    }).then(() => {
      this.handleModalCancel();
      this.tableRef.current.reload();
    });
  };

  queryCaseCopy = (caseIds) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryCaseCopy',
      payload: { caseIds },
    }).then(() => {
      if (this.tableRef) {
        this.tableRef.current.reset();
      }
    });
  };

  queryCaseDelete = (caseIds) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryCaseDelete',
      payload: { caseIds },
    }).then(() => {
      if (this.tableRef) {
        this.tableRef.current.reset();
      }
    });
  };

  queryCaseMove = (moduleId, caseIds) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryCaseMove',
      payload: { moduleId, caseIds },
    }).then(() => {
      this.tableRef.current.reload();
      this.tableRef.current.clearSelected();
    });
  };

  queryModuleTree = (projectId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryModuleTree',
      payload: { projectId },
    }).then(() => {
      const { moduleList } = this.props.iatCase;
      this.setState({ moduleList });
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { selectItem, moduleList, iatCase: {treeData} } = this.props;
    const columns = [
      {
        title: '接口名称',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '类型',
        dataIndex: 'method',
        ellipsis: true,
        width: 100,
      },
      {
        title: '接口路径',
        dataIndex: 'path',
        ellipsis: true,
      },
      {
        title: '标签',
        dataIndex: 'labels',
        search: false,
        renderFormItem: (_, { defaultRender }) => {
          return defaultRender(_);
        },
        render: (_, record) => (
          <div>
            {record.labels.map((item) => (
              <Tag color="blue" key={item}>
                {item}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        title: '用例数量',
        key: 'caseCount',
        dataIndex: 'caseCount',
        hideInSearch: true,
      },
      {
        title: '更新人',
        dataIndex: 'updateUser',
        hideInSearch: true,
      },
      {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        valueType: 'dateTime',
        width: '15%',
        sorter: true,
        hideInSearch: true,
      },
      {
        title: '操作',
        valueType: 'option',
        render: (text, record) => [
          <a
            target="_blank"
            rel="noopener noreferrer"
            key='view'
            href={`/iat/case/detail?detailId=${record.id}&projectId=${this.props.projectId}`}
          >
            编辑
          </a>,
          <a
            key="copy"
            onClick={(e) => {
              e.preventDefault();
              this.handleCaseCopy([record.id]);
            }}
          >
            复制
          </a>,
          <Popconfirm
            placement="topRight"
            title="确认删除本条用例吗？"
            onConfirm={() => {
              this.handleCaseDelete([record.id]);
            }}
            okText="确认"
            cancelText="取消"
          >
            <a style={{ color: 'red' }} key="del">
              删除
            </a>
          </Popconfirm>,
        ],
      },
    ];
    const menu = (selectKeys) => (
      <Menu
        className={styles.moduleMenuContainer}
        onClick={({ key }) => this.handleMove(key, selectKeys)}
      >
        {moduleList && moduleList.map((item) => <Menu.Item key={item.id}>{item.text}</Menu.Item>)}
      </Menu>
    );
    return (
      <>
        <ProTable
          columns={columns}
          request={async (params) => await this.handleUpdateCaseList(params)}
          options={false}
          search={false}
          rowKey="id"
          actionRef={this.tableRef}
          pagination={{
            pageSize: 20,
            showSizeChanger: false,
          }}
          tableStyle={{
            height: '100%',
            display: 'flex',
            overflow: 'hidden',
          }}
          dateFormatter="string"
          rowSelection={{}}
          tableAlertOptionRender={({ selectedRowKeys }) => {
            return (
              <Space size={16}>
                <TreeSelect
                  style={{
                    width: 150,
                  }}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: 'auto',
                  }}
                  treeData={treeData}
                  placeholder="请先选择模块"
                  treeDefaultExpandAll
                  onChange={(key) => this.handleCaseMove(key, selectedRowKeys)}
                  fieldNames={{ label: 'text', value: 'id', children: 'items' }}
                />
                <Popconfirm
                  placement="topRight"
                  title="确认删除这些用例吗？"
                  onConfirm={() => {
                    this.handleCaseDelete(selectedRowKeys);
                  }}
                  okText="确认"
                  cancelText="取消"
                >
                  <a style={{ color: 'red' }} key="del">
                    批量删除
                  </a>
                </Popconfirm>
              </Space>
            );
          }}
          toolbar={{
            title: '用例列表',
            subTitle: selectItem ? selectItem.text : '请选择对应模块',
            search: {
              onSearch: (value) => this.handleSearchCase(value),
            },
            filter: false,
            actions: [
              <Button
                key="button"
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => this.setState({ visible: true })}
              >
                新建
              </Button>,
            ],
            settings: false,
          }}
        />
        <AddCaseModal
          title={'新建用例'}
          label={'用例名称'}
          visible={visible}
          width={640}
          confirmLoading={confirmLoading}
          onOk={this.handleModalOk}
          onCancel={this.handleModalCancel}
        />
      </>
    );
  }
}
