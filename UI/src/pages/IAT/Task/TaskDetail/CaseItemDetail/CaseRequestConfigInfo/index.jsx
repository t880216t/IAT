import { Button, Descriptions, Radio } from 'antd';

export default (props) => {
  const {data} = props;
  return (
    <div>
      <Descriptions>
        {data?.isCustomHost === 1 && (<Descriptions.Item label="协议">{data?.protocol}</Descriptions.Item>)}
        {data?.isCustomHost === 1 && (<Descriptions.Item label="域名">{data?.host}</Descriptions.Item>)}
        {data?.isCustomHost === 1 && (<Descriptions.Item label="端口">{data?.port}</Descriptions.Item>)}
        <Descriptions.Item label="模式">{data?.method}</Descriptions.Item>
        <Descriptions.Item label="路径">{data?.path}</Descriptions.Item>
        <Descriptions.Item label="编码">{data?.encoding}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
