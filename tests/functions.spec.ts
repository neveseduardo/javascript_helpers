import {
    isCPF,
    isCNPJ,
    formatCNPJ,
    formatCPF,
} from '../src/modules/cpfcnpj.module'
import {
    isPhoneNumber,
    formatPhoneNumber,
} from '../src/modules/phonenumber.module'
import {
    minDate,
    maxDate,
    formatDate,
    isDate,
    datesInPeriod,
} from '../src/modules/dates.module'
import {
    isEmpty,
    onlyNumbers,
    isNumber,
    isEmail,
    minChar,
    maxChar,
    allValuesAreEmpty,
    formatMoney,
    randNumber,
} from '../src/modules/methods.module'
import moment from 'moment'

describe('funções CPF e CNPJ', () => {
    it('Deve confirmar que um CPF válido é válido', () => {
        expect(isCPF('01028996225')).toBe(true)
        expect(isCPF('010.289.962-25')).toBe(true)
    })

    it('Deve confirmar que um CPF inválido é inválido', () => {
        expect(isCPF('01028996226')).toBe(false)
        expect(isCPF('010.289.962-26')).toBe(false)
    })

    it('função isCNPJ para CNPJ válido', () => {
        expect(isCNPJ('09.249.022/0001-64')).toBe(true)
    })

    it('função isCNPJ para CNPJ inválido', () => {
        expect(isCNPJ('09.249.022/00558874')).toBe(false)
    })

    it('função formatCNPJ', () => {
        expect(formatCNPJ('09249022000164')).toBe('09.249.022/0001-64')
    })

    it('função formatCPF', () => {
        expect(formatCPF('65201799060')).toBe('652.017.990-60')
    })
})

describe('funções de telefone', () => {
    it('função isPhoneNumber para valor válido', () => {
        expect(isPhoneNumber('91989514581')).toBe(true)
    })

    it('função isPhoneNumber para valor inválido', () => {
        expect(isPhoneNumber('9198951')).toBe(false)
    })

    it('função formatPhoneNumber', () => {
        expect(formatPhoneNumber('91989514581')).toBe('(91) 98951-4581')
    })
})

describe('funções de data', () => {
    it('função minimumDate para data válida', () => {
        expect(
            minDate(
                moment().format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
            )
        ).toBe(true)
    })

    it('função minimumDate para data inválida', () => {
        expect(
            minDate(
                moment().format('YYYY-MM-DD'),
                moment().subtract(1, 'd').format('YYYY-MM-DD')
            )
        ).toBe(false)
    })

    it('função maximumDate para data válida', () => {
        expect(
            maxDate(
                moment().format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
            )
        ).toBe(true)
    })

    it('função maximumDate para data inválida', () => {
        expect(
            maxDate(
                moment().format('YYYY-MM-DD'),
                moment().add(1, 'd').format('YYYY-MM-DD')
            )
        ).toBe(false)
    })

    it('função formatDate', () => {
        expect(formatDate('2020-01-01', 'DD/MM/YYYY')).toBe('01/01/2020')
    })

    it('função isDate para valor válido', () => {
        expect(isDate('2020-01-01')).toBe(true)
    })

    it('função isDate para valor inválido', () => {
        expect(isDate('45454554')).toBe(false)
    })

    it('função datesInPeriod', () => {
        const arrayDatas = Array.from(datesInPeriod('2020-01-01', '2020-01-02'))
        const arrayMock = Array.from(['2020-01-01', '2020-01-02'])
        expect(arrayDatas.join(',')).toEqual(arrayMock.join(','))
    })
})

describe('funções globais', () => {
    it('função allValuesAreEmpty válida', () => {
        expect(allValuesAreEmpty(['', ''])).toBe(true)
    })

    it('função allValuesAreEmpty inválida', () => {
        expect(allValuesAreEmpty(['tests', 'testes'])).toBe(false)
    })

    it('função isEmail inválida', () => {
        expect(isEmail('email@email.com')).toBe(true)
    })

    it('função isEmail inválida', () => {
        expect(isEmail('emailemailcom')).toBe(false)
    })

    it('função minChar válida', () => {
        expect(minChar(5, '55554545')).toBe(true)
    })

    it('função minChar inválida', () => {
        expect(minChar(5, '445')).toBe(false)
    })

    it('função maxChar válida', () => {
        expect(maxChar(5, '333')).toBe(true)
    })

    it('função maxChar inválida', () => {
        expect(maxChar(5, '4454545454')).toBe(false)
    })

    it('função onlyNumbers', () => {
        expect(onlyNumbers('testes 123')).toBe('123')
    })

    it('função isNumber válida', () => {
        expect(isNumber(20)).toBe(true)
    })

    it('função isNumber válida', () => {
        expect(isNumber('testes 52')).toBe(false)
    })

    it('função formatMoney válida', () => {
        expect(formatMoney(55.5)).toMatch(/[R$ 55,50]/)
    })

    it('função randNumber válida', () => {
        expect(String(randNumber(1, 10))).toMatch(/^([1-9]|10)$/)
    })

    it('função isEmpty para array vazio', () => {
        expect(isEmpty([])).toBe(true)
    })

    it('função isEmpty para array cheio', () => {
        expect(isEmpty([1, 2, 3])).toBe(false)
    })

    it('função isEmpty para objeto vazio', () => {
        expect(isEmpty({})).toBe(true)
    })

    it('função isEmpty para objeto vazio', () => {
        expect(isEmpty({ id: 1 })).toBe(false)
    })

    it('função isEmpty para string vazia', () => {
        expect(isEmpty('')).toBe(true)
    })

    it('função isEmpty para string vazia', () => {
        expect(isEmpty('alguma coisa')).toBe(false)
    })

    it('função isEmpty valor undefined', () => {
        expect(isEmpty(undefined)).toBe(true)
    })

    it('função isEmpty valor null', () => {
        expect(isEmpty(null)).toBe(true)
    })
})
