// Confirmation.jsx
import React, { Component } from 'react';
import { Form, Button,Icon, Image, Segment, Step,List } from 'semantic-ui-react';
import {
    Row, Col,
    Card, CardBody,
    CardTitle,
    CustomInput, FormGroup, Label, CardHeader
} from 'reactstrap';
import {
    faSpinner,

} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(
    faSpinner,
   
);

class Confirmation extends Component{
    datasubmit = (e) => {
        e.preventDefault();
        this.props.datahandlesubmit();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { name,source, destination, startDate, endDate,vessels,schedule,showprogressmodel,insertrule }} = this.props;
        const { values } = this.props;
        return(
            <div>
             <Step.Group attached='top'>
      <Step completed>
        <Icon className="share outline" />
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
      <Step completed>
        <Icon className='refresh' />
        <Step.Content>
          <Step.Title>Schedule</Step.Title>
          <Step.Description>Schedule your api</Step.Description>
        </Step.Content>
      </Step>
      <Step completed onClick={this.back}>
        <Icon className='database' />
        <Step.Content>
          <Step.Title>Data Replication</Step.Title>
          <Step.Description>Data replication rule</Step.Description>
        </Step.Content>
      </Step>
      <Step active onClick={this.saveAndContinue}>
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
                                <CardTitle><center><h5>Confirm</h5></center></CardTitle>
                                <center> <p className="mt-3"> Click Confirm if the following details have been correctly entered</p></center>
             
                <Form.Field><label>Integration Name</label>
                <input
                    placeholder='Integration Name'
                    onChange={this.props.handleinputChange('name')}
                    defaultValue={values.name}
                    />
                
               
                </Form.Field>
                <List>
                <List.Item>
                        <List.Icon name='expand arrows alternate' />
                        <List.Content>Name: {name}</List.Content>
                    </List.Item>
                    {/* <List.Item>
                        <List.Icon name='share' />
                        <List.Content>Source: {source}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='share' />
                        <List.Content>Desination: {destination}</List.Content>
                    </List.Item> */}
                    {/* <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>
                            <a href='mailto:jack@semantic-ui.com'>{email}</a>
                        </List.Content>
                    </List.Item> */}
                    <List.Item>
                        <List.Icon name='calendar' />
                        <List.Content>From {startDate} To {endDate} </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='refresh' />
                        <List.Content>Vessel: {vessels}</List.Content>
                    </List.Item>
                    
                    <List.Item>
                        <List.Icon name='refresh' />
                        <List.Content>Schedule: {schedule}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='database' />
                        <List.Content>Insert rule: {insertrule}</List.Content>
                    </List.Item>
                </List>
                </CardBody></Card>
                <div className="row" >
                <div className="col-md-2"></div>
                <div className="col-md-2">
                {showprogressmodel ? ( 
              <Col md="2">
          <div className="text-all">
              <FontAwesomeIcon
                  icon={['fas', 'spinner']}
                  pulse
                  fixedWidth
                  size="2x"
              />
          </div>
      </Col>):('')}</div>
                <div className="col-md-2">
                <Button className="actionbutton" onClick={this.back}>>>Back</Button></div>
                <div className="col-md-2">
                <Button className="actionbutton" onClick={this.datasubmit}>Save </Button></div>
                <div className="col-md-4"></div></div>
                </Form>
         
            </div>
        )
    }
}

export default Confirmation;