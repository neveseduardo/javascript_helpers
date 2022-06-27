export function isEmpty(v: any): boolean {
    if (v === undefined) return true
    if (v === null) return true
    if (v === '') return true
    if (v === Object(v) && !Object.entries(v).length) return true
    return Array.isArray(v) && !v.length
}

export function onlyNumbers(string: string): string {
    return String(string).replace(/\D+/g, '')
}

export function isNumber(string: string | number): boolean {
    const numericRepr = parseFloat(String(string))
    return !isNaN(numericRepr)
}

export function isEmail(email: string): boolean {
    if (isEmpty(email)) return false
    const expression =
        // eslint-disable-next-line no-control-regex
        /(?!.*\.{2})^([a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
    return expression.test(String(email).toLowerCase())
}

export function minChar(min: number, string: string): boolean {
    if (isEmpty(string)) return false
    if (isEmpty(min)) return false
    return String(string).length >= Number(min)
}

export function maxChar(max: number, string: string): boolean {
    if (isEmpty(string)) return false
    if (isEmpty(max)) return false
    return String(string).length <= Number(max)
}

export function groupBy(items: [], key: string): [] {
    if (isEmpty(items)) return []
    if (isEmpty(key)) return []

    let res: any = []
    const reduce = items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item],
        }),
        {}
    )

    Object.entries(reduce).map(([, v]) => {
        res = [...res, v]
    })

    return res
}

export function formatMoney(value: number, minf = 2, maxf = 2): string {
    const nf = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: minf,
        maximumFractionDigits: maxf,
        signDisplay: 'auto',
    })
    const res = nf.format(value)
    console.log('value', value)
    return isNumber(value) ? res : '-'
}

export function formatPercent(value: string): string {
    // eslint-disable-next-line no-useless-escape
    const reg = /^-?\$?\d+((.\d{3}|,\d{3})+)?(\,\d+|\.\d+)?$/
    return reg.test(value) ? `${value}%` : value
}

export function allValuesAreEmpty(arr: any) {
    return arr.every((val: any) => val === '')
}

export function randNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
