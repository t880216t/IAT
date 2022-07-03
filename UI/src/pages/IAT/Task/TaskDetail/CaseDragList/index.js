import React, {Component} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import PropTypes from 'prop-types';
import {Tag} from 'antd';

import styles from './index.less'
import {connect} from "dva";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle, isSelect) => ({
  userSelect: 'none',
  margin: `4px`,
  background: isDragging ? '#67e6dc' : isSelect? 'rgb(19, 194, 194)': '#fff',
  border: isSelect? 'none': '1px solid rgba(0,0,0,.06)',
  color: isSelect? '#fff': '#000',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver, overflow) => ({
  width: '100%',
  maxHeight: '80vh',
  minHeight: '50vh',
  overflow,
});

@connect(({iatTask, iatConfig, loading}) => ({
  iatTask,
  iatConfig,
  loading: loading.effects['iatTask/queryTaskCaseList'],
}))
export default class App extends Component {
  static propTypes = {
    overflow: PropTypes.string,
  };
  static defaultProps = {
    overflow: 'auto',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      taskCaseList: [],
      taskId: null,
      selectedId: null,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    const {taskId} = this.props;
    if (taskId){
      this.setState({taskId}, ()=> {
        this.queryTaskCaseList(taskId)
      })
    }
  }

  queryTaskCaseList = taskId => {
    const {dispatch} = this.props;
    dispatch({
      type: 'iatTask/queryTaskCaseList',
      payload: {taskId},
    }).then(() => {
      const {taskCaseList} = this.props.iatTask;
      this.setState({
        taskCaseList,
      });
    });
  };

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      this.state.taskCaseList,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      taskCaseList: items,
    });
  }

  handleCaseSelect = (case_id) => {
    this.setState({selectedId: case_id}, () => {
      if (this.props.onSelect){
        this.props.onSelect(case_id)
      }
    })
  };

  render() {
    const {taskCaseList, selectedId} = this.state
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              style={getListStyle(
                droppableSnapshot.isDraggingOver,
                this.props.overflow,
              )}
              onScroll={(e) =>
                // eslint-disable-next-line no-console
                console.log('current scrollTop', e.currentTarget.scrollTop)
              }
            >
              {taskCaseList?.map((item, index) => (
                <Draggable key={item.case_id} draggableId={item.case_id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={getItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style,
                        item.case_id === selectedId
                      )}
                      className={styles.itemCard}
                      onClick={() => this.handleCaseSelect(item.case_id)}
                    >
                      <div className={styles.caseName}>
                        {item.level === 0 && <Tag color="#f50">P0</Tag>}
                        {item.level === 1 && <Tag color="#ff9f1a">P1</Tag>}
                        {item.level === 2 && <Tag color="#54a0ff">P2</Tag>}
                        <span>{item.case_name}</span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
