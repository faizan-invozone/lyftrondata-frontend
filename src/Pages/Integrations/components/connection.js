
import React, { Component } from 'react';
import { Form,Icon,Button,Dropdown, Image, Step } from 'semantic-ui-react';
import ima from './image/imageleft.png';
import {
    Row, Col
} from 'reactstrap';
class UserDetails extends Component{

    saveAndContinue = (e) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render(){
        const { values } = this.props;
        return(
            <div>
                <Step.Group attached='top'>
      <Step active>
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
      <Step onClick={this.saveAndContinue}>
        <Icon className='refresh' />
        <Step.Content>
          <Step.Title>Schedule</Step.Title>
          <Step.Description>Schedule your api</Step.Description>
        </Step.Content>
      </Step>
      <Step>
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
                
 <Form className="pt-3">
                 <Row>
                <Col md="5">
                <Form.Field>
                <label>Source</label>
                 <Dropdown search
                name='source'
            options={values.datasource}
            value={values.source}
            onChange={this.props.handleChange}
            placeholder='Choose Source'
            selection />
                </Form.Field></Col>
                <Col md="2">
                 <Image src={ima}></Image>
                </Col>
                <Col md="5">
                <Form.Field>
                    <label>Destination</label>
                    <Dropdown name='destination'
            options={values.datadestination}
            search
            value={values.destination}
            onChange={this.props.handleChange}
            placeholder='Choose Destination'
            selection
          />
            
                </Form.Field></Col></Row>
                <div></div>
     <div></div>
     <Button Active  className="btn-shadow float-right btn-wide btn-pill btn-outline-2x btn mt-3 mb-3 mr-4" style={{color:'#66529C',backgroundColor:'#fff',border:'1px solid #66529C'}}
               onClick={this.saveAndContinue}>Next
            </Button>
            </Form>
            </div>
           
        )
    }
}

export default UserDetails;