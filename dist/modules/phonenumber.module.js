"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneNumber = exports.isPhoneNumber = void 0;
const methods_module_1 = require("./methods.module");
function isPhoneNumber(phoneNumber) {
    if ((0, methods_module_1.isEmpty)(phoneNumber))
        return false;
    phoneNumber = formatPhoneNumber(phoneNumber);
    const expression = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g;
    return expression.test(String(phoneNumber).toLowerCase());
}
exports.isPhoneNumber = isPhoneNumber;
function formatPhoneNumber(fn) {
    let match = '';
    fn = (0, methods_module_1.onlyNumbers)(fn);
    match = fn.length === 8 ? fn.match(/^(\d{4})(\d{4})$/) : match;
    match = fn.length === 9 ? fn.match(/^(\d{5})(\d{4})$/) : match;
    match = fn.length === 10 ? fn.match(/^(\d{2})(\d{4})(\d{4})$/) : match;
    match = fn.length === 11 ? fn.match(/^(\d{2})(\d{5})(\d{4})$/) : match;
    if (match.length > 0)
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    return match;
}
exports.formatPhoneNumber = formatPhoneNumber;
//# sourceMappingURL=phonenumber.module.js.map