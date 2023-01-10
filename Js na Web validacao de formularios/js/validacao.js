export function valida(input) {
   const tipoDeInput = input.dataset.tipo;

   if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
   }

   if (input.validity.valid) {
      input.parentElement.classList.remove('input-container--invalido');
      input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
   } else {
      input.parentElement.classList.add('input-container--invalido');
      input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input);
   }

}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio.'
    },

    email: {
        valueMissing: 'O campo e-mail não pode estar vazio.',
        typeMismatch: 'O e-mail está com formato inválido.'
    },

    senha: {
        valueMissing: 'Uma senha deve ser definida.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiuscula, um numero e não deve conter símbolos especiais.'
    },

    dataNascimento: {
        valueMissing: 'A data de nascimento não pode estar vazia.',
        customError: 'Você deve ser maior que 18 anos para de cadastrar.'
    },

    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.'
    },

    cep: {
        valueMissing: 'O campo de CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.',
        customError: 'Não foi possível buscar o CEP.'
    },

    logradouro: {
        valueMissing: 'O logradouro não pode estar vazio.'

    },

    cidade: {
        valueMissing: 'O campo cidade não pode estar vazio.'
    },

    estado: {
        valueMissing: 'O campo estado não pode estar vazio.'
    },

    preco: {
        valueMissing: 'O preço deve ser informado.'
    }

}


const validadores = {
   dataNascimento: input => validaDataNascimento(input),
   cpf:input => validaCPF(input),
   cep:input => recuperarCEP(input)

}

function mostraMensagemDeErro(tipoDeInput, input){
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro];
        }

    });

    return mensagem;
}


function validaDataNascimento(input) {
   const dataRecebida = new Date(input.value);
   let mensagem = '';

   if (!maiorQue18(dataRecebida)) {
      mensagem = 'Você deve ser maior que 18 anos para de cadastrar.';
   }

   //propriedade do input para o navegador entender que existe erro no campo
   input.setCustomValidity(mensagem);


}

function maiorQue18(data) {
   const dataAtual = new Date();
   const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

   return dataMais18 <= dataAtual;
}



// códigos de validação do CPF

function validaCPF(input){
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = '';

    if(!verificaCPFRepetido(cpfFormatado) || !verificaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido';
    }

    input.setCustomValidity(mensagem);
}

function verificaCPFRepetido(cpf){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true;

    valoresRepetidos.forEach(valor => {
        if(valor == cpf){
            cpfValido = false;
        }
    });

    return cpfValido;
}

function verificaEstruturaCPF(cpf){
    const multiplicador = 10;


    return validaDigitoVerificador(cpf, multiplicador);
}

function validaDigitoVerificador(cpf, multiplicador){
    if(multiplicador >= 12){
        return true;
    }

    let multiplicadorInicial = multiplicador;
    let soma = 0;

    //substring - iniciando na pos. 0 até 9 (multiplicador - 1)
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')

    //charAt encontra uma posição específica
    const digitoVerificador = cpf.charAt(multiplicador - 1);
    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial;
        contador++;
    }

    if(digitoVerificador == confirmaDigito(soma)){
        return validaDigitoVerificador(cpf, multiplicador + 1);
    }
    return false;
}

function confirmaDigito(soma){
    let restoDaDivisao = soma % 11;
    if(restoDaDivisao >= 2){
        return 11 - restoDaDivisao;
    }else{
        return 0;
    }
    
}


//Validando o CEP com REGEX e buscando endereço pela API

//ex da REGEX: pattern="[\d]{5}-?[\d]{3}"

function recuperarCEP(input) {
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = {
        method: 'GET',
        //modo da requisição necessária para chamadas entre aplicações diferentes
        mode: 'cors',
        //resposta da API estará no headers
        headers: {
            'content-type':'application/json;charset=utf-8'
        }
    }

    //requisição para a API da ViaCEP com a função fetch()

    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url, options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro){
                    input.setCustomValidity('Não foi possível buscar o CEP');
                    return
                }

                input.setCustomValidity('');
                preencheCamposComCEP(data);
                return
            }
        )
    }

}

//Preenchendo os campos de endereço com informações obtidas pelo CEP

function preencheCamposComCEP(data){
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}


//Validando preço com máscara 
//https://github.com/codermarcos/simple-mask-money