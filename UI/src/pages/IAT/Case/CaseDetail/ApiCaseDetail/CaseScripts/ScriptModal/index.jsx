import {PlusOutlined} from '@ant-design/icons';
import {ModalForm, ProForm, ProFormSelect, ProFormRadio, ProFormText,} from '@ant-design/pro-components';
import {Button, message, Form} from 'antd';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import React from "react";


export default (props) => {
  const {onAdd, onUpdate, data } = props
  return (
    <ModalForm
      title={props.text?'编辑脚本信息':'新建脚本'}
      trigger={
        props.text?(
          <a>
            {props.text}
          </a>
        ):(
          <Button type="primary">
            <PlusOutlined/>
            添加
          </Button>
        )
      }
      autoFocusFirstInput
      layout={'horizontal'}
      initialValues={data || undefined}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        if (props.text){
          onUpdate({...values, caseId: props.data?.id})
        } else if (onAdd){
          onAdd(values);
        }
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText width="lg" name="name" label="脚本名称" placeholder="请输入名称"/>
      <ProFormRadio.Group
        name="script_type"
        label="脚本类型"
        options={[
          {
            label: '前置脚本',
            value: 1,
          },
          {
            label: '后置脚本',
            value: 2,
          },
        ]}
      />
      <ProFormSelect
        name="script_lan"
        label="脚本语言"
        valueEnum={{
          java: 'Java',
          python: 'Python',
          beanshell: 'Beanshell',
        }}
        placeholder="请选择"
        width={'md'}
      />
      <Form.Item name="script_data" label="脚本内容">
        <AceEditor
          placeholder="Placeholder Text"
          mode="json"
          theme="monokai"
          name="case_script"
          // onLoad={this.onLoad}
          // onChange={this.onChange}
          fontSize={14}
          tabSize={2}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={props.data?.text}
          width="100%"
          setOptions={{
            wrapBehavioursEnabled: true,
            wrap: true,
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            useSoftTabs: true
          }}/>
      </Form.Item>
    </ModalForm>
  );
};
