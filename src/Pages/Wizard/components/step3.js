// Confirmation.jsx
import React, { Component } from 'react';
import { Form, Button, Step,List } from 'semantic-ui-react';
import {
    Row
} from 'reactstrap';

class Step3 extends Component{
    datasubmit = (e) => {
        e.preventDefault();
        this.props.datahandlesubmit();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { name,city }} = this.props;
        return(
            <Row>
            <div className="col-md-4 pull-left">
                <Step.Group vertical ordered>
      <Step completed >
        <Step.Content>
          <Step.Title>Account Information</Step.Title>
        </Step.Content>
      </Step>

      <Step completed onClick={this.back}>
        <Step.Content>
          <Step.Title>Payment Information</Step.Title>
        </Step.Content>
      </Step>

      <Step >
        <Step.Content>
          <Step.Title>Finish Wizard</Step.Title>
          <Step.Description>Review </Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
    </div>

    <div className="col-md-8">
    <Form className="m-2">
                <List>
                <List.Item>
                        <List.Content>Name: {name}</List.Content>
                    </List.Item>
                  
                    <List.Item>
                        <List.Content>city: {city}</List.Content>
                    </List.Item>
                </List>
                <Button  onClick={this.back}>Back</Button>
              <Button onClick={this.datasubmit}>Save </Button>
                </Form>
            </div>
            </Row>
        )
    }
}

export default Step3;