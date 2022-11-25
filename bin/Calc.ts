#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import {createSpinner} from "nanospinner";
import figlet from "figlet";
import gradient from "gradient-string";

let keepdoing = true;
const wait = (ms=2000)=>new Promise((r)=>setTimeout(r,ms));
const secondwait = (ms=500)=>new Promise((r)=>setTimeout(r,ms));
let num1_value:number;
let num2_value:number;
function Welcome(){
  figlet(`Faran's\nCalculator`,(err,data)=>{
    console.log(gradient.pastel.multiline(data)+'\n');
  })
}
async function checkAnswer(oper:string,num1_value:number,num2_value:number) {
  const spinner = createSpinner("Checking Answer...").start();
  await wait();
  if(oper === "+"){
    spinner.success({text:`${num1_value} Added to ${num2_value} is ${(num1_value + num2_value).toFixed(2)}`});
  }
  else if(oper === "-"){
    spinner.success({text:`${num1_value} Subtracted by ${num2_value} is ${(num1_value - num2_value).toFixed(2)}`});
  }
  else if(oper === "*"){
    spinner.success({text:`${num1_value}  Multiplied to ${num2_value} is ${(num1_value*num2_value).toFixed(2)}`});
  }
  else if(oper === "/"){
    spinner.success({text:`${num1_value} Divided by ${num2_value} is${(num1_value / num2_value).toFixed(2)}`});
  }
  else if(oper === "^"){
    spinner.success({text:`${num1_value} Power to ${num2_value} is ${(num1_value % num2_value).toFixed(2)}`});
  }
}
async function keepDoing(){
  const currentStatus = chalkAnimation.rainbow("Do you want to perform another calculation!");
  await secondwait();
  currentStatus.stop();
}
async function Number1() {
  const num1 = await inquirer.prompt({
    name:"Number1",
    type: "number",
    message: "Please enter first number "
})
num1_value = num1.Number1; 
}
async function Number2() {
  const num2 = await inquirer.prompt({
    name:"Number2",
    type:"number",
    message: "Please enter second number"
  });
  num2_value = num2.Number2;
}
async function operation() {
   const oper = await inquirer.prompt({
    name:"Operation",
    type:"list",
    message:"Please choose the function you want to perform",
    choices:['+','-','*','/',"^","%"]
   })
   return checkAnswer(oper.Operation,num1_value,num2_value);
}
async function doAgain() {
    const doagain = await inquirer.prompt({
      name:"Status",
      type:"list",
      message:`${await keepDoing()}`,
      choices:["Yes","No"]
      
    })
    if(doagain.Status === "No"){
      keepdoing = false;
    }
}
do{
console.clear();
Welcome();
await wait();
await Number1();
await Number2();
await operation();
await doAgain();
}
while(keepdoing === true);
