import React, { Component,Fragment } from "react";
import {Link} from 'react-router-dom';
import _ from 'underscore';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
    Row, Col,Card,Modal
} from 'reactstrap';
import Configuration from '../../config/urlconfig';
import Editschedler from './editscheduler.js';
import Runscheduler from './runscheduler.js';
import Runbat from './runbat.js';
import Deleteandtruncate from './deleteandtruncate';

library.add(
  faSpinner,
 
);
export default class Configurationcomponent extends Component {
    constructor(props) {
      super(props);
      this.config = new Configuration();
      this.intgid=props.id;
        this.state = {
            loading: true,
            loadingintglist:true,
            loadingintgoverview:true,
            showprogressmodel:false,
            showprogresstruncatemodel:false,
            scheduleeditmodal:false,
            showprogresseditmodel:false,
            intlistVisible:"block",
            intoverVisible:"none",
            dataintglist: [],
            intgoverview:[],
            datagrapharray:[],
            integid:"",
            runtimeid:"",
            overrviewpagelist:[],
            columns:[],
            modal: false,
            vessels:[],
            vesselsdata:[],
           startDate:'',
           endDate:'',
           vesselsmodel:'',
           startDatemodel:'',
           endDatemodel:'',
           schedulemodal:false,
           selectAll: false,
           checked: [],
           schedule:'',
           truncatemodal:false,
           isintegrationdelete:false,
           istruncate:false,
           isactive:true,
           integrationid:[],
           deleteintgmodal:false,
           showprogressdeletemodel:false,
           isschedule:true
          };
        this.toggle = this.toggle.bind(this);
        this.toggleschedule = this.toggleschedule.bind(this);
        this.toggletruncate = this.toggletruncate.bind(this);
    this.toggleeditschedule = this.toggleeditschedule.bind(this);
      
     }
     async  toggleeditschedule(event) {
         debugger;
        const idc = event.currentTarget.id;
        if(idc!=""){
          this.setState({
            scheduleeditmodal: !this.state.scheduleeditmodal,
            integid:idc
        });
        }
        const datepopup=event.currentTarget.className;
        if(datepopup=='modal fade show')
        {
          this.setState({
            scheduleeditmodal: this.state.scheduleeditmodal
          })
        }
         if(datepopup!="modal fade show" && idc=="")
       {
      this.setState({
        scheduleeditmodal: !this.state.scheduleeditmodal
      })
      }};

      async componentWillMount() {
        debugger;
        const idc = this.intgid;
        console.log(idc);
        const url = this.config.API_URL+"/api/getIntgsoverview?intgid="+idc;
        const response =await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data =await response.json();
        var string = data.results[0].vessels;
        var vessel = string.split(",");
        this.setState({startDate: data.results[0].startDate,endDate:data.results[0].endDate,
            vessels:vessel,schedule:data.results[0].schedule,runtimeid:data.results[0].runtime_id,integid:idc,
            vesselsmodel:data.results[0].vessels,isschedule:data.results[0].isschedule});
        }
  async  toggle(event) {
              const idc = event.currentTarget.id;
              if(idc!=""){
              this.setState({
                modal: !this.state.modal,
                integid:idc
            });
            }
              const datepopup=event.currentTarget.className;
              if(datepopup=='modal fade show')
              {
                this.setState({
                    modal: this.state.modal
                })
              }
               if(datepopup!="modal fade show" && idc=="")
             {
            this.setState({
                modal: !this.state.modal
            })
           }
           
              
        }; 
  async  toggleschedule(event) {
    const idc = event.currentTarget.id;
    if(idc!=""){
    this.setState({
      schedulemodal: !this.state.schedulemodal,
      integid:idc
  });
  }
    const datepopup=event.currentTarget.className;
    if(datepopup=='modal fade show')
    {
      this.setState({
        schedulemodal: this.state.schedulemodal
      })
    }
     if(datepopup!="modal fade show" && idc=="")
   {
  this.setState({
    schedulemodal: !this.state.schedulemodal
  })
  }
  
    
  };    
  async  toggletruncate(event) {;
    const idc = event.currentTarget.id;
    if(idc!=""){
    this.setState({
      truncatemodal: !this.state.truncatemodal,
      integid:idc
  });
   }
    const datepopup=event.currentTarget.className;
    if(datepopup=='modal fade show')
    {
      this.setState({
        truncatemodal: this.state.truncatemodal
      })
    }
     if(datepopup!="modal fade show" && idc=="")
   {
  this.setState({
    truncatemodal: !this.state.truncatemodal
  })
  }
  
    
  };
render() {
  
          return (
            <Fragment>
          <CSSTransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
            transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}></CSSTransitionGroup>
          <Card>
                <Row className="p-2">
                               {this.state.isschedule===true ?
                               <Col md={2} className="text-center border-right">
                                 <Link title="edit" className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" id={this.intgid} onClick={this.toggleeditschedule}>
                                    <i className="lnr-highlight text-newssize icon-gradient bg-happy-fisher"></i></Link>
                             <div>Edit</div></Col>
                             :('')}
                                {this.state.isschedule===true ?
                                 <Col md={2} className="text-center border-right">
                               <Link style={{ pointerEvents: 'none' }} className="font-icon-wrapper font-icon-sm border-0 p-0"> <i className="lnr-chevron-right-circle text-newsize icon-gradient bg-happy-fisher-disable"></i></Link>
                               <div>Run</div>
                               </Col>
                               :
                               <Col md={2} className="text-center border-right">
                               <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Run" id={this.intgid} onClick={this.toggle}> <i className="lnr-chevron-right-circle text-newsize icon-gradient bg-happy-fisher"></i></Link>
                               <div>Run</div>
                               </Col>
                                }
                               {this.state.isschedule===true ?
                                <Col md={2} className="text-center border-right">
                               <Link style={{ pointerEvents: 'none' }} className="font-icon-wrapper font-icon-sm border-0 p-0"> <i className="lnr-calendar-full text-newsize icon-gradient bg-happy-fisher-disable"></i></Link>
                               <div>Schedule</div>
                               </Col>
                               : <Col md={2} className="text-center border-right">
                               <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Schedule" id={this.intgid} onClick={this.toggleschedule}> <i className="lnr-calendar-full text-newsize icon-gradient bg-happy-fisher"></i></Link>
                               <div>Schedule</div>
                               </Col>
                               }
                               <Col md={2} className="text-center border-right">
                            <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Delete/Truncate all data" id={this.intgid} onClick={this.toggletruncate}> <i className="lnr-trash text-newsize icon-gradient bg-happy-fisher"></i></Link>
                            <div>Delete/Truncate all data</div>
                               </Col>
                               </Row>
               
                  </Card>
    <Modal basic aria-hidden="true"  isOpen={this.state.modal} toggle={this.toggle} backdrop={false}>
   <div> <Link className="float-right" style={{textDecoration:"none"}} onClick={this.toggle}><i className="lnr-cross-circle iconfont"></i></Link>
   </div> <div> <Runbat id={this.state.integid}></Runbat> </div>
  </Modal>
               
  <Modal basic aria-hidden="true"  isOpen={this.state.schedulemodal} toggle={this.toggleschedule} backdrop={false}>
  <div> <Link className="float-right" style={{textDecoration:"none"}} onClick={this.toggleschedule}><i className="lnr-cross-circle iconfont"></i></Link>
   </div> <div> <Runscheduler id={this.state.integid}></Runscheduler> </div> 
     </Modal>

  <Modal basic aria-hidden="true" isOpen={this.state.truncatemodal} toggle={this.toggletruncate}  backdrop={false}>
     <div>
   <Link className="float-right" style={{textDecoration:"none"}} onClick={this.toggletruncate}><i className="lnr-cross-circle iconfont"></i></Link>
   </div><div><Deleteandtruncate id={this.state.integid}></Deleteandtruncate></div>
   </Modal>

   <Modal basic aria-hidden="true" isOpen={this.state.scheduleeditmodal} toggle={this.toggleeditschedule} backdrop={false}>
  <div><Link className="float-right" style={{textDecoration:"none"}} onClick={this.toggleeditschedule}><i className="lnr-cross-circle iconfont"></i></Link>
  </div><div><Editschedler id={this.state.integid}></Editschedler></div>
  </Modal>
  



</Fragment>
)
}
}
           