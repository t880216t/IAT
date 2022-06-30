import {PlusOutlined} from '@ant-design/icons';
import {ModalForm, ProForm, ProFormTextArea, ProFormSelect, ProFormText,} from '@ant-design/pro-components';
import {Button, message} from 'antd';
import {queryApiCaseTags} from "@/pages/IAT/Case/service";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default (props) => {
  const {onAdd, onUpdate, projectId, apiId} = props
  return (
    <ModalForm
      title={props.text?'编辑用例基本信息':'新建用例'}
      trigger={
        props.text?(
          <span>
            {props.text}
          </span>
        ):(
          <Button type="primary">
            <PlusOutlined/>
            新建用例
          </Button>
        )
      }
      autoFocusFirstInput
      layout={'horizontal'}
      initialValues={props?.data || undefined}
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
      <ProForm.Group>
        <ProFormSelect
          options={[{
            label: 'P0',
            value: 0,
          },{
            label: 'P1',
            value: 1,
          },{
            label: 'P2',
            value: 2,
          },]}
          width="xs"
          name="level"
          label="用例等级"
        />
        <ProFormText width="lg" name="name" label="名称" placeholder="请输入名称"/>
      </ProForm.Group>
      <ProFormSelect
        width="md"
        fieldProps={{
          mode: 'tags',
        }}
        request={async () => {
          const response = await queryApiCaseTags({apiId, projectId});
          return response.content;
        }}
        name="label"
        label="用例标签"
      />
      <ProFormTextArea
        name="desc"
        label="用例描述"
        placeholder="请输入名称"
      />
    </ModalForm>
  );
};
