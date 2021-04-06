import React, {Component, Fragment} from 'react'
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {
    faSpinner,

} from '@fortawesome/free-solid-svg-icons';
import {
    Row, Col,
    Card, CardBody,Button
} from 'reactstrap';
import Configuration from '../../../config/urlconfig';
import '../../Integrations/graph.css';
import axios from 'axios';
import avtarimage from '../../Integrations/components/image/KoichiTsuji.png';
import ReactTable from "react-table"; 
library.add(
    faSpinner,
   
);

const tableStyle = {
    border: "none",
    boxShadow: "none",
    textAlign: "center"
  };
export default class Apilist extends Component {
    constructor(){
        super();
        this.config = new Configuration();
        this.state = {
        loading: true,
        api: [],
        pages: 0
      };
    }

    dataoverview = (e) => {
        e.preventDefault();
        this.props.datahandlesubmit();
    }
    getTestData(page, pageSize, sorted, filtered, handleRetrievedData) {
        let url = this.config.API_URL+"/api/apisoffset";
        debugger;
        let postObject = {
            page: page,
            pageSize: pageSize,
            sorted: sorted,
            filtered: filtered,
        }; 
        debugger;
        return this.post(url, postObject).then(response => handleRetrievedData(response)).catch(response => console.log(response));
    }
    post(url, params = {}) {
       
        return axios.post(url, params)
    }
    
    render() {
    //     const persons = this.state.person.map((item, i) => (
    //       <tr>
    //         <td className="text-center text-muted">{i+1}</td>
    //         <td>
    //           <div className="widget-content p-0">
    //               <div className="widget-content-wrapper">
    //                   <div className="widget-content-left mr-3">
    //                       <div className="widget-content-left">
    //                           <img width={40} className="rounded-circle" src={item.logoimage} alt="Avatar" />
    //                       </div>
    //                   </div>
    //                   <div className="widget-content-left flex2">
    //                       <div className="widget-heading">{item.type}</div>
    //                       <div className="widget-subheading opacity-7">{item.plan}</div>
    //                   </div>
    //               </div>
    //           </div>
    //       </td>
    //          <td className="text-muted">{item.name}</td>
           
         
          
    //     <td className="text-center">
    //     <div className="badge badge-info">{item.version}</div>
    //       </td>
    //       <td>  <Moment format="YYYY-MMM-DD">
    //            {item.createdAt}
    //         </Moment></td>
    //         <td>
    //            {item.createdby}
    //          </td>
    //       <td className="text-center">
    //     <div className="badge badge-success">{item.status}</div>
    //       </td>
    //       <td className="text-center">
              
    //           <button type="button" className="btn buttonall btn-sm" onClick={this.dataoverview}>View</button>
    //       </td>
    //   </tr>
      
    //  ));
        return (
          
                <Fragment>
                <div>
                <Row>
            <Col md="12">
              <Card className="main-card mb-3">
                <CardBody className="pt-0 text-lyftron" style={{textAlign:"center"}}>
            <ReactTable style={tableStyle}
        pages={this.state.pages}
        columns={[
          {
            Header: "Actions",
            accessor: "id",
            style: {
              display: "block !important"
            },
            Cell: (row) => (
           <div>
             <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 " title="delete"> <i className="lnr-trash text-size icon-gradient bg-happy-fisher"> </i></Link>
             <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0" title="view"> <i className="lnr-eye icon-gradient bg-happy-fisher"> </i></Link>
             {/* <Link title="view" className="btn buttonallintglist btn-sm">View</Link>
<Link title="view" className="btn ml-2 buttonallintglist btn-sm">Delete</Link> */}
              </div>
           
            ), 
            filterable:false
          },
//     {
//           Header: "Connector",
//           accessor:"name",
          
//           style: {
//             display: "block !important",
//           textAlign: "center !important"
//           },
//           Cell: (row) => (
//             <div className="widget-content p-0">
//                        <div className="widget-content-wrapper">
//                            <div className="widget-content-left mr-3">
//                                <div className="widget-content-left">
//                               <img width={30} className="rounded-circle" src={row.row.logoimage} alt="Avatar" />
//                               </div>
//                        </div>
//                            <div className="widget-content-left flex2">
//                                  <div className="widget-heading">{row.row.type}</div>
//                                    <div className="widget-subheading opacity-7">{row.row.plan}</div>
//                                </div>
//                            </div>
//                   </div>
// ), filterable:false
//          },
         {
Header: "Connector",
accessor:"name",
Cell: (row) => (
  <div className="widget-content" style={{padding:"0.5rem"}}>
  <img width={30} className="rounded-circle" src={row.row.logoimage} alt="Avatar" /> 
  <div className="widget-heading small"><b>{row.row.name}</b></div>
</div>
),
filterable:false,
style: {
display: "block !important"
}
},
{
  Header: "Category",
  accessor: "type",
  filterable:false,
  style: {
  display: "block !important"
  },
  Cell:(row)=>(
    <div className="widget-content p-0">
    <div className="widget-content-wrapper">
    <div className="widget-content-left flex2">
    <div className="widget-heading">{row.row.type}</div></div></div></div>)
  },
{
Header: "Version & Plan",
accessor: "version",
filterable:false,
style: {
display: "block !important"
},
Cell:(row)=>(
  <div>
   <div className="badge badge-lyftronwarning small widget-numbers" title="Vesion">
 {row.row.version}
</div>
<div className="widget-content mt-1">
    <div className="widget-content-wrapper">
    <div className="widget-content-left flex2">
    <div className="widget-heading">{row.row.plan}</div></div></div></div>
</div>)
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
filterable:false,
},
{
    Header: 'Created at',
   accessor: 'createdat',
   style: {
    display: "block !important"
  },
  Cell:(row)=>(
    <div className="text-center text-lyftron small">
    <div><b><Moment format="YYYY-MMM-DD HH:mm:ss">
       {row.row.createdat}
     </Moment></b></div></div>
  ),
  filterable:true,
 },
 {
  Header: "Updated at",
  accessor: "updatedat",
  style: {
    display: "block !important"
  },
  Cell:(row)=>(
    <div className="text-center text-lyftron small">
    <div><b><Moment format="YYYY-MMM-DD hh:mm:ss">
       {row.row.updatedat}
     </Moment></b></div></div>
  ),
  filterable:true,
},
 {
    Header: 'Status',
   accessor: 'status',
   style: {
    display: "block !important"
  },
  Cell:(row)=>(
     <div title="previous run status" className="badge badge-lyftron small"> {row.row.status}</div>
  ),
   filterable:false
 },
{accessor:"logoimage",show:false},
{accessor:"type",show:false},
{accessor:"plan",show:false}
           ]}
        data={this.state.api}
        filterable
        defaultPageSize={5}
                             className="-striped -highlight"
                             loading={this.state.loading}
                             showPagination={true}
                             showPaginationTop={false}
                             showPaginationBottom={true}
                             sortable={true}
                             pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                             manual
                             onFetchData={(state, instance) => {
                                
                                     this.setState({loading: true});
                                     this.getTestData(state.page, state.pageSize, state.sorted, state.filtered, (res) => {
                                     this.setState({
                                        api: res.data.results,
                                            pages: res.data.pages,
                                             loading: false
                                     })
                             });}}
        />
         </CardBody></Card>
        </Col>
        </Row>
                    </div>
                </Fragment>
            
          
        );
      }
   

}
