import React, { Component,Fragment } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import _ from 'underscore';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import axios from 'axios';
import Loader from "react-loaders";
import moment from 'moment';
import {
    DateInput
  } from 'semantic-ui-calendar-react';
import { Form,Dropdown, CardHeader } from 'semantic-ui-react';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Row, Col,Card, CardBody,Button,Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import Switch from "react-switch";
import Configuration from '../../../config/urlconfig';


library.add(
  faSpinner,
 
);

  const scheduleoptions = [
    {  text: 'Hourly', value: 'hourly' },
    {  text: 'Daily', value: 'daily' },
    {  text: 'Every 10 Minutes', value: 'every10minutes' },
    {  text: 'Every 15 Minutes', value: 'every15minutes' }
  ];
const vesseloptions = [];
let optionv=[];
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
        this.runbat = this.runbat.bind(this);
        this.toggleschedule = this.toggleschedule.bind(this);
        this.toggletruncate = this.toggletruncate.bind(this);
        this.runschedule = this.runschedule.bind(this);
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(this);
    this.handleChangedelete=this.handleChangedelete.bind(this);
    this.handleChangetruncate=this.handleChangetruncate.bind(this);
         this.deletetruncatedata=this.deletetruncatedata.bind(this);
    //   this.deletetintegration=this.deletetintegration.bind(this);
    //   this.toggledelete=this.toggledelete.bind(this);
    this.toggleeditschedule = this.toggleeditschedule.bind(this);
    this.updateschedule = this.updateschedule.bind(this);
      
     }
     async  toggleeditschedule(event) {
         debugger;
        const idc = event.currentTarget.id;
        if(idc!=""){
          this.setState({
            scheduleeditmodal: !this.state.scheduleeditmodal
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
//for vessels 
     
     const urlvessel = this.config.API_URL+"/api/vessels"
     const responsev = await fetch(urlvessel, {
         method: 'GET',
         headers: {
             "Content-Type": "application/json",
         }
     });
     const datav = await responsev.json();
     vesseloptions.push({text:"Select All",value:"Select All"});
     optionv=datav.result;
     optionv.forEach(element => 
         {var b={text: element.number, value: element.number}
         vesseloptions.push(b);
    });
    this.setState({ vesselsdata: vesseloptions });
        }

handletoggledataChange = (event, {name, value}) => {
   if (this.state.hasOwnProperty(name)) {
                 this.setState({ [name]: value });
            } };
            handletoggledataselectallChange = (event, {name, value}) => {
              let isallselect=false;
      if(value.length>0)
      {
        value.forEach(element => {
          if(element=="Select All")
          {
            isallselect=true;
          }
      
        });
      } if(isallselect==true)
              {
               let vesseloption=[];
                optionv.forEach(element => {
                  if(element.number!="Select All"){
                  vesseloption.push(element.number);}}
             );
              this.setState({ vessels:vesseloption });}
              
              else if (this.state.hasOwnProperty(name)) {
                this.setState({ [name]: value });
           }
            };

            async updateschedule() 
            {
              debugger;
              this.setState({
                showprogresseditmodel:true
              });
              let params={};
              params={
                  endDate:this.state.endDate,
                  vessels:this.state.vessels,
                  integration_id:this.state.integid,
                  runtime_id:this.state.runtimeid,
                  schedule:this.state.schedule
                    }
                    debugger;
              const response = await axios.post(this.config.API_URL+'/api/updateschedler',params);
              debugger;
              if(response.data.success=true)
              {
                this.setState({
                  showprogresseditmodel:false,scheduleeditmodal:false
                });
                window.location.reload();
                  
              }
              else{
                alert (response.data.message)
              }
            }

            async  toggle(event) {
              const idc = event.currentTarget.id;
              if(idc!=""){
              this.setState({
                modal: !this.state.modal
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
        async runbat() 
  {
    debugger;
    this.setState({
      showprogressmodel:true
    });
    let params={};
    let vesselsmodl=this.state.vesselsmodel;
    var vesselmodelArray = vesselsmodl.split(',');
    var same = (vesselmodelArray.length === this.state.vessels.length) && (_.difference(vesselmodelArray, this.state.vessels).length === 0);
    if(this.state.startDate==this.state.startDatemodel && this.state.endDate==this.state.endDatemodel && same==true)
     { 
    params={
        startDate:this.state.startDate,
        endDate:this.state.endDate,
        vessels:this.state.vessels,
        integration_id:this.state.integid,
        runtime_id:this.state.runtimeid,
        recordtype:"old"
          }
    }
    else{
        params={
        startDate:this.state.startDate,
        endDate:this.state.endDate,
        vessels:this.state.vessels,
        integration_id:this.state.integid,
        runtime_id:this.state.runtimeid,
        recordtype:"new"
        }
    }

   const response = await axios.post(this.config.API_URL+'/api/batchs',params);
   
    if(response.data.success=true)
    {
      this.setState({
        showprogressmodel:false,modal:false
      });
      window.location.reload();
      }
    else{
      alert (response.data.message)
    }
  } 
  async  toggleschedule(event) {
    const idc = event.currentTarget.id;
    if(idc!=""){
    this.setState({
      schedulemodal: !this.state.schedulemodal
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
  async runschedule() 
  {
    debugger;
    this.setState({
      showprogressmodel:true
    });
    let params={};
    let vesselsmodl=this.state.vesselsmodel;
    var vesselmodelArray = vesselsmodl.split(',');
    var same = (vesselmodelArray.length === this.state.vessels.length) && (_.difference(vesselmodelArray, this.state.vessels).length === 0);
    if(this.state.startDate==this.state.startDatemodel && this.state.endDate==this.state.endDatemodel && same==true)
     { 
    params={
        startDate:this.state.startDate,
        endDate:this.state.endDate,
        vessels:this.state.vessels,
        integration_id:this.state.integid,
        runtime_id:this.state.runtimeid,
        recordtype:"old",
        schedule:this.state.schedule
          }
    }
    else{
        params={
        startDate:this.state.startDate,
        endDate:this.state.endDate,
        vessels:this.state.vessels,
        integration_id:this.state.integid,
        runtime_id:this.state.runtimeid,
        recordtype:"new",
        schedule:this.state.schedule
        }
    }
    const response = await axios.post(this.config.API_URL+'/api/schdulebat',params);
    if(response.data.success=true)
    {
      this.setState({
        showprogressmodel:false,schedulemodal:false
      });
      window.location.reload();
        
    }
    else{
      alert (response.data.message)
    }
  }    
  async  toggletruncate(event) {;
    const idc = event.currentTarget.id;
    if(idc!=""){
    this.setState({
      truncatemodal: !this.state.truncatemodal
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
  async deletetruncatedata()
  {
    debugger;
    var deletee=this.state.isintegrationdelete;
    var truncatee=this.state.istruncate;
    let params={
      integration_id:this.state.integid,
      }
    if(deletee==true)
    {
      this.setState({
        showprogresstruncatemodel:true
      });
      const response = await axios.post(this.config.API_URL+'/api/deletedataintegration',params);
      debugger;
      if(response.data.success=true)
      {
        
        this.setState({
          truncatemodal:false,showprogresstruncatemodel:false
        });
        window.location.reload();
          
      }
      else{
        alert (response.data.message)
      }

    }
    if(truncatee==true)
    {
      this.setState({
        showprogresstruncatemodel:true
      });
      const response = await axios.post(this.config.API_URL+'/api/truncatedata',params);
      if(response.data.success=true)
      {
        this.setState({
          truncatemodal:false,showprogresstruncatemodel:false
        });
        window.location.reload();
          
      }else{alert (response.data.message)}
    }
  }
  handleChangedelete(isintegrationdelete) {
    this.setState({ isintegrationdelete:isintegrationdelete});
   }
   handleChangetruncate(istruncate) {
    this.setState({ istruncate:istruncate });
   }
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
               
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Parameters </ModalHeader>
                
                <Form>
                
                <ModalBody>
                    <Row>
                      <Col md="6">
                      <Form.Field>
        <label>Start Date</label>
<DateInput
      name="startDate"
      placeholder="Date"
      value={this.state.startDate}
      dateFormat='YYYY-MM-DD'
      iconPosition="left"
      disable={moment().add(1, 'years').calendar()}
      onChange={this.handletoggledataChange}
    />
</Form.Field>  </Col>
                      <Col md="6">
                              <Form.Field>
        <label>End Date</label>
<DateInput
      name="endDate"
      placeholder="Date"
      value={this.state.endDate}
      dateFormat='YYYY-MM-DD'
      //dateFormat={moment(this.state.endDate).format('YYYY-MMM-DD')}
      iconPosition="left"
      onChange={this.handletoggledataChange}
    />
</Form.Field> </Col>
                              <Col md="12">
        <Form.Field>
        <label>Vessel</label>
           <Dropdown  name='vessels'
        onChange={this.handletoggledataselectallChange}
        value={this.state.vessels}
        options={this.state.vesselsdata}
        placeholder='Choose vessels'
        selection multiple search fluid
      />
        </Form.Field>
        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
          <div><Row>
            <Col md="2"></Col>
            {this.state.showprogressmodel ? ( 
          <Col md="2">
      <div className="text-all">
          <FontAwesomeIcon
              icon={['fas', 'spinner']}
              pulse
              fixedWidth
              size="2x"
          />
      </div>
  </Col>):('')}
<Col md="4"> <Button className="buttonall" onClick={this.toggle}>Cancel</Button></Col> 
<Col md="4"> <Button className="buttonall" onClick={this.runbat}>Run </Button>{' '}</Col>
  </Row>
  
  </div>
                  
                </ModalFooter>
                </Form>
            </Modal>
           
            <Modal isOpen={this.state.schedulemodal} toggle={this.toggleschedule}>
                <ModalHeader toggle={this.toggleschedule}>Add Scheduler </ModalHeader>
                
                <Form>
                
                <ModalBody>
                    <Row>
                      <Col md="6">
                      <Form.Field>
        <label>Start Date</label>
<DateInput
      name="startDate"
      placeholder="Date"
      value={this.state.startDate}
      dateFormat='YYYY-MM-DD'
      iconPosition="left"
      onChange={this.handletoggledataChange}
    />
    
</Form.Field> 

                     
                      </Col>
                      <Col md="6">
                              <Form.Field>
        <label>End Date</label>
<DateInput
      name="endDate"
      placeholder="Date"
      value={this.state.endDate}
      dateFormat='YYYY-MM-DD'
      iconPosition="left"
      onChange={this.handletoggledataChange}
    />
</Form.Field> 

                              </Col>
                              </Row>
                              <Row>
                              <Col md="12">
        <Form.Field>
        <label>Vessel</label>
           <Dropdown  name='vessels'
        onChange={this.handletoggledataselectallChange}
        value={this.state.vessels}
        options={this.state.vesselsdata}
        placeholder='Choose vessels'
        selection multiple search fluid
      />
        </Form.Field></Col>
        <Col md="12">
        <Form.Field>
        <label>Schedule</label>
           <Dropdown  name='schedule'
        onChange={this.handletoggledataChange}
        value={this.state.schedule}
        options={scheduleoptions}
        placeholder='Choose schedule type'
        selection search
      />
        </Form.Field>
        
        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
          <div><Row>
            <Col md="2"></Col>
            {this.state.showprogressmodel ? ( 
          <Col md="2">
      <div className="text-all">
          <FontAwesomeIcon
              icon={['fas', 'spinner']}
              pulse
              fixedWidth
              size="2x"
          />
      </div>
  </Col>):('')}
<Col md="4"> <Button className="buttonall" onClick={this.toggleschedule}>Cancel</Button></Col> 
<Col md="4"> <Button className="buttonall" onClick={this.runschedule}>Schedule </Button>{' '}</Col>
  </Row>
  
  </div>
                  
                </ModalFooter>
                </Form>
            </Modal>

            <Modal isOpen={this.state.truncatemodal} toggle={this.toggletruncate}>
                <ModalHeader toggle={this.toggletruncate}></ModalHeader>
                
                <Form>
                 <ModalBody>
                <label><strong>Do you want to delete data of this integration?...</strong></label>
              <Switch onChange={this.handleChangedelete} checked={this.state.isintegrationdelete} />
             <br></br><strong>or</strong><br></br>
             <label className="mt-2"><strong>Do you want to truncate all data?...</strong></label>
              <Switch onChange={this.handleChangetruncate} checked={this.state.istruncate} />
                </ModalBody>
                <ModalFooter>
            <Row>
            {this.state.showprogresstruncatemodel ? ( 
          <Col md="2">
      <div className="text-all">
          <FontAwesomeIcon
              icon={['fas', 'spinner']}
              pulse
              fixedWidth
              size="2x"
          />
      </div>
  </Col>):('')}
<Col md="4"> <Button className="buttonall" onClick={this.toggletruncate}>Cancel</Button></Col> 
<Col md="6"> <Button className="buttonall" onClick={this.deletetruncatedata}>Delete/Truncate</Button>{' '}</Col>
  </Row>
        
                </ModalFooter>
                </Form>
            </Modal>


            <Modal isOpen={this.state.scheduleeditmodal} toggle={this.toggleeditschedule}>
                <ModalHeader toggle={this.toggleeditschedule}>Edit Scheduler </ModalHeader>
                <Form>
                 <ModalBody>
                    <Row>
                      <Col md="6">
                      <Form.Field>
        <label>Start Date</label>
<DateInput
      name="startDate"
      placeholder="Date"
      value={this.state.startDate}
      dateFormat='YYYY-MM-DD'
      iconPosition="left"
    readOnly="true"
      onChange={this.handletoggledataChange}
    />
    
</Form.Field> 
</Col>
                      <Col md="6">
                              <Form.Field>
        <label>End Date</label>
<DateInput
      name="endDate"
      placeholder="Date"
      value={this.state.endDate}
      dateFormat='YYYY-MM-DD'
      iconPosition="left"
      onChange={this.handletoggledataChange}

    />
</Form.Field> 

                              </Col>
                              </Row>
                              <Row>
                              <Col md="12">
        <Form.Field>
        <label>Vessel</label>
           <Dropdown  name='vessels'
        onChange={this.handletoggledataselectallChange}
        value={this.state.vessels}
        options={this.state.vesselsdata}
        placeholder='Choose vessels'
        selection multiple search fluid
      />
        </Form.Field></Col>
        <Col md="12">
        <Form.Field>
        <label>Schedule</label>
           <Dropdown  name='schedule'
        onChange={this.handletoggledataChange}
        value={this.state.schedule}
        options={scheduleoptions}
        placeholder='Choose schedule type'
        selection search
      />
        </Form.Field>
        
        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
          <div><Row>
            <Col md="2"></Col>
            {this.state.showprogresseditmodel ? ( 
          <Col md="2">
      <div className="text-all">
          <FontAwesomeIcon
              icon={['fas', 'spinner']}
              pulse
              fixedWidth
              size="2x"
          />
      </div>
  </Col>):('')}
<Col md="4"> <Button className="buttonall" onClick={this.toggleeditschedule}>Cancel</Button></Col> 
<Col md="4"> <Button className="buttonall" onClick={this.updateschedule}>Update</Button>{' '}</Col>
  </Row>
  
  </div>
                  
                </ModalFooter>
                </Form>
            </Modal>

           
</Fragment>
)
}
}
           