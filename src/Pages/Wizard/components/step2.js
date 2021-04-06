
import React, { Component,Fragment } from 'react';
import { Button, Step } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import {
    Row, Col,FormGroup, Label,Input
} from 'reactstrap';

class Step2 extends Component{
 
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
          <Row>
             <div className="col-md-4 pull-left">
                <Step.Group vertical ordered>
      <Step completed onClick={this.back}>
        <Step.Content>
          <Step.Title>Account Information</Step.Title>
        </Step.Content>
      </Step>

      <Step active onClick={this.saveAndContinue}>
        <Step.Content>
          <Step.Title>Payment Information</Step.Title>
        </Step.Content>
      </Step>

      <Step>
        <Step.Content>
          <Step.Title>Finish Wizard</Step.Title>
          <Step.Description>Review </Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
    </div>

<div className="col-md-7 m-2">
    <Fragment>
        <div className="form-wizard-content">
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail55">Email</Label>
                <Input type="text" name="address2" 
                    />
               
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword22">dropdown</Label>
                <Dropdown  name='city'
            onChange={this.props.handleChange}
            value={values.city}
            options={values.citydata}
            placeholder='Choose city'
            selection search
          />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress2">Address 2</Label>
            <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor"/>
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCity">City</Label>
                <Input type="text" name="city" id="exampleCity" />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleState">State</Label>
                <Input type="text" name="state" id="exampleState" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip">Zip</Label>
                <Input type="text" name="zip" id="exampleZip" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup check>
            <Input type="checkbox" name="check" id="exampleCheck" />
            <Label for="exampleCheck" check>
              Check me out
            </Label>
          </FormGroup>
        </div>
      </Fragment>
            
          <div className="col-md-6 pull-right"> 
          <Button  onClick={this.back}>Back</Button>
          <Button  onClick={this.saveAndContinue}>Next</Button>
     
      </div> 
            </div>  </Row>
        )
    }
}

export default Step2;