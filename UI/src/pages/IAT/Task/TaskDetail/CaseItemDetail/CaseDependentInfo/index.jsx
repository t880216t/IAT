import {CheckCard, ProCard} from '@ant-design/pro-components';
import {VerticalAlignTopOutlined} from '@ant-design/icons';
import {Tag, Button, Col, Row } from "antd";
import React from "react";

import styles from './index.less'

const data = [{
  'id': 1,
  'name': '发短发是短发短发的',
  'path': '/pare/dsfdsf/dfidfsd/sddfdf',
  'level': 0,
  'isIn': 1,
},{
  'id': 2,
  'name': '发短发s发的',
  'path': '/pare/dsssf/dfidfsd/sddfdf',
  'level': 1,
  'isIn': 0,
},]

export default (props) => {
  const checkedIds = data.map(item=> item.isIn === 1 && item.id)
  return (
    <ProCard direction="column" ghost>
      <CheckCard.Group
        multiple
        onChange={(value) => {
          console.log('value', value);
        }}
        defaultValue={['A']}
        style={{ width: '100%' }}
        className={styles.checkCardCus}
        value={checkedIds}
      >
        {data?.map(item => (
          <CheckCard
            value={item.id}
            style={{width: '100%'}}
            title={
              <Row className={styles.headerTitle}>
                <Col span={2}>
                  {item.level === 0 && <Tag color="#f50">P0</Tag>}
                  {item.level === 1 && <Tag color="#ff9f1a">P1</Tag>}
                  {item.level === 2 && <Tag color="#54a0ff">P2</Tag>}
                </Col>
                <Col span={8}>
                  <div className={styles.name}>{item.name}dfdsfsfsfsgsdfsadfsdfsadfdsfsdfsdgasdfsda</div>
                </Col>
                <Col span={8}>
                  <div className={styles.path}>{item.path}dfdsfsfsfsgsdfsadfsdfsadfdsfsdfsdgasdfsda</div>
                </Col>
              </Row>
            }
            // description={item.path}
            extra={
              <>
                {!item?.isIn && <Button icon={<VerticalAlignTopOutlined />} size="small" type="primary">添加到任务</Button>}
              </>
            }
          />
        ))}
      </CheckCard.Group>
    </ProCard>
  )
};
