import React, { Fragment,Component } from "react";
import Configuration from '../../config/urlconfig.js';
import axios from 'axios';
import './graph.css';
import {CardBody} from "reactstrap";
import ReactTable from "react-table";
export default class FailureList extends Component {
    constructor(props) {
        debugger;
        super(props);
        this.config = new Configuration();
       this.state = {
        rowdata:props.data,
        integid:props.id,
        perPage:10000,
        totalRows:0,
        overrviewpagelist:[],
        columns:[],
        loadingintgoverview:true,
         };
    }
async componentWillMount()
{
    debugger;
    const idc=this.state.integid;
    const { perPage } = this.state;
        const databatch =await fetch(this.config.API_URL+`/api/getfailedbatch?intgid=${idc}&page=1&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responsedata =await databatch.json();
      if(responsedata.success===true){
        debugger;
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
  render() {
    const { overrviewpagelist } = this.state;

    return (
      <Fragment>
          <div>
          </div>
                <CardBody>
               
                  <ReactTable data={overrviewpagelist} columns={[
  {
    Header: "Batch_id",
    accessor: "batch_id",
    style: {
      textAlign: "center"
    },
  },
      {
        Header: "Start at",
        accessor: "startdate",
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "End at",
        accessor: "enddate",
        style: {
          textAlign: "center"
        }
      },
      {
        Header: "Vessel",
        accessor: "vessel",
        style: {
          textAlign: "center"
        },
      },
      {
        Header: "Data",
        accessor: "data",
        style: {
          textAlign: "center",
          overflow: 'auto',
          textOverflow: 'clip'
        },
        
      },
      
  {
    Header: "Start batch at",
    accessor: "starttime",
    style: {
      textAlign: "center"
    }
  },{
    Header: "Error",
    accessor: "errmessage",
    style: {
      textAlign: "center",
      overflow: 'auto',
      textOverflow: 'clip'
    },
  },
  {
    Header: "Whole Error",
    accessor: "errormessage",
    style: {
      textAlign: "center",
      overflow: 'auto',
      textOverflow: 'clip'
    },
  },
      {
        Header: "Status",
        accessor: "status",
        style: {
          textAlign: "center",
          "text-transform":"capittilize"
        }
      },

]} 
                  
                  defaultPageSize={5}
                    filterable
                     className="-striped -highlight"/>
                </CardBody>
              {/* </Card>
            </Col>
          </Row> */}
      
      </Fragment>
    );
  }
}
