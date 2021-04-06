// PersonalDetails.jsx
import React, { Component } from 'react';
import { Form, Button,Icon, Image, Segment, Step } from 'semantic-ui-react';
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';
import Moment from 'react-moment';
import moment from 'moment';
import { throws } from 'assert';
import { Dropdown } from 'semantic-ui-react';
import {
    Row, Col,
    Card, CardBody,
    CardTitle,
    CustomInput, FormGroup, Label
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

<Form className="form-card">
 <Card className="main-card mb-3">
                                <CardBody>
                                <CardTitle><center><h5>Data replication rule</h5></center></CardTitle>
                         
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
            </CardBody></Card>
            <div className="row" >
                <div className="col-md-4"></div>
                <div className="col-md-2">
                <Button className="actionbutton" onClick={this.back}> >>Back</Button></div>
                <div className="col-md-2">
                <Button className="actionbutton" onClick={this.saveAndContinue}>Next>> </Button></div>
                <div className="col-md-4"></div>
                </div>
            
        </Form>
 
        </div>
        )
    }
}

export default Insertdata;