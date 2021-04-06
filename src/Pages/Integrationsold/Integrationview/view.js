import React from 'react';
import {Route,Link} from 'react-router-dom';
import SampleExpandedComponent from '../Integrationview/expanded.js';
import FailurelistComponent from '../Integrationview/failure.js';
import ConfigurationComponent from './Configuration.js';
import Graphtotalbatch from './graphtotalbatch';
import classnames from "classnames";
import {
    Row, Col,Card, CardBody,CardTitle,CardHeader,Progress,
    ListGroup,
    ListGroupItem,Button
} from 'reactstrap';
import arrowright from '../components/image/imageleft.png';
import Configuration from '../../../config/urlconfig.js';
import Timer from 'react-compound-timer';
import axios from 'axios';
import Loader from "react-loaders";
import Chart from "react-apexcharts";
import Moment from 'react-moment';
import {
  ResponsiveContainer,
  BarChart,
  Bar,Area,AreaChart,
  Cell,XAxis,YAxis,CartesianGrid,
  Tooltip,LineChart,Line
} from 'recharts';
import {
  Sparklines,
  SparklinesLine,
  SparklinesSpots,
  SparklinesBars
} from "react-sparklines";
import avtarimage from '../components/image/KoichiTsuji.png';
import arrowlefticon from '../components/image/arrow-left-icon.png';
import PropTypes from "prop-types";
import Tabs from "react-responsive-tabs";
import Gauge from "react-svg-gauge";
import '../Integrationlist/graph.css';
import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import LiquidFillGauge from "react-liquid-gauge";
import CountUp from "react-countup";
import Movinggraph from "./graphmoving.js";
const Circular = () => (
    
    <div style={{ padding: '24px' }}>
      <Loader type="line-scale" size={30} />
    </div>
  );
  const colors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
  ];
 
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
  
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  
  TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  };
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
            C${x + width / 3},${y + height} ${x + width / 2},${y +
      height / 3} ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y +
      height} ${x + width}, ${y + height}
            Z`;
  };
  function getHexColor(value) {
    let string = value.toString(16);
    return string.length === 1 ? "0" + string : string;
  }
  let colorHex="#e42e2e";
  function boxMullerRandom() {
    let phase = true,
      x1=30,
      x2=20,
      w=50;
  
    return (function() {
      if (phase) {
        do {
          x1 = 2.0 * Math.random() - 1.0;
          x2 = 2.0 * Math.random() - 1.0;
          w = x1 * x1 + x2 * x2;
        } while (w >= 1.0);
  
        w = Math.sqrt((-2.0 * Math.log(w)) / w);
        return x1 * w;
      } else {
        return x2 * w;
      }
    })();
  }
  let percentagegraph=0;
  let datagraphnew=[];
  let datagraphoverview = [];
class ViewComponent extends React.Component {
    constructor(props) {
        debugger;
        super(props);
        this.config = new Configuration();
       this.state = {
           integid:this.props.match.params.id,
           loading: true,
           loadingintglist:true,
           loadingintgoverview:true,
           showprogressmodel:false,
           intlistVisible:"block",
           intoverVisible:"none",
           dataintglist: [],
           intgoverview:[],
           runtimeid:"",
           totalRows: 0,
           perPage:10,
           overrviewpagelist:[],
           columns:[],
          schedulemodal:false,
          options55: {},
          series55: [],
          totalbatch:0,
          pendingbatch:0,
          processbatch:0,
          totalinsert:0,
          totalselect:0,
          totalupdate:0,
          zerocount:0,
          failedrowss:0,
          totalrowsinsertwni:0,
          isschedule:false,
          value:90,data:[]
         };
    }
       
    async componentWillMount() {
        debugger;
        const idc = this.state.integid;
        console.log(idc);
        const url = this.config.API_URL+"/api/getIntgsoverview?intgid="+idc;
        const response =await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data =await response.json();
        datagraphoverview=data.results[0].graphdata;
        this.setState({intgoverview: data.results,
          loadingintglist:false});
     
        const urlgraph = this.config.API_URL+"/api/getovrgraph?intgid="+idc;
        const responsegraph =await fetch(urlgraph, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const datagraph =await responsegraph.json();
        datagraphnew=datagraph.results[0].graphdata;

        const urlfailedrows = this.config.API_URL+"/api/getfailedrows?intgid="+idc;
        const responserowsfailed =await fetch(urlfailedrows, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const datafailedrows =await responserowsfailed.json();
       
        // if(datagraph.results[0].start_date==null)
        // {
        //   datagraph.results[0]={"start_date":"","rows_insert":"0","rows_select":"0","rows_update":"0"}
        // }
      //   debugger;
      //   let option55={
      //     chart: {
      //     height: 10,
      //     type: "bar",
      //     sparkline: {
      //       enabled: false,
      //     },
      //   },
      //   plotOptions: {
      //     bar: {
      //       horizontal: false,
      //       endingShape: "rounded",
      //       columnWidth: "55%",
      //     },
      //   },
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   stroke: {
      //     show: true,
      //     width: 2,
      //     colors: ["transparent"],
      //   },
      //   xaxis: {
      //     categories: datagraph.results[0].start_date.split(','),
      //   },
      //   yaxis: {
      //     title: {
      //       text: "Data Count",
      //     },
      //   },
      //   fill: {
      //     opacity: 1,
      //   },
      //   tooltip: {
      //     y: {
      //       formatter: function (val) {
      //         return val ;
      //       },
      //     },
      //   },};
      //   let serie55=[ {
      //     name: "Row insert",
      //     data:datagraph.results[0].rows_insert.split(','),
      //   },
      //   {
      //     name: "Row select",
      //     data: datagraph.results[0].rows_select.split(','),
      //   },
      //   {
      //     name: "Row Update",
      //     data:datagraph.results[0].rows_update.split(','),
      //   }];
      //  this.setState({series55: serie55,options55:option55,loadingintglist:false});

       const urltotalgraph = this.config.API_URL+"/api/getIntgsoverviewtotal?intgid="+idc;
        const responsetotal =await fetch(urltotalgraph, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const datatotal =await responsetotal.json();
        this.setState({totalbatch: datatotal.results[0].totalbatch,
          pendingbatch:datatotal.results[0].totalbatch-datatotal.results[0].batchprocessed,
          processbatch:datatotal.results[0].batchprocessed,
          totalinsert:datatotal.results[0].rows_insert,
        totalselect:datatotal.results[0].rows_select,
        totalupdate:datatotal.results[0].rows_update,
        zerocount:datatotal.results[0].rows_zerocount,
        totalrowsinsertwni:datatotal.results[0].totalrowsinsert,
        failedrowss:datafailedrows.results[0].failedrows
        });

        
      const colum = await axios.get(
        this.config.API_URL+`/api/getcolumn`,
         );
     this.setState({columns:colum.data.results,loadingintgoverview:false});

     
  }
//   handleback(){
//     this.setState({
//         intlistVisible:"block",
//     intoverVisible:"none",
//     overrviewpagelist: [],
//     loadingintgoverview: true,

//     });
// }
startColor = "#6495ed"; // cornflowerblue
endColor = "#dc143c"; // crimson
    render () {
        let sch;
        const intgoverviews = this.state.intgoverview.map((item, i) => (
          <tr className="font-weight-normal text-lyftron fontgrapgh">
       
                   <td className="text-lyftron" title="Integration name">
             <b>Name: </b> {item.name}
            <div title="Created Date"><strong>Created at: </strong>
              <Moment format="YYYY-MMM-DD hh:mm:ss">
              {item.createdAt}
             </Moment></div> 
             <div title="Updated Date"><strong>Updated at: </strong>
              <Moment format="YYYY-MMM-DD hh:mm:ss">
              {item.updateddAt}
             </Moment></div> 
              </td>
              <td className="border-right p-0"></td>
              <td title="Created by" >
               <div className="text-center pb-2"><b>Created by</b></div> 
               <div className="widget-content p-0 text-center small">
                
                               <img width={45} className="rounded-circle" src={avtarimage} alt="Avatar" />
                               <div className="widget-heading "><b>{item.createdby}</b></div>
                      
               </div>
             </td> 
             <td className="border-right p-0"></td>
              <td>
                <div className="text-center pb-2"><b>Integration journey</b></div>
                <Row className="m-0">
               <Col title="connection" className="text-center small p-0">
               {/* <div className="widget-content p-0">
                   <div className="widget-content-wrapper"> */}
                   
                       <div className="widget-content">
                               <img width={45} className="rounded-circle" src={item.sourcelogo} alt="Avatar" />
                               <div className="widget-heading "><b>{item.sourcename}</b></div>
                           </div>
                   {/* </div>
               </div> */}
 
             </Col>
          <Col title="connection" className="text-center small">
            <img height={45} width={45} src={arrowright}></img></Col>
             
              <Col title="connection" className="text-center small p-0">
               {/* <div className="widget-content p-0">
                   <div className="widget-content-wrapper"> */}
                       <div className="widget-content">
                               <img width={45} className="rounded-circle" src={item.destinationlogo} alt="Avatar" />
                               <div className="widget-heading "><b>{item.destinationname}</b></div>
                           </div>
                   {/* </div>
               </div> */}
             
             </Col> 
             </Row>
             </td>
      
              <td className="border-right p-0"></td>
        
         
           <td>
           {(item.isschedule==true ?
           <td>
       <div title="schedulefrom"><b>Schedule start at: </b>
    <Moment format="YYYY-MMM-DD">{item.startDate}</Moment></div>
       <div title="scheduleto"><b>Schedule end at: </b>
        <Moment format="YYYY-MMM-DD">{item.endDate}</Moment></div>
      <div> <b>Schedule frequency: </b>{(item.schedule==="hourly" ?
          <div className="badge badge-lyftronwarning">Hourly</div>
      : '' )}{(item.schedule==="every15minutes" ?
      <div className="badge badge-lyftronwarning">Every 15 minutes</div>
  : '' )}{(item.schedule==="every10minutes" ?
  <div className="badge badge-lyftronwarning">Every 10 minutes</div>
: '' )}{(item.schedule==="daily" ?
<div className="badge badge-lyftronwarning">Daily</div>
: '' )}
      </div> 
     </td>: <td><div title="startdate"><b>Start at: </b>
       <Moment format="YYYY-MMM-DD">{item.startDate}</Moment></div>
    
     <div title="enddate"><b>End at: </b>
      <Moment format="YYYY-MMM-DD">{item.endDate}</Moment></div>
      {/* <div><b>Run type: </b><div className="badge badge-primary">Manual</div><br></br><b>Status:</b></div> */}
      <div><b>Status:  </b> <div className="badge badge-success">{item.lastrunstatus}</div></div>
      </td>
     )}</td>
           <td className="border-right p-0"></td>
           {(item.isschedule==true ? 
           (
item.status=='Inactive'?
<td>     <div>
           
<td><b>Status:  </b> <div className="badge badge-lyftronnew"> Inactive</div></td>
  <div>
    {/* <Movinggraph></Movinggraph> */}
    </div>
</div>
</td>:  <td>     <div>
           
           <td><b>Status:  </b> <div className="badge badge-lyftronnew"> In Progress</div></td>
            <div>
            <Movinggraph></Movinggraph>
                  
                   </div> 
    </div>
 </td> )

         : ('') )}
{(item.isschedule!==true ? 
 <td width={150}>     
  <div className="text-center"><b>Recent loads</b></div>
          
            <div className="widget-chart widget-chart2 p-0">
     <div className="widget-chat-wrapper-outer m-0">
 
 <div className="widget-chart-wrapper widget-chart-wrapper-sm m-0">
 <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={datagraphoverview}> <Tooltip />
          <defs>
            <linearGradient datakey="rows_insert"id="colorPv2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#4f3989" stopOpacity={0.7}/>
              <stop offset="90%" stopColor="#4f3989" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone"  dataKey="rows_insert" stroke="#ed9521a8" strokeWidth="3"
            fillOpacity={1} fill="url(#colorPv2)"/>
            
        </AreaChart>
      </ResponsiveContainer>
 
 </div>
 </div>
 </div>
             
  </td> :('')
  )}

 <td className="border-right p-0"></td>
 <td>    {(item.isschedule==true ? <div>
            <td className="p-0"><b>Next execution at </b></td><br></br>
            {item.status=='Inactive'?
            <div className="text-lyftronwarning text-center">Paused</div>
            :<div className="text-lyftronwarning text-center">  <Timer 
            initialTime={item.nextrun*1000}
            direction="backward"
        >{() => (
                <React.Fragment>
                    <Timer.Days /><b>d </b> 
                    <Timer.Hours /><b>h </b> 
                    <Timer.Minutes /><b>m </b> 
                    <Timer.Seconds /><b>s</b>
                </React.Fragment>
            )}</Timer></div>
          }
            
   </div>
    : ('')
 )}
 </td>
 {(item.isschedule==true ?<td className="border-right p-0"></td>:(''))}
   </tr>    
     
  ));
   // let intgvalue=this.state.intgoverview;
    const intgoverviewbargraph = this.state.intgoverview.map((item, i) => (
   <ResponsiveContainer title="newly seven batches" width="100%" height="100%">
      <BarChart data={item.graphdata}>
      {/* <XAxis dataKey="rows_select" />
        <YAxis /> 
        <CartesianGrid strokeDasharray="3 3" /> */}
       <Bar dataKey="rows_insert" fill="#fece78" shape={<TriangleBar />} label={{ position: "top" }}>
          {item.graphdata.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % 20]}
            />
          ))}
        </Bar> 
      </BarChart>
    </ResponsiveContainer>
));
//     const intgoverviews2 = this.state.intgoverview.map((item, i) => (
//           <div>
//  <Chart options={this.state.options55} series={this.state.series55} type="bar" height="202px" width="100%"/>
                             
//       </div>
   
//    ));
   const tabsContent = [
    {
      title: "Job success list",
      content: <SampleExpandedComponent id={this.state.integid}/>,
    },
    {
      title: "Job failure list",
      content: <FailurelistComponent id={this.state.integid}/>,
    },
    {
      title: "Configuration",
      content: <ConfigurationComponent id={this.state.integid}/>,
    },
    {
      title: "Definition",
      content:'Json-relational',
    }
  ];
  function getTabs() {
    return tabsContent.map((tab, index) => ({
      title: tab.title,
      getContent: () => tab.content,
      key: index,
    }));
  }
 

  //total batch
  
  percentagegraph= Math.floor((this.state.processbatch / this.state.totalbatch) * 100);
 
  if(percentagegraph!="NaN"){
    let g = Math.floor(percentagegraph * 2.55);
  let r= Math.floor(255 - percentagegraph * 2.55);
  let b = 0;
 colorHex = "#" + getHexColor(r) + getHexColor(g) + getHexColor(b);
}
  //batchprocess
  let r1 = Math.floor(this.state.processbatch * 2.55);
  let g1 = Math.floor(255 - this.state.processbatch * 2.55);
  let b1 = 0;
  let colorHex1 = "#" + getHexColor(r1) + getHexColor(g1) + getHexColor(b1);

  const radius = 80;
  const interpolate = interpolateRgb(this.startColor, this.endColor);
  const fillColor = interpolate(this.state.value / 100);
  
 
  
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor)
        .darker(0.5)
        .toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: color(fillColor)
        .brighter(0.5)
        .toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

      return(
          <Card>
              <CardBody>
        {this.state.loadingintglist || !this.state.intgoverview ? (
        <div><Row><Col md="5"></Col>
        <Col md="2">
    <div className="text-all">
    <Loader type="line-scale" size={30}></Loader>
        <p className="mt-2">Please wait............</p>
    </div>
</Col></Row></div>
      ) : (

        <div>
          <Card className="main-card"><Row> 
            <Col md="12" mt="3">
              <div className="card-header card-headernew">
            <div className="table-responsive">
                    <table className="align-left table table-borderless">
                      <thead>
                      </thead>
              <tbody>
                {intgoverviews}
                </tbody>
                </table>
           </div>
               <div className="pl-2 btn-actions-pane-right">
                   <div role="group" className="btn-group-sm btn-group">
                       <Link title="Back" to={{pathname: `/integrations`}} className="buttonall"><img src={arrowlefticon} height="25"></img></Link>
                    
                   </div>
               </div>
               </div> </Col>  </Row>
           </Card>
  <Card className="mt-3">
            <Row>
              <Col sm="6" md="6" xl="6">
              <Graphtotalbatch id={this.state.integid}></Graphtotalbatch>
              </Col>
              <Col sm="6" md="6" xl="6">
              {/* <Card className="main-card">
              <div className="card widget-chart widget-chart2 text-left p-0">
                          <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content pt-3 pr-3 pl-3">
                              <div className="widget-chart-flex">
                                <div className="widget-numbers">
                                  <div className="widget-chart-flex">
                                    <div>
                                      <small className="opacity-5"></small>
                                      <CountUp start={1} end={this.state.totalinsert} separator="" decimals={0}
                                        decimal="," prefix="" duration="5"/>
                                    </div>
                                    <div className="widget-title ml-2 opacity-5 font-size-lg text-muted">
                                      Total rows loaded
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
               <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
              <ResponsiveContainer height={400}>
              <AreaChart data={datagraphnew} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--warning)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="startdate" />
                {/* <YAxis dataKey="batch_id"></YAxis> */}
                {/* <CartesianGrid strokeDasharray="3 3" /> 
                <Tooltip />
                <Area type="monotone" dataKey="rows_insert" stroke="var(--primary)" fillOpacity={2} fill="url(#colorUv)" strokeWidth="3"/>
                <Area type="monotone" dataKey="rows_select" stroke="var(--warning)" fillOpacity={2} fill="url(#colorPv)" strokeWidth="3"/>
                {/* <Area type="monotone" dataKey="startdate" stroke="var(--warning)" fillOpacity={2} fill="url(#colorPv)" strokeWidth="3"/>
                <Area type="monotone" dataKey="batch_id" stroke="var(--warning)" fillOpacity={2} fill="url(#colorPv)" strokeWidth="3"/> 
              </AreaChart>
            </ResponsiveContainer>
              {/* {intgoverviews2} 
  </div>
  </div></div>
    </Card> */}
    <Card className="main-card">
     
    <div className="card widget-chart widget-chart2 text-left p-0">
                          <div className="widget-chat-wrapper-outer">
                            <div className="widget-chart-content pr-3 pl-3">
                              <div className="widget-chart-flex">
                                <div className="widget-numbers">
                                  <div className="widget-chart-flex">
                                    <div>
                                      <small className="opacity-5"></small>
                                      <CountUp start={1} end={this.state.totalrowsinsertwni} separator="" decimals={0}
                                        decimal="," prefix="" duration="5"/>
                                    </div>
                                    <div className="widget-title ml-2 opacity-5 font-size-lg text-muted">
                                      Total rows loaded
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
          <div className="widget-chart-wrapper widget-chart-wrapper-lg opacity-10 m-0">
          <ResponsiveContainer width="100%">
                    <AreaChart data={datagraphnew} margin={{ top: -10, right: 0, left: 0, bottom: 0 }}>
                      {/* <CartesianGrid strokeDasharray="3 3" /> */}
                      {/* <XAxis dataKey="startdate" />
                      <YAxis /> */}
                      <XAxis dataKey="Start date" />
                      <Tooltip />
                      <Area type="monotone" dataKey="Batch id" stackId="1" stroke="#4f3989" fill="#4f3999"/>
                      <Area type="monotone" dataKey="Rows insert" stackId="1" stroke="#ed9521a8" fill="#ed9521a8"/>
                      <Area type="monotone" dataKey="Rows select" stackId="1" stroke="#4f3989" fill="#4f3989"/>
                   
                    </AreaChart>
                  </ResponsiveContainer>
        {/* <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={datagraphnew} margin={{ top: -10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--warning)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="startdate" />
                {/* <CartesianGrid strokeDasharray="3 3" /> 
                <Tooltip />
                <Area type="monotone" dataKey="rows_insert" stroke="var(--primary)" fillOpacity={1} fill="url(#colorUv)"/>
                <Area type="monotone" dataKey="rows_select" stroke="var(--warning)" fillOpacity={1} fill="url(#colorPv)"/>
              </AreaChart>
            </ResponsiveContainer> */}
          </div>
       </div></div>
    
        </Card> 
  
     
       
        
            </Col>
           
            </Row>
          </Card>
      

           <Row>
            <Col md="12 mt-3">
           <Card className="main-card">
                  <Row className="text-center pt-2 pb-2">
                
                  <Col md="2" className="colgraph">
                      <Gauge value={this.state.totalrowsinsertwni} width={150} height={140} color={colorHex1} className="fontingrapgh"
                        label="Total rows loaded" valueFormatter={(value) => `${value}`}
                        max={this.state.totalrowsinsertwni} min="0"/>
                        {/* max={this.state.totalinsert} min="0"/> */}
                    </Col>
                    <Col md="2" className="colgraph">
                      <Gauge value={this.state.failedrowss} width={150} height={140}
                        label="Total rows failed" valueFormatter={(value) => `${value}`} color="#DB7093"
                        max={this.state.totalrowsinsertwni} min="0"/>
                    </Col>
                    <Col md="2" className="colgraph">
                      {percentagegraph==="NaN%"?
                           <Gauge value="0" width={150} height={140} color={colorHex}
                           label="Total batches" valueFormatter={(value) => `${value}%`}
                           max="100" min="0"/>
                     :     <Gauge value={percentagegraph} width={150} height={140} color={colorHex}
                     label="Total batches" valueFormatter={(value) => `${value}%`}
                     max="100" min="0"/>
                       }
                 
                    </Col>
                    <Col md="2" className="colgraph">
                      <Gauge value={this.state.pendingbatch} width={150} height={140} max={this.state.totalbatch} min="0" 
                        label="Pending batches" valueFormatter={(value) => `${value}`} color="#ed9521a8"/>
                    </Col>
                    <Col md="2" className="colgraph">
                      <Gauge value={this.state.processbatch} width={150} height={140}
                        label="Processed batches" valueFormatter={(value) => `${value}`} color="#3ac47d"
                        max={this.state.totalbatch} min="0"/>
                    </Col>
                    <Col md="2" className="colgraph">
                      <Gauge value={this.state.zerocount} width={150} height={140}
                        label="No data batches" valueFormatter={(value) => `${value}`} color="#800000"
                         max={this.state.totalbatch} min="0"/>
                    </Col>
             
                  </Row>
            
              </Card>
            </Col>
          </Row>
          {/* <Row style={{marginLeft:0,marginRight:0}}>
                 <Col md="6" sm="12" lg="6">
                  <ResponsiveContainer width="100%"  aspect={4.0 / 3.0}>
                  <BarChart data={intgvalue[0].graphdata}>
      <XAxis dataKey="rows_select" />
      <YAxis />
      <Tooltip></Tooltip>
      <Bar dataKey="rows_insert" fill="#fece78" shape={<TriangleBar />} label={{ position: "top" }}>
        {intgvalue[0].graphdata.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colors[index % 20]}
          />
        ))}
      </Bar>
    </BarChart>
                  </ResponsiveContainer>
           
            </Col>
            <Col lg="12">{intgoverviews2}</Col>
</Row>  */}

{/* 
           <Row style={{marginLeft:0,marginRight:0}}>
                 <Col md="6" sm="12" lg="6">
           </Col>
           
<Col md="6" sm="12" lg="6">
                          
                           <LiquidFillGauge style={{ margin: "0 auto" }} width={radius * 2} height={radius * 2}
                        value={this.state.value} percent="" textSize={1} textOffsetX={0} textOffsetY={0}
                        textRenderer={(props) => {
                          const value = Math.round(props.value);
                          const radius = Math.min(
                            props.height / 2,
                            props.width / 2
                          );
                          const textPixels = (props.textSize * radius) / 2;
                          const valueStyle = {
                            fontSize: textPixels,
                          };
                          const percentStyle = {
                            fontSize: textPixels * 0.6,
                          };

                          return (
                            <tspan>
                              <tspan className="value" style={valueStyle}>
                                {value}
                              </tspan>
                              <tspan style={percentStyle}>
                                {props.percent}
                              </tspan>
                            </tspan>
                          );
                        }}
                        riseAnimation waveAnimation waveFrequency={3} waveAmplitude={4} gradient
                        gradientStops={gradientStops}
                        circleStyle={{
                          fill: fillColor,
                        }}
                        waveStyle={{
                          fill: fillColor,
                        }}
                        textStyle={{
                          fill: color("#989fa4").toString(),
                        }}
                        waveTextStyle={{
                          fill: color("#fff").toString(),
                        }}/>
                           </Col>
                           </Row> */}

       
{/* <Cardmaterial style={{ height: '100%' }}> */}
           {/* <DataTable className="align-middle pr-3 pl-3 pb-3 mt-3 border-top table-borderless table-striped table-hover"
  title="Jobs List"
  columns={[
      {
      name: 'Batch_id',
      selector: 'batch_id',
      sortable: true,
      right: true,
    },
    {
      name: 'Start Date',
      selector: 'startdate',
      sortable: true,
      right: true,
    },
    {
      name: 'End Date',
      selector: 'enddate',
      sortable: true,
      right: true,
    },
    {
      name: 'Vessels',
      selector: 'vessels',
      sortable: true,
      right: true,
    },
    {
       name: 'Rows Select',
       selector: 'rows_select',
       sortable: true,
       right: true
     },
     {
       name: 'Rows Insert',
       selector: 'rows_insert',
       sortable: true,
       right: true
     },
     {
       name: 'Status',
       selector: 'status',
       sortable: true,
       right: true,
     } 
    //  {
    //    cell:(row) => <button className="buttonall" onClick={this.handleButtonClick} id={row.batch_id}>View</button>,
    //    ignoreRowClick: true,
    //    allowOverflow: true,
    //    button: true,
    //  },
   ]}
  data={this.state.overrviewpagelist}
  progressPending={this.state.loadingintgoverview}
  progressComponent={<Circular />}
  pagination
  paginationServer
  responsive
  expandableRows
  highlightOnHover
  striped
  // conditionalRowStyles={conditionalRowStyles}
  expandableRowsComponent={<SampleExpandedComponent wnicolumn={this.state.columns}/>}
  paginationTotalRows={this.state.totalRows}
  onChangeRowsPerPage={this.handlePerRowsChange}
  onChangePage={this.handlePageChange}
  customStyles={customStyles}
  theme="solarized"
  
/> */}
{/* </Cardmaterial> */}
<Row>   <Col md="12 mt-3">
   <Card className="card-tabs card-tabs-animated">
<Tabs tabsWrapperClass="card-header" transform={false}
            showInkBar={true} items={getTabs()}/>
                </Card></Col> 
     
               
         
            </Row>
          

     {/*  </Card>
    
       )} */}
       </div>
       
       
       
       )}
     
   
    </CardBody>
    </Card>
      )
    }
  }
  export default ViewComponent;