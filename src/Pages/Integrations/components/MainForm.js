// MainForm.jsx
import React, { Component } from 'react';
import Connections from './connection';
import Schedules from './schedule';
import Insertdata from './datainsert.js';
import Confirmation from './confirmation';
import Configuration from '../../../config/urlconfig';
import '../graph.css';
const scheduleoptions = [
    {  text: 'Onetime', value: 'onetime'},
    {  text: 'Hourly', value: 'hourly'},
    {  text: 'Daily', value: 'daily' },
    {  text: 'Every 10 Minutes', value: 'every10minutes' },
    {  text: 'Every 15 Minutes', value: 'every15minutes' }
    ]
const datainsertoptionn=[
      {text:'Insert',value:'Insert'},
      {text:'Scd false update',value:'Scd false update'},
      {text:'Scd true update',value:'Scd true update'}
  ]
const datainsertselectedchange=[
    {text:'Startdate',value:'startdate'},
    {text:'Enddate',value:'enddate'},
    {text:'Vessel',value:'imo_vessel'},
    {text:'Imo_num_repo',value:'imo_num_repo'},
    {text:'Report_type_repo',value:'report_type_repo'},
    {text:'Ref_time',value:'ref_time'},
]
  const sourceoptions=[];
  const destinationOptions = [];
  const vesseloptions = [];
  let optionv=[];
  let sh2option=[];
class MainForm extends Component {
    constructor() {
        super();
        this.config = new Configuration();
        this.state = {
          data:[],
          datadestination:[],
          datasource:[],
          datainsertoption :datainsertoptionn,
          datainsertselectedchange:datainsertselectedchange,
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
          showprogressmodel:false,
          compositekey:[],
          wnisha2field:[],
          sha2fieldvalueoption:sh2option
        };
        // this.renderOptions = this.renderOptions.bind(this);
        //this.handleinputChange = this.handleinputChange.bind(this);
    }    
    async componentDidMount() {
        let select={text:'--Select--',value:' '};
        sourceoptions.push(select);
        destinationOptions.push(select);
        let option=[];
        const url = this.config.API_URL+"/api/cons"
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        option=data.result;
        
         option.forEach(element => 
            {var a={text:  <a className="button-widget-content cardlink">
           <div className="card widget-content p-2">
               <div className="widget-content-outer">
                   <div className="widget-content-wrapper">
                       <div className="widget-content-left">
                        <img width="30" className="rounded-circle" src={element.logoimage} />
                       </div>
                       <div className="widget-content-left ml-3">
                           <div className="widget-heading">{element.name} </div>
                          
                       </div>
                   </div>
               </div>
   
           </div>
       </a>, value: element.id}
       sourceoptions.push(a);
       destinationOptions.push(a);
       });
        this.setState({ datasource: sourceoptions,datadestination:destinationOptions, loading: false });
        
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
       this.setState({ data: vesseloptions,loading: false });
       
       //for wnicolumn
       const urlwni = this.config.API_URL+"/api/getcolumnreplication"
       const respwni = await fetch(urlwni, {
           method: 'GET',
           headers: {
               "Content-Type": "application/json",
           }
       });
       const datawni = await respwni.json();
       sh2option=datawni.results;
       this.setState({sha2fieldvalueoption:sh2option});
    }
  
        
        // fetch(url)
        //   .then(Response => Response.json())
        //   .then(findResponse => {
        //     console.log(findResponse);
        //     console.log(findResponse.results[0].name.first);
        //     this.setState({
        //       data: findResponse.results,
        //       selected: findResponse.results[0].name.first // need to be sure it's exist
        //     });
        //   });
  // }
      
    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }
    datahandlesubmit = () =>{
        debugger;
        this.setState({
            showprogressmodel:true
          });
        let url = this.config.API_URL+"/api/intgs";
        let data=
        {
          name:this.state.name,
          source: this.state.source,
          destination: this.state.destination,
          vessels:this.state.vessels,
          startDate:this.state.startDate,
          endDate:this.state.endDate,
          schedule:this.state.schedule,
          insertrule:this.state.insertrule,
          compositekey:this.state.compositekey,
          wnisha2field:this.state.wnisha2field
        };
        debugger;
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(data)
            
        })
        .then((result)=> {
            debugger;
            result.json().then((resp)=> {
                console.warn("resp",resp)})
                // alert("data submited")
                window.location.reload();
            })
        }
    // handle onChange event of the dropdown
//     drophandleChange = e => {
//     setSelectedValue(e.value);
//   }
    //handleChange(value) {this.setState({ selected: value });}
    // handleChange = event => { 
    //     debugger
    //     this.setState({ [event.target.name]: event.target.value });
    //   }
    // onChange = (e, data) => {
    //     console.log(data.value);
    //     this.setState({ language: data.value });
    //   }
      // onsourceChange = (e, data) => {
      //   debugger;
      //   console.log(data.value);
      //   this.setState({ source: data.value });
      // }
      // onSearchChange = (e, data) => {
      //   console.log(data.searchQuery);
      //   this.setState({ searchQuery: data.searchQuery });
      // }
    handleChange = (event, {name, value}) => {
        debugger;
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
    
        }
      }

    // handleChange = input => event => {
    //     debugger;
    //     const target = event.target;
    //     let value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name || target.id;
    //     //var partialState = this.state;
    //     if (value==undefined){
    //         value=event.target.innerText;
    //     }
       
    //     if(input=="vessels")
    //     {
    //       var newStateArray = this.state.vessels.slice();
    //       newStateArray.push(value);
    //       this.setState({[input]:newStateArray});
    //     }
    //     else
    //     {
    //         this.setState({ [input] : value})
    //     }
    // };
    handleinputChange = input => event => {
        debugger;
        this.setState({ [input] : event.target.value })
    }
    handleselectallChange = (event, {name, value}) => {
        debugger;
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
    render(){
        const {step,name,source,datasource,destination,datadestination, startDate, endDate,vessels,data,dataschedule ,schedule,showprogressmodel,datainsertoption,insertrule,datainsertselectedchange,compositekey,wnisha2field,sha2fieldvalueoption} = this.state;
        const values = { name,source,datasource, destination,datadestination, startDate, endDate ,vessels,data,dataschedule ,schedule,showprogressmodel,datainsertoption,insertrule,datainsertselectedchange,compositekey,wnisha2field,sha2fieldvalueoption};
        switch(step) {
        case 1:
            return <Connections
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                    />
         case 2:
            return <Schedules
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    handleselectallChange={this.handleselectallChange}
                     values={values}
                    />
          case 3:
                return <Insertdata
                         nextStep={this.nextStep}
                         prevStep={this.prevStep}
                         handleChange={this.handleChange}
                         handleselectallChange={this.handleselectallChange}
                        values={values}
                          />
        case 4:
            return <Confirmation
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleinputChange={this.handleinputChange}
                    datahandlesubmit={this.datahandlesubmit}
                    values={values}
                    />
        }
    }
}

export default MainForm;