// PersonalDetails.jsx
import React, { Component } from 'react';
import { Form, Button,Icon, Step } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import {
    Row, Col
} from 'reactstrap';

class Insertdata extends Component{
 


  saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }
  
    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }
    render(){
        const { values } = this.props
        return(
          <div>
          <Step.Group attached='top'>
      <Step completed>
      <Icon className="share alternate"/>
        <Step.Content>
          <Step.Title>Connection</Step.Title>
          <Step.Description>Choose your connection</Step.Description>
        </Step.Content>
      </Step>
      <Step onClick={this.back} completed>
        <Icon className='refresh' />
        <Step.Content>
          <Step.Title>Schedule</Step.Title>
          <Step.Description>Schedule your api</Step.Description>
        </Step.Content>
      </Step>
      <Step active>
        <Icon className='database' />
        <Step.Content>
          <Step.Title>Data Replication</Step.Title>
          <Step.Description>Data replication rule</Step.Description>
        </Step.Content>
      </Step>
      
      <Step onClick={this.saveAndContinue}>
        <Icon className='thumbs up outline' />
        <Step.Content>
          <Step.Title>Confirm</Step.Title>
          <Step.Description>Review your selection</Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>

<Form className="pt-3">
                         
          <Row>
            <Col md="6">
            <Form.Field>
            <label>Replication rule</label>
               <Dropdown  name='insertrule'
            onChange={this.props.handleChange}
            value={values.insertrule}
            options={values.datainsertoption}
            placeholder='Choose insert data type'
            selection search
          />
            </Form.Field>
            </Col>
            {values.insertrule=='Scd false update'
            ?
                <Col md="6">
                <Form.Field>
                <label>Composite key</label>
                   <Dropdown  name='compositekey'
                onChange={this.props.handleselectallChange}
                value={values.compositekey}
                options={values.datainsertselectedchange}
                placeholder='Choose composite key'
                selection multiple search fluid
              /></Form.Field>
                </Col>
            :('')}
           {values.insertrule=='Scd true update'
            ?<Col md="6">
                <Form.Field>
                <label>Composite key</label>
                   <Dropdown  name='compositekey'
                onChange={this.props.handleselectallChange}
                value={values.compositekey}
                options={values.datainsertselectedchange}
                placeholder='Choose composite key'
                selection multiple search fluid
              /></Form.Field>
                </Col>:('')}
                {values.insertrule=='Scd true update'
            ?
                 <Col md="12">
                 <Form.Field>
                 <label>Trigger fields</label>
                    <Dropdown  name='wnisha2field'
                 onChange={this.props.handleselectallChange}
                 value={values.wnisha2field}
                 options={values.sha2fieldvalueoption}
                 placeholder='Choose trigger fields'
                 selection multiple search fluid
               /></Form.Field>
                 </Col>
          
            :('')}
        
          </Row>
       <div></div>
     <div></div>               
     <Button  className="btn-shadow float-left btn-wide btn-pill btn-outline-2x btn mt-3 mb-3 ml-4" style={{color:'#66529C',backgroundColor:'#fff',border:'1px solid #66529C'}} onClick={this.back}>
              Previous
            </Button>
            <Button Active  className="btn-shadow float-right btn-wide btn-pill btn-outline-2x btn mt-3 mb-3 mr-4" style={{color:'#66529C',backgroundColor:'#fff',border:'1px solid #66529C'}}
               onClick={this.saveAndContinue}>Next
            </Button> 
              
        </Form> </div>
        )
    }
}

export default Insertdata;