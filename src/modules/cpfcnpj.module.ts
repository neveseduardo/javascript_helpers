import { isEmpty, onlyNumbers } from './methods.module'

export function isCPF(cpf: any): boolean {
    cpf = onlyNumbers(cpf)
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
    cpf = cpf.split('').map((el: any) => +el)
    const rest = (count: number) =>
        ((cpf
            .slice(0, count - 12)
            .reduce(
                (soma: any, el: any, index: any) => soma + el * (count - index),
                0
            ) *
            10) %
            11) %
        10
    return rest(10) === cpf[9] && rest(11) === cpf[10]
}

export function isCNPJ(cnpj: string): boolean {
    if (isEmpty(cnpj)) return false

    cnpj = onlyNumbers(cnpj)

    if (cnpj.length !== 14) return false

    let tamanho = cnpj.length - 2,
        numeros = cnpj.slice(0, tamanho),
        soma = 0,
        pos = tamanho - 7,
        // eslint-disable-next-line prefer-const
        digitos = cnpj.slice(tamanho)

    for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--
        if (pos < 2) pos = 9
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    if (resultado !== Number(digitos.charAt(0))) return false

    tamanho = tamanho + 1
    numeros = cnpj.slice(0, tamanho)
    soma = 0
    pos = tamanho - 7

    for (let i = tamanho; i >= 1; i--) {
        soma += Number(numeros.charAt(tamanho - i)) * pos--
        if (pos < 2) pos = 9
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)

    if (resultado !== Number(digitos.charAt(1))) return false

    return true
}

export function formatCPF(cpf: string): string {
    cpf = onlyNumbers(cpf)
    if (cpf.length < 11) return cpf
    cpf = cpf.slice(0, 11)
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    return cpf
}

export function formatCNPJ(cnpj: string): string {
    cnpj = onlyNumbers(cnpj)
    if (cnpj.length < 14) return cnpj
    cnpj = cnpj.slice(0, 14)
    cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
    return cnpj
}
