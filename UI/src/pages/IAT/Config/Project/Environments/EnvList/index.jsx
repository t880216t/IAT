import React, {Component} from 'react';
import { Row, Col, Menu, Tooltip, Input, Popconfirm, Button, Spin } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

class MenuItem extends Component {
  state = {
    editEnable: false,
    envName: '',
  };

  componentDidMount() {
  }

  render() {
    const {item, onUpdate, onCopy, onDel, onClick} = this.props;
    const {editEnable, envName} = this.state;
    return (
      <Row>
        <Col span={15} onClick={onClick}>
          {editEnable?(
            <Input
              autoFocus
              defaultValue={item.env_name}
              onPressEnter={()=>this.setState({editEnable: false},()=>onUpdate({envId: item.id, envName: envName}))}
              onBlur={()=>this.setState({editEnable: false},()=>onUpdate({envId: item.id, envName: envName}))}
              onChange={e=>this.setState({envName: e.target.value})}
            />
          ):(
            <span>{item.env_name}</span>
          )}
        </Col>
        <Col span={3}>
          {!editEnable&&(
            <Tooltip title={"编辑"}>
              <EditOutlined onClick={()=>this.setState({editEnable: true, envName: item.env_name})} />
            </Tooltip>
          )}
        </Col>
        <Col span={3}>
          <Tooltip title={"复制"}>
            <CopyOutlined onClick={() => onCopy({envId: item.id})} />
          </Tooltip>
        </Col>
        <Col span={3}>
          <Popconfirm placement="top" title={"确认删除吗？"} onConfirm={() => onDel({envId: item.id})} okText="确认" cancelText="取消">
            <DeleteOutlined />
          </Popconfirm>
        </Col>
      </Row>
    );
  }
}

export default class Page extends Component {
  state = {
    showAdd: false
  };

  componentDidMount() {
  }

  render() {
    const {envList, onUpdate, onCopy, onDel, onClick, onAdd} = this.props;
    const defaultSelectedKey = envList && envList.length > 0 ? [envList[0].id.toString()] : undefined
    const {showAdd} = this.state;
    return (
      <>
        <Menu
          theme="light"
          mode="inline"
          style={{
            height: '100%',
          }}
          defaultSelectedKeys={defaultSelectedKey}
        >
          {envList?.map(item=>(
            <Menu.Item key={item.id}>
              <MenuItem item={item} onClick={()=>onClick({envId: item.id})} onUpdate={onUpdate} onCopy={onCopy} onDel={onDel}/>
            </Menu.Item>
          ))}
          <Menu.Item>
            {showAdd?(
              <Input placeholder={"请输入环境名称"} autoFocus onPressEnter={(e)=>this.setState({showAdd: false},()=>onAdd({envName: e.target.value}))} onBlur={(e)=>this.setState({showAdd: false},()=>onAdd({envName: e.target.value}))}/>
            ):(
              <Button size={'small'} block icon={<PlusOutlined />} type="dashed" onClick={()=>this.setState({showAdd: true})}>新建环境配置</Button>
            )}
          </Menu.Item>
        </Menu>
      </>
    );
  }
}
