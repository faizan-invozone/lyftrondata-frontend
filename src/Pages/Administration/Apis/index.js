import React, {Component, Fragment} from 'react';
import Addform from './Addapi.js';
import Listform from './listform.js';

import {
    Row, Col,
    Button
} from 'reactstrap';
export default class Sourcelist extends Component {
    state = {
        showForm: false,
        listForm:true
      };
      showForm = () => {
        return (
          <div> 
         <form id= "add-app">
     
             <Addform></Addform>
           </form>
           </div>
          );
      }
      listForm = () => {
        return (
          <div> 
              <form id= "List-app">
             <Listform></Listform>
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
                       <i className="pe-7s-graph1 opacity-6"></i></div>
                       <div>Connector<div className="page-title-subheading">Every integration you add comes with seven days of free data replication.
                       </div></div>
                        
                         </div>
                        <div className="page-title-actions">
                       
                        <Button onClick={() => this.setState({showForm: true,listForm:false}) } className="mb-2 mr-2 buttonall"><i className="pe-7s-plus p-1"></i>ADD CONNECTOR</Button>
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
            
          
        );
      }
   
}
