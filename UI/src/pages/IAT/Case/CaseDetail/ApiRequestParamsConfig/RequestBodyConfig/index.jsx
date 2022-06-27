import { EditableProTable, ProCard, ProForm, ProFormDependency, ProFormSelect, ProFormRadio, } from '@ant-design/pro-components';
import { Button, Select } from 'antd';
import React, { useRef, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default (props) => {
  const {isCase} = props;
  const formRef = useRef();
  return (
    <ProForm
      formRef={formRef}
      validateTrigger="onBlur"
    >
      <ProForm.Item>
        <ProCard title="请求Body" headerBordered extra={
          <ProFormSelect
            name="select"
            valueEnum={{
              json: 'json',
              xml: 'xml',
              text: 'text',
            }}
            placeholder="Please select a country"
          />
        }>
          <ProFormDependency name={['table']}>
            {({ table }) => {
              return (
                <AceEditor
                  placeholder="Placeholder Text"
                  mode="json"
                  theme="monokai"
                  name="request_body"
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
                  }}/>)
            }}
          </ProFormDependency>
        </ProCard>
      </ProForm.Item>
  </ProForm>);
};
