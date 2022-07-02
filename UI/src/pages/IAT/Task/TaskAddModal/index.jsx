import {PlusOutlined} from '@ant-design/icons';
import {ModalForm, ProFormRadio, ProFormSelect, ProFormText, ProFormTextArea,} from '@ant-design/pro-components';
import {Button, Form, message} from 'antd';
import {
  queryProjectListPre,
} from '@/pages/IAT/Config/service'

export default (props) => {
  const {onAdd, projectId, apiId} = props
  return (
    <ModalForm
      title="新建任务"
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          新建用例
        </Button>
      }
      autoFocusFirstInput
      layout={'horizontal'}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        if (onAdd){
          onAdd(values);
        }
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText width="xl" name="name" label="任务名称" placeholder="请输入名称"/>
      <ProFormRadio.Group
        name="taskType"
        label="任务类型"
        options={[
          {
            label: '即时任务',
            value: 1,
          },
          {
            label: '定时任务',
            value: 2,
          },
        ]}
      />
      <Form.Item noStyle shouldUpdate>
        {(form) => {
          return (
            form?.getFieldValue('taskType') === 2 && (
              <ProFormText
                width="lg"
                name="cron"
                label="cron表达式"
                placeholder="请输入"
                tooltip={
                  <span>
                    参考
                    <a href="https://tool.lu/crontab/" target="_blank" rel="noreferrer">
                      在线Cron表达式生成器
                    </a>
                  </span>
                }
              />
            )
          )
        }}
      </Form.Item>
      <ProFormSelect
        request={async () => {
          const response = await queryProjectListPre();
          return response.content;
        }}
        width="xl"
        name="project"
        label="所属项目"
        fieldProps={{
          fieldNames: { label: 'name', value: 'id' }
        }}
      />
      <ProFormTextArea
        name="desc"
        width="xl"
        label="用例描述"
        placeholder="请输入名称"
      />
    </ModalForm>
  );
};
