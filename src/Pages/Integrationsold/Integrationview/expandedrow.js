import React from 'react';
import axios from 'axios';
import Loader from "react-loaders";
import ReactTable from "react-table";
import ColumnJson from './columnjson.js';
//import DataTable,{ createTheme } from 'react-data-table-component';
import Configuration from '../../../config/urlconfig';
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSpinner,

} from '@fortawesome/free-solid-svg-icons';
import {
  Row, Col
} from 'reactstrap';
import '../Integrationlist/graph.css';
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
        //pages:0,
        overrviewpagelistgrid:[],
        loading:true,
        perPagegrid:10000,
        totalRowsgrid:0,
       };
       } 
// getTestData(page, pageSize, sorted, filtered, handleRetrievedData) {
//   const idc=this.state.batchid;
//   let url = this.config.API_URL+"/api/getovrgridoffset";
//   debugger;
//   let postObject = {
//       page: page,
//       pageSize: pageSize,
//       sorted: sorted,
//       filtered: filtered,
//       intgid:idc
//   }; 
//   debugger;
//   return this.post(url, postObject).then(response => handleRetrievedData(response)).catch(response => console.log(response));
// }
// post(url, params = {}) {
//  debugger;
//   return axios.post(url, params)
// }
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
    //   let loadingwholedata=[];
    //   loadingwholedata=this.state.overrviewpagelistgrid;
      return(
        <div>
             {/* <DataTable className="align-middle m-3 table1 border table-borderless table-striped table-hover"
    title="Job Data List"
    columns={wnicolumns}
    data={this.state.overrviewpagelistgrid}
    progressPending={this.state.loadingintgoverviewgrid}
    progressComponent={<Circular />}
    pagination
    paginationServer
    responsive
    paginationTotalRows={this.state.totalRowsgrid}
    onChangeRowsPerPage={this.handlePerRowsChange}
    onChangePage={this.handlePageChange}
    customStyles={customStyles}
  /> */}
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
  //  showPagination={true}
  //  showPaginationTop={false}
  //  showPaginationBottom={true}
  //  sortable={false}
  //  pageSizeOptions={[5, 10, 20, 25, 50, 100]}
  //  manual
  //  pages={this.state.pages}
  //  onFetchData={(state, instance) => {
  //     this.setState({loading: true});
  //   this.getTestData(state.page, state.pageSize, state.sorted, state.filtered, (res) => {
  //     debugger;
  //   this.setState({
  //      overrviewpagelistgrid: res.data.results,
  //          pages: res.data.pages,
  //           loading: false
  //   })
  // });
  // }}
                   className="-striped -highlight " />
 }
        </div>
      )
    }
  }
  export default SampleExpandedComponent;