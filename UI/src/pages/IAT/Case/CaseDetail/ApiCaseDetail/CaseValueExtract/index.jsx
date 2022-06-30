import ProList from '@ant-design/pro-list';
import {Progress, Tag} from 'antd';

import styles from './index.less'

export default () => {
  const data = [
    '获取公司ID',
    '获取请求头token',
  ].map((item) => ({
    title: item,
    subTitle: <Tag color="blue">Json Path</Tag>,
    actions: [<a key="run">复制</a>, <a key="delete">删除</a>],
    content: item,
  }));
  return (
    <div className={styles.scrollList}>
      <ProList
        headerTitle={false}
        ghost={false}
        itemCardProps={{
          ghost:false,
        }}
        pagination={false}
        showActions="hover"
        grid={{gutter: 16, column: 1}}
        onItem={(record) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          content: {},
          actions: {},
        }}
        dataSource={data}
      />
    </div>
  )
};
