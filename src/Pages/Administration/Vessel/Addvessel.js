import React, {Component} from 'react';
import { Form,Icon, Image, Segment,Input ,Dropdown } from 'semantic-ui-react';
// import { InputFile } from 'semantic-ui-react-input-file'
import {
    Row, Col,
    Card, CardBody,
    CardTitle, Button
} from 'reactstrap';
import Configuration from '../../../config/urlconfig';

export default class Addvessel extends Component {

    constructor(){
        super();
        this.config = new Configuration();
        this.state = {
            name:'',
            number:'',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
    
        }
      }

      handleSubmit = (e) =>{
        let url = this.config.API_URL+"/api/vessels";
        let data=this.state;
        debugger;
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body:JSON.stringify(data)
        }).then((result)=> {
            result.json().then((resp)=> {
                console.warn("resp",resp)})
                window.location.reload();
            })
        }



    render(){
        return(
            <div>
                <Form className="form-card">
 <Card className="main-card mb-3">
                                <CardBody>
                                <CardTitle ><h5><center>Add Vessel</center></h5></CardTitle>
                                <p className="text-center mb-3 font-size-md">Add Vessel which you want provide to customer</p>
                                <Row>
                                    <Col md="6">
                                <Form.Field>
                <label>Name</label>
                <Input type="text" name='name' placeholder='Vessel Name'  onChange={this.handleInputChange}></Input>
            </Form.Field></Col>
            <Col md="6">
                                <Form.Field>
                <label>Number</label>
                <Input type="text" name='number' placeholder='Vessel Number'  onChange={this.handleInputChange}></Input>
            </Form.Field></Col>
                </Row>
                <Row>

                    <Col md="6">    </Col>
                    <Col md="6">
                    <Form.Field>
                    <Button className="pull-right mt-4 buttonall" onClick={this.handleSubmit}>Submit</Button>
               
                   {/* <Button type="submit" className="pull-right mt-4" color="info" onClick={() => this.setState({showForm: false,listForm:true}) }><i className="pe-7s-plus p-1"></i>Submit</Button> */}
                     


</Form.Field>
                    </Col>
                </Row>

                                </CardBody>
                                </Card>
                                </Form>
            </div>
        )
    }
}