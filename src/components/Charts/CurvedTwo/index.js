import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';

class Curved extends React.Component {
  render() {
    const { data, height } = this.props;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['totalCount', 'failCount'],
      // 展开字段集
      key: 'city',
      // key字段
      value: 'temperature', // value字段
    });
    const cols = {
      day: {
        tickCount: 10,
      },
    };
    return (
      <div>
        <Chart height={height} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="day" label={null} />
          <Axis
            name="temperature"
            // label={{
            //   formatter: val => `${val}°C`
            // }}
          />
          <Tooltip
            crosshairs={{
              type: 'y',
            }}
          />
          <Geom
            type="line"
            position="day*temperature"
            size={2}
            color={['city', ['#00a8ff', '#ff0000']]}
            // shape="smooth"
          />
          <Geom
            type="point"
            position="day*temperature"
            size={4}
            shape="circle"
            color={['city', ['#00a8ff', '#ff0000']]}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Curved;
