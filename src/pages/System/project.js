/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import {Card,Table,Button,Icon,Modal,Input,Upload,Divider,message } from 'antd'
import { connect } from 'dva';

@connect(({ system ,loading}) => ({
  system,
  loading:loading.effects['system/queryProjectList']
}))
class Project extends PureComponent {
  state={
    showAddModal:false,
    projectList:[],
    name:'',
    projectId:'',
  };

  componentWillMount() {
    this.queryProjectList()
  }

  showAddModal=()=>{
    this.setState({showAddModal:true})
  };

  handleAdd=()=>{
    const {name} = this.state;
    const {dispatch} = this.props;
    if(!name){
      return
    }
    dispatch({
      type:'system/queryAddProject',
      payload:{
        name,
      },
    })
      .then(()=>{
        this.queryProjectList()
        this.handleCancel()
      })
  };

  queryProjectList=()=>{
    const {dispatch} = this.props
    dispatch({
      type:'system/queryProjectList',
      payload:{
        status:'',
      }
    })
      .then(()=>{
        const {system} = this.props
        this.setState({
          projectList:system.projectList,
        })
      })
  };

  handleCancel=()=>{
    this.setState({showAddModal:false,name:''})
  };

  querySetProjectStatus=(id,statusCode)=>{
    const {dispatch} = this.props
    dispatch({
      type:'system/querySetProjectStatus',
      payload:{
        id,
        status:statusCode,
      }
    })
      .then(()=>{
        this.queryProjectList()
      })
  }

  handleSetClassStatus=(record)=>{
    if(record.status === 1){
      this.querySetProjectStatus(record.id,0)
    }else {
      this.querySetProjectStatus(record.id,1)
    }
  };

  handleUpload=(id)=>{
    this.setState({
      projectId:id,
    })
  }

  render() {
    const {projectList,showAddModal,name,projectId} = this.state
    const {loading} = this.props;
    const props = {
      name: 'file',
      action: '/api/IAT/uploadFile',
      headers: {
        authorization: 'authorization-text',
      },
      data:{
        id:projectId
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const columns = [{
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '用例数量',
      dataIndex: 'count',
      key: 'count',
    },{
      title: '创建人',
      dataIndex: 'add_user',
      key: 'add_user',
    },{
      title: '创建时间',
      dataIndex: 'add_time',
      key: 'add_time',
    },{
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) =>{
        return(
          <div>
            {record.status ===1?
              <a onClick={()=>this.handleSetClassStatus(record)}>关闭</a>
              :
              <a onClick={()=>this.handleSetClassStatus(record)}>启用</a>
            }
            <Divider type="vertical" />
            <Upload {...props}>
              <a onClick={()=>this.handleUpload(record.id)}>批量导入</a>
            </Upload>
          </div>

        )
      }
    }]
    return (
      <div>
        <Card bordered={false}>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.showAddModal}
            >
              <Icon type='plus' />
              新增项目
            </Button>
          </div>
          <Table loading={loading} dataSource={projectList} columns={columns} size='small' />
        </Card>
        <Modal
          visible={showAddModal}
          title="新增项目"
          onOk={()=>this.handleAdd()}
          onCancel={()=>this.handleCancel()}
        >
          <Input placeholder="输入项目名称" autoFocus value={name} onChange={(e)=>this.setState({name:e.target.value})} />
        </Modal>
      </div>
    );
  }
}
export default Project
