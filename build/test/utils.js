"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.images = [
    {
        id: 1,
        url: 'http://1',
        archived: false,
    },
    {
        id: 2,
        url: 'http://2',
        archived: false,
    },
];
exports.movie = {
    id: 1,
    title: 'just a title',
    minutes: 120,
};
// @todo tslint check
exports.helpers = {
    omit: (targetObj, arr) => Object.entries(targetObj)
        .filter(([key]) => !arr.includes(key))
        .reduce((targetObj, [key, val]) => Object.assign(targetObj, { [key]: val }), {}),
};
//# sourceMappingURL=utils.js.map