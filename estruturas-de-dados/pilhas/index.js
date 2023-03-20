import { Stack } from "./StackArray.js";
import { decimalToBinary } from "./DecimalToBinary.js";
import { baseConverter } from "./BaseConverter.js";

const stack = new Stack();
console.log('stack.isEmpty() -> ', stack.isEmpty());

//console.log('stack.peek() ->', stack.peek());
console.log('stack.size() ->', stack.size());

//console.log(stack.peek());

stack.push(5);
stack.push(8);
stack.push(10);
stack.push(13);
console.log(stack.size());
// console.log(stack.pop())
console.log('peek: ' + stack.peek())
console.log('toString -> ' + stack.toString())

console.log('---------------------------------')
console.log(Object.getOwnPropertyNames(stack));
console.log(Object.keys(stack));
console.log(stack.items);

console.log('---------------------------------')
console.log("Resultado: " + decimalToBinary(233));
console.log("Resultado: " + decimalToBinary(10));
console.log("Resultado: " + decimalToBinary(1000));

console.log('---------------------------------')
console.log("Conversor de Base: " + baseConverter(100345, 2));
console.log("Conversor de Base: " + baseConverter(100345, 8));
console.log("Conversor de Base: " + baseConverter(100345, 16));
console.log("Conversor de Base: " + baseConverter(100345, 35));