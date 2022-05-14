import React, {Component} from 'react';
import {connect} from 'umi';

import styles from './index.less';

@connect(({iatCase, loading}) => ({
  iatCase,
  loading: loading.effects['model/queryFunction'],
}))
export default class Page extends Component {
  state = {
    test: 'ss'
  };

  componentDidMount() {
    this.queryTest()
  }

  queryTest = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatCase/queryTest',
      payload: {},
    }).then(() => {
      const {test} = this.props.iatCase;
      this.setState({
        test,
      });
    });
  };

  render() {
    const {test} = this.state;
    return (
      <div>
        {test}
      </div>
    );
  }
}
