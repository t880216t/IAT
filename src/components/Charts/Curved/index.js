import React from "react";
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
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class Curved extends React.Component {
  render() {
    const {data}=this.props;
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["avrageElapsed"],
      // 展开字段集
      key: "time",
      // key字段
      value: "avrageElapsed" // value字段
    });
    const cols = {
      x: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Chart height={400} data={dv} scale={cols} forceFit>
          <Legend />
          <Axis name="day" />
          <Axis
            name="avrageElapsed"
            label={{
              formatter: val => `${val}ms`
            }}
          />
          <Tooltip
            crosshairs={{
              type: "avrageElapsed"
            }}
          />
          <Geom
            type="line"
            position="day*avrageElapsed"
            size={2}
            color={"time"}
            shape={"smooth"}
          />
          <Geom
            type="point"
            position="day*avrageElapsed"
            size={4}
            shape={"circle"}
            color={"time"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Curved;
