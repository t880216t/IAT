import { EditableProTable, ProCard, ProForm, ProFormDependency, ProFormSelect, ProFormRadio, } from '@ant-design/pro-components';
import { Button, Select } from 'antd';
import React, { useRef, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default (props) => {
  const {isCase, data, headers} = props;
  return (
    <ProCard>
      <AceEditor
        mode="json"
        theme="github"
        name="response_header"
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
    </ProCard>);
};
