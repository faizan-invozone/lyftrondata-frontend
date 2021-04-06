
import React, { Component,Fragment} from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

const citydata = [
    {  text: 'Delhi', value: 'Delhi' },
    {  text: 'Mumbai', value: 'Mumbai'},
    {  text: 'Agra', value: 'Agra' }
  ]
class MainForm extends Component {
    constructor() {
        super();
        this.state = {
          citydata:citydata,
          step: 1,
          name:'',
          city: [],
        };
    } 
    
    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }
    datahandlesubmit = () =>{
     
   
        }
    handleChange = (event, {name, value}) => {
        debugger;
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
    
        }
      }
    
    handleinputChange = input => event => {
        debugger;
        this.setState({ [input] : event.target.value })
    }
    render(){
        const {step,name,city,citydata} = this.state;
        const values = { name,city,citydata};
        switch(step) {
        case 1:
            return <Step1
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    handleinputChange={this.handleinputChange}
                    values={values}
                    />
        case 2:
            return <Step2
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                     values={values}
                    />
        case 3:
            return <Step3
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    datahandlesubmit={this.datahandlesubmit}
                    values={values}
                    />
        }
    }
}

export default MainForm;