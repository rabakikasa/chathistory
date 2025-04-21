"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// calculator.test.ts
var jsdom_1 = require("jsdom");
var calculator_1 = require("./calculator");
// DOMの設定
var dom = new jsdom_1.JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
describe('Calculator Functions', function () {
    // tokenize のテスト
    describe('tokenize', function () {
        test('数字と演算子を正しくトークン化する', function () {
            expect((0, calculator_1.tokenize)('1+2')).toEqual(['1', '+', '2']);
            expect((0, calculator_1.tokenize)('3.14*2')).toEqual(['3.14', '*', '2']);
            expect((0, calculator_1.tokenize)('sin(30)')).toEqual(['sin', '30']);
        });
        test('複雑な式を正しくトークン化する', function () {
            expect((0, calculator_1.tokenize)('2^3!+4*sqrt(16)')).toEqual(['2', '^', '3', '!', '+', '4', '*', 'sqrt', '16']);
        });
        test('空の式は空配列を返す', function () {
            expect((0, calculator_1.tokenize)('')).toEqual([]);
        });
    });
    // calculate のテスト
    describe('calculate', function () {
        test('基本的な算術演算', function () {
            expect((0, calculator_1.calculate)(['2', '+', '3'])).toBe(5);
            expect((0, calculator_1.calculate)(['6', '-', '4'])).toBe(2);
            expect((0, calculator_1.calculate)(['3', '*', '4'])).toBe(12);
            expect((0, calculator_1.calculate)(['8', '/', '2'])).toBe(4);
        });
        test('累乗演算', function () {
            expect((0, calculator_1.calculate)(['2', '^', '3'])).toBe(8);
            expect((0, calculator_1.calculate)(['3', '^', '2'])).toBe(9);
        });
        test('階乗演算', function () {
            expect((0, calculator_1.calculate)(['5', '!'])).toBe(120);
            expect((0, calculator_1.calculate)(['3', '!'])).toBe(6);
        });
        test('エラーケース', function () {
            expect(function () { return (0, calculator_1.calculate)(['1', '+']); }).toThrow();
            expect(function () { return (0, calculator_1.calculate)(['/', '2']); }).toThrow();
            expect(function () { return (0, calculator_1.calculate)(['2', '/', '0']); }).toThrow();
        });
    });
    // evaluateExpression のテスト
    describe('evaluateExpression', function () {
        test('基本的な式の評価', function () {
            expect((0, calculator_1.evaluateExpression)('2+3')).toBe(5);
            expect((0, calculator_1.evaluateExpression)('10-5')).toBe(5);
            expect((0, calculator_1.evaluateExpression)('4*3')).toBe(12);
            expect((0, calculator_1.evaluateExpression)('8/2')).toBe(4);
        });
        test('複雑な式の評価', function () {
            expect((0, calculator_1.evaluateExpression)('2+3*4')).toBe(14);
            expect((0, calculator_1.evaluateExpression)('(2+3)*4')).toBe(20);
            expect((0, calculator_1.evaluateExpression)('2^3!')).toBe(48);
        });
        test('特殊関数', function () {
            expect((0, calculator_1.evaluateExpression)('sin(0)')).toBe(0);
            expect((0, calculator_1.evaluateExpression)('cos(0)')).toBe(1);
            expect((0, calculator_1.evaluateExpression)('sqrt(16)')).toBe(4);
            expect((0, calculator_1.evaluateExpression)('log(100)')).toBe(2);
        });
        test('πの評価', function () {
            expect((0, calculator_1.evaluateExpression)('π')).toBeCloseTo(Math.PI);
            expect((0, calculator_1.evaluateExpression)('2*π')).toBeCloseTo(2 * Math.PI);
        });
        test('絶対値の評価', function () {
            expect((0, calculator_1.evaluateExpression)('|-5|')).toBe(5);
            expect((0, calculator_1.evaluateExpression)('|3-8|')).toBe(5);
        });
        test('エラーケース', function () {
            expect(function () { return (0, calculator_1.evaluateExpression)(''); }).toThrow();
            expect(function () { return (0, calculator_1.evaluateExpression)('2+'); }).toThrow();
            expect(function () { return (0, calculator_1.evaluateExpression)('2/0'); }).toThrow();
        });
    });
    // factorial のテスト
    describe('factorial', function () {
        test('正の整数の階乗', function () {
            expect((0, calculator_1.factorial)(0)).toBe(1);
            expect((0, calculator_1.factorial)(1)).toBe(1);
            expect((0, calculator_1.factorial)(5)).toBe(120);
        });
        test('負の数の階乗はNaNを返す', function () {
            expect((0, calculator_1.factorial)(-1)).toBeNaN();
        });
    });
});
// DOM操作関連のテスト
describe('DOM Operations', function () {
    var display;
    beforeEach(function () {
        display = document.createElement('div');
        display.setAttribute('contenteditable', 'true');
        document.body.appendChild(display);
    });
    afterEach(function () {
        document.body.removeChild(display);
    });
    test('insertAtCaret', function () {
        display.textContent = '123';
        var selection = window.getSelection();
        var range = document.createRange();
        range.setStart(display.firstChild, 3);
        range.collapse(true);
        selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
        selection === null || selection === void 0 ? void 0 : selection.addRange(range);
        insertAtCaret(display, '4');
        expect(display.textContent).toBe('1234');
    });
    test('placeCaretAtEnd', function () {
        display.textContent = '123';
        placeCaretAtEnd(display);
        var selection = window.getSelection();
        expect(selection === null || selection === void 0 ? void 0 : selection.focusNode).toBe(display.firstChild);
        expect(selection === null || selection === void 0 ? void 0 : selection.focusOffset).toBe(3);
    });
    // その他のDOM操作関数のテスト...
});
