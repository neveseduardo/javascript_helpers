"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCNPJ = exports.formatCPF = exports.isCNPJ = exports.isCPF = void 0;
const methods_module_1 = require("./methods.module");
function isCPF(cpf) {
    cpf = (0, methods_module_1.onlyNumbers)(cpf);
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/))
        return false;
    cpf = cpf.split('').map((el) => +el);
    const rest = (count) => ((cpf
        .slice(0, count - 12)
        .reduce((soma, el, index) => soma + el * (count - index), 0) *
        10) %
        11) %
        10;
    return rest(10) === cpf[9] && rest(11) === cpf[10];
}
exports.isCPF = isCPF;
function isCNPJ(cnpj) {
    if ((0, methods_module_1.isEmpty)(cnpj))
        return false;
    cnpj = (0, methods_module_1.onlyNumbers)(cnpj);
    if (cnpj.length !== 14)
        return false;
    let tamanho = cnpj.length - 2, numeros = cnpj.slice(0, tamanho), soma = 0, pos = tamanho - 7, digitos = cnpj.slice(tamanho);
    for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(0)))
        return false;
    tamanho = tamanho + 1;
    numeros = cnpj.slice(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(1)))
        return false;
    return true;
}
exports.isCNPJ = isCNPJ;
function formatCPF(cpf) {
    cpf = (0, methods_module_1.onlyNumbers)(cpf);
    if (cpf.length < 11)
        return cpf;
    cpf = cpf.slice(0, 11);
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return cpf;
}
exports.formatCPF = formatCPF;
function formatCNPJ(cnpj) {
    cnpj = (0, methods_module_1.onlyNumbers)(cnpj);
    if (cnpj.length < 14)
        return cnpj;
    cnpj = cnpj.slice(0, 14);
    cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    return cnpj;
}
exports.formatCNPJ = formatCNPJ;
//# sourceMappingURL=cpfcnpj.module.js.map