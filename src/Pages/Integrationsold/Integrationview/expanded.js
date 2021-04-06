import React, { Fragment,Component } from "react";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import Configuration from '../../../config/urlconfig.js';
import Expandedrow from './expandedrow.js';
import axios from 'axios';
import '../Integrationlist/graph.css';
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap";

import ReactTable from "react-table";
import { transform } from "ol/proj";
// const columns = ;

export default class DataTableCustomComps extends Component {
    constructor(props) {
        debugger;
        super(props);
        this.config = new Configuration();
       this.state = {
        rowdata:props.data,
        integid:props.id,
        overrviewpagelist:[],
        columns:[],
        loading:true,pages: 0,
         };
    }
async componentWillMount()
{
    // const idc=this.state.integid;
    // const { perPage } = this.state;
    //     const databatch =await fetch(this.config.API_URL+`/api/getIntgsbatch?intgid=${idc}&page=1&per_page=${perPage}`, {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    //     const responsedata =await databatch.json();
    //   if(responsedata.success===true){
    //     debugger;
    //   this.setState({
    //     overrviewpagelist: responsedata.results,
    //     loadingintgoverview: false,
    //     totalRows: responsedata.total,
    //     integid:idc
    //   });}
    //   else
    //   {
    //     this.setState({
    //     overrviewpagelist:[responsedata.message],
    //     loadingintgoverview: false,})
    //   }

      const colum = await axios.get(
        this.config.API_URL+`/api/getcolumn`,
         );
     this.setState({columns:colum.data.results,loadingintgoverview:false});

}

getTestData(page, pageSize, sorted, filtered, handleRetrievedData) {
  const idc=this.state.integid;
  let url = this.config.API_URL+"/api/Intgsbatchoffset";
  debugger;
  let postObject = {
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filtered: filtered,
      intgid:idc
  }; 
  debugger;
  return this.post(url, postObject).then(response => handleRetrievedData(response)).catch(response => console.log(response));
}
post(url, params = {}) {
 debugger;
  return axios.post(url, params)
}
  render() {

    return (
      <Fragment>
          <div>
          </div>
          {/* <Row>
            <Col md="12">
            
              <Card className="main-card mb-3">
              <CardHeader><Tabs tabsWrapperClass="body-tabs body-tabs-layout body-tabs-small" transform={false}
            showInkBar={true} items={getTabs()}/> </CardHeader> */}
                <CardBody>
               
                  <ReactTable  
                  columns={[
  {
    Header: "Batch_id",
    accessor: "batch_id",
    style: {
      textAlign: "center"
    },
    width:150
  },
      {
        Header: "Start at",
        accessor: "startdate",
        filterable:false,
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "End at",
        accessor: "enddate",
        filterable:false,
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "Vessels",
        accessor: "vessels",
        filterable:false,
        style: {
          textAlign: "center",
          overflow: 'auto',
          textOverflow: 'clip'
        },
      },
      {
        Header: "Rows selected",
        accessor: "rows_select",
        filterable:false,
        style: {
          textAlign: "center"
        },
      },
      {
        Header: "Rows inserted",
        accessor: "rows_insert",
        filterable:false,
        style: {
          textAlign: "center"
        },
      },
      
  {
    Header: "Start batch at",
    accessor: "starttime",
    filterable:false,
    style: {
      textAlign: "center"
    },
    width:150
  },
  {
    Header: "End batch at",
    accessor: "endtime",
    filterable:false,
    style: {
      textAlign: "center"
    },
    width:150
  },
      {
        Header: "Status",
        accessor: "status",
        filterable:false,
        style: {
          textAlign: "center",
          "text-transform":"capittilize"
        }
      },

]}  defaultPageSize={5}
pages={this.state.pages}
data={this.state.overrviewpagelist}
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
    
    overrviewpagelist: res.data.results,
         pages: res.data.pages,
          loading: false
  })
});
}}                 
  SubComponent={(row) => {
                      return (
                        <div style={{ padding: "15px" }}>
                          <span className="mb-2"><strong>Preview data</strong> </span>
                          <Expandedrow wnicolumn={this.state.columns} batchid={row.original.integration_id}></Expandedrow>
                        </div>
                      );
                    }}
                    className="-striped -highlight"/>
                </CardBody>
              {/* </Card>
            </Col>
          </Row> */}
      
      </Fragment>
    );
  }
}
