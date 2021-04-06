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

class PersonalDetails extends Component{
 


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
      <Step onClick={this.back} completed>
      <Icon className="share alternate"/>
        <Step.Content>
          <Step.Title>Connection</Step.Title>
          <Step.Description>Choose your connection</Step.Description>
        </Step.Content>
      </Step>
      {/* <Step>
        <Icon className='thumbs up outline' />
        <Step.Content>
          <Step.Title>Choose metadata</Step.Title>
          <Step.Description>Choose your metadata</Step.Description>
        </Step.Content>
      </Step> */}
      <Step active>
        <Icon className='refresh' />
        <Step.Content>
          <Step.Title>Schedule</Step.Title>
          <Step.Description>Schedule your api</Step.Description>
        </Step.Content>
      </Step>
      <Step onClick={this.saveAndContinue}>
        <Icon className='database' />
        <Step.Content>
          <Step.Title>Data Replication</Step.Title>
          <Step.Description>Data replication rule</Step.Description>
        </Step.Content>
      </Step>
      <Step>
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
                                <CardTitle><center><h5>Schedule</h5></center></CardTitle>
                                <Row>
                                  <Col md="6">
                                  <Form.Field>
            <label>Start Date</label>
<DateInput
          name="startDate"
          placeholder="Date"
          value={values.startDate}
          dateFormat='YYYY-MM-DD'
          iconPosition="left"
          onChange={this.props.handleChange}
        />
</Form.Field> 

                                  </Col>
                                  <Col md="6">
                                  <Form.Field>
            <label>End Date</label>
<DateInput
          name="endDate"
          placeholder="Date"
          value={values.endDate}
          dateFormat='YYYY-MM-DD'
          iconPosition="left"
          onChange={this.props.handleChange}
        />
</Form.Field> 
  
                                  </Col>
                                </Row>
          <Row>
            <Col md="6">
            <Form.Field>
            <label>Vessel</label>
               <Dropdown  name='vessels'
            onChange={this.props.handleselectallChange}
            value={values.vessels}
            options={values.data}
            placeholder='Choose vessels'
            
            selection multiple search fluid
          />
            </Form.Field>
            </Col>
        
        
        
            <Col md="6">
            <Form.Field>
            <label>Schedule</label>
               <Dropdown  name='schedule'
            onChange={this.props.handleChange}
            value={values.schedule}
            options={values.dataschedule}
            placeholder='Choose schedule type'
            selection search
          />
            </Form.Field>
            </Col>
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

export default PersonalDetails;