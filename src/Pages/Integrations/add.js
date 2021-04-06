
import React, { Component } from 'react';

import MainForm from './components/MainForm';
import './graph.css';

export default class Test extends Component {

  render() {
    return(
      <div>
      <div className="text-center mb-3">
      <i className="pe-7s-shuffle" style={{fontSize:'5rem',color:'#4f3989'}}></i>
      <h5 className="mt-2">Add Integration</h5> 
      <h6>Integrations are apps and databases that you can use to 
<br></br>send data through your pipeline.</h6>
      </div>
        <MainForm /> </div> );
        
  }
}
