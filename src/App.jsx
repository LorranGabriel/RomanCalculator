/*eslint-disable no-eval */
import React, { Component } from "react";
import './App.css';
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import {ClearButton} from "./components/ClearButton";
import {Feedback} from "./components/Feedback";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input: "",
      lastExpression: ""
    }
  }
    roman_to_Int(str1) {
      if(str1 == null) return -1;
      var num = this.char_to_int(str1.charAt(0));
      var pre, curr;
      
      for(var i = 1; i < str1.length; i++){
        curr = this.char_to_int(str1.charAt(i));
        pre = this.char_to_int(str1.charAt(i-1));
        if(curr <= pre){
          num += curr;
        } else {
          num = num - pre*2 + curr;
        }
      }
    
      return num;
    }
    
    char_to_int(c){
      switch (c){
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return -1;
      }
    }

  integer_to_roman(num) {
    if (typeof num !== 'number') 
    return false; 
    
    var digits = String(+num).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
    "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
    "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman_num = "",
    i = 3;
    while (i--)
    roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
    return Array(+digits.join("") + 1).join("M") + roman_num;
  }

  addToInput = val =>{
    this.setState({input: this.state.input + val});
  };

  handleEqual = () => {
    let expression = this.state.input;
    let expressionArray = expression.split(" ");
    let new_expression = "";
    let result = "";
    for (let i = 0; i < expressionArray.length; i++) {
      
      const element = expressionArray[i];
      if (!(/[a-zA-Z]/).test(element) ){
          new_expression+= element
      }
      else{
        new_expression+= this.roman_to_Int(element);
      }
    }
    try {
      result = this.integer_to_roman(eval(new_expression));
      this.setState({lastExpression:"Resultado:  "+ expression + " = " + result })
      this.setState({input: result})
    } catch (error) {
      this.setState({lastExpression:"Expressão inválida" })
      this.setState({input: result})
    }
  }

  render(){
    return (
      
      <div className="app">

        <div className="calc-wrapper">
           <div className="row">
            
                <h1> Roman Calculator </h1>
          </div>
          <br></br>

          <Input input={this.state.input}></Input>
          <div className="row">
            <Button handleClick ={this.addToInput}> - </Button>
            <Button handleClick ={this.addToInput}> + </Button>
            <Button handleClick ={this.addToInput}> / </Button>
            <Button handleClick ={this.addToInput}> * </Button>
          </div>
          <div className="row">
            <Button handleClick ={this.addToInput}>M</Button>
            <Button handleClick ={this.addToInput}>C</Button>
            <Button handleClick ={this.addToInput}>L</Button>
            <Button handleClick ={() => this.handleEqual()}>=</Button>
          </div>
          <div className="row">
            <Button handleClick ={this.addToInput}>X</Button>
            <Button handleClick ={this.addToInput}>V</Button>
            <Button handleClick ={this.addToInput}>I</Button>
            <Button handleClick ={this.addToInput}>D</Button>
          </div>

          <div className="row">
            <ClearButton handleClear={() => this.setState({input:''})}> Clear </ClearButton>
          </div>

          <Feedback h1={this.state.lastExpression}></Feedback>

        </div>
      </div>
    );

  }
  
  
}

export default App;
