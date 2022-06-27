import { onlyNumbers, isEmpty } from './methods.module'

export function isPhoneNumber(phoneNumber: string): boolean {
    if (isEmpty(phoneNumber)) return false
    phoneNumber = formatPhoneNumber(phoneNumber)
    // eslint-disable-next-line no-useless-escape
    const expression = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g
    return expression.test(String(phoneNumber).toLowerCase())
}

export function formatPhoneNumber(fn: string): string {
    let match: any = ''
    fn = onlyNumbers(fn)
    match = fn.length === 8 ? fn.match(/^(\d{4})(\d{4})$/) : match
    match = fn.length === 9 ? fn.match(/^(\d{5})(\d{4})$/) : match
    match = fn.length === 10 ? fn.match(/^(\d{2})(\d{4})(\d{4})$/) : match
    match = fn.length === 11 ? fn.match(/^(\d{2})(\d{5})(\d{4})$/) : match
    if (match.length > 0) return `(${match[1]}) ${match[2]}-${match[3]}`
    return match
}
