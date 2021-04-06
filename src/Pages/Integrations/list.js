import React, { Component,Fragment } from "react";
import {Link} from 'react-router-dom';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Moment from 'react-moment';
import _ from 'underscore';
import axios from 'axios';
import Loader from "react-loaders";
import arrowright from './components/image/imageleft.png';
import { Form,Button} from 'semantic-ui-react';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Row, Col,Card, CardBody,Modal} from 'reactstrap';
import {ResponsiveContainer,Area,AreaChart,Tooltip} from 'recharts';
import Timer from 'react-compound-timer';
import Switch from "react-switch";
import avtarimage from './components/image/KoichiTsuji.png';
import Configuration from '../../config/urlconfig';
import CountUp from "react-countup";
import "react-table/react-table.css";
import ReactTable from "react-table";
import './graph.css';
import Addintg from './add.js';
import Editschedler from './editscheduler.js';
import Runscheduler from './runscheduler.js';
import Runbat from './runbat.js';
import Deleteandtruncate from './deleteandtruncate';
library.add(
  faSpinner);
const tableStyle = {
  border: "none",
  boxShadow: "none",
  textAlign: "center"
};
  const getColumnWidth = (rows, accessor, headerText) => {
    const maxWidth = 400
    const magicSpacing = 10
    const cellLength = Math.max(
      ...rows.map(row => (`${row[accessor]}` || '').length),
      headerText.length,
    )
    return Math.min(maxWidth, cellLength * magicSpacing)
  }

  let totaldata=0;
export default class Integrationlist extends Component {
   constructor() {
        super();
        this.config = new Configuration();
       this.state = {
           loading:true,pages: 0,
           dataintglist: [],
           datagrapharray:[],
           integid:"",
           runtimeid:"",
           columns:[],
           modal: false,
           vessels:[],
           vesselsdata:[],
          startDate:'',
          endDate:'',
          startDatemodel:'',
          endDatemodel:'',
          schedulemodal:false,
          selectAll: false,
          checked: [],
          schedule:'',
           isactive:true,
          integrationid:[],
          deleteintgmodal:false,
          showprogressdeletemodel:false,
          modaladd:false
         };
     this.toggle = this.toggle.bind(this);
     this.toggleschedule = this.toggleschedule.bind(this);
     this.toggletruncate = this.toggletruncate.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(this);
      this.handleisactive=this.handleisactive.bind(this);
     this.deletetintegration=this.deletetintegration.bind(this);
     this.toggledelete=this.toggledelete.bind(this);
     this.toggleeditschedule = this.toggleeditschedule.bind(this);
     this.toggleaddintg=this.toggleaddintg.bind(this);
    }


handleisactive= async (id,isactive) =>
     {
       let status="";
       if(isactive==true)
       {
        status="Inactive";
       this.setState({
        isactive:false
       });
     }
     else{
      status="Active";
         this.setState({isactive:true});
     }
     let params={
       integration_id:id,
       status:status
     }
      const response = await axios.post(this.config.API_URL+'/api/isactiveintegration',params);
      debugger;
      if(response.data.success=true)
      {
        this.intg();
       }
     }
handleChange = () => {
      var selectAll = !this.state.selectAll;
      this.setState({ selectAll: selectAll });
      var checkedCopy = [], intgid= [];
      this.state.dataintglist.forEach(function(e, index) {
        checkedCopy.push(selectAll);
        intgid.push(e.id);
      });
      this.setState({
        checked: checkedCopy
      });
      this.setState({integrationid:intgid});
      if(selectAll == false)
      {
        this.setState({
          checked: [],
        })
        this.setState({
          integrationid: [],
        })
      }
    };
handleSingleCheckboxChange (event,index){
      console.log(index);
      let orgid= this.state.integrationid;
      var checkedCopy = this.state.checked;
      checkedCopy[index] = !this.state.checked[index];
      if (checkedCopy[index] === false) {
        this.setState({ selectAll: false });
        var indexs = orgid.indexOf(event);
        if (indexs > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
         orgid.splice(indexs, 1);
        }
       var checkds= checkedCopy.indexOf(index);
       if(checkds > -1){
        checkedCopy.splice(checkds ,1);
        }

        this.setState({ integrationid:orgid});
        this.setState({ checked: checkedCopy});
       }
      else
      {
        orgid.push(event);
        this.setState({ integrationid:orgid});
        this.setState({ checked: checkedCopy});
      }
      if(this.state.dataintglist.length === this.state.integrationid.length)
      {
        this.setState({ selectAll: true });
      }
      if(this.state.integrationid.length === 0)
      {
        this.setState({ selectAll: false });
        this.setState({ checked: []});
        this.setState({ integrationid: []});
      }
    };
async  toggleaddintg(event) {
this.setState({
        modaladd: !this.state.modaladd
 });};
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
    integid:idc});
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
}};

async  toggledelete(event) {
  const idc = event.currentTarget.id;
  if(idc!=""){
  this.setState({
    deleteintgmodal: !this.state.deleteintgmodal
});
}
  const datepopup=event.currentTarget.className;
  if(datepopup=='modal fade show')
  {
    this.setState({
      deleteintgmodal: this.state.deleteintgmodal
    })
  }
   if(datepopup!="modal fade show" && idc=="")
 {
this.setState({
  deleteintgmodal: !this.state.deleteintgmodal
})
}
};

async  toggleeditschedule(event) {
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

 async intg(){
        const url = this.config.API_URL+"/api/intgs"
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        totaldata=data.results;
        this.setState({ dataintglist: data.results, loading: false });
      }

//  async componentDidMount() {
//      this.intg();
//  };
 getTestData(page, pageSize, sorted, filtered, handleRetrievedData) {
  let url = this.config.API_URL+"/api/getIntgsoffset";
  debugger;
  let postObject = {
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filtered: filtered
  };
  debugger;
  return this.post(url, postObject).then(response => handleRetrievedData(response)).catch(response => console.log(response));
}
post(url, params = {}) {
 debugger;
  return axios.post(url, params)
}


  async deletetintegration()
  {
    debugger;
    let params={
      integration_id:this.state.integrationid,
      }
      this.setState({
        showprogressdeletemodel:true
      });
      const response = await axios.post(this.config.API_URL+'/api/deleteintegration',params);
      debugger;
      if(response.data.success=true)
      {
        this.setState({
          showprogressdeletemodel:false,deleteintgmodal:false,integrationid:[],checked:[]
        });this.intg();

      }
      else{
        alert (response.data.message)
      }

  }

render() {
  let sch;
  const {dataintglist}=this.state;

        return (
          <Fragment>
        <CSSTransitionGroup component="div" transitionName="TabsAnimation" transitionAppear={true}
          transitionAppearTimeout={0} transitionEnter={false} transitionLeave={false}></CSSTransitionGroup>
        <div>
        <div className="app-page-title">
               <div className="page-title-wrapper">
                   <div className="page-title-heading">
                        <div className="page-title-icon">
                       <i className="pe-7s-shuffle opacity-6"></i></div>
                       <div>Integration<div className="page-title-subheading">Integrations are apps and databases that you can use to send data through your pipeline.
                       </div></div>

                         </div>
                        <div className="page-title-actions">
                        <Button className="mb-2 mr-2 buttonall" onClick={this.toggleaddintg}><i className="pe-7s-plus p-1"></i>ADD INTEGRATION</Button>
                        </div>
                        </div></div>
              <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="pt-0" style={{textAlign:"center"}}>
                  <ReactTable style={tableStyle}
                  data={this.state.dataintglist}
                  columns={[
                    {
                            Header:(
                              <div>
                              <input title="select integration"
                                type="checkbox"
                                onChange={this.handleChange}
                                checked={this.state.selectAll}/>
                                {this.state.checked!="" ?
                                 <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 " title="delete integration" onClick={this.toggledelete}> <i className="lnr-trash text-size icon-gradient bg-happy-fisher"> </i></Link>
                                 :''}
                                 </div>
                            ),
                            accessor:"id",
                            Cell: (row) => (
                              <div>
                      <input
                    type="checkbox" id={row.row.id}
                    defaultChecked={this.state.checked[row.index]}
                    checked={this.state.checked[row.index]}
                    onChange={() => this.handleSingleCheckboxChange(row.row.id, row.index)}
                  />
                  <br></br>  {row.row.status==="Active" ?
                  <Switch classname="switch has-switch has-switch-sm" id={row.row.id}  onChange={() => this.handleisactive(row.row.id,true)} checked={true} />:
                  <Switch classname="switch has-switch has-switch-sm" id={row.row.id}  onChange={() => this.handleisactive(row.row.id,false)} checked={false} />
                   }
                  </div>
                  ),
                            sortable: false,
                            filterable: false,width:60},
                            { Header: "Actions",
                            accessor: "id",
                            style: {
                              display: "block !important"
                            },
                            Cell: (row) => (
                              (row.row.isschedule===true ?
                                (sch=true)
                                : (sch=false)
                             ),
                              <div>
                                <Link to={{pathname: `/integrations/view?id=${row.row.id}`}} title="overview" className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0">
                                   <i className="lnr-eye icon-gradient bg-happy-fisher"></i></Link>

                                {row.row.isschedule===true ?
                                 <Link title="edit" className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" id={row.row.id} onClick={this.toggleeditschedule}>
                                    <i className="lnr-highlight text-newssize icon-gradient bg-happy-fisher"></i></Link>
                                :('')}
                                {row.row.isschedule===true ?
                               <Link style={{ pointerEvents: 'none' }} className="font-icon-wrapper font-icon-sm border-0 p-0"> <i className="lnr-chevron-right-circle text-newsize icon-gradient bg-happy-fisher-disable"></i></Link>
                               :<Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Run" id={row.row.id} onClick={this.toggle}> <i className="lnr-chevron-right-circle text-newsize icon-gradient bg-happy-fisher"></i></Link>
                                }
                               {row.row.isschedule===true ?
                               <Link style={{ pointerEvents: 'none' }} className="font-icon-wrapper font-icon-sm border-0 p-0"> <i className="lnr-calendar-full text-newsize icon-gradient bg-happy-fisher-disable"></i></Link>
                               :<Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Schedule" id={row.row.id} onClick={this.toggleschedule}> <i className="lnr-calendar-full text-newsize icon-gradient bg-happy-fisher"></i></Link>
                            }
              <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Delete/Truncate all data" id={row.row.id} onClick={this.toggletruncate}> <i className="lnr-trash text-newsize icon-gradient bg-happy-fisher"></i></Link>
             </div>
                  ),filterable:false,width:150
                          },
                            {
                              Header: "Integration name",
                              accessor: "name",
                              style: {
                                textAlign: "center"
                              },
                              Cell:(row)=>(<div>
                                <div className="text-center text-muted small"><b>{row.row.name}</b></div>
                               </div>

                              ),
                              filterable:true,width:130
                            },
                    {
                          Header: "Integration journey",
                          accessor:"sourcename",

                          style: {
                            display: "block !important",
                          textAlign: "center !important"
                          },
                          Cell: (row) => (
                              <div className="widget-content p-0">
                <div className="widget-content-wrapper" style={{display:"inline-flex"}}>
                              <div className="widget-content">
                              <img width={28} className="rounded-circle" src={row.row.sourcelogo} alt="Avatar" />
                              <div title="Source" className="widget-heading small"><b>{row.row.sourcename}</b></div>

                          </div>
                          <div className="p-2"><img height={28} src={arrowright} alt=""></img></div>
                          <div className="widget-content">
                          <img width={28} className="rounded-circle" src={row.row.destinationlogo} alt="Avatar" />
                          <div title="Destination" className="widget-heading small"><b>{row.row.destinationname}</b></div>
                         </div> </div></div> ), filterable:false,width:140},

                          {
                            Header: "Recent loads",
                            accessor:"graphdata",
                            style: {
                              textAlign: "center"
                            },
                            Cell: (row) => (
                              (row.row.total==="0" ?
                                <div>No Data</div>:
                              <ResponsiveContainer height="100%" width="100%">
                              <AreaChart data={row.row.graphdata}> <Tooltip />
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
                              )
                               ),width:140,filterable:false
                          },
                          {
                            Header: "Total rows loaded",
                            accessor: "name",
                            width: 120,
                            style: {
                              display: "block !important"
                            },
                            Cell:(row)=>(
                               <div className="badge badge-lyftronwarning small widget-numbers" title="total rows">

                    <CountUp start={0} end={row.row.total} separator="" decimals={0} decimal="."
                      prefix="" useEasing={false} suffix="" duration="5"/>
                  </div> ),filterable:false
                          },

    {
      Header: "Created by",
      accessor:"createdby",
      style: {
        display: "block !important"
      },
      Cell: (row) => (
          <div className="widget-content" style={{padding:"0.5rem"}}>
          <img width={30} className="rounded-circle" src={avtarimage} alt="Avatar" />
          <div className="widget-heading small"><b>{row.row.createdby}</b></div>
      </div>
        ),
   filterable:false,width:80
    },
                          {
                            Header:"Schedule frequency",
                            accessor:'schedule',
                            width: getColumnWidth(dataintglist, 'schedule', 'sche frequency'),
                            style: {
                              display: "block !important"
                            },
                            Cell:(row)=>(
                            <div className="d-block text-center text-lyftron small">
                            {row.row.isschedule===true ?
                            <div>
                        <div style={{"text-transform":"capitalize"}}><b> {row.row.schedule}</b></div>
                      </div>  :<div>
                        <div><b>One Time</b></div>
                      </div>}</div> )},
                          {accessor:"total",show:false},
                          {accessor:"schedule",show:false},
                          {accessor:"sourcelogo",show:false},
                          {accessor:"createdAt",show:false},
                          {accessor:"destinationname", show:false},
                          {accessor:"destinationlogo",show:false},
                          {accessor:"startDate", show:false},
                          {accessor:"endDate",show:false},
                          {accessor:"nextrun",show:false},
                          {accessor:"lastrun",show:false},
                          {accessor:"status",show:false},
                     {
                            Header:"Next execution at",
                            accessor:'isschedule',
                          width: getColumnWidth(dataintglist, 'schedule', 'Next execution at'),
                            style: {
                              display: "block !important"
                            },
                            Cell:(row)=>(
                            <div className="d-block text-center text-lyftron small">
                            {row.row.isschedule===true ?
                            <div>
                        <div><b><Moment format="YYYY-MMM-DD">{row.row.lastrun}</Moment></b></div>
                        {row.row.status==='Inactive' ?
                           <div className="text-lyftron badge badge-lyftronwarning" title="job is paused">
                         Paused
                           </div>:
                 <Timer
                      initialTime={row.row.nextrun*1000}
                      direction="backward">{() => (
                          <React.Fragment>
                            <div className="text-lyftron badge badge-lyftronwarning" title="job is running">
                              <Timer.Days /><b>d </b>
                              <Timer.Hours /><b>h </b>
                              <Timer.Minutes /><b>m </b>
                              <Timer.Seconds /><b>s</b>
                              </div>
                          </React.Fragment>
                      )}</Timer>}
                      </div>:<div><b>Not scheduled</b></div>}</div>
                         ),width:120,filterable:false },

  {
    Header: "Created at",
    accessor: "createdAt",
    style: {
      display: "block !important"
    },
    Cell:(row)=>(
      <div className="text-center text-lyftron small">
      <div><b><Moment format="YYYY-MMM-DD HH:mm:ss">
         {row.row.createdAt}
       </Moment></b></div></div>
    ),width:120,
    filterable:false
  },

    {
      Header: "Updated at",
      accessor: "updatedAt",
      style: {
        display: "block !important"
      },
      Cell:(row)=>(
        <div className="text-center text-lyftron small">
        <div><b><Moment format="YYYY-MMM-DD HH:mm:ss">
           {row.row.updatedAt}
         </Moment></b></div></div>
      ),width:120,
      filterable:false
    },
    {
      Header: "Status",
      accessor: "isschedule",
      style: {
        display: "block !important"
      },
      Cell: (row) => (
        <div className="text-lyftron small">
        {row.row.isschedule===true ?
        (row.row.status==='Inactive' ?
        <div title="status" className="badge badge-lyftronnew">Inactive</div>
          : <div>
          <div className="text-lyftron badge badge-lyftronwarning">In progress</div>
          </div>
        )
        :<div>
          {row.row.lastrunstatus!==null ?
        <div title="previous run status" className="badge badge-lyftron small">Success</div>
        :<div title="run status" className="badge badge-lyftrondark">Draft</div> }
       </div>}</div>
      ),filterable:false
    }
      ]}
      defaultPageSize={5}
      pages={this.state.pages}
      loading={this.state.loading}
      showPagination={true}
      showPaginationTop={false}
      showPaginationBottom={true}
      sortable={false}
      pageSizeOptions={[5, 10, 20, 25, 50, 100]}
      manual
      filterable
      onFetchData={(state, instance) => {

        this.setState({loading: true});
        this.getTestData(state.page, state.pageSize, state.sorted, state.filtered, (res) => {
        this.setState({
              dataintglist: res.data.results,
               pages: res.data.pages,
                loading: false
        })
      });
      }}
       className="-striped -highlight" />
         </CardBody></Card></Col></Row>

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

  <Modal basic aria-hidden="true"  isOpen={this.state.deleteintgmodal} toggle={this.toggledelete} backdrop={false}>
                <div> <Link className="float-right" style={{textDecoration:"none"}} onClick={this.toggledelete}><i className="lnr-cross-circle iconfont"></i></Link>
   </div>
     <div className="text-center mb-3">
      <i className="pe-7s-shuffle" style={{fontSize:'5rem',color:'#4f3989'}}></i>
      <h5 className="mt-2">Delete</h5>
      <h6>Integrations are apps and databases that you can use to
<br></br>send data through your pipeline.</h6>
      </div>
                    <Form className="text-center">
                    <label><strong>Do you want to delete selected integration?...</strong></label>
                 <Row>
                <Col md="4"></Col>
                <Col md="5">
              {this.state.showprogressdeletemodel ? (
          <div className="text-all float-right">
              <FontAwesomeIcon
                  icon={['fas', 'spinner']}
                  pulse
                  fixedWidth
                  size="2x"/>
          </div>):('')}
      </Col>
    <Col md="2">  <Button Active  className="ui button float-right btn-wide btn-pill btn-outline-2x btn mt-3 mb-3 mr-4" style={{color:'#66529C',backgroundColor:'#fff',border:'1px solid #66529C'}} onClick={this.deletetintegration}>Delete </Button>{' '}</Col>
      <Col md="1"></Col>
      </Row>
        </Form> </Modal>

 <Modal basic aria-hidden="true"  isOpen={this.state.modaladd} toggle={this.toggleaddintg} backdrop={false}>
  <div> <Link className="float-right" style={{textDecoration:"none"}} onClick={this.toggleaddintg}><i className="lnr-cross-circle iconfont"></i></Link>
   </div> <Addintg />
  </Modal>

   </div>
                  </Fragment>


        );
      }


}
