import React, { PureComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {
  Card,
  Table,
  Select,
  Form,
  Input,
  Modal,
} from 'antd';
import { connect } from 'dva';
import styles from './keywords.less';

const { Option } = Select;
const { TextArea } = Input;

@connect(({ system, loading }) => ({
  system,
  loading: loading.effects['system/queryGetLibKeywords'],
}))
@Form.create()
export default class KeywordList extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      allLibs: [],
      libKeywords: [],
      showEditModal: false,
      editRecord: {},
      selectedLib: null,
    };
    this.setDomRef = ref => (this.domEditor = ref);
  }

  componentWillMount() {
    this.queryGetAllLibs();
  }

  componentWillUnmount() {
    if (this.domEditor) {
      this.domEditor.editor.remove();
      this.domEditor.editor.destroy();
    }
  }

  queryGetAllLibs = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryGetAllLibs',
      payload: {
        status: '',
      },
    }).then(() => {
      const { allLibs } = this.props.system;
      this.setState({
        allLibs,
      });
    });
  };

  queryGetLibKeywords = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryGetLibKeywords',
      payload: {
        id,
      },
    }).then(() => {
      const { libKeywords } = this.props.system;
      this.setState({
        libKeywords,
      });
    });
  };

  handleLibChange = value => {
    this.setState({ selectedLib: value }, () => {
      this.queryGetLibKeywords(value);
    });
  }

  handleEditOk = () => {
    const { form } = this.props;
    const { editRecord: { id }, selectedLib } = this.state;
    this.queryUpdateKeywords(selectedLib, id, form.getFieldsValue());
  }

  queryUpdateKeywords = (selectedLib, id, values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/queryUpdateKeywords',
      payload: {
        id, ...values,
      },
    })
      .then(() => {
        this.setState({ showEditModal: false, editRecord: {} },
          () => this.queryGetLibKeywords(selectedLib));
      });
  }

  handleCancel = () => {
    this.setState({ showEditModal: false, editRecord: {} });
  }

  handleShowEdit = record => {
    this.setState({ editRecord: record, showEditModal: true });
  }

  handleEditorChange=e => {
    const newValue = e.target.getContent();
    const { form } = this.props;
    form.setFieldsValue({
      doc: newValue,
    });
  };

  render() {
    const { allLibs, libKeywords, showEditModal, editRecord } = this.state;
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    const columns = [
      {
        title: '英文名称',
        dataIndex: 'name_en',
        key: 'name_en',
        width: '20%',
        render: text => <span className={styles.keywordContent}>{text}</span>,
      },
      {
        title: '中文名称',
        dataIndex: 'name_zh',
        key: 'name_zh',
        width: '20%',
      },
      {
        title: '简述',
        dataIndex: 'shortdoc',
        key: 'shortdoc',
        width: '50%',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <div>
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
          <Select placeholder="请选择库" style={{ width: 220 }} onChange={value => this.handleLibChange(value)}>
            {allLibs && allLibs.map(item => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </div>
        <Table loading={loading} rowKey="id" dataSource={libKeywords} columns={columns} pagination={{ pageSize: 20 }} />
        <Modal
          title="编辑关键词信息"
          visible={showEditModal}
          onOk={this.handleEditOk}
          width={800}
          onCancel={this.handleCancel}
          destroyOnClose
          maskClosable={false}
        >
          <Form.Item { ...formItemLayout } label="英文名称">
            {getFieldDecorator('name_en', {
              rules: [
                {
                  required: true,
                },
              ],
              initialValue: editRecord.name_en,
            })(<span className={styles.keywordContent}>{editRecord.name_en}</span>)}
          </Form.Item>
          <Form.Item { ...formItemLayout } label="中文名称">
            {getFieldDecorator('name_zh', {
              initialValue: editRecord.name_zh,
            })(<Input />)}
          </Form.Item>
          <Form.Item { ...formItemLayout } label="功能简述">
            {getFieldDecorator('shortdoc', {
              initialValue: editRecord.shortdoc,
            })(<TextArea />)}
          </Form.Item>
          <Form.Item { ...formItemLayout } label="功能详述" className={styles.rich_cell}>
            {getFieldDecorator('doc', {
              initialValue: editRecord.doc,
            })(
              <Editor
                ref={this.setDomRef}
                init={{
                  menubar: false,
                  toolbar: false,
                  inline: true,
                  placeholder: '请输入信息',
                  plugins: ['placeholder', 'paste'],
                  content_style: 'p {font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";font-size: 14px;color: rgba(0, 0, 0, 0.65);}',
                  paste_auto_cleanup_on_paste: true,
                  paste_remove_styles: true,
                  paste_remove_styles_if_webkit: true,
                  paste_strip_class_attributes: true,
                }}
                onBlur={this.handleEditorChange}
              />,
            )}
          </Form.Item>
        </Modal>
      </Card>
    );
  }
}
