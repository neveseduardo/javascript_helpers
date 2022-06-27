import { isEmpty } from './methods.module'
import moment from 'moment'

export function isDate(value: string | moment.Moment): boolean {
    if (isEmpty(value)) return false
    if (String(value).length < 10) return false
    // eslint-disable-next-line no-useless-escape
    const PT = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    const ISO = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/
    value = String(value).slice(0, 10)
    return PT.test(value) || ISO.test(value)
}

export function formatDate(
    date: string,
    format = 'DD/MM/YYYY h:mm:ss'
): string {
    if (!isDate(date)) return ''
    return moment(date).format(format)
}

export function minDate(min: any, date: any): boolean {
    if (!isDate(date)) return false
    if (!isDate(min)) return false
    min = moment(formatDate(min, 'YYYY-MM-DD'))
    date = moment(formatDate(date, 'YYYY-MM-DD'))
    return date >= min
}

export function maxDate(max: any, date: any): boolean {
    if (!isDate(date)) return false
    if (!isDate(max)) return false
    max = moment(formatDate(max, 'YYYY-MM-DD'))
    date = moment(formatDate(date, 'YYYY-MM-DD'))
    return date <= max
}

export function datesInPeriod(start: any, end: any): string[] {
    if (!isDate(start) || !isDate(end)) return []
    const dates = []
    start = moment(formatDate(start, 'YYYY-MM-DD'))
    end = moment(formatDate(end, 'YYYY-MM-DD'))

    while (start <= end) {
        dates.push(moment(start).format('YYYY-MM-DD'))
        start = moment(start).add(1, 'days')
    }
    return dates
}
