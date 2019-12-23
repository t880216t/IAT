import React, { Component } from 'react';
import { Popover, AutoComplete, Spin, Form } from 'antd';
import debounce from 'lodash/debounce';
import { connect } from 'dva';

import styles from './index.less';

const { Option } = AutoComplete;

@connect(({ caseInfo }) => ({
  caseInfo,
}))
@Form.create()
export default class EditCell extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      editing: false,
      fetchingDesc: false,
      stepDoc: null,
      newStepIndexId: null,
      cellId: '',
      keywordList: [],
    };
    this.lastFetchId = 0;
    this.handleOnSearch = debounce(this.handleOnSearch, 800);
    this.queryGetStepIndexDesc = debounce(this.queryGetStepIndexDesc, 1000);
  }

  componentWillMount() {
    const { record, dataIndex } = this.props;
    const cellId = `${record.id}_${dataIndex}`;
    this.setState({ cellId });
    window.addEventListener('message', this.handleWindowMessage, false);
    document.addEventListener('mousedown', event => this.checkClickElement(event), false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', event => this.checkClickElement(event), false);
    window.removeEventListener('message', this.handleWindowMessage, false);
  }

  handleWindowMessage = event => {
    if (event.source !== window) {
      return;
    }
    if (this.state.editing) {
      const { record, dataIndex } = this.props;
      this.form.setFieldsValue({
        [dataIndex]: event.data.path,
      });
      const valueIndex = parseInt(dataIndex.split('value')[1]);
      this.queryAddStepIndexDesc(record.id, valueIndex, 2, '', event.data.elementCap);
    }
  }

  checkClickElement=event => {
    const { editing, cellId } = this.state;
    if (editing) {
      try {
        if (document.getElementById(cellId)) {
          const eventCover = event.target.compareDocumentPosition(document.getElementById(cellId));
          if ([10].indexOf(eventCover) === -1) {
            this.save();
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  handleMouseOver = (stepId, stepIndex) => {
    const { stepDoc } = this.state;
    if (!stepDoc && stepId !== 'empty') {
      this.setState({ fetchingDesc: true }, () => {
        const valueIndex = parseInt(stepIndex.split('value')[1]);
        this.queryGetStepIndexDesc(stepId, valueIndex);
      });
    }
  }

  beautySub = (str, len) => {
    if (str) {
      const cnReg = /[\u4e00-\u9fa5]/g; // 匹配中文
      const slice = str.substring(0, len);
      const chineseCharNum = (~~(slice.match(cnReg) && slice.match(cnReg).length));
      const realen = slice.length * 2 - chineseCharNum;
      return str.substr(0, realen) + (realen < str.length ? '...' : '');
    }
    return ''
  }

  queryGetStepIndexDesc = (stepId, stepIndex) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryGetStepIndexDesc',
      payload: {
        stepId, stepIndex,
      },
    })
      .then(() => {
        const { stepDoc } = this.props.caseInfo;
        if (stepDoc) {
          this.setState({ stepDoc, fetchingDesc: false });
        }
      });
  }

  save = () => {
    const { record, dataIndex, handleSave } = this.props;
    const { newStepIndexId } = this.state;
    this.form.validateFields((error, values) => {
      this.toggleEdit();
      const valueKeys = Object.keys(values);
      if (valueKeys && valueKeys[0]) {
        const valueIndex = valueKeys[0].split('value')[1];
        if (record.values[valueIndex] !== values[dataIndex]) {
          let value = values[dataIndex];
          if (typeof value === 'string' && value.indexOf('|~|') > -1){
            value = values[dataIndex].split('|~|')[0];
          }
          handleSave(valueIndex, value, newStepIndexId);
        } else {
          console.log('值没有改变了');
        }
      }
    });
  };

  handleOnSearch = value => {
    if (!value) {
      return;
    }
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ keywordList: [], fetching: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/querySearchKeywords',
      payload: {
        caseId: this.props.caseId,
        words: value,
      },
    })
      .then(() => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const { keywordList } = this.props.caseInfo;
        this.setState({
          keywordList,
          fetching: false,
        }, () => {
          const { record, dataIndex } = this.props;
          const valueIndex = dataIndex.split('value')[1];
          if (record.id !== 'empty') {
            this.queryDeleteStepIndexDesc(record.id, parseInt(valueIndex));
          }
        });
      });
  }

  queryDeleteStepIndexDesc = (stepId, stepIndex) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryDeleteStepIndexDesc',
      payload: {
        stepId, stepIndex,
      },
    })
      .then(() => {
        this.setState({ stepDoc: null });
      });
  }

  handleOnSelectChange = value => {
    let linkId = null;
    const { keywordList } = this.state;
    const { record, dataIndex, form } = this.props;
    keywordList.forEach(item => {
      if (item.name_en === value || item.name_zh === value) {
        linkId = item.id;
      }
    });
    if (linkId) {
      const valueIndex = dataIndex.split('value')[1];
      if (typeof linkId === 'string' && linkId.indexOf('custom') > -1) {
        const intLickId = parseInt(linkId.split('_')[1]);
        this.queryAddStepIndexDesc(record.id, parseInt(valueIndex), 3, intLickId, '');
      } else if (typeof linkId === 'string' && linkId.indexOf('global') > -1) {
        return;
      } else {
        this.queryAddStepIndexDesc(record.id, parseInt(valueIndex), 1, linkId, '');
      }
    }
  }

  queryAddStepIndexDesc = (stepId, stepIndex, indexType, linkId, base64Image) => {
    if (stepId === 'empty') {
      return
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryAddStepIndexDesc',
      payload: {
        stepId, stepIndex, indexType, linkId, base64Image,
      },
    })
      .then(() => {
        const { newStepIndexId } = this.props.caseInfo;
        this.setState({ newStepIndexId });
      });
  }

  getStepDesc = stepDoc => {
    if (stepDoc && [1, 3].indexOf(stepDoc.indexType) > -1) {
      return (
        <div className={styles.keywordDataContainer}>
          <div>所需参数：{stepDoc.indexDoc.args}</div>
          <div style={{ marginTop: 10 }}>功能描述：</div>
          <div dangerouslySetInnerHTML={{ __html: stepDoc.indexDoc.doc }}></div>
        </div>
      );
    }
    if (stepDoc && stepDoc.indexType === 2) {
      return (
        <div className={styles.imageContainer}>
          <img src={`/img/${stepDoc.indexDoc}`} alt="" className={styles.elementCap}/>
        </div>
      );
    }
    return (<div/>);
  }

  render() {
    const { editing, cellId, keywordList, fetching, stepDoc, fetchingDesc } = this.state;
    const { form, record, dataIndex } = this.props;
    this.form = form;
    return (
      <div id={cellId}>
        {
          editing ? (
            <Form.Item className={styles.stepsCell}>
              {form.getFieldDecorator(dataIndex, {
                initialValue: record[dataIndex],
              })(
                <AutoComplete
                  ref={node => (this.input = node)}
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  onSearch={this.handleOnSearch}
                  onSelect={this.handleOnSelectChange}
                  onBlur={this.handleOnBlur}
                  getPopupContainer={() => document.getElementById(cellId)}
                  style={{ width: '100%' }}
                  defaultActiveFirstOption={false}
                  filterOption={false}
                >
                  {keywordList && keywordList.map(item => {
                    if ([1, 6].indexOf(item.valueType) > -1) {
                      const name = item.name_zh || item.name_en
                      return (
                        <Option
                          className={styles.globaReleaselWord}
                          key={`$\{${name}\}|~|${item.valueType}`}
                          title={item.name_en || item.name_zh}
                        >
                          {`$\{${name}\}`}
                        </Option>
                      );
                    }
                    return (
                      <Option key={item.name_en} title={item.name_en || item.name_zh}>
                        {item.name_zh || item.name_en}
                      </Option>
                    );
                  })}
                </AutoComplete>,
              )}
            </Form.Item>
          ) : (
            <div
              onMouseOver={() => this.handleMouseOver(record.id, dataIndex)}
            >
              <Popover placement="bottomLeft" title={this.beautySub(record[dataIndex], 30)} content={fetchingDesc ? <Spin size="small" /> : this.getStepDesc(stepDoc)} trigger="hover">
                <div
                  className={styles['editable-cell-value-wrap']}
                  style={{ minWidth: 50, wordWrap: 'break-word', wordBreak: 'break-all' }}
                  onClick={this.toggleEdit}
                >
                  {record[dataIndex]}
                </div>
              </Popover>
            </div>
          )
        }
      </div>
    );
  }
}
