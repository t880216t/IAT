import React, { Component, useRef } from 'react';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, message, Popconfirm } from 'antd';
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

  handleCopyCase = (caseIds) => {
    this.queryCopyCases(caseIds);
  };

  handleDeleteCase = (caseIds) => {
    this.queryDeleteCases(caseIds);
  };

  queryCopyCases = (caseIds) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryCopyCases',
      payload: { caseIds },
    }).then(() => {
      if (this.tableRef) {
        this.tableRef.current.reset();
      }
    });
  };

  queryDeleteCases = (caseIds) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryDeleteCases',
      payload: { caseIds },
    }).then(() => {
      if (this.tableRef) {
        this.tableRef.current.reset();
      }
    });
  };

  queryModuleList = (projectId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryModuleList',
      payload: { projectId },
    }).then(() => {
      const { moduleList } = this.props.iatCase;
      this.setState({ moduleList });
    });
  };

  queryMoveCases = (moduleId, caseIds) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryMoveCases',
      payload: { moduleId, caseIds },
    }).then(() => {
      this.tableRef.current.reload();
      this.tableRef.current.clearSelected();
    });
  };

  queryAddCase = (moduleId, caseName) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'iatCase/queryAddCase',
      payload: { moduleId, caseName, type: 1 },
    }).then(() => {
      this.handleModalCancel();
      this.tableRef.current.reload();
    });
  };

  handleMove = (key, selectRowKeys) => {
    this.queryMoveCases(key, selectRowKeys);
  };

  handleSearchCase = (value) => {
    this.setState({ searchKeyword: value }, () => this.tableRef.current.reload());
  };

  handleModalOk = (values) => {
    const { selectItem } = this.props;
    this.queryAddCase(selectItem.id, values.name);
  };

  handleModalCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const { selectItem, moduleList } = this.props;
    const columns = [
      {
        title: '用例标题',
        dataIndex: 'name',
        ellipsis: true,
        width: '25%',
      },
      {
        title: '标签',
        dataIndex: 'labels',
        width: '20%',
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
              this.handleCopyCase([record.id]);
            }}
          >
            复制
          </a>,
          <Popconfirm
            placement="topRight"
            title="确认删除本条用例吗？"
            onConfirm={() => {
              this.handleDeleteCase([record.id]);
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
          // scroll={{ y: 600 }}
          rowSelection={{}}
          tableAlertOptionRender={({ selectedRowKeys }) => {
            return (
              <Space size={16}>
                <Dropdown overlay={menu(selectedRowKeys)}>
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    批量移动到模块
                    <DownOutlined style={{ marginLeft: 3 }} />
                  </a>
                </Dropdown>
                <Popconfirm
                  placement="topRight"
                  title="确认删除这些用例吗？"
                  onConfirm={() => {
                    this.handleDeleteCase(selectedRowKeys);
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
