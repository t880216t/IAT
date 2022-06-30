import React, {Component} from 'react';
import {Button, Select, Space, Tag, Popconfirm} from 'antd';
import {connect} from 'dva';

import ProList from '@ant-design/pro-list';
import { EditFilled, CopyFilled, DeleteFilled } from '@ant-design/icons';

import ApiCaseDetail from '../ApiCaseDetail'
import ApiCaseInfoModal from '../ApiCaseInfoModal'
import styles from './index.less'
import {queryApiCaseCopy, queryApiCaseDelete} from "@/pages/IAT/Case/service";

const {Option} = Select;

@connect(({iatCase, loading}) => ({
  iatCase,
  loading: loading.effects['model/queryFunction'],
}))
export default class Page extends Component {
  state = {
    caseList: [],
  };

  componentDidMount() {
    const {detailId} = this.props;
    this.setState({detailId},()=>{
      this.queryApiCaseList({detailId})
    })
  }

  queryApiCaseList = params => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatCase/queryApiCaseList',
      payload: {...params},
    }).then(() => {
      const {caseList} = this.props.iatCase;
      this.setState({
        caseList,
      });
    });
  };

  queryApiCaseInfoUpdate = params => {
    const {dispatch} = this.props;
    const {detailId} = this.state;
    dispatch({
      type: 'iatCase/queryApiCaseInfoUpdate',
      payload: {...params},
    }).then(() => {
      this.queryApiCaseList({detailId})
    });
  };

  queryApiCaseCopy = caseId => {
    const {dispatch} = this.props;
    const {detailId} = this.state;
    dispatch({
      type: 'iatCase/queryApiCaseCopy',
      payload: {caseId},
    }).then(() => {
      this.queryApiCaseList({detailId})
    });
  };

  queryApiCaseDelete = caseId => {
    const {dispatch} = this.props;
    const {detailId} = this.state;
    dispatch({
      type: 'iatCase/queryApiCaseDelete',
      payload: {caseId},
    }).then(() => {
      this.queryApiCaseList({detailId})
    });
  };

  render() {
    const {projectId} = this.props;
    const {caseList} = this.state;
    const column = {
      title: {
        dataIndex: 'name',
        render: (text, record) => (
          <div className={styles.caseName}>
            <ApiCaseInfoModal text={text} data={record} onUpdate={this.queryApiCaseInfoUpdate}/>
          </div>
        )
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
        render: (text, record) => [
          <Button key="copy" size="small" icon={<CopyFilled />} onClick={()=>this.queryApiCaseCopy(record.id)} >复制</Button>,
          <ApiCaseDetail projectId={projectId} caseId={record.id} />,
          <Popconfirm title="确认删除这条用例吗？" okText="确认" cancelText="取消" onConfirm={()=>this.queryApiCaseDelete(record.id)}>
            <Button key="del" danger type="primary" size="small" icon={<DeleteFilled />} >删除</Button>
          </Popconfirm>,
        ],
      },
    }
    return (
      <ProList
        onRow={(record) => {
          // return {
          //   onMouseEnter: () => {
          //     console.log(record);
          //   },
          //   onClick: () => {
          //     console.log(record);
          //   },
          // };
        }}
        rowKey="id"
        dataSource={caseList}
        pagination={{
          size: 'small',
          defaultPageSize: 5,
          // showSizeChanger: true,
        }}
        // showActions="hover"
        // showExtra="hover"
        metas={column}
      />
    );
  }
}
