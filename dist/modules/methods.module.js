"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randNumber = exports.allValuesAreEmpty = exports.formatPercent = exports.formatMoney = exports.groupBy = exports.maxChar = exports.minChar = exports.isEmail = exports.isNumber = exports.onlyNumbers = exports.isEmpty = void 0;
function isEmpty(v) {
    if (v === undefined)
        return true;
    if (v === null)
        return true;
    if (v === '')
        return true;
    if (v === Object(v) && !Object.entries(v).length)
        return true;
    return Array.isArray(v) && !v.length;
}
exports.isEmpty = isEmpty;
function onlyNumbers(string) {
    return String(string).replace(/\D+/g, '');
}
exports.onlyNumbers = onlyNumbers;
function isNumber(string) {
    const numericRepr = parseFloat(String(string));
    return !isNaN(numericRepr);
}
exports.isNumber = isNumber;
function isEmail(email) {
    if (isEmpty(email))
        return false;
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase());
}
exports.isEmail = isEmail;
function minChar(min, string) {
    if (isEmpty(string))
        return false;
    if (isEmpty(min))
        return false;
    return String(string).length >= Number(min);
}
exports.minChar = minChar;
function maxChar(max, string) {
    if (isEmpty(string))
        return false;
    if (isEmpty(max))
        return false;
    return String(string).length <= Number(max);
}
exports.maxChar = maxChar;
function groupBy(items, key) {
    if (isEmpty(items))
        return [];
    if (isEmpty(key))
        return [];
    let res = [];
    const reduce = items.reduce((result, item) => (Object.assign(Object.assign({}, result), { [item[key]]: [...(result[item[key]] || []), item] })), {});
    Object.entries(reduce).map(([, v]) => {
        res = [...res, v];
    });
    return res;
}
exports.groupBy = groupBy;
function formatMoney(value, minf = 2, maxf = 2) {
    const nf = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: minf,
        maximumFractionDigits: maxf,
        signDisplay: 'auto',
    });
    const res = nf.format(value);
    console.log('value', value);
    return isNumber(value) ? res : '-';
}
exports.formatMoney = formatMoney;
function formatPercent(value) {
    const reg = /^-?\$?\d+((.\d{3}|,\d{3})+)?(\,\d+|\.\d+)?$/;
    return reg.test(value) ? `${value}%` : value;
}
exports.formatPercent = formatPercent;
function allValuesAreEmpty(arr) {
    return arr.every((val) => val === '');
}
exports.allValuesAreEmpty = allValuesAreEmpty;
function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randNumber = randNumber;
//# sourceMappingURL=methods.module.js.map