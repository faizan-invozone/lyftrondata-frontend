import React, { Component, Fragment } from "react";
import CSSTransitionGroup from "react-transition-group";
import moment from 'moment';
import avatar1 from "../../../Integrations/components/image/KoichiTsuji.png";


import {
  Row,
  Col,
  Button,
  CardHeader,
  Table,
  ButtonGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Popover,
  PopoverBody,
  Progress,
  Card,
  CardBody,
  CardFooter,
} from "reactstrap";

import CountUp from "react-countup";

import {
  faCalendarTimes,
} from "@fortawesome/free-solid-svg-icons";
import Configuration from '../../../../config/urlconfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
let datatotal=[{"totalintegration":"0","schedulettl":"0","schedulepercentage":"0","MaxDate":"2020-05-08"}];
class Usergraph extends Component {
  constructor(props) {
    super(props);
    this.config = new Configuration();
    this.state = {
      Usersdata: datatotal,
    };
  }
async componentWillMount(){
  debugger;
  const urlgraph = this.config.API_URL+"/api/getIntegByUser";
  const responsegraph =await fetch(urlgraph, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
      },
  });
  const datagraph =await responsegraph.json();
  debugger;
  if(responsegraph.status!=500){
 this.setState({Usersdata: datagraph.results});
  }
}
  render() {
    const persons = this.state.Usersdata.map((item, i) => (

      <tr>
      <td className="text-center text-muted" style={{ width: "80px" }}>
      </td>
      <td className="text-center" style={{ width: "80px" }}>
        <img width={40} className="rounded-circle" src={avatar1} alt=""/>
      </td>
      <td className="text-center">
      Koichi Tsuji
      </td>
      <td className="text-center">
      {item.totalintegration}
      </td>
      <td className="text-center">
        {item.schedulepercentage==100?
          <div className="badge badge-success badge-success">
          Completed
        </div>:
<div className="badge badge-warning badge-warning">
In Progress
</div>
        } 
       
      </td>
      <td className="text-center">
        <span className="pr-2 opacity-6">
          <FontAwesomeIcon icon={faCalendarTimes} />
        </span>
        <moment format="YYYY MMM DD">
              {item.maxdate}
            </moment>
      </td>
      <td className="text-center" style={{ width: "200px" }}>
        <div className="widget-content p-0">
          <div className="widget-content-outer">
            <div className="widget-content-wrapper">
              <div className="widget-content-left pr-2">
                <div className="widget-numbers fsize-1 text-primary">
                {item.schedulepercentage}%
                </div>
              </div>
              <div className="widget-content-right w-100">
                <Progress
                  className="progress-bar-xs"
                  color="primary"
                  value={item.schedulepercentage}
                />
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  
    ));
  return (
          <Card className="main-card mb-3">
            <CardHeader>
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                 User Status
              </div>
            </CardHeader>
            <Table responsive borderless hover className="align-middle text-truncate mb-0">
              <thead>
                <tr>
                  <th className="text-center"></th>
                  <th className="text-center">Avatar</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Integrations</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Due Date</th>
                  <th className="text-center">Target Achievement</th>
                </tr>
              </thead>
              <tbody>
                {persons}
               </tbody>
            </Table>
            <CardFooter></CardFooter>
          </Card>
      
    );
  }
}
export default Usergraph;
