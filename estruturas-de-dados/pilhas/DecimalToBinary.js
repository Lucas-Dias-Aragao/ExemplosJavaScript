import { Stack } from "./StackArray.js";

//Convertendo números decimais para binários

export function decimalToBinary(decNumber) {
  const remStack = new Stack();

  let number = decNumber;
  let rem;
  let binaryString = '';

  while(number > 0) { // {1}
    rem = Math.floor(number % 2); // {2}
    remStack.push(rem); // {3}
    number = Math.floor(number / 2); // {4}
  }
  while(!remStack.isEmpty()) { // {5}
    binaryString += remStack.pop().toString();
  }

  return binaryString;

}
