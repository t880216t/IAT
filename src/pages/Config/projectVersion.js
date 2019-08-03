import React, { PureComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  Card,
  Table,
  Select,
  Form,
  Input,
  Modal,
  Button,
  Icon,
  message,
  Divider,
} from 'antd';
import { connect } from 'dva';
import styles from './keywords.less';

const { Option } = Select;

@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
}))
@Form.create()
export default class KeywordList extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      projectList: [],
      versionList: [],
      visibleAddVersion: false,
      editRecord: {},
      selectedLib: null,
    };
    this.setDomRef = ref => (this.domEditor = ref);
  }

  componentWillMount() {
    this.queryProjectList();
  }

  componentWillUnmount() {

  }

  queryProjectList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryProjectList',
      payload: {
        status: '1',
      },
    })
      .then(() => {
        const { projectList } = this.props.system;
        this.setState({
          projectList,
        }, () => {
          if (projectList.length>0) {
            this.queryProjectVersionList(projectList[0].id);
          }
        });
      });
  };

  queryProjectVersionList = (projectId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryProjectVersionList',
      payload: {
        status: 1,projectId,
      },
    }).then(() => {
      const { versionList } = this.props.system;
      this.setState({
        versionList,
      });
    });
  };

  handleProjectChange = value => {
    this.setState({ selectedProject: value }, () => {
      this.queryProjectVersionList(value);
    });
  }

  handleAddOk = () => {
    const { form } = this.props;
    const { selectedProject } = this.state;
    this.queryAddProjectVersion(selectedProject, form.getFieldsValue());
  }

  handleEditOk = () => {
    const { form } = this.props;
    const { editRecord: { id }} = this.state;
    this.queryUpdateVersion(id, form.getFieldsValue());
  }

  queryAddProjectVersion = (projectId, values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryAddProjectVersion',
      payload: {
        projectId, ...values,
      },
    })
      .then(() => {
        this.setState({ visibleAddVersion: false },
          () => this.queryProjectVersionList(projectId)
        );
      });
  }

  queryUpdateVersion = (id,values) => {
    const { dispatch } = this.props;
    const { selectedProject } = this.state;
    dispatch({
      type: 'system/queryUpdateVersion',
      payload: {
        id, ...values,
      },
    })
      .then(() => {
        this.setState({ visibleAddVersion: false },
          () => this.queryProjectVersionList(selectedProject)
        );
      });
  }

  handleDeleteVersion = (id) => {
    const { dispatch } = this.props;
    const { selectedProject } = this.state;
    dispatch({
      type: 'system/querySetVersionStatus',
      payload: {
        id, status: 0,
      },
    })
      .then(() => {
        this.queryProjectVersionList(selectedProject);
      });
  }

  handleCancel = () => {
    this.setState({ visibleAddVersion: false, editRecord: {} });
  }

  handleShowEdit = record => {
    this.setState({ editRecord: record, visibleAddVersion: true });
  };

  handleAddButton = () => {
    const { selectedProject } = this.state;
    if (!selectedProject) {
      message.warning('请先选择项目');
      return
    }
    this.setState({ visibleAddVersion: true })
  }

  render() {
    const { projectList, versionList, visibleAddVersion, editRecord } = this.state;
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width: '8%',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      },
      {
        title: '用例数',
        dataIndex: 'count',
        key: 'count',
      },
      {
        title: '新建人',
        dataIndex: 'addUser',
        key: 'addUser',
      },
      {
        title: '新建信息',
        dataIndex: 'addTime',
        key: 'addTime',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <div>
            {record.status === 1 && (
              <a onClick={() => this.handleDeleteVersion(record.id)}>删除</a>
            )}
            {record.status === 1 && (
              <Divider type="vertical" />
            )}
            <a onClick={() => this.handleShowEdit(record)}>编辑</a>
          </div>
        ),
      },
    ];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Card bordered={false}>
        <div className={styles.headerContainer}>
          <Select placeholder="请选择项目" style={{ width: 220 }} onChange={value => this.handleProjectChange(value)}>
            {projectList && projectList.map(item => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
          </Select>
          <div>
            <Button
              type="primary"
              onClick={() => this.handleAddButton()}
            >
              <Icon type="plus" />
              新建版本标签
            </Button>
          </div>
        </div>
        <Table loading={loading} rowKey="id" dataSource={versionList} columns={columns} pagination={{ pageSize: 20 }} />
        <Modal
          title={editRecord? '编辑版本标记': '新建版本标记'}
          visible={visibleAddVersion}
          onOk={editRecord? this.handleEditOk: this.handleAddOk}
          width={500}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
        >
          <Form.Item { ...formItemLayout } label="版本名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: editRecord.name || '',
            })(<Input />)}
          </Form.Item>
        </Modal>
      </Card>
    );
  }
}
