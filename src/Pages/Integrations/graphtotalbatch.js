import React, { Fragment,Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Configuration from '../../config/urlconfig.js';
import {Card} from "reactstrap";
import CountUp from "react-countup";
import {XAxis,ResponsiveContainer,AreaChart,Area,Tooltip} from "recharts";
let datagraphnew=[];
export default class Graphtotal extends Component {
    constructor(props) {
        debugger;
        super(props);
        this.config = new Configuration();
       this.state = {
        integid:props.id,
        totalRows:0,
        loadingintgoverview:true,
         };
    }
async componentWillMount()
{
    const idc=this.state.integid;
    const urlgraph = this.config.API_URL+"/api/getovrgraph?intgid="+idc;
    const responsegraph =await fetch(urlgraph, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    const datagraph =await responsegraph.json();
    debugger;
    datagraphnew=datagraph.results[0].graphdata;
    if(datagraphnew!=null){
      this.setState({
        loadingintgoverview: false,
        totalRows: datagraphnew.length,
        integid:idc
      })} }

  render() {

    return (
        <Fragment>
        <CSSTransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
          transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}>
          <div>
          <Card className="main-card">
       
                        <div className="card widget-chart widget-chart2 text-left p-0">
                          <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content pr-3 pl-3">
                              <div className="widget-chart-flex">
                                <div className="widget-numbers">
                                  <div className="widget-chart-flex">
                                    <div>
                                      <small className="opacity-5"></small>
                                      <CountUp start={1} end={this.state.totalRows} separator="" decimals={0}
                                        decimal="," prefix="" duration="5"/>
                                    </div>
                                    <div className="widget-title ml-2 opacity-5 font-size-lg text-muted">
                                      Total batch processed
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
                              <ResponsiveContainer height="100%">
                                <AreaChart data={datagraphnew}
                                  margin={{
                                    top: -10,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                  }}>
<XAxis dataKey="Start date"></XAxis>

                                  <Tooltip />
                                  
                                  <Area type="monotoneX" dataKey="Rows insert"  strokeWidth={0} fill="#4f3989"/>
                                  <Area type="monotoneX" dataKey="Batch id"  strokeWidth={0} fill="#ed9521a8"/>
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                </Card>
              </div>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
