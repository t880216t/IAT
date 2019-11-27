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
import moment from 'moment';

class Scatter extends React.Component {
  render() {
    const {
      data,
      height,
      color = 'rgba(24, 144, 255, 0.85)',
    } = this.props;
    return (
      <div>
        <Chart height={height||window.innerHeight} data={data} forceFit>
          <Tooltip
            showTitle={false}
            crosshairs={{
              type: "cross"
            }}
            itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
          />
          <Axis label={null} name="x" />
          <Axis name="y" />
          <Geom
            type="point"
            position="x*y"
            opacity={0.65}
            shape="circle"
            size={4}
            tooltip={[
              "title*x*y",
              (title, x, y) => {
                return {
                  name: title,
                  value: y+ "(ms)"
                };
              }
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default Scatter;
