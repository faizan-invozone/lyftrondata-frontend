import React, {Component, Fragment} from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSpinner,

} from '@fortawesome/free-solid-svg-icons';
import {
    Row, Col,
    Button,
    CardBody,Card,
    Progress
} from 'reactstrap';
import Configuration from '../../../config/urlconfig';
import '../../Integrations/graph.css';
import axios from 'axios';
import ReactTable from "react-table";
import avtarimage from '../../Integrations/components/image/KoichiTsuji.png';
library.add(
    faSpinner,
   
);
const tableStyle = {
    border: "none",
    boxShadow: "none",
    textAlign: "center"
  };
export default class ConnectionListform extends Component {
    constructor(){
        super();
        this.config = new Configuration();
        this.state = {
        loading: true,
        conlist: [],
        pages:0
      };
    }
    // async componentDidMount() {
    //     const url = this.config.API_URL+"/api/cons"
    //     const response = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     const data = await response.json();
    //     this.setState({ conlist: data.result, loading: false })
    // }

    getTestData(page, pageSize, sorted, filtered, handleRetrievedData) {
        let url = this.config.API_URL+"/api/consoffset";
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
        const connections = this.state.conlist.map((item, i) => (
            <tr>
            <td className="text-center text-muted">{i+1}</td>
            <td>{item.name}</td>
            <td>
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                            <div className="widget-content-left">
                                <img width={30} className="rounded-circle" src={item.logoimage} alt="Avatar" />
                            </div>
                        </div>
                        <div className="widget-content-left flex2">
                            <div className="widget-heading">{item.apiname}</div>
                            <div className="widget-subheading opacity-7">{item.type}</div>
                        </div>
                    </div>
                </div>
            </td>
            <td>  <Moment format="DD-MMM-YYYY">
               {item.createdAt}
            </Moment></td>
            <td>
               {item.createdby}</td>
            <td className="text-center">
        <div className="badge badge-success">{item.status}</div>
            </td>
            <td className="text-center">
                <button type="button" className="btn buttonall btn-sm"><i className="eye">View</i></button>
            </td>
        </tr>
      
     ));
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
               </div> ), 
                filterable:false
              },
              {
                Header: "Name",
                accessor:"name",
                Cell: (row) => (
                  <div className="widget-content" style={{padding:"0.5rem"}}>
                  <div className="widget-heading"><b>{row.row.name}</b></div>
                </div>
                ),
                filterable:false,
                style: {
                display: "block !important"
                }
                },
              {
                Header: "Provider",
                accessor:"name",
                Cell: (row) => (
                  <div className="widget-content" style={{padding:"0.5rem"}}>
                  <img width={30} className="rounded-circle" src={row.row.logoimage} alt="Avatar" /> 
                  <div className="widget-heading small"><b>{row.row.apiname}</b></div>
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
// {
//     Header: "Api",
//     accessor:"name",
    
//     style: {
//       display: "block !important",
//     textAlign: "center !important"
//     },
//     Cell: (row) => (
//       <div className="widget-content p-0">
//                  <div className="widget-content-wrapper">
//                      <div className="widget-content-left mr-3">
//                          <div className="widget-content-left">
//                         <img width={30} className="rounded-circle" src={row.row.logoimage} alt="Avatar" />
//                         </div>
//                  </div>
//                      <div className="widget-content-left flex2">
//                            <div className="widget-heading">{row.row.apiname}</div>
//                              <div className="widget-subheading opacity-7">{row.row.type}</div>
//                          </div>
//                      </div>
//             </div>
// ), filterable:false
//    },
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
{accessor:"apiname",show:false}
           ]}
        data={this.state.conlist}
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
                                        conlist: res.data.results,
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
