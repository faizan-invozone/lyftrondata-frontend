import React, {Component, Fragment} from 'react';
import Addform from '../multisteps/index.js';
import Listform from '../Integrationlist/index.js';
import {
    Row, Col,
    Button,
} from 'reactstrap';


export default class Integrationlist extends Component {
    state = {
        showForm: false,
        listForm:true
      };
      showForm = () => {
        return (
          <div> 
     
             <Addform></Addform>
           </div>
          );
      }
      listForm = () => {
        return (
          <div> 
             <Listform></Listform>
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
                       <i className="pe-7s-shuffle opacity-6"></i></div>
                       <div>Integration<div className="page-title-subheading">Integrations are apps and databases that you can use to send data through your pipeline.
                       </div></div>
                        
                         </div>
                        <div className="page-title-actions">
                        <Button onClick={() => this.setState({showForm: true,listForm:false}) } className="mb-2 mr-2 buttonall"><i className="pe-7s-plus p-1"></i>ADD INTEGRATION</Button>
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
