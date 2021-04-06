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
import '../../Integrations/components/test.css';
import { pathExists } from 'fs-extra';
import { differenceInBusinessDays } from 'date-fns';
import { matchPath } from 'react-router-dom';
import Configuration from '../../../config/urlconfig';

  const parameterdata=[];
  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       debugger;
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
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
     
    }

    fileChangedHandler = event => {
      debugger;
      this.setState({ logoimage: 'images/'+ event.target.files[0].name })
      this.state.logoimage.copy('C:\\Documents\/images/'+ event.target.files[0]);
    }
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
    
    uploadHandler = () => {
      debugger;
      const formData = new FormData()
      formData.append(
        'myFile',
        this.state.selectedFile,
        this.state.selectedFile.name
      )
      axios.post('http://localhost:3000/static/media/', formData,
      {
        onUploadProgress: progressEvent => {
          console.log(progressEvent.loaded / progressEvent.total)
        }}
      )
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
        return(
            <div>
                <Form className="form-card">
 <Card className="main-card mb-3">
                                <CardBody>
                                <CardTitle ><h5><center>Add Api</center></h5></CardTitle>
                                <p className="text-center mb-3 font-size-md">Add Api which you want provide to customer</p>
                      
                <Row>

                    <Col md="6">
                    <Form.Field><label>Logo</label>
                    {/* <Input type="file" onChange={this.fileChangedHandler}></Input> */}
{/* <button onClick={this.uploadHandler}>Upload!</button> */}

                  <Input type="file" name="logoimage" onChange={this.fileChangedHandler}></Input>
                    

</Form.Field>
                    </Col>
               
                </Row>
         
                <Row>
                  <Col md="6"></Col>
                <Col md="6">
                    {/* <Form.Field>
                     <Button className="pull-right mt-4 buttonall" onClick={this.handleSubmit}>Submit</Button> 
               
</Form.Field> */}
                    </Col> 
                </Row>

                            
                                </CardBody>
                                </Card>
                                </Form>
            </div>
        )
    }
}