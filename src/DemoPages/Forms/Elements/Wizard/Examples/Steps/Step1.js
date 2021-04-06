import React, { Fragment } from "react";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";

export default class WizardStep1 extends React.Component {
  render() {
    const { values } = this.props;
    return (
      <Fragment>
        <div className="form-wizard-content">
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail55">Email</Label>
                <Input
                    placeholder='Integration Name'
                    onChange={this.props.handleinputChange('source')}
                    defaultValue={values.name}
                    />
               
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword22">Password</Label>
                <Input type="password" name="password" id="examplePassword22" placeholder="password placeholder"/>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
          </FormGroup>
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
    );
  }
}
