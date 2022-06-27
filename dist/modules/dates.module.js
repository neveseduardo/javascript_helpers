"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datesInPeriod = exports.maxDate = exports.minDate = exports.formatDate = exports.isDate = void 0;
const methods_module_1 = require("./methods.module");
const moment_1 = __importDefault(require("moment"));
function isDate(value) {
    if ((0, methods_module_1.isEmpty)(value))
        return false;
    if (String(value).length < 10)
        return false;
    const PT = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const ISO = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    value = String(value).slice(0, 10);
    return PT.test(value) || ISO.test(value);
}
exports.isDate = isDate;
function formatDate(date, format = 'DD/MM/YYYY h:mm:ss') {
    if (!isDate(date))
        return '';
    return (0, moment_1.default)(date).format(format);
}
exports.formatDate = formatDate;
function minDate(min, date) {
    if (!isDate(date))
        return false;
    if (!isDate(min))
        return false;
    min = (0, moment_1.default)(formatDate(min, 'YYYY-MM-DD'));
    date = (0, moment_1.default)(formatDate(date, 'YYYY-MM-DD'));
    return date >= min;
}
exports.minDate = minDate;
function maxDate(max, date) {
    if (!isDate(date))
        return false;
    if (!isDate(max))
        return false;
    max = (0, moment_1.default)(formatDate(max, 'YYYY-MM-DD'));
    date = (0, moment_1.default)(formatDate(date, 'YYYY-MM-DD'));
    return date <= max;
}
exports.maxDate = maxDate;
function datesInPeriod(start, end) {
    if (!isDate(start) || !isDate(end))
        return [];
    const dates = [];
    start = (0, moment_1.default)(formatDate(start, 'YYYY-MM-DD'));
    end = (0, moment_1.default)(formatDate(end, 'YYYY-MM-DD'));
    while (start <= end) {
        dates.push((0, moment_1.default)(start).format('YYYY-MM-DD'));
        start = (0, moment_1.default)(start).add(1, 'days');
    }
    return dates;
}
exports.datesInPeriod = datesInPeriod;
//# sourceMappingURL=dates.module.js.map