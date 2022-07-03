import { EditableProTable, ProCard } from '@ant-design/pro-components';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import {Input, Upload, Button} from "antd";

export default (props) => {
  const {isCase} = props;
  const [editableKeys, setEditableRowKeys] = useState(() => props.data?.map((item) => item.id));
  const [dataSource, setDataSource] = useState(() => props.data);
  const uploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
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
  const columns = [
    {
      title: '参数名',
      dataIndex: 'key',
      valueType: 'text',
      width: 200,
    },
    {
      title: '参数值',
      dataIndex: 'path',
      valueType: "text",
      width: 200,
      renderFormItem: (_, { record }) => {
        return <Input suffix={<Upload {...uploadProps}>
          <Button type="dashed" size={'small'} icon={<UploadOutlined />}></Button>
        </Upload>}/>;
      },
    },
    {
      title: '参数类型',
      dataIndex: 'type',
      valueType: "text",
      width: 200,
      ellipsis: true,
    },
  ];
  return (
    <EditableProTable
      rowKey="id"
      scroll={{
        y: 300,
      }}
      size="small"
      value={dataSource}
      controlled
      columns={columns}
      recordCreatorProps={false}
      editable={false}
    />);
};