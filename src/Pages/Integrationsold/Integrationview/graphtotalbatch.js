import React, { Fragment,Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Configuration from '../../../config/urlconfig.js';
import {
  TabContent,
  TabPane,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  ButtonGroup,
  Progress,
  CardTitle,
  DropdownItem,
  Popover,
  PopoverBody
} from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";

import Slider from "react-slick";

import CountUp from "react-countup";

import classnames from "classnames";

import { Doughnut, Radar } from "react-chartjs-2";

import {
  XAxis,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  Tooltip
} from "recharts";

import {
  faEllipsisH,
  faAngleUp,
  faAngleDown,
  faDotCircle,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Sparklines, SparklinesBars, SparklinesLine } from "react-sparklines";
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
      })}
      //   const databatch =await fetch(this.config.API_URL+`/api/getIntgsbatch?intgid=${idc}&page=1&per_page=10000`, {
      //       method: 'GET',
      //       headers: {
      //           "Content-Type": "application/json",
      //       },
      //   });
      //   const responsedata =await databatch.json();
      // if(responsedata.success===true){
      //   debugger;
      // this.setState({
      //   overrviewpagelist: responsedata.results,
      //   loadingintgoverview: false,
      //   totalRows: responsedata.total,
      //   integid:idc
      // })};
    }

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
                
                  
                      {/* <Row>
                      
                        <Col sm="12" md="6" className="align-self-center">
                          <Sparklines height={150} data={this.state.data} limit={30}>
                          <Tooltip></Tooltip>
                            <SparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }}/>
                            <SparklinesLine style={{ stroke: "#41c3f9", fill: "none" }}/>
                          </Sparklines>
                          
                        </Col>
                        <Col sm="12" md="6" className="align-self-center">
                          <Row>
                            <Col sm="12" md="6">
                              <div className="widget-chart">
                                <div className="widget-chart-content">
                                  <div className="widget-numbers text-warning fsize-3">
                                   Integration Name:{intgvalue[0].name}
                                  </div>
                                  <div className="widget-subheading pt-1">
                                    Bug Reports
                                  </div>
                                </div>
                              </div>
                              <div className="divider" />
                              <div className="widget-chart">
                                <div className="widget-chart-content">
                                  <div className="widget-numbers text-success fsize-3">
                                    346
                                  </div>
                                  <div className="widget-subheading pt-1">
                                    Dropped Packages
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col sm="12" md="6">
                              <div className="widget-chart">
                                <div className="widget-chart-content">
                                  <div className="widget-numbers text-info fsize-3">
                                    12.31k
                                  </div>
                                  <div className="widget-subheading pt-1">
                                    Page Views
                                  </div>
                                </div>
                              </div>
                              <div className="divider" />
                              <div className="widget-chart">
                                <div className="widget-chart-content">
                                  <div className="widget-numbers fsize-3">
                                    632
                                  </div>
                                  <div className="widget-subheading pt-1">
                                    Agents Online
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      */}
                </Card>
              
        </div>
        </CSSTransitionGroup>
      </Fragment>
    );
  }
}
