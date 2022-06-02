import React from 'react';
import { Button, Tag, Space } from 'antd';
import ProList from '@ant-design/pro-list';
import { EditFilled, CopyFilled, DeleteFilled } from '@ant-design/icons';

import ApiCaseDetail from '../ApiCaseDetail'
import styles from './index.less'

const dataSource = [
  {
    id: 1,
    level: 0,
    name: '检查正确账号密码登录成功',
    desc: '我是一条测试的描述',
    status: 1,
    label: ['核心转化', '登录'],
    updateUser: '陈   皮',
    updateTime: '2022-05-02 12:34:22'
  },
  {
    id: 2,
    level: 1,
    name: '检查错误密码无法登录',
    desc: '我是一条测试的描述',
    status: 1,
    label: ['核心转化', '登录'],
    updateUser: '陈   皮',
    updateTime: '2022-05-02 12:34:22'
  },
  {
    id: 3,
    level: 2,
    name: '检查密码为空时提示正确',
    desc: '我是一条测试的描述',
    status: 1,
    label: ['核心转化', '登录'],
    updateUser: '陈   皮',
    updateTime: '2022-05-02 12:34:22'
  },
];
export default (props) => (
  <ProList
    onRow={(record) => {
      return {
        onMouseEnter: () => {
          console.log(record);
        },
        onClick: () => {
          console.log(record);
        },
      };
    }}
    rowKey="id"
    dataSource={dataSource}
    pagination={{
      size: 'small',
      defaultPageSize: 5,
      // showSizeChanger: true,
    }}
    // showActions="hover"
    // showExtra="hover"
    metas={{
      title: {
        dataIndex: 'name',
      },
      avatar:{
        render: (_, record) => {
          return (
            <>
              {record.level === 0&&(<Tag color="#f50">P{record.level}</Tag>)}
              {record.level === 1&&(<Tag color="#2db7f5">P{record.level}</Tag>)}
              {record.level === 2&&(<Tag color="#f6b93b">P{record.level}</Tag>)}
            </>
        );
        },
      },
      description: {
        dataIndex: 'desc',
      },
      subTitle: {
        render: (_, record) => {
          return (
            <Space size={0}>
              {record.label && record.label.map(item =>(
                <Tag key={item} color="blue">{item}</Tag>
              ))}
            </Space>);
        },
      },
      content: {
        dataIndex: 'content',
        render: (_,record) => {
          return(
            <div className={styles.contentTags}>
              <span>{record.updateUser}</span>
              <span>{record.updateTime}</span>
            </div>
          )
        }
      },
      actions: {
        render: (text, row) => [
          <Button key="copy" size="small" icon={<CopyFilled />} >复制</Button>,
          <ApiCaseDetail projectId={props.projectId} />,
          <Button key="del" danger type="primary" size="small" icon={<DeleteFilled />} >删除</Button>,
        ],
      },
    }}
  />);
