//https://github.com/loiane/javascript-datastructures-algorithms

//classe Stack baseada em objeto
export class Stack {
  constructor(){
    this.count = 0;
    this.items = {}; 

  }

  push(element) {     //Adiciona elementos no topo da pilha
    this.items[this.count] = element;
    this.count++;
  }

  pop() {             //remove o ultimo item adicionado
    if(this.isEmpty()) {
      return undefined;
    }

    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {            //Exibe o ultimo elemento adicionado na pilha
    if(this.isEmpty()) {
      return undefined;
    }

    return this.items[this.count - 1];
  }

  isEmpty() {        //Verifica se a pilha está vazia
    return this.count === 0;
  }

  size() {
    return this.count; //count tbm funciona como tamanho da pilha
  }
 
  clear() {          //Esvazia a pilha
    this.items = {};
    this.count = 0;

    /*
    -- Ou poderia ser usado a seguinte lógica:
    while(!this.isEmpty()) {
      this.pop();
    } */
  }
  
  toString() {      //exibe os elementos da pilha
    if(this.isEmpty()) {
      return '';
    }

    let objString = `${this.items[0]}`; //mostra primeiro elemento na base
    for(let i = 1; i < this.count; i++){
      objString = `${objString},${this.items[i]}`;
    }
    
    return objString;
  }
  
}


// para trabalhar com modulos: comando no terminal - npm init

//Classe Stack baseada em array
/*
export class Stack {
  constructor() {
    this.items = []; //{1} array que armazena os elementos da pilha

  }

  push(element) {
    this.items.push(element);

  }

  pop() {
    return this.items.pop();

  }

  peek() {
    return this.items[this.items.length -1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size(){
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
 } */
