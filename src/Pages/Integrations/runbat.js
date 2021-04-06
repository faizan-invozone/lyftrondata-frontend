import React, { Component } from 'react';
import './graph.css';
import {Row, Col} from 'reactstrap';
import axios from 'axios';
import { DateInput } from 'semantic-ui-calendar-react';
import { Form,Dropdown,Button } from 'semantic-ui-react';
import Configuration from '../../config/urlconfig';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import _ from 'underscore';
import moment from 'moment';
const scheduleoptions = [
    {  text: 'Onetime', value: 'onetime'},
    {  text: 'Hourly', value: 'hourly'},
    {  text: 'Daily', value: 'daily' },
    {  text: 'Every 10 Minutes', value: 'every10minutes' },
    {  text: 'Every 15 Minutes', value: 'every15minutes' }
    ];
    const vesseloptions = [];
    let optionv=[];
export default class EditSchedler extends Component {
    constructor(props) {
        super(props);
        this.config = new Configuration();
        this.state = {
          data:[],
          datadestination:[],
          datasource:[],
          dataschedule:scheduleoptions,
          step: 1,
          name:'',
          source: '',
          destination: '',
          vessels:[],
          startDate:'',
          endDate:'',
          schedule:'',
          insertrule:'',
          loading:true,
          showprogresseditmodel:false,
          compositekey:[],
          wnisha2field:[],
          intgid:this.props.id,
          vesselsmodel:''
        };
        this.runbat = this.runbat.bind(this);
    } 
   
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
handletoggledataChange = (event, {name, value}) => {
 
   if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
     }
      };
    async componentDidMount() {
        debugger;
            let responsetoodata = await axios.get(
              this.config.API_URL+`/api/getIntgsoverview?intgid=${this.state.intgid}`);
                var string = responsetoodata.data.results[0].vessels;
                var vessel = string.split(",");
                debugger;
                var comkey=responsetoodata.data.results[0].compositekey;
                var compkey=[];var sha2=[];
                if(compkey!=''){
                 compkey=comkey.split(",");}
                var sha2filed=responsetoodata.data.results[0].wnisha2field;
                if(sha2!=''){ sha2=sha2filed.split(",");}
                 this.setState({
                            vessels:vessel,
                            vesselsmodel:responsetoodata.data.results[0].vessels,
                            startDate:responsetoodata.data.results[0].startDate,
                            endDate:responsetoodata.data.results[0].endDate,
                            schedule:responsetoodata.data.results[0].schedule,
                            integid:this.state.intgid,
                            runtimeid:responsetoodata.data.results[0].runtime_id,
                            insertrule:responsetoodata.data.results[0].insertrule,
                            compositekey:compkey,
                            wnisha2field:sha2
                          });
        /////forvessel
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
       this.setState({ vesselsdata: vesseloptions,loading: false });
   
    }

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
          recordtype:"old",
          insertrule:this.state.insertrule,
          compositekey:this.state.compositekey,
          wnisha2field:this.state.wnisha2field
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
          insertrule:this.state.insertrule,
          compositekey:this.state.compositekey,
          wnisha2field:this.state.wnisha2field
          }
      }
      const response = await axios.post(this.config.API_URL+'/api/batchs',params);
      debugger;
      if(response.data.success=true)
      {
        this.setState({
          showprogressmodel:false,modal:false
        });window.location.reload();
          
      }
      else{
        alert (response.data.message)
      }
    }
    
  render() {
    return(
      <div >
      
      <div className="text-center mb-3">
      <i className="pe-7s-shuffle" style={{fontSize:'5rem',color:'#4f3989'}}></i>
      <h5 className="mt-2">Add Parameters</h5> 
      <h6>Integrations are apps and databases that you can use to 
<br></br>send data through your pipeline.</h6>
      </div>
                    <Form>
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
          //dateFormat={moment(this.state.endDate).format('YYYY-MMM-DD')}
          iconPosition="left"
          onChange={this.handletoggledataChange}
        />
</Form.Field> 
  
                                  </Col>
                                  <Col md="12">
            <Form.Field>
            <label>Vessel</label>
               <Dropdown  name='vessels' onChange={this.handletoggledataselectallChange} value={this.state.vessels}
            options={this.state.vesselsdata}
            placeholder='Choose vessels'
            selection multiple search fluid />
            </Form.Field>
            </Col>
                        </Row>
                  <Row>
              <Col md={8}>
                {this.state.showprogressmodel ? (
          <div className="text-all mt-3 pull-right">
              <FontAwesomeIcon icon={['fas', 'spinner']} pulse fixedWidth size="2x" />
          </div>):('')}</Col>
          <Col md={4}>
          <Button Active  className="ui button float-right btn-wide btn-pill btn-outline-2x btn mt-3 mb-3 mr-4" style={{color:'#66529C',backgroundColor:'#fff',border:'1px solid #66529C'}} onClick={this.runbat}>Run </Button>
          </Col>
      </Row>
                 </Form>
                  

</div> );
        
  }
}
