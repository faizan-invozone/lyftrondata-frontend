import React from 'react';
import axios from 'axios';
import Loader from "react-loaders";
import ReactTable from "react-table";
import ColumnJson from './columnjson.js';
import Configuration from '../../config/urlconfig';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSpinner,

} from '@fortawesome/free-solid-svg-icons';
import {
  Row, Col
} from 'reactstrap';
import './graph.css';
library.add(
    faSpinner,
   
);

const tableStyle = {
  boxShadow: "none",
  textAlign: "center"
};
  const Circular = () => (
   
    <div style={{ padding: '24px' }}>
      <Loader type="line-scale" size={25} />
    </div>
  );
 
class SampleExpandedComponent extends React.Component {
    constructor(props) {
        debugger;
      super(props);
      this.config = new Configuration();
      this.rowdata=new ColumnJson();
     this.state = {
         rowdata:this.rowdata.rowdatajson,
         batchid:props.batchid,
        overrviewpagelistgrid:[],
        loading:true,
        perPagegrid:10000,
        totalRowsgrid:0,
       };
       }
async componentDidMount() {
    debugger;
  const { perPagegrid } = this.state;
  this.setState({loading:true});
       const responsedata =await axios.get(
        this.config.API_URL+`/api/getovrgrid?intgid=${this.state.batchid}&page=1&per_page=${perPagegrid}`,
       );
         this.setState({
           overrviewpagelistgrid: responsedata.data.results,
           totalRowsgrid: responsedata.data.total,
           loading: false,
         });
        }
        handlePerRowsChange = async (perPagegrid, page) => {
            debugger;
            this.setState({ loadingintgoverviewgrid: true });
            const responseaa = await axios.get(
              this.config.API_URL+`/api/getovrgrid?intgid=${this.state.rowdata.batch_id}&page=${page}&per_page=${perPagegrid}`,
            );
        
            this.setState({
                loading: false,
              overrviewpagelistgrid: responseaa.data.results,
              perPagegrid:perPagegrid
            });
          }
        
          handlePageChange = async page => {
              debugger;
            const { perPagegrid} = this.state;
        
            this.setState({ loading: true });
        
            const responsepag = await axios.get(
              this.config.API_URL+`/api/getovrgrid?intgid=${this.state.rowdata.batch_id}&page=${page}&per_page=${perPagegrid}`,
            );
        
            this.setState({
                loading: false,
                overrviewpagelistgrid: responsepag.data.results,
                perPagegrid:perPagegrid
        
            });
          };
    render () {
      return(
        <div>
{this.state.loading ? (
              <div><Row><Col md="5"></Col>
              <Col md="2">
          <div className="text-all">
          <Loader type="line-scale" size={30}></Loader>
              <p className="mt-2">Please wait............</p>
          </div>
      </Col></Row></div>
            ) : 
   <ReactTable style={tableStyle}
  data={this.state.overrviewpagelistgrid} 
   columns={this.state.rowdata} 
   filterable
   defaultPageSize={10}
  loading={this.state.loading}
  className="-striped -highlight " /> }
        </div>
      )
    }
  }
  export default SampleExpandedComponent;