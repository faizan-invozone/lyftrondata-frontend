import React, {Component, Fragment} from 'react';
import AddConnection from '../AddConnection/index.js';
import ConnectionList from '../ConnectionList/index.js';

import {
    Row, Col,
    Button,
} from 'reactstrap';

export default class Connection extends Component {
    state = {
        showForm: false,
        listForm:true
      };
      showForm = () => {
        return (
          <div> 
         <form id= "add-app">
     
             <AddConnection></AddConnection>
           </form>
           </div>
          );
      }
      listForm = () => {
        return (
          <div> 
              <form id= "List-app">
             <ConnectionList></ConnectionList>
             </form>
           </div>
          );
      }
 

    render() {

        return (
            <Fragment>
                    <div>
                    <div className="app-page-title">
               <div className="page-title-wrapper">
                   <div className="page-title-heading">
                        <div className="page-title-icon">
                       <i className="pe-7s-repeat opacity-6"></i></div>
                       <div>Connection<div className="page-title-subheading">Every connection you add comes with seven days of free data replication.
                       </div></div>
                        
                         </div>
                      <div className="page-title-actions">
                        <Button onClick={() => this.setState({showForm: true,listForm:false}) } className="mb-2 mr-2 buttonall"><i className="pe-7s-plus p-1"></i>ADD CONNECTION</Button>
                        </div>
                        </div></div>
                        <Row>
                  
                  <Col md="12">
                  {this.state.showForm ? this.showForm() : null}
                  {this.state.listForm ? this.listForm() : null}
    
                  </Col>
              </Row>
                    </div>
            </Fragment>
        )
    }
}
