import { EditableProTable, ProCard, ProForm, ProFormDependency, ProFormSelect, ProFormRadio, } from '@ant-design/pro-components';
import { Button, Select } from 'antd';
import React, { useRef, useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

export default (props) => {
  const {isCase, data, headers} = props;
  const contentType = headers?.filter(item => item.key.toLowerCase() === 'content-type')
  return (
    <ProCard
      title={
        <div>
          <span>Content-Type: {contentType?.length === 1 && contentType[0]?.value}</span>
        </div>
      }
      headerBordered={false}
      extra={
        <Select
          style={{width: 120}}
          defaultValue={data?.type || 'raw'}
          options={[{
            lable: 'JSON',
            value: 'JSON',
          },{
            lable: 'XML',
            value: 'XML',
          },{
            lable: 'RAW',
            value: 'RAW',
          },]}
          placeholder="格式化类型"
        />
      }
    >
      <AceEditor
        placeholder="返回信息"
        mode="json"
        theme="github"
        name="response_body"
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
