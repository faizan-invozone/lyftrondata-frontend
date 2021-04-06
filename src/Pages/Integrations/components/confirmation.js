import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {Form,Icon,Button,Dropdown, Image, Step,List } from 'semantic-ui-react';
import { Row, Col} from 'reactstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(faSpinner);
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
   
    <Form className="pt-3">
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
                    <List.Item>
                        <List.Icon name='calendar' />
                        <List.Content>From {startDate} To {endDate} </List.Content>
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
               <Row>
                  <Col md="2"><Button Active className="btn-shadow float-left btn-wide btn-pill btn-outline-2x btn mt-3 mb-3 ml-4" style={{color:'#66529C',backgroundColor:'#fff',border:'1px solid #66529C'}} onClick={this.back}>
              Previous
            </Button></Col>
            <Col md="5">
                {showprogressmodel ? (
              <FontAwesomeIcon className="text-all float-right mt-3"
                  icon={['fas', 'spinner']}
                  pulse
                  fixedWidth
                  size="2x"
              />):('')}</Col>
              <Col md="5">
            <Button Active className="btn-shadow float-right btn-wide btn-pill btn-outline-2x btn mt-3 mb-3 ml-4" style={{color:'#66529C',backgroundColor:'#fff',border:'1px solid #66529C'}} onClick={this.datasubmit}>
                Save
              </Button></Col>
              </Row>
                </Form>
         
            </div>
        )
    }
}

export default Confirmation;