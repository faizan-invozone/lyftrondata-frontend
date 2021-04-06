import React, { Component,Fragment } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Moment from 'react-moment';
import _ from 'underscore';
import axios from 'axios';
import Loader from "react-loaders";
import moment from 'moment';
import arrowright from '../components/image/imageleft.png';
import {
    DateInput
  } from 'semantic-ui-calendar-react';
import { Form,Dropdown } from 'semantic-ui-react';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Row, Col,Card, CardBody,Button,Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import Timer from 'react-compound-timer';
import Switch from "react-switch";
import avtarimage from '../components/image/KoichiTsuji.png';
import Configuration from '../../../config/urlconfig';
import CountUp from "react-countup";
import "react-table/react-table.css";
import ReactTable from "react-table";
import {
  Sparklines,
  SparklinesLine,
  SparklinesSpots,
} from "react-sparklines";
import './graph.css';
const iconData = [
  "lnr-eye"
];

library.add(
  faSpinner,
 
);


function boxMullerRandom(n) {
  let phase = true,
    x1=n,
    x2=n,
    w;
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
const tableStyle = {
  border: "none",
  boxShadow: "none",
  textAlign: "center"
};
  const vesseloptions = [];
 
  const scheduleoptions = [
    {  text: 'Hourly', value: 'hourly' },
    {  text: 'Daily', value: 'daily' },
    {  text: 'Every 10 Minutes', value: 'every10minutes' },
    {  text: 'Every 15 Minutes', value: 'every15minutes' }
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
  const getColumnWidth = (rows, accessor, headerText) => {
    const maxWidth = 400
    const magicSpacing = 10
    const cellLength = Math.max(
      ...rows.map(row => (`${row[accessor]}` || '').length),
      headerText.length,
    )
    return Math.min(maxWidth, cellLength * magicSpacing)
  }
  let optionv=[];
  let totaldata=0;
export default class Integrationlist extends Component {
   constructor() {
        super();
        this.config = new Configuration();
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
           totalRows: 0,
           perPage:100,
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
          options55: {},
          series55: [],
          totalbatch:"",
          totalinsert:"",
          totalselect:"",
          totalupdate:"",
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
          insertrule:'',
          compositekey:[],
          wnisha2field:[]
         };
      // this.intghandleClick = this.intghandleClick.bind(this);
      
     this.toggle = this.toggle.bind(this);
     this.runbat = this.runbat.bind(this);
    this.toggleschedule = this.toggleschedule.bind(this);
    this.toggletruncate = this.toggletruncate.bind(this);
     this.runschedule = this.runschedule.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(this);
     this.handleChangedelete=this.handleChangedelete.bind(this);
     this.handleChangetruncate=this.handleChangetruncate.bind(this);
     this.deletetruncatedata=this.deletetruncatedata.bind(this);
     this.handleisactive=this.handleisactive.bind(this);
     this.deletetintegration=this.deletetintegration.bind(this);
     this.toggledelete=this.toggledelete.bind(this);
     this.toggleeditschedule = this.toggleeditschedule.bind(this);
     this.updateschedule = this.updateschedule.bind(this);
     
    }
    handleChangedelete(isintegrationdelete) {
      this.setState({ isintegrationdelete:isintegrationdelete});
     }
     handleChangetruncate(istruncate) {
      this.setState({ istruncate:istruncate });
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

   
async  toggle(event) {
      const idc = event.currentTarget.id;
      if(idc!=""){
      this.setState({
        modal: !this.state.modal
    });
    this.intgoverview(idc);
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
    schedulemodal: !this.state.schedulemodal
});
this.intgoverview(idc);
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
    truncatemodal: !this.state.truncatemodal
});
this.intgoverview(idc);
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
      scheduleeditmodal: !this.state.scheduleeditmodal
  });
this.intgoverview(idc);
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
      async intgoverview(idc){
        let responsetoodata = await axios.get(
          this.config.API_URL+`/api/getIntgsoverview?intgid=${idc}`);
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
                        startDatemodel:responsetoodata.data.results[0].startDate,
                        endDatemodel:responsetoodata.data.results[0].endDate,
                        startDate:responsetoodata.data.results[0].startDate,
                        endDate:responsetoodata.data.results[0].endDate,
                        schedule:responsetoodata.data.results[0].schedule,
                        integid:idc,
                        runtimeid:responsetoodata.data.results[0].runtime_id,
                        insertrule:responsetoodata.data.results[0].insertrule,
                        compositekey:compkey,
                        wnisha2field:sha2
                      });
      }
    async componentDidMount() {
     this.intg();
        // for graph
          // totaldata.forEach(element => {
          //   debugger;
          //   setInterval(
          //     () =>
          //    this.setState({
          //     datagrapharray: this.state.datagrapharray.concat([boxMullerRandom(element.total)]),
          //       }),
          //     200
          //   );
          //   this.state.dataintglist.push(this.state.datagrapharray);
          // });
      
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

 };
    async intghandleClick(event) {
        debugger;
        this.setState({intoverVisible:"block",intlistVisible:"none"})
        const idc = event.currentTarget.id;
        console.log(idc);
        const url = this.config.API_URL+"/api/getIntgsoverview?intgid="+idc;
        const response =await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data =await response.json();
        this.setState({intgoverview: data.results,loadingintglist:false});

        const urlgraph = this.config.API_URL+"/api/getovrgraph?intgid="+idc;
        const responsegraph =await fetch(urlgraph, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const datagraph =await responsegraph.json();
        if(datagraph.results[0].start_date==null)
        {
          datagraph.results[0]={"start_date":"","rows_insert":"0","rows_select":"0","rows_update":"0"}
        }
        debugger;
        let option55={
          chart: {
          height: 10,
          type: "bar",
          sparkline: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: "rounded",
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: datagraph.results[0].start_date.split(','),
        },
        yaxis: {
          title: {
            text: "Data Count",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val ;
            },
          },
        },};
        let serie55=[ {
          name: "Row insert",
          data:datagraph.results[0].rows_insert.split(','),
        },
        {
          name: "Row select",
          data: datagraph.results[0].rows_select.split(','),
        },
        {
          name: "Row Update",
          data:datagraph.results[0].rows_update.split(','),
        }];
       this.setState({series55: serie55,options55:option55,loadingintglist:false});

       const urltotalgraph = this.config.API_URL+"/api/getIntgsoverviewtotal?intgid="+idc;
        const responsetotal =await fetch(urltotalgraph, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const datatotal =await responsetotal.json();
        this.setState({totalbatch: datatotal.results[0].batch_count,
          totalinsert:datatotal.results[0].rows_insert,
        totalselect:datatotal.results[0].rows_select,
        totalupdate:datatotal.results[0].rows_update
        });

        const { perPage } = this.state;
        const databatch =await fetch(this.config.API_URL+`/api/getIntgsbatch?intgid=${idc}&page=1&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responsedata =await databatch.json();
      if(responsedata.success=true){
      this.setState({
        overrviewpagelist: responsedata.results,
        loadingintgoverview: false,
        totalRows: responsedata.total,
        integid:idc
      });}
      else
      {
        this.setState({
        overrviewpagelist:[responsedata.message],
        loadingintgoverview: false,})
      }

      const colum = await axios.get(
        this.config.API_URL+`/api/getcolumn`,
         );
     this.setState({columns:colum.data.results,loadingintgoverview:false});

     
  }

  handlePerRowsChange = async (perPage, page) => {
    this.setState({ loadingintgoverview: true });
    const {integid } = this.state;
    const responseaa = await axios.get(
      this.config.API_URL+`/api/getovrgrid?intgid=${integid}&page=${page}&per_page=${perPage}`,
    );

    this.setState({
        loadingintgoverview: false,
      overrviewpagelist: responseaa.data.results,
      perPage:perPage
    });
  }

  handlePageChange = async page => {
      debugger;
    const { perPage,integid } = this.state;

    this.setState({ loadingintgoverview: true });

    const responsepag = await axios.get(
      this.config.API_URL+`/api/getovrgrid?intgid=${integid}&page=${page}&per_page=${perPage}`,
    );

    this.setState({
        loadingintgoverview: false,
        overrviewpagelist: responsepag.data.results,
        perPage:perPage

    });
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
      });this.intg();
        
    }
    else{
      alert (response.data.message)
    }
  }
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
        schedule:this.state.schedule,
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
        schedule:this.state.schedule,
        insertrule:this.state.insertrule,
        compositekey:this.state.compositekey,
        wnisha2field:this.state.wnisha2field
        }
    }
    const response = await axios.post(this.config.API_URL+'/api/schdulebat',params);
    debugger;
    if(response.data.success=true)
    {
      this.setState({
        showprogressmodel:false,schedulemodal:false
      });
       this.intg();
        
    }
    else{
      alert (response.data.message)
    }
  }
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
    const response = await axios.post(this.config.API_URL+'/api/updateschedler',params);
    debugger;
    if(response.data.success=true)
    {
      this.setState({
        showprogresseditmodel:false,scheduleeditmodal:false
      });
       this.intg();
        
    }
    else{
      alert (response.data.message)
    }
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
        this.intg();
        
          
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
        this.intg();
          
      }else{alert (response.data.message)}
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
            {this.state.loading || !this.state.dataintglist ? (
              <div><Row><Col md="5"></Col>
              <Col md="2">
          <div className="text-all">
          <Loader type="line-scale" size={30}></Loader>
              <p className="mt-2">Please wait............</p>
          </div>
      </Col></Row></div>
            ) : (
              <Row>
              <Col md="12" style={{display:this.state.intlistVisible}}>
              <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="pt-0" style={{textAlign:"center"}}>
                  <ReactTable style={tableStyle}
                  data={dataintglist}
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
                                <Link to={{pathname: `/integration/view?id=${row.row.id}`}} title="overview" className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0">
                                   <i className="lnr-eye icon-gradient bg-happy-fisher"></i></Link>
                                 {/* <Link to={{pathname: `/integration/view?id=${row.row.id}`}} title="overview" className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0">
                                                  <i className="lnr-eye icon-gradient bg-happy-fisher"> </i>
                                </Link> */}
                                {row.row.isschedule===true ?
                                 <Link title="edit" className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" id={row.row.id} onClick={this.toggleeditschedule}>
                                    <i className="lnr-highlight text-newssize icon-gradient bg-happy-fisher"></i></Link>
                                // <Link title="edit" className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" id={row.row.id} onClick={this.toggleeditschedule}>
                                //                   <i className="lnr-highlight icon-gradient bg-happy-fisher"> </i>
                                // </Link>
                                :('')}
                                {row.row.isschedule===true ?
                               <Link style={{ pointerEvents: 'none' }} className="font-icon-wrapper font-icon-sm border-0 p-0"> <i className="lnr-chevron-right-circle text-newsize icon-gradient bg-happy-fisher-disable"></i></Link>
                               :<Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Run" id={row.row.id} onClick={this.toggle}> <i className="lnr-chevron-right-circle text-newsize icon-gradient bg-happy-fisher"></i></Link>
                                }
                               {/* <Button className="buttonallintglist btn-sm" disabled={sch} id={row.row.id} onClick={this.toggle}>Run</Button> */}
                               {row.row.isschedule===true ?
                               <Link style={{ pointerEvents: 'none' }} className="font-icon-wrapper font-icon-sm border-0 p-0"> <i className="lnr-calendar-full text-newsize icon-gradient bg-happy-fisher-disable"></i></Link>
                               :<Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Schedule" id={row.row.id} onClick={this.toggleschedule}> <i className="lnr-calendar-full text-newsize icon-gradient bg-happy-fisher"></i></Link>
                            }
              {/* <Button className="buttonallintglist btn-sm" disabled={sch} id={row.row.id} onClick={this.toggleschedule}>Schedule</Button> */}
              <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 p-0" title="Delete/Truncate all data" id={row.row.id} onClick={this.toggletruncate}> <i className="lnr-trash text-newsize icon-gradient bg-happy-fisher"></i></Link>
             {/* <Button className="buttondelete btn-icon btn-icon-only btn-sm" id={row.row.id} title="delete all data" onClick={this.toggletruncate}>
                    <i className="pe-7s-trash btn-icon-wrapper"> </i>
                  </Button>  */}
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
                       
                          // {
                          //   Header: "Recent loads",
                          //   accessor:"graphdata",
                          //   style: {
                          //     textAlign: "center"
                          //   },
                          //   Cell: (row) => (
                          //     (row.row.total==="0" ?
                          //       <div>No Data</div>:
                          //     <ResponsiveContainer height="100%" width="100%">
                          //     <AreaChart data={row.row.graphdata}> <Tooltip />
                          //       <defs>
                          //         <linearGradient datakey="rows_insert"id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                          //           <stop offset="10%" stopColor="#4f3989" stopOpacity={0.7}/>
                          //           <stop offset="90%" stopColor="#4f3989" stopOpacity={0}/>
                          //         </linearGradient>
                          //       </defs>
                          //       <Area type="monotone"  dataKey="rows_insert" stroke="#ed9521a8" strokeWidth="3"
                          //         fillOpacity={1} fill="url(#colorPv2)"/>
                                  
                          //     </AreaChart>
                          //   </ResponsiveContainer>
                          //     )
                          //      ),width:140
                          // },
//                           {
//                             Header: "Recent loads",
//                             accessor:"graphdata",
//                             style: {
//                               textAlign: "center"
//                             },
//                             Cell: (row) => (
//                               (row.row.total==="0" ?
//                                 <div>No Data</div>:
//                             //  <Sparklines data={this.state.datagrapharray} limit={20}>
//                             //            <SparklinesLine color="#1c8cdc" />
//                             //        <SparklinesSpots />
//                             //    </Sparklines>
// <div>
//                                 <ResponsiveContainer  width="100%" aspect={9.0 / 4.0}>
//                                 <BarChart layout="horizontal" data={row.row.graphdata}>
//                             <Tooltip></Tooltip>
//                                   <Bar layout="horizontal" dataKey="rows_insert" fill="#fece78" shape={<TriangleBar />} 
//                                   label={{ position: "top" }}
//                                   >
//                                     {row.row.graphdata.map((entry, index) => (
//                                       <Cell
//                                         key={`cell-${index}`}
//                                         fill={colors[index % 20]}
//                                       />
//                                     ))}
//                                   </Bar>
//                                 </BarChart>
//                               </ResponsiveContainer>
//                              </div>
      
//                                //   <ResponsiveContainer width="100%">
//                               //   <BarChart data={row.row.graphdata}>
//                               //   <Bar dataKey='rows_insert' fill='#4f3989' stroke='#ed9521' strokeWidth={1} tooltip="test" label dataLabels="rows_insert"/>
                              
//                               //   </BarChart>
//                               // </ResponsiveContainer>
//                               )
//                                ),width:150
//                           },
      
                          {
                            Header: "Total rows loaded",
                            accessor: "name",
                            width: 120,
                            style: {
                              display: "block !important"
                            },
                            Cell:(row)=>(
                              // <div className="text-center text-muted small">
                               <div className="badge badge-lyftronwarning small widget-numbers" title="total rows">
                             
                    <CountUp start={0} end={row.row.total} separator="" decimals={0} decimal="."
                      prefix="" useEasing={false} suffix="" duration="5"/>
                  </div>
                  //</div>
                            ),
                            filterable:true,
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
                            accessor:'isschedule',
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
  //                      {
  //                           Header:"Schedule period",
  //                           accessor:'isschedule',
  //                           width: getColumnWidth(dataintglist, 'schedule', 'Schedule start'),
  //                           style: {
  //                             display: "block !important"
  //                           },
  //                           Cell:(row)=>(
  //                           <div className="d-block text-center text-lyftron small">
  //                           {row.row.isschedule===true ?
  //                           <div> <div title="schedule from"><b><Moment format="YYYY-MMM-DD">{row.row.startDate}</Moment></b></div>
  //                          <div>To</div>
  //                           <div title="schedule end"><b><Moment format="YYYY-MMM-DD">{row.row.startDate}</Moment></b></div>
  //                      </div> 
  //                     :<div><div title="start date"><b><Moment format="YYYY-MMM-DD">{row.row.startDate}</Moment></b></div>
  //                    <div>To</div>
  //                     <div title="end date"><b><Moment format="YYYY-MMM-DD">{row.row.endDate}</Moment></b></div>
  //                     </div>}</div>
  //                           ),
    
  // },
//   {
//     Header:"Schedule end at",
//     accessor:'isschedule',
//     width: getColumnWidth(dataintglist, 'schedule', 'Schedule end'),
//     style: {
//       display: "block !important"
//     },
//     Cell:(row)=>(
//     <div className="d-block text-center text-lyftron small">
//     {row.row.isschedule===true ?
//     <div>
//     <div title="schedule to"><b><Moment format="YYYY-MMM-DD">{row.row.endDate}</Moment></b></div>
// </div> 
// :<div>
// <div title="end date"><b><Moment format="YYYY-MMM-DD">{row.row.endDate}</Moment></b></div>
// </div>}</div>
//     ),
// },
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
                           
                      
                      ),width:120
    
  },
  // {
  //   Header:"Total batches",
  //   accessor:'isschedule',
  //   style: {
  //     display: "block !important"
  //   },
  //   Cell:(row)=>(
  //     <div className="badge badge-lyftronnew small widget-numbers" title="total data">
  //     <CountUp start={0} end={row.row.total} separator="" decimals={0} decimal="."
  //       prefix="" useEasing={false} suffix="" duration="5"/>
  //   </div>
  //   )},
  //   {
  //     Header:"Batch processed",
  //     accessor:'isschedule',
  //     style: {
  //       display: "block !important"
  //     },
  //     Cell:(row)=>(
  //       <div className="badge badge-lyftronnew small widget-numbers" title="total data">
  //       <CountUp start={0} end={row.row.total} separator="" decimals={0} decimal="."
  //         prefix="" useEasing={false} suffix="" duration="5"/>
  //     </div>
  //     )},
  //     {
  //       Header:"Batch pending",
  //       accessor:'isschedule',
  //       style: {
  //         display: "block !important"
  //       },
  //       Cell:(row)=>(
  //         <div className="badge badge-lyftronnew small widget-numbers" title="total data">
  //         <CountUp start={0} end={row.row.total} separator="" decimals={0} decimal="."
  //           prefix="" useEasing={false} suffix="" duration="5"/>
  //       </div>
  //       )},
  {
    Header: "Created at",
    accessor: "name",
    style: {
      display: "block !important"
    },
    Cell:(row)=>(
      <div className="text-center text-lyftron small">
      <div><b><Moment format="YYYY-MMM-DD HH:mm:ss">
         {row.row.createdAt}
       </Moment></b></div></div>
    ),width:120,
    filterable:true,
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
      filterable:true,
    },
    {
      Header: "Status",
      accessor: "lastrunstatus",
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
      ),
    }
      
                           ]}
                    defaultPageSize={5}
                    className="-striped -highlight" />
                </CardBody>
              </Card>
            </Col>
          
          </Row>
              </Col>
             </Row>)}
            
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

                <Modal isOpen={this.state.deleteintgmodal} toggle={this.toggledelete}>
                    <ModalHeader toggle={this.toggledelete}></ModalHeader>
                    
                    <Form>
                     <ModalBody>
                    <label><strong>Do you want to delete selected integration?...</strong></label>
                
                    </ModalBody>
                    <ModalFooter>
                <Row>
                {this.state.showprogressdeletemodel ? ( 
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
    <Col md="4"> <Button className="buttonall" onClick={this.toggledelete}>Cancel</Button></Col> 
    <Col md="6"> <Button className="buttonall ml-2" onClick={this.deletetintegration}>Delete</Button>{' '}</Col>
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


                </div>
                  </Fragment>
            
          
        );
      }
   

}
