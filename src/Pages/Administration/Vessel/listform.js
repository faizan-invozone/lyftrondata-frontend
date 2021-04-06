import React, {Component, Fragment} from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import ReactTable from "react-table"; 
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {
    Row, Col,
    Card,CardBody
} from 'reactstrap';  
import Configuration from '../../../config/urlconfig';
import '../../Integrations/graph.css';
import avtarimage from '../../Integrations/components/image/KoichiTsuji.png';
library.add(
    faSpinner
   );
const tableStyle = {
    border: "none",
    boxShadow: "none",
    textAlign: "center"
  };
export default class vessellist extends Component {
    constructor() {
        super();
        this.config = new Configuration();
        this.state = {
            loading: true,
            vessel: [],
            pages: 0
          };
    }
    
        // const url = this.config.API_URL+"/api/vesselsoffset"
        // const response = await fetch(url, {
        //     method: 'post',
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // });
        // const data = await response.json();
        // this.setState({ person: data.result, loading: false })
    
    getTestData(page, pageSize, sorted, filtered, handleRetrievedData) {
        let url = this.config.API_URL+"/api/vesselsoffset";
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
       
        return axios.post(url, params)
    }
    
    render() {
    //     const persons = this.state.person.map((item, i) => (
    //       <tr>
    //         <td className="text-center text-muted">{i+1}</td>
    //        <td></td>
    //          <td className="text-muted">{item.name}</td>
           
         
          
    //     <td className="text-center">
    //     <div className="badge badge-info">{item.number}</div>
    //       </td>
    //       <td>  <Moment format="YYYY-MMM-DD">
    //            {item.createdAt}
    //         </Moment></td>
    //         <td>
    //            {item.createby}
    //     </td>
    //       <td className="text-center">
    //     <div className="badge badge-success">{item.status}</div>
    //       </td>
    //       {/* <td className="text-center">
    //           <button type="button" className="btn buttonall btn-sm">View</button>
    //       </td> */}
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
             <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0" title="edit"> <i className="lnr-highlight icon-gradient bg-happy-fisher"> </i></Link>
             <Link className="font-icon-wrapper text-lyftron font-icon-sm border-0 " title="delete"> <i className="lnr-trash text-size icon-gradient bg-happy-fisher"> </i></Link>
             
           </div> ), 
            filterable:false
          },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Number',
              accessor: 'number',
              style: {
                display: "block !important"
              },
              Cell:(row)=>(
                 <div className="badge badge-lyftronwarning small widget-numbers" title="Vessel number">
               {row.row.number}
    </div>)
            },
            {
              Header: "Created by",
              accessor:"createby",
              style: {
                display: "block !important"
              },
              Cell: (row) => (
                  <div className="widget-content" style={{padding:"0.5rem"}}>
                  <img width={30} className="rounded-circle" src={avtarimage} alt="Avatar" /> 
                  <div className="widget-heading small"><b>{row.row.createby}</b></div>
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
             }
           ]}
        data={this.state.vessel}
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
                                        vessel: res.data.results,
                                            pages: res.data.pages,
                                             loading: false
                                     })
                             });
                            }}
        />
         </CardBody></Card>
        </Col>
        </Row>

                  </div>
                </Fragment>
            
          
        );
      }
   

}
