import React, { useRef } from 'react';
import {Button, message, Space} from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormDateRangePicker, ProFormSelect, } from '@ant-design/pro-form';
import {EditFilled, CaretRightOutlined} from '@ant-design/icons';
import ProCard from "@ant-design/pro-card";

import ApiEnvInfo from "@/pages/IAT/Case/CaseDetail/ApiEnvInfo";
import ApiRequestInfo from "@/pages/IAT/Case/CaseDetail/ApiRequestInfo";
import ApiResponseInfo from "@/pages/IAT/Case/CaseDetail/ApiResponseInfo";
import Environments from "@/pages/IAT/Config/Project/Environments"


const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default () => {
  const formRef = useRef();
  return (
    <DrawerForm
      size="small"
      title="用例详情"
      formRef={formRef}
      width={"80vw"}
      trigger={
        <Button type="primary" size="small" icon={<EditFilled />}>
          编辑
        </Button>
      }
      autoFocusFirstInput
      submitter={false}
      drawerProps={{
        placement: "left",
        destroyOnClose: true,
        bodyStyle: {
          background: '#f1f2f6'
        }
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <ProCard direction="column" ghost gutter={[0, 8]}>
        <ProCard bordered title={'环境配置'} collapsible defaultCollapsed extra={
          <Space>
            <Environments text={"默认环境"} />
            <Button type="primary" icon={<CaretRightOutlined />} onClick={(e) => {
              e.stopPropagation();
            }}>
              调试
            </Button>
          </Space>
        }>
          <ApiEnvInfo />
        </ProCard>
        <ProCard bordered title={'参数配置'}>
          <ApiRequestInfo />
        </ProCard>
        <ProCard bordered title={'响应信息'}>
          <ApiResponseInfo />
        </ProCard>
        <ProCard bordered title={'接口依赖'}>

        </ProCard>
        <ProCard bordered title={'处理脚本'}>

        </ProCard>
        <ProCard bordered title={'用例断言'}>

        </ProCard>
      </ProCard>
  </DrawerForm>);
};
