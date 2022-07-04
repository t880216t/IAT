import React, {Component} from 'react';
import {Select} from 'antd';
import {connect} from 'dva';

import styles from './index.less';

const {Option} = Select;

@connect(({model, loading}) => ({
  model,
  loading: loading.effects['model/queryFunction'],
}))
export default class Page extends Component {
  state = {};

  componentDidMount() {
  }

  queryFunction = params => {
    const {dispatch} = this.props;
    dispatch({
      type: 'model/function',
      payload: {},
    }).then(() => {
      const {value} = this.props.model;
      this.setState({
        value,
      });
    });
  };

  render() {
    const {} = this.state;
    return (
      <div className={styles.container}>
        test
      </div>
    );
  }
}
