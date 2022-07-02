import {PlusOutlined} from '@ant-design/icons';
import {ModalForm, ProCard, ProTable, ProFormTreeSelect} from '@ant-design/pro-components';
import {Button, message, Space, Input, Select, AutoComplete} from 'antd';
import React, {useEffect, useState} from 'react';

const { Option } = Select
const { Search } = Input;
import styles from './index.less';

const valueEnum = ['success', 'error', 'processing', 'default'];
const ipListDataSource = [];
for (let i = 0; i < 10; i += 1) {
  ipListDataSource.push({
    ip: `106.14.98.1${i}4`,
    cpu: 10,
    mem: 20,
    status: valueEnum[Math.floor(Math.random() * 10) % 4],
    disk: 30,
  });
}

const DetailList = (props) => {
  const {ip} = props;
  const [tableListDataSource, setTableListDataSource] = useState([]);
  const columns = [
    {
      title: '用例名称',
      key: 'createdAt',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
    },
    {
      title: '调试结果',
      key: 'code',
      width: 120,
      dataIndex: 'code',
    },
    {
      title: '操作',
      key: 'option',
      width: 80,
      valueType: 'option',
      render: () => [<a key="a">添加</a>],
    },
  ];
  useEffect(() => {
    const source = [];
    for (let i = 0; i < 15; i += 1) {
      source.push({
        createdAt: Date.now() - Math.floor(Math.random() * 10000),
        code: '',
        key: i,
      });
    }
    setTableListDataSource(source);
  }, [ip]);
  return (
    <ProTable
      columns={columns}
      dataSource={tableListDataSource}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
      }}
      className={styles.caseList}
      rowSelection={{}}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a>批量添加</a>
          </Space>
        );
      }}
      scroll={{
        y: 360,
      }}
      size={'small'}
      rowKey="key"
      toolBarRender={false}
      search={false}
    />);
};

const ApiList = (props) => {
  const {onChange, ip} = props;
  const columns = [
    {
      title: '接口名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '路径',
      key: 'module',
      dataIndex: 'module',
    },
  ];
  return (
    <ProTable
      columns={columns}
      request={(params, sorter, filter) => {
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: ipListDataSource,
          success: true,
        });
      }}
      size={'small'}
      rowKey="id"
      rowClassName={(record) => {
        return record.ip === ip ? styles['split-row-select-active'] : '';
      }}
      className={styles.apiListToolbar}
      toolBarRender={() => [
        <Input.Group compact className={styles.searchCase}>
          <ProFormTreeSelect
            name="module"
            placeholder="请选择模块"
            allowClear
            width={120}
            secondary
            initialValue={'all'}
            request={async () => {
              return [
                {
                  title: '全部模块',
                  value: 'all',
                },
                {
                  title: 'Node2',
                  value: '0-1',
                  children: [
                    {
                      title: 'Child Node3',
                      value: '0-1-0',
                    },
                    {
                      title: 'Child Node4',
                      value: '0-1-1',
                    },
                    {
                      title: 'Child Node5',
                      value: '0-1-2',
                    },
                  ],
                },
              ];
            }}
            // tree-select args
            fieldProps={{
              showArrow: false,
              filterTreeNode: true,
              showSearch: true,
              dropdownMatchSelectWidth: false,
              labelInValue: true,
              autoClearSearchValue: true,
              multiple: false,
              treeNodeFilterProp: 'title',
              fieldNames: {
                label: 'title',
              },
            }}
          />
          <Search placeholder="搜索名称/路径" onSearch={()=>{}} style={{ width: 200 }} />
        </Input.Group>,
      ]}
      scroll={{
        y: 420,
      }}
      options={false}
      pagination={false}
      search={false}
      onRow={(record) => {
        return {
          onClick: () => {
            if (record.ip) {
              onChange(record.ip);
            }
          },
        };
      }}
    />);
};

export default (props) => {
  const {size, projectId} = props
  const [ip, setIp] = useState('0.0.0.0');
  return (
    <ModalForm
      title="添加用例"
      trigger={
        <Button type="primary" size={size}>
          <PlusOutlined/>
          添加
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        onCancel: () => console.log('run'),
        bodyStyle: {padding: 0},
      }}
      width={980}
      submitter={false}
    >
      <ProCard split="vertical" ghost>
        <ProCard colSpan="384px" ghost>
          <ApiList onChange={(cIp) => setIp(cIp)} ip={ip}/>
        </ProCard>
        <ProCard >
          <DetailList ip={ip}/>
        </ProCard>
      </ProCard>
    </ModalForm>);
};
