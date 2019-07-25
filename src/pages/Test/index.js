import React, { PureComponent } from 'react';
import { Card, Table, Select, Icon, Modal, Input, Upload, Divider, message, Tooltip } from 'antd';

const { Option } = Select;

export default class Project extends PureComponent {
  state={
    keywordList:[
      {
        id:1,
        name_en: 'click',
        name_zh: '',
      },{
        id:2,
        name_en: 'input',
        name_zh: '',
      },{
        id:3,
        name_en: 'assert',
        name_zh: '',
      },
    ],
  };

  handleOnSearch = value => {
    console.log( 'handleOnSearch', value );
  }

  handleOnChange = value => {
    console.log( 'handleOnChange', value );
  }

  handleOnSelectChange = value => {
    console.log( 'handleOnSelectChange', value );
  }

  render() {
    const { keywordList} = this.state;
    return (
      <div>
        <Select
          ref={node => (this.input = node)}
          showSearch
          mode="combobox"
          filterOption={false}
          onSearch={this.handleOnSearch}
          onChange={this.handleOnChange}
          onSelect={this.handleOnSelectChange}
          style={{ width: '100%' }}
          defaultActiveFirstOption={false}
          showArrow={false}
          tabIndex={0}
        >
          {keywordList.map(item => (
            <Option key={item.name_en} title={item.name_zh || item.name_en}>
              {item.name_zh || item.name_en}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}
