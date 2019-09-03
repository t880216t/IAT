import React, { Component } from 'react';
import { Table, Menu, Icon, message } from 'antd';
import { connect } from 'dva';

import styles from './index.less';
import EditCell from '../../../components/EditCell/index';

@connect(({ caseInfo, global, loading }) => ({
  caseInfo,
  global,
  loading: loading.effects['caseInfo/queryCaseData'],
}))
export default class CaseStep extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      caseSteps: [],
      columns: [],
    };
    this.maxValuesNum = 0;
    this.setDomListBoxRef = ref => (this.listBox = ref);
  }

  componentWillMount() {
    this.queryListData(this.props.caseId);
    document.addEventListener('mouseup', event => this.checkClickElement(event), false);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.props.caseId !== nextProps.caseId) {
      this.queryListData(nextProps.caseId);
      return true;
    }
    if (this.props.loading !== nextProps.loading) {
      return true;
    }
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', event => this.checkClickElement(event), false);
  }

  refuesPage=() => {
    this.maxValuesNum = 0;
    this.setState({
      columns: [],
    });
  }

  checkClickElement=event => {
    if (this.state.rightClickItem !== null) {
      try {
        if (document.getElementById('list_right_menu')) {
          if (event.target.compareDocumentPosition(document.getElementById('list_right_menu')) !== 10) {
            this.setState({ rightClickItem: null });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  handleRightMenuClick = e => {
    const { rightClickItem } = this.state;
    const code = e.key;
    switch (code) {
      case '1':
        this.queryInsertStep(rightClickItem.id);
        break;
      case '2':
        this.queryDeleteStep(rightClickItem.id);
        break;
      default:
        message.warning('出现了什么鬼');
    }
  };

  queryDeleteStep=id => {
    this.setState({ rightClickItem: null });
    const { dispatch, versionId } = this.props;
    dispatch({
      type: 'caseInfo/queryDeleteStep',
      payload: {
        id,
        versionId,
      },
    })
      .then(() => {
        this.queryListData(this.props.caseId);
      });
  };

  queryInsertStep=id => {
    this.setState({ rightClickItem: null });
    const { dispatch, versionId } = this.props;
    dispatch({
      type: 'caseInfo/queryInsertStep',
      payload: {
        id,
        versionId,
      },
    })
      .then(() => {
        this.queryListData(this.props.caseId);
      });
  };

  queryListData=caseId => {
    this.refuesPage();
    const { dispatch, versionId } = this.props;
    dispatch({
      type: 'caseInfo/queryCaseData',
      payload: {
        caseId,
        versionId,
      },
    })
      .then(() => {
        const { caseData } = this.props.caseInfo;
        this.setState({
          caseSteps: caseData ? caseData.caseStep :[],
        }, () => {
          this.setState({ caseSteps: caseData.caseStep.concat([{ id: 'empty', values: ['', '', ''] }]) }, () => [
            this.dsyncColumns(),
          ]);
        });
      });
  };

  queryCaseDataWihtOutLoading=caseId => {
    this.refuesPage();
    const { dispatch,versionId } = this.props;
    dispatch({
      type: 'caseInfo/queryCaseDataWihtOutLoading',
      payload: {
        caseId,
        versionId,
      },
    })
      .then(() => {
        const { caseData } = this.props.caseInfo;
        this.setState({
          caseSteps: caseData.caseStep,
        }, () => {
          this.setState({ caseSteps: caseData.caseStep.concat([{ id: 'empty', values: ['', '', ''] }]) }, () => [
            this.dsyncColumns(),
          ]);
        });
      });
  };

  handleSave = (record, changeIndex, value, newStepIndexId) => {
    const intIndex = parseInt(changeIndex);
    const { caseId, versionId } = this.props;
    const { values } = record;
    const { caseSteps } = this.state;
    if (value) {
      if (intIndex + 1 > values.length) {
        const difNum = intIndex + 1 - values.length;
        for (let i = 0; i < difNum; i++) {
          values.push('');
        }
      }
      values.splice(intIndex, 1, value);
      if (record.id === 'empty') {
        this.queryAddCaseStep(caseId, values, newStepIndexId, versionId);
      } else {
        const changeSteps = [record];
        caseSteps.forEach(item => {
          if (item.values.length === this.maxValuesNum && !item.values[intIndex]) {
            item.values.splice(intIndex, 1)
            changeSteps.push(item);
          }
        })
        this.queryUpdateCaseStep(record.id, changeSteps, versionId);
      }
    } else {
      if ((intIndex + 1) === values.length) {
        values.splice(intIndex, 1);
      } else {
        values.splice(intIndex, 1, value);
      }
      const changeSteps = [record];
      caseSteps.forEach(item => {
        if (item.values.length === this.maxValuesNum && !item.values[intIndex]) {
          item.values.splice(intIndex, 1)
          changeSteps.push(item);
        }
      })
      this.queryUpdateCaseStep(record.id, changeSteps, versionId);
    }
  }

  queryAddCaseStep = (caseId, values, newStepIndexId = null, versionId = null) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryAddCaseStep',
      payload: {
        caseStep: values,
        caseId,
        versionId,
      },
    })
      .then(() => {
        const { addedCase } = this.props.caseInfo;
        if (newStepIndexId){
          this.queryUpdateStepIndexDesc(addedCase.id, newStepIndexId);
        } else {
          this.queryListData(this.props.caseId);
        }
      });
  }

  queryUpdateStepIndexDesc = (stepId, indexId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryUpdateStepIndexDesc',
      payload: {
        stepId, indexId,
      },
    })
      .then(() => {
        this.queryListData(this.props.caseId);
      });
  }

  queryUpdateCaseStep = (changeStepId, changeSteps, versionId = null) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'caseInfo/queryUpdateCaseStep',
      payload: {
        changeStepId, changeSteps, versionId
      },
    })
      .then(() => {
        this.queryCaseDataWihtOutLoading(this.props.caseId);
      });
  }

  dsyncColumns = () => {
    const { caseSteps } = this.state;
    const dsyncColumn = [
      {
        title: 'index',
        dataIndex: 'indexId',
        key: 'indexId',
        align: 'center',
        width: 20,
      },
    ];
    caseSteps.forEach(item => {
      if (item.values.length > this.maxValuesNum) {
        this.maxValuesNum = item.values.length;
      }
      item.values.forEach((valueItem, index) => {
        item[`value${index}`] = valueItem;
      });
    });
    for (let i = 0; i < this.maxValuesNum + 1; i++) {
      const customKey = `value${i}`;
      dsyncColumn.push({
        title: 'value',
        dataIndex: customKey,
        key: customKey,
        width: 100,
        render: (text, record) => (
          <EditCell
            dataIndex={customKey}
            caseId={this.props.caseId}
            record={record}
            handleSave={(
              changeIndex,
              value,
              newStepIndexId,
            ) => this.handleSave(record, changeIndex, value, newStepIndexId)}
          />),
      });
    }
    this.setState({
      caseSteps,
      columns: dsyncColumn,
    });
  }

  getXY = ele => {
    const { scrollTop } = this.listBox;
    let top = ele.offsetTop - scrollTop;
    let left = ele.offsetLeft;
    while (ele.offsetParent) {
      ele = ele.offsetParent;
      if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
        top += ele.offsetTop;
        left += ele.offsetLeft;
      } else {
        top += ele.offsetTop + ele.clientTop;
        left += ele.offsetLeft + ele.clientLeft;
      }
    }
    return { x: left, y: top };
  };

  handleRowContextMenu= (event, record) => {
    event.preventDefault();
    const xy = this.getXY(event.target);
    const { x } = xy;
    const { y } = xy;
    const { collapsed } = this.props.global;
    const leftOffset = collapsed ? 120 : 300;
    const tmpStyle = {
      position: 'absolute',
      boxShadow: '3px 3px 1px #ecf0f1',
      border: '1px solid #ecf0f1',
      left: `${x - leftOffset}px`,
      top: `${y - 340}px`,
      zIndex: 999,
    };
    this.setState({ tmpStyle, rightClickItem: record });
  }

  getListRightClickMenu=() => {
    const { tmpStyle } = this.state;
    const menu = (
      <Menu id="list_right_menu" onClick={this.handleRightMenuClick} style={tmpStyle} className={styles.RightMenu}>
        <Menu.Item key="1">
          <Icon type="vertical-align-top" />
          {'插入空行'}
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="minus-square" />
          {'删除此步'}
        </Menu.Item>
      </Menu>
    );
    return (menu);
  };

  render() {
    const { caseSteps, columns, rightClickItem } = this.state;
    return (
      <div className={styles.stepsContainer} ref={this.setDomListBoxRef}>
        <Table
          rowKey="id"
          dataSource={caseSteps}
          columns={columns}
          rowClassName={(record) => (record.versionId ? styles.versionRow :'editable-row')}
          bordered
          showHeader={false}
          pagination={false}
          onRow={record => ({
            onContextMenu: event => this.handleRowContextMenu(event, record),
          })}
        />
        {rightClickItem && this.getListRightClickMenu()}
      </div>
    );
  }
}
