import React, {Component} from 'react';
import { Form,Icon, Image, Segment,Input ,Dropdown,Button } from 'semantic-ui-react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Switch from "react-switch";
import axios from 'axios';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import '../../Integrations/graph.css';
import Configuration from '../../../config/urlconfig';

const typedata = [
    {  text: 'Analytics', value: 'Analytics' },
    {  text: 'Support', value: 'Support'},
    {  text: 'Databases', value: 'Databases' },
    {  text: 'Email', value: 'Email' },
    {  text: 'Business', value: 'Business' },
    {  text: 'CRM', value: 'CRM' },
    {  text: 'eCommerce', value: 'eCommerce' },
    {  text: 'Advertising', value: 'Advertising' },
    {  text: 'Automation', value: 'Automation' },
  ];
  const plandata = [
    {  text: 'Free Plan', value: 'Free Plan' },
    {  text: 'Enterprises', value: 'Enterprises'},
    {  text: 'Standard Plans', value: 'Standard Plans' }
  ];
  const versiondata = [
    {  text: 'Beta', value: 'Beta' }
  ];
  const paramdata = [
    {  text: 'integer', value: 'int' },
    {  text: 'string', value: 'carchar'},
    {  text: 'datetime', value: 'date' },
    {  text: 'boolean', value: 'bool' },
    {  text: 'decimal', value: 'float' }
  ];
  const fordata = [
    {  text: 'Authentication', value: 'authentication' },
    {  text: 'Data', value: 'data'}
  ];
  const parameterdata=[];
  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }

export default class Addapi extends Component {

    constructor(){
        super();
        this.config = new Configuration();
        this.state = {
            name:'',
            type:'',
            plan:'',
            version:'',
            logoimage:null,
            modal: false,
            key:'',
            paramtype:'',
            usedfor:'',
            ismandatory:false,
            params:parameterdata,
            Visible:'none',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    // fileChangedHandler = event => {
    //   debugger;
    //   this.setState({ logoimage: 'images/'+ event.target.files[0].name })
    //   this.state.logoimage.copy('C:\\Documents\/images/'+ event.target.files[0]);
    // }
    fileChangedHandler = (e) => {
      debugger;
      const file = e.target.files[0];
      this.setState({ logoimage: 'images/'+ file.name });
        getBase64(file).then(base64 => {
        localStorage["C:\\Documents"] = base64;
        console.debug("file stored",base64);
        debugger;
        axios.post('http://localhost:3000/public/images',file).then(
        
          res=>{
            debugger;
            console.log(res);
          }
        );
      });
      };
    
    // uploadHandler = () => {
    //   debugger;
    //   const formData = new FormData()
    //   formData.append(
    //     'myFile',
    //     this.state.selectedFile,
    //     this.state.selectedFile.name
    //   )
    //   axios.post('http://localhost:3000/static/media/', formData,
    //   {
    //     onUploadProgress: progressEvent => {
    //       console.log(progressEvent.loaded / progressEvent.total)
    //     }}
    //   )
    // }




  toggle() {
    this.setState({
        modal: !this.state.modal
    });
}
    addparamdata = (event) => {
        debugger;
        event.preventDefault();
        let data={};
        data.key=this.state.key;
        data.paramtype=this.state.paramtype;
        data.ismandatory=this.state.ismandatory;
        data.usedfor=this.state.usedfor;
        parameterdata.push(data);
        this.setState({params:parameterdata,key:'',paramtype:'',ismandatory:false,usedfor:'',modal: false,Visible:'block' });

      }
    handleInputChange = (event, {name, value}) => {
        debugger;
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
    
        }
      }

      handleChange(ismandatory) {
        debugger;
        this.setState({ ismandatory });
       
      }

      handleSubmit = (e) => {
        debugger;
        let url = this.config.API_URL+"/api/apis";
        let data=this.state;
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
        const parametersfulldata = this.state.params.map((item, i) => (
            <tr>
              <td className="text-center">{item.key}</td>
                           <td className="text-center">{item.paramtype}</td> 
               
               <td className="text-center">{item.usedfor} </td>
             
            <td className="text-center">
            <Switch checked={item.ismandatory} />
            </td>
            <td className="text-center">
            
                <button type="button" className="btn btn-primary btn-sm">X</button>
            </td>
        </tr>
        
       ));
        return(
            <div>
                <Form className="form-card">
 <Card className="main-card mb-3">
                                <CardBody>
                                <CardTitle ><h5><center>Add Api</center></h5></CardTitle>
                                <p className="text-center mb-3 font-size-md">Add Api which you want provide to customer</p>
                                <Row>
                                    <Col md="6">
                                <Form.Field>
                <label>Name</label>
                <Input type="text" name='name' placeholder='Api Name'  onChange={this.handleInputChange}></Input>
            </Form.Field></Col>
            <Col md="6">
            <Form.Field>
                    <label>Type</label>
                    <Dropdown name='type'
            options={typedata}
            search
            //value={value.type}
            onChange={this.handleInputChange}
            placeholder='Choose Type'
            selection
            required
          />
                </Form.Field></Col></Row>
                <Row>
            <Col md="6">
            <Form.Field>
                    <label>Plan</label>
                    <Dropdown name='plan'
            options={plandata}
            search
            //value={plan}
            onChange={this.handleInputChange}
            placeholder='Choose Plan'
            selection
            required
          />
                </Form.Field></Col>
                <Col md="6">
            <Form.Field>
                    <label>Version</label>
                    <Dropdown name='version'
            options={versiondata}
            search
            // value={apitype}
            onChange={this.handleInputChange}
            placeholder='Choose Vesrion'
            selection
          />
                </Form.Field></Col>
                </Row>
                <Row>

                    <Col md="6">
                    <Form.Field><label>Logo</label>
                    {/* <Input type="file" onChange={this.fileChangedHandler}></Input> */}
{/* <button onClick={this.uploadHandler}>Upload!</button> */}

                  <Input type="file" name="logoimage" onChange={this.fileChangedHandler}></Input>
                    

</Form.Field>
                    </Col>
                    {/* <Col md="6">
                        <Form.Field>
                        <label>Add Parameters</label>
        <Button onClick={this.show('blurring')}>Click here for add parameter.............</Button>

        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Add Parameter</Modal.Header>
          <Modal.Content>
            <Modal.Description>
                <Row>
                    <Col>
           <label>Param Name</label>
                <Input type="text" name='key' placeholder='Param Name'  onChange={this.handleInputChange}></Input>
                </Col>
                <Col>
              <label>Param Type</label>
              <Dropdown name='paramtype'
            options={paramdata}
            search
            onChange={this.handleInputChange}
            placeholder='Choose param type'
            selection
          /></Col>
          <Col>
           <label>Use for</label>
              <Dropdown name='usedfor'
            options={fordata}
            search
            onChange={this.handleInputChange}
            placeholder='Select'
            selection
          /></Col>
          <Col>
          <label>Is Required</label>
          <Radio name="ismandatory" onchange={this.handleInputChange} toggle />
          </Col>
          </Row>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.close}>
              Nope
            </Button>
            <Button
              positive
              icon='checkmark'
              labelPosition='right'
              content="Add"
              onClick={this.addparamdata}
            />
          </Modal.Actions>
        </Modal>
     
                        </Form.Field>
                    </Col> */}
                  <Col md="6">
                    <Form.Field>
                      <label>Add Parameters</label>
                  <span className="d-inline-block mb-2 mr-2">
                <Button onClick={this.toggle}>Click here for add parameter.............</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Parameter</ModalHeader>
                    <ModalBody>
                        <Row>
                          <Col>
                          <label>Name</label><br></br>
                          <Input type="text" name='key' placeholder='Param Name'  onChange={this.handleInputChange}></Input>
                          </Col>
                          <Col>
                          <label>Type</label><br></br>
                          <Dropdown name='paramtype'
            options={paramdata}
            search
            onChange={this.handleInputChange}
            placeholder='Choose param type'
            selection
          />
                          </Col>
                          <Col>
                          <label>Use For</label><br></br>
                          <Dropdown name='usedfor'
            options={fordata}
            search
            onChange={this.handleInputChange}
            placeholder='Select'
            selection
          />
                          </Col>
                          <Col>
                          <label>Is Mandatory</label><br></br>
                          <Switch onChange={this.handleChange} checked={this.state.ismandatory} />
                          </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="buttonall" onClick={this.toggle}>Cancel</Button>
                        <Button className="buttonall" onClick={this.addparamdata}>Add </Button>{' '}
                    </ModalFooter>
                </Modal>
            </span>
            </Form.Field>
                  </Col>
                </Row>
                <Row>
                <Col md="12">
    <Form.Field>
        
    <div className="mt-2 table-responsive" style={{display: this.state.Visible}}>
                          <table className="ui celled table align-middle mb-0 table table-borderless table-striped table-hover">
                              <thead>
                              <tr>
                                  <th className="text-center">Name</th>
                                  <th className="text-center">Type</th>
                                  <th className="text-center">Use For</th>
                                  <th className="text-center">Is Mandatory</th>
                                  <th></th>
                              </tr>
                              </thead>
                              <tbody>
                              {parametersfulldata}
                              
                              </tbody>
                          </table>
                      </div>
                      
    </Form.Field>
    </Col>
</Row>
                <Row>
                  <Col md="6"></Col>
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