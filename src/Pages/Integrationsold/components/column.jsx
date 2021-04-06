import React, { Component } from "react";
import Chart from "react-apexcharts";

class Columnchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options55: {
        chart: {
          height: 50,
          type: "bar",
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "11222",
            "234234",
            "234234",
            "234234234",
            "2342342",
            "34353",
            "345345",
            "34535",
            "34534534",
          ],
        },
        yaxis: {
          title: {
            text: "$ (thousands)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val ;
            },
          },
        },
      },
      series55: [
        {
          name: "Row insert",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Row select",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: "startdate",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        }
      ],
    };
  }

  render() {
    return (
      <div className="column">
        <Chart options={this.state.options55} series={this.state.series55} type="bar" width="100%"/>
      </div>
    );
  }
}

export default Columnchart;
