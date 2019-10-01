import React, { Component }  from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Switch from "react-switch";
import Result from './component/Result';
import NormalB from './component/NormalB';
import logo from './component/logo.png';
import ScienceB from './component/ScienceB';
class App extends Component {
  constructor(){
        super();
        this.state = {
            result: "",
            checked: false
        }
    }

    onClick = button => {
        if(button === "="){
            this.calculate()
        }

        else if(button === "AC"){
            this.reset()
        }
        else if(button === "C"){
            this.backspace()
        }
        else if (button === "flip") {
          this.setState({
            result: `-(${this.state.result})`
          }, () => this.calculate())
        }
        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };


    calculate = () => {
        var checkResult = ''
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','+')
        }

        else {
            checkResult = this.state.result
        }

        try {
            this.setState({
                // eslint-disable-next-line
                result: (eval(checkResult) || "" ) + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };
    handleChange=(checked)=> {
      if(this.state.checked===true){
        this.setState({ checked:false });
        console.log('light mode');
        document.body.style.backgroundColor = "white";
        this.refs.header.style.color='black';
      }
      else{
        this.setState({ checked:true });
        console.log('dark mode');
        document.body.style.backgroundColor = "#121212";
        this.refs.header.style.color='white';
      }
      
    }
    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };
  render(){
    return (
      <div>
        <div className="calculator-body">
          <h1 ref='header'><img src={logo} alt="brand" loading='lazy' style={{height:'32px',width:'32px'}}/>&nbsp;&nbsp;Simple Calculator</h1>
          <Switch onChange={this.handleChange} checked={this.state.checked}/>{this.state.checked ? <span className="dark">Dark</span>: <span className="light">Light</span>}
        </div>
        <Tabs className="calculator-body">
            <TabList>
              <Tab style={this.state.checked===true ? {backgroundColor:'#1d1d1d',color:'white'}:{backgroundColor:'white',color:'black'}}>Normal</Tab>
              <Tab style={this.state.checked===true ? {backgroundColor:'#1d1d1d',color:'white'}:{backgroundColor:'white',color:'black'}}>Scientific</Tab>
            </TabList>
            <Result result={this.state.result} />
            <TabPanel>
              <NormalB dark={this.state.checked} onClick={this.onClick} />
            </TabPanel>
            <TabPanel>
               <ScienceB dark={this.state.checked} onClick={this.onClick} />
               <em style={this.state.checked===true ? {backgroundColor:'#1d1d1d',color:'white'}:{backgroundColor:'white',color:'black'}}>Note: for find square root Press Number then press operator of square root. </em>
            </TabPanel>
       </Tabs>
       <br/>
      </div>
    );
  }
}

export default App;
