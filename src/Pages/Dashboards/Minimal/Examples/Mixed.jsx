import React, { Component } from "react";
import Chart from "react-apexcharts";
import Configuration from '../../../../config/urlconfig';
class Mixed extends Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.state = {
      optionsMixedChart1: {},
      seriesMixedChart1: [],
    };
  }
async componentWillMount(){
  debugger;
  const urlgraph = this.config.API_URL+"/api/gettotalIntegData";
  const responsegraph =await fetch(urlgraph, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
      },
  });
  debugger;
  const datagraph =await responsegraph.json();
  if(responsegraph.status!=500 && datagraph.results[0].name!=null)
  {
  let optionsMixedChart={
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: [0, 4],
    },
    labels: datagraph.results[0].name.split(','),
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Rows Insert Process",
        },
      },
      {
        opposite: true,
        title: {
          text: "Rows Select Process",
        },
      },
    ]};
  let seriesMixedChart=[ 
    {
      name: "Rows Insert",
      type: "column",
      data: datagraph.results[0].rowsinsert.split(','),
    },
    {
      name: "Rows Select",
      type: "line",
      data: datagraph.results[0].rowsselect.split(','),
    }
  ];
 this.setState({seriesMixedChart1: seriesMixedChart,optionsMixedChart1:optionsMixedChart});
  }

  
}

  render() {
    return (
      <div className="bar">
        <Chart options={this.state.optionsMixedChart1} series={this.state.seriesMixedChart1}
          type="line" width="100%" height="325px"/>
      </div>
    );
  }
}

export default Mixed;
