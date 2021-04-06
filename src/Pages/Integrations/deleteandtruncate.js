import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import Switch from "react-switch";
import { Form,Button} from 'semantic-ui-react';
import Configuration from '../../config/urlconfig';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
 
export default class EditSchedler extends Component {
    constructor(props) {
        super(props);
        this.config = new Configuration();
        this.state = {
          loading:true,
          showprogresstruncatemodel:false,
          integid:this.props.id,
          isintegrationdelete:false,
          istruncate:false
        };
        this.handleChangetruncate=this.handleChangetruncate.bind(this);
        this.handleChangedelete=this.handleChangedelete.bind(this);
        this.deletetruncatedata=this.deletetruncatedata.bind(this);
    }
  handleChangetruncate(istruncate) {
    this.setState({ istruncate:istruncate });
   }
   handleChangedelete(isintegrationdelete) {
    this.setState({ isintegrationdelete:isintegrationdelete});
   }
   async deletetruncatedata()
   {
     debugger;
     var deletee=this.state.isintegrationdelete;
     var truncatee=this.state.istruncate;
     let params={
       integration_id:this.state.integid,
       }
     if(deletee==true)
     {
       this.setState({
         showprogresstruncatemodel:true
       });
       const response = await axios.post(this.config.API_URL+'/api/deletedataintegration',params);
       debugger;
       if(response.data.success=true)
       { this.setState({
           truncatemodal:false,showprogresstruncatemodel:false
         });
         window.location.reload(); 
       }
       else{
         alert (response.data.message)
       }
 
     }
     if(truncatee==true)
     {
       this.setState({
         showprogresstruncatemodel:true
       });
       const response = await axios.post(this.config.API_URL+'/api/truncatedata',params);
       if(response.data.success=true)
       {
         this.setState({
           truncatemodal:false,showprogresstruncatemodel:false
         });
         window.location.reload();
       }else{alert (response.data.message)}
     }
   }
  render() {
    return(
      <div >
     <div className="text-center">
             <div className="text-center mb-3">
      <i className="pe-7s-shuffle" style={{fontSize:'5rem',color:'#4f3989'}}></i>
      <h5 className="mt-2">Delete/Truncate</h5> 
      <h6>Integrations are apps and databases that you can use to 
<br></br>send data through your pipeline.</h6>
      </div>
                    <Form>
                    <label><strong>Do you want to delete data of this integration?...</strong></label>
                  <Switch onChange={this.handleChangedelete} checked={this.state.isintegrationdelete} />
                 <br></br><strong>or</strong><br></br>
                 <label className="mt-2"><strong>Do you want to truncate all data?...</strong></label>
                  <Switch onChange={this.handleChangetruncate} checked={this.state.istruncate} />
               
                  <Row>
           <Col md="4"></Col>
           <Col md="4" className="pull-right">
         {this.state.showprogresstruncatemodel ? ( 
            
   <div className="text-all pull-right mt-3">
       <FontAwesomeIcon
           icon={['fas', 'spinner']}
           pulse
           fixedWidth
           size="2x"
       />
   </div>):('')}</Col> <Col md="4"> <Button  className="ui button btn-shadow float-right btn-wide btn-pill btn-outline-2x btn mt-3 mb-3 mr-4" style={{color:'#66529C',backgroundColor:'#fff',border:'1px solid #66529C'}} onClick={this.deletetruncatedata}>Delete/Truncate </Button>
</Col>
</Row>
          
                    </Form></div>
              
</div> );
        
  }
}
