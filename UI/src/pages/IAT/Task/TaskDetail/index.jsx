import React, {Component} from 'react';
import {Button, Checkbox, Select, Space, Divider, Empty} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {connect} from 'dva';
import ProCard from '@ant-design/pro-card';
import {CaretRightOutlined, EditTwoTone, CheckSquareTwoTone, CloseSquareTwoTone, SettingOutlined} from "@ant-design/icons";
import EdiText from 'react-editext';

import styles from './index.less';
import CaseDragList from './CaseDragList';
import CaseItemDetail from './CaseItemDetail';
import TaskInfoContent from './TaskInfoContent';
import CaseSelectList from './CaseSelectList';
import Environments from "@/pages/IAT/Config/Project/Environments"

const {Option} = Select;

@connect(({iatTask, iatConfig, loading}) => ({
  iatTask,
  iatConfig,
  loading: loading.effects['iatTask/queryTaskInfo'],
}))
export default class Page extends Component {
  state = {
    taskInfo: null,
    projectId: null,
    taskId: null,
    envList: null,
    selectedId: null,
  };

  componentDidMount() {
    const { taskId } = this.props.location.query;
    this.setState({taskId}, () => {
      this.queryTaskInfo(taskId)
    })
  }

  queryTaskInfo = taskId => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatTask/queryTaskInfo',
      payload: {taskId},
    }).then(() => {
      const {taskInfo} = this.props.iatTask;
      this.setState({
        taskInfo,
        projectId: taskInfo?.project
      },() => this.queryProjectEnvList());
    });
  };

  queryProjectEnvList = () => {
    const {dispatch} = this.props;
    const {projectId} = this.state;
    dispatch({
      type: 'iatConfig/queryProjectEnvList',
      payload: {projectId},
    }).then(() => {
      const {envList} = this.props.iatConfig;
      this.setState({
        envList,
      });
    });
  };

  handleNameUpdate = (value) => {
    console.log(value);
  };

  handleCaseSelect = (selectedId) => {
    this.setState({selectedId})
  };

  render() {
    const {taskInfo, projectId, envList, taskId, selectedId} = this.state;
    const {loading} = this.props;

    return (
      <PageContainer
        // ghost
        breadcrumb={false}
        loading={loading}
        header={{
          title: (
            <EdiText
              showButtonsOnHover
              type="text"
              value={taskInfo?.name}
              onSave={this.handleNameUpdate}
              editButtonContent={<EditTwoTone />}
              saveButtonContent={<CheckSquareTwoTone style={{fontSize: 24}} />}
              cancelButtonContent={<CloseSquareTwoTone style={{marginLeft:5, fontSize: 24}} />}
              editButtonClassName={styles.editButton}
              saveButtonClassName={styles.editButton}
              cancelButtonClassName={styles.editButton}
              inputProps={{
                className: styles.inputWarp,
              }}
            />
          ),
          extra: [
            taskInfo && <Select
              defaultValue={taskInfo?.env_id}
              style={{ width: 180 }}
              placeholder="请选择环境"
              dropdownRender={menu => (
                <>
                  {menu}
                  <Divider style={{ margin: '8px 0' }} />
                  <Space align="center" style={{ padding: '0 8px 4px' }}>
                    <Environments size={'normal'} projectId={projectId} />
                  </Space>
                </>
              )}
            >
              {envList?.map(item => (
                <Option key={item.id} value={item.id}>{item.env_name}</Option>
              ))}
            </Select>,
            <Button key="exec" type="primary" icon={<CaretRightOutlined />}>
              开始执行
            </Button>
          ]
        }}
        content={
          <>
            {taskInfo && <TaskInfoContent data={taskInfo} />}
          </>
        }
        tabList={[
          {
            tab: '用例编排',
            key: 'caseList',
            closable: false,
          },
          {
            tab: '执行记录',
            key: 'execList',
            closable: false,
          },
        ]}
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard gutter={6} ghost>
            <ProCard
              colSpan={6}
              bodyStyle={{padding: 4}}
              title={"用例列表"}
              extra={
                <Space>
                  <Checkbox onChange={(e) => console.log(e)}>共享Cookie</Checkbox>
                  <CaseSelectList size={'normal'} projectId={projectId} />
                </Space>
              }
            >
              <CaseDragList taskId={taskId} onSelect={this.handleCaseSelect} />
            </ProCard>
            <ProCard ghost={selectedId} colSpan={18}>
              {selectedId && (<CaseItemDetail caseId={selectedId} />)}
              {!selectedId && <Empty style={{height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}} description={'请先选择用例'} />}
            </ProCard>
          </ProCard>
        </ProCard>
      </PageContainer>
    );
  }
}
