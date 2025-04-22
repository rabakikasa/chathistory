"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
var display = document.getElementById("display");
var buttons = document.querySelectorAll(".btn");
var reciprocalButton = document.querySelector(".btn.reciprocal");
// Always ensure display is focused when calculator starts
window.addEventListener("load", function () {
    display.textContent = "0";
    placeCaretAtEnd(display);
    // ボタンにショートカットキー情報を追加
    setupButtonTooltips();
});
// ボタンにショートカットキーの情報をツールチップとして追加する関数
function setupButtonTooltips() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    // 各ボタンに対応するショートカットキー情報を設定
    (_a = document.querySelector(".btn.sqrt")) === null || _a === void 0 ? void 0 : _a.setAttribute("title", "ショートカット: Alt+r");
    (_b = document.querySelector(".btn.e-power")) === null || _b === void 0 ? void 0 : _b.setAttribute("title", "ショートカット: Alt+e");
    (_c = document.querySelector(".btn.loge")) === null || _c === void 0 ? void 0 : _c.setAttribute("title", "ショートカット: Alt+n");
    (_d = document.querySelector(".btn.log")) === null || _d === void 0 ? void 0 : _d.setAttribute("title", "ショートカット: Alt+l");
    (_e = document.querySelector(".btn.factorial")) === null || _e === void 0 ? void 0 : _e.setAttribute("title", "ショートカット: !");
    (_f = document.querySelector(".btn.power")) === null || _f === void 0 ? void 0 : _f.setAttribute("title", "ショートカット: ^");
    (_g = document.querySelector(".btn.bracket")) === null || _g === void 0 ? void 0 : _g.setAttribute("title", "ショートカット: (");
    (_h = document.querySelector(".btn.pi")) === null || _h === void 0 ? void 0 : _h.setAttribute("title", "ショートカット: Alt+i または π");
    (_j = document.querySelector(".btn.abs")) === null || _j === void 0 ? void 0 : _j.setAttribute("title", "ショートカット: Alt+a");
    (_k = document.querySelector(".btn.floor")) === null || _k === void 0 ? void 0 : _k.setAttribute("title", "ショートカット: Alt+f");
    // 三角関数ボタンにショートカットキー情報を設定
    (_l = document.querySelector(".btn.sin")) === null || _l === void 0 ? void 0 : _l.setAttribute("title", "ショートカット: Alt+s");
    (_m = document.querySelector(".btn.cos")) === null || _m === void 0 ? void 0 : _m.setAttribute("title", "ショートカット: Alt+c");
    (_o = document.querySelector(".btn.tan")) === null || _o === void 0 ? void 0 : _o.setAttribute("title", "ショートカット: Alt+t");
    // 基本的な演算子とその他のキーにもツールチップを追加
    var buttonTooltips = {
        "+": "ショートカット: +",
        "-": "ショートカット: -",
        "×": "ショートカット: *",
        "÷": "ショートカット: /",
        "=": "ショートカット: = または Enter",
        "C": "計算をクリア"
    };
    buttons.forEach(function (btn) {
        var text = btn.textContent;
        if (text && buttonTooltips[text]) {
            btn.setAttribute("title", buttonTooltips[text]);
        }
    });
}
// Ensure display stays focused when clicking anywhere in the calculator
(_a = document.getElementById("calculator")) === null || _a === void 0 ? void 0 : _a.addEventListener("mousedown", function (e) {
    if (e.target instanceof HTMLButtonElement) {
        // Prevent button from getting focus
        e.preventDefault();
        display.focus();
        placeCaretAtEnd(display);
    }
});
buttons.forEach(function (btn) {
    // Prevent text selection on buttons
    btn.addEventListener("mousedown", function (e) {
        e.preventDefault();
    });
    if (btn.classList.contains("bracket")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertParenthesesAtCaret(display);
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("pi")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertPiAtCaret(display);
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("factorial")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertAtCaret(display, "!");
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("e-power")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertAtCaret(display, "e^");
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("loge")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertFunctionCallAtCaret(display, "loge");
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("log")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertFunctionCallAtCaret(display, "log");
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("sqrt")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertFunctionCallAtCaret(display, "sqrt");
            placeCaretAtEnd(display);
        });
        return;
    }
    // 三角関数ボタンの処理を追加
    if (btn.classList.contains("sin")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertFunctionCallAtCaret(display, "sin");
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("cos")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertFunctionCallAtCaret(display, "cos");
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("tan")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertFunctionCallAtCaret(display, "tan");
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("abs")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertAbsAtCaret(display);
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("btn-reciprocal")) {
        btn.addEventListener("click", function () {
            var _a;
            display.focus();
            var input = (_a = display.textContent) !== null && _a !== void 0 ? _a : "";
            if (!input.trim()) {
                display.textContent = "エラー";
                return;
            }
            // Clear display if it only contains "0"
            if (input.trim() === "0") {
                display.textContent = "エラー";
                return;
            }
            // Replace the current input with a reciprocal operation
            display.textContent = "1/(".concat(input, ")");
            placeCaretAtEnd(display);
        });
        return;
    }
    if (btn.classList.contains("floor")) {
        btn.addEventListener("click", function () {
            display.focus();
            insertFloorAtCaret(display);
            placeCaretAtEnd(display);
        });
        return;
    }
    btn.addEventListener("click", function () {
        var _a;
        display.focus();
        var value = btn.textContent;
        if (!value)
            return;
        if (value === "C") {
            display.textContent = "";
        }
        else if (value === "=") {
            try {
                var input = (_a = display.textContent) !== null && _a !== void 0 ? _a : "";
                if (!input.trim()) {
                    display.textContent = "0";
                    return;
                }
                var converted = input.replace(/×/g, "*").replace(/÷/g, "/");
                var result = evaluateExpression(converted);
                // Check if result is valid
                if (typeof result !== 'number' || !isFinite(result)) {
                    console.error('Invalid calculation result:', result);
                    display.textContent = "エラー";
                    display.focus();
                    placeCaretAtEnd(display);
                    return;
                }
                var resultStr = result.toString()
                    .replace(/\*/g, "×")
                    .replace(/\//g, "÷");
                display.textContent = resultStr;
            }
            catch (error) {
                console.error('Calculation error:', error);
                display.textContent = "エラー";
                display.focus();
                placeCaretAtEnd(display);
            }
            placeCaretAtEnd(display);
        }
        else {
            insertAtCaret(display, value);
        }
    });
});
// Enterキーで計算実行
document.addEventListener("keydown", function (event) {
    var _a, _b;
    // 数字、演算子、括弧以外のキーは無視
    var allowedKeys = /^[0-9+\-*/.()=!^π|]$/; // | を許可するキーに追加
    var isAllowedKey = allowedKeys.test(event.key);
    var isControlKey = event.ctrlKey || event.metaKey;
    var isNavigationKey = event.key === "ArrowLeft" || event.key === "ArrowRight" ||
        event.key === "Backspace" || event.key === "Delete";
    // 許可されていないキーの入力を防ぐ
    if (!isAllowedKey && !isControlKey && !isNavigationKey && event.key !== "Enter") {
        // πのショートカット (i)
        if ((event.key === "i" && event.altKey) || event.key === "π") {
            event.preventDefault();
            insertPiAtCaret(display);
            return;
        }
        // 特殊キーのショートカット処理
        if (event.key === "r" && event.altKey) {
            event.preventDefault();
            var input = (_a = display.textContent) !== null && _a !== void 0 ? _a : "";
            if (!input.trim() || parseFloat(input) === 0) {
                display.textContent = "エラー";
                return;
            }
            var result = 1 / parseFloat(input);
            display.textContent = result.toString();
            placeCaretAtEnd(display);
            return;
        }
        // e累乗のショートカット (e)
        if (event.key === "e" && event.altKey) {
            event.preventDefault();
            insertAtCaret(display, "e^");
            return;
        }
        // 自然対数のショートカット (n)
        if (event.key === "n" && event.altKey) {
            event.preventDefault();
            insertFunctionCallAtCaret(display, "loge");
            return;
        }
        // 常用対数のショートカット (l)
        if (event.key === "l" && event.altKey) {
            event.preventDefault();
            insertFunctionCallAtCaret(display, "log");
            return;
        }
        // 三角関数のショートカット
        if (event.key === "s" && event.altKey) {
            event.preventDefault();
            insertFunctionCallAtCaret(display, "sin");
            return;
        }
        if (event.key === "c" && event.altKey) {
            event.preventDefault();
            insertFunctionCallAtCaret(display, "cos");
            return;
        }
        if (event.key === "t" && event.altKey) {
            event.preventDefault();
            insertFunctionCallAtCaret(display, "tan");
            return;
        }
        event.preventDefault();
        return;
    }
    // | キーの処理を追加
    if (event.key === "|") {
        event.preventDefault();
        insertAbsAtCaret(display);
        return;
    }
    // Enter キーの処理
    if (event.key === "Enter") {
        event.preventDefault(); // 改行防止
        var input = (_b = display.textContent) !== null && _b !== void 0 ? _b : "";
        if (!input.trim()) {
            display.textContent = "0";
            placeCaretAtEnd(display);
            return;
        }
        var converted = input.replace(/×/g, "*").replace(/÷/g, "/");
        try {
            var result = evaluateExpression(converted);
            var resultStr = result.toString()
                .replace(/\*/g, "×")
                .replace(/\//g, "÷");
            display.textContent = resultStr;
        }
        catch (_c) {
            display.textContent = "エラー";
            display.focus();
            placeCaretAtEnd(display);
        }
        placeCaretAtEnd(display);
        return;
    }
    // × ÷ の変換
    if (event.key === "*") {
        event.preventDefault();
        insertAtCaret(display, "×");
        return;
    }
    else if (event.key === "/") {
        event.preventDefault();
        insertAtCaret(display, "÷");
        return;
    }
    // 階乗演算子
    if (event.key === "!") {
        event.preventDefault();
        insertAtCaret(display, "!");
        return;
    }
    // 累乗演算子
    if (event.key === "^") {
        event.preventDefault();
        insertAtCaret(display, "^");
        return;
    }
    // 括弧の自動補完
    if (event.key === "(") {
        event.preventDefault();
        insertParenthesesAtCaret(display);
        return;
    }
    // 数字と演算子の入力
    if (isAllowedKey && !isControlKey) {
        event.preventDefault();
        // ディスプレイが空の場合は0を消去
        if (!display.textContent || display.textContent.trim() === "") {
            display.textContent = "";
        }
        insertAtCaret(display, event.key);
        return;
    }
});
// カーソル位置にテキストを挿入
function insertAtCaret(el, text) {
    var selection = window.getSelection();
    if (!selection || !selection.getRangeAt || !selection.rangeCount)
        return;
    // ディスプレイが空の場合は0を消去
    if (!el.textContent || el.textContent.trim() === "") {
        el.textContent = "";
    }
    var range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
}
// カーソルを末尾に置く（クリック後などに必要）
function placeCaretAtEnd(el) {
    el.focus();
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
// 計算関数は前の evaluateExpression を使ってOK！
// --- 文字列をトークンに分ける ---
function tokenize(expression) {
    return expression.match(/(sin|cos|tan|e\^|loge|log|sqrt|floor|\d+\.?\d*|\.\d+|\+|\-|\*|\/|\^|!|\(|\)|\⌊|\⌋)/g) || [];
}
// --- 計算処理（演算子の優先順位を守る） ---
function calculate(tokens) {
    // 式の基本的な構文チェック
    if (tokens.length === 0) {
        throw new Error("式が空です");
    }
    // 演算子で始まっていないかチェック（単項マイナスは除く）
    if (["+", "*", "/", "^", "!"].includes(tokens[0])) {
        throw new Error("不正な式です：演算子で始まっています");
    }
    // 演算子で終わっていないかチェック
    if (["+", "-", "*", "/", "^"].includes(tokens[tokens.length - 1])) {
        throw new Error("不正な式です：演算子で終わっています");
    }
    // 特殊処理: 累乗演算子の後に負の数が来る場合の処理（例: 2^-3）
    for (var i_1 = 0; i_1 < tokens.length - 2; i_1++) {
        if (tokens[i_1] === "^" && tokens[i_1 + 1] === "-" && !isNaN(parseFloat(tokens[i_1 + 2]))) {
            // マイナス記号と数値を結合
            tokens.splice(i_1 + 1, 2, "-" + tokens[i_1 + 2]);
        }
    }
    var maxIterations = 1000; // 無限ループ防止用
    // ① 関数の処理（sin, cos, tan, log, loge, sqrt）
    var i = 0;
    while (i < tokens.length && maxIterations > 0) {
        if (["sin", "cos", "tan", "log", "loge", "sqrt", "e^", "floor"].includes(tokens[i])) {
            if (i >= tokens.length - 1) {
                throw new Error("\u4E0D\u6B63\u306A".concat(tokens[i], "\u95A2\u6570\u306E\u4F7F\u7528\u3067\u3059"));
            }
            var arg = parseFloat(tokens[i + 1]);
            if (isNaN(arg)) {
                throw new Error("\u4E0D\u6B63\u306A".concat(tokens[i], "\u95A2\u6570\u306E\u5F15\u6570\u3067\u3059"));
            }
            var result = void 0;
            switch (tokens[i]) {
                case "sin":
                    result = Math.sin(arg);
                    break;
                case "cos":
                    result = Math.cos(arg);
                    break;
                case "tan":
                    result = Math.tan(arg);
                    break;
                case "log":
                    if (arg <= 0)
                        throw new Error("常用対数の引数は正の数である必要があります");
                    result = Math.log10(arg);
                    break;
                case "loge":
                    if (arg <= 0)
                        throw new Error("自然対数の引数は正の数である必要があります");
                    result = Math.log(arg);
                    break;
                case "sqrt":
                    if (arg < 0)
                        throw new Error("平方根の引数は0以上である必要があります");
                    result = Math.sqrt(arg);
                    break;
                case "e^":
                    result = Math.exp(arg);
                    break;
                case "floor":
                    result = Math.floor(arg);
                    break;
                default:
                    throw new Error("未実装の関数です");
            }
            if (!isFinite(result)) {
                throw new Error("計算結果が無効です");
            }
            tokens.splice(i, 2, result.toString());
            i = 0;
        }
        else {
            i++;
        }
        maxIterations--;
    }
    if (maxIterations <= 0) {
        throw new Error("計算が複雑すぎます");
    }
    maxIterations = 1000; // リセット
    // ② 累乗（^）の処理（優先度が最高）
    i = 0;
    while (i < tokens.length && maxIterations > 0) {
        if (tokens[i] === "^") {
            if (i === 0 || i === tokens.length - 1) {
                throw new Error("不正な累乗演算です");
            }
            var left = parseFloat(tokens[i - 1]);
            var right = parseFloat(tokens[i + 1]);
            if (isNaN(left) || isNaN(right)) {
                throw new Error("不正な累乗演算です");
            }
            // 特殊なケースの処理
            // 1. 負の数の累乗で、指数が分数の場合（複素数になるケース）
            if (left < 0 && !Number.isInteger(right)) {
                throw new Error("負の数の非整数乗は実数では定義されていません");
            }
            // 2. 0の0乗は数学的に未定義だが、JavaScript では1を返す
            // 3. 0の負の数乗は無限大
            if (left === 0 && right < 0) {
                throw new Error("0の負の数乗は定義されていません");
            }
            var result = Math.pow(left, right);
            if (!isFinite(result)) {
                throw new Error("計算結果が無効です");
            }
            tokens.splice(i - 1, 3, result.toString());
            i = 0;
        }
        else {
            i++;
        }
        maxIterations--;
    }
    if (maxIterations <= 0) {
        throw new Error("計算が複雑すぎます");
    }
    maxIterations = 1000; // リセット
    // ③ 階乗（!）の処理
    i = 0;
    while (i < tokens.length && maxIterations > 0) {
        if (tokens[i] === "!") {
            if (i === 0) {
                throw new Error("不正な階乗演算です");
            }
            var n = parseFloat(tokens[i - 1]);
            if (isNaN(n) || n < 0 || !Number.isInteger(n)) {
                throw new Error("階乗は0以上の整数のみ有効です");
            }
            var result = factorial(n);
            if (!isFinite(result)) {
                throw new Error("計算結果が大きすぎます");
            }
            tokens.splice(i - 1, 2, result.toString());
            i = 0;
        }
        else {
            i++;
        }
        maxIterations--;
    }
    if (maxIterations <= 0) {
        throw new Error("計算が複雑すぎます");
    }
    maxIterations = 1000; // リセット
    // ④ 掛け算・割り算を処理
    i = 0;
    while (i < tokens.length && maxIterations > 0) {
        if (tokens[i] === "*" || tokens[i] === "/") {
            if (i === 0 || i === tokens.length - 1) {
                throw new Error("不正な乗除算です");
            }
            var left = parseFloat(tokens[i - 1]);
            var right = parseFloat(tokens[i + 1]);
            if (isNaN(left) || isNaN(right)) {
                throw new Error("不正な乗除算です");
            }
            if (tokens[i] === "/" && right === 0) {
                throw new Error("0で割ることはできません");
            }
            var result = tokens[i] === "*" ? left * right : left / right;
            if (!isFinite(result)) {
                throw new Error("計算結果が無効です");
            }
            tokens.splice(i - 1, 3, result.toString());
            i = 0;
        }
        else {
            i++;
        }
        maxIterations--;
    }
    if (maxIterations <= 0) {
        throw new Error("計算が複雑すぎます");
    }
    maxIterations = 1000; // リセット
    // ⑤ 足し算・引き算を処理
    i = 0;
    while (i < tokens.length && maxIterations > 0) {
        if (tokens[i] === "+" || tokens[i] === "-") {
            if (i === tokens.length - 1) {
                throw new Error("不正な加減算です");
            }
            // 最初の位置の - は単項マイナスとして扱う
            if (i === 0) {
                if (tokens[i] === "+") {
                    tokens.splice(i, 1);
                    continue;
                }
                // 単項マイナスの場合
                var right_1 = parseFloat(tokens[i + 1]);
                if (isNaN(right_1)) {
                    throw new Error("不正な数値です");
                }
                var result_1 = -right_1;
                tokens.splice(i, 2, result_1.toString());
                continue;
            }
            var left = parseFloat(tokens[i - 1]);
            var right = parseFloat(tokens[i + 1]);
            if (isNaN(left) || isNaN(right)) {
                throw new Error("不正な加減算です");
            }
            var result = tokens[i] === "+" ? left + right : left - right;
            if (!isFinite(result)) {
                throw new Error("計算結果が無効です");
            }
            tokens.splice(i - 1, 3, result.toString());
            i = 0;
        }
        else {
            i++;
        }
        maxIterations--;
    }
    if (maxIterations <= 0) {
        throw new Error("計算が複雑すぎます");
    }
    // 最終結果のチェック
    if (tokens.length !== 1) {
        throw new Error("不正な式です");
    }
    var finalResult = parseFloat(tokens[0]);
    if (isNaN(finalResult) || !isFinite(finalResult)) {
        throw new Error("計算結果が無効です");
    }
    return finalResult;
}
function evaluateExpression(expression) {
    try {
        // πの置換（小数点以下15桁まで）
        expression = expression.replace(/π/g, Math.PI.toString());
        // 1. 空白を削除（安全処理）
        expression = expression.replace(/\s+/g, "");
        // 基本的なバリデーション
        if (!expression) {
            throw new Error("式が空です");
        }
        // 絶対値の処理を追加
        while (expression.includes("|")) {
            var start = expression.indexOf("|");
            var end = expression.indexOf("|", start + 1);
            if (end === -1) {
                throw new Error("絶対値の記号が正しく対応していません");
            }
            var innerExpr = expression.substring(start + 1, end);
            var innerResult = Math.abs(evaluateExpression(innerExpr));
            expression = expression.substring(0, start) + innerResult + expression.substring(end + 1);
        }
        // 括弧の対応チェック
        var openBrackets = (expression.match(/\(/g) || []).length;
        var closeBrackets = (expression.match(/\)/g) || []).length;
        if (openBrackets !== closeBrackets) {
            throw new Error("括弧の対応が不正です");
        }
        // 数字と括弧の間に * を挿入（例: 2(3+4) → 2*(3+4)）
        expression = expression.replace(/(\d+\.?\d*)(\()/g, "$1*$2");
        // 括弧の直後に数字がある場合も * を挿入（例: (3+4)2 → (3+4)*2）
        expression = expression.replace(/(\))(\d+\.?\d*)/g, "$1*$2");
        // 数字と関数名の間に * を挿入（例: 2log(10) → 2*log(10)）
        expression = expression.replace(/(\d+\.?\d*)(log|loge|sqrt|sin|cos|tan|floor)/g, "$1*$2");
        // 3. かっこを中から外へ順に評価
        var maxBracketIterations = 100; // 無限ループ防止用
        while (expression.includes("(") && maxBracketIterations > 0) {
            expression = expression.replace(/\(([^()]+)\)/g, function (_, inner) {
                try {
                    var tokens_1 = tokenize(inner);
                    if (tokens_1.length === 0)
                        return "0";
                    var result_2 = calculate(tokens_1);
                    if (!isFinite(result_2)) {
                        throw new Error("計算結果が無効です");
                    }
                    return result_2.toString();
                }
                catch (error) {
                    if (error instanceof Error) {
                        throw new Error("\u62EC\u5F27\u5185\u306E\u8A08\u7B97\u30A8\u30E9\u30FC: ".concat(error.message));
                    }
                    throw error;
                }
            });
            maxBracketIterations--;
        }
        if (maxBracketIterations <= 0) {
            throw new Error("括弧の計算が複雑すぎます");
        }
        // 4. かっこがない式を評価
        var tokens = tokenize(expression);
        if (tokens.length === 0) {
            throw new Error("式が空です");
        }
        // 式の構文チェック
        for (var i = 0; i < tokens.length - 1; i++) {
            // 演算子が連続していないかチェック（単項マイナスは除く）
            if (/[+\-*/^]/.test(tokens[i]) && /[+*/^]/.test(tokens[i + 1])) {
                throw new Error("演算子が連続しています");
            }
        }
        var result = calculate(tokens);
        if (!isFinite(result)) {
            throw new Error("計算結果が無効です");
        }
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Expression evaluation error:', error.message);
            throw new Error(error.message);
        }
        throw error;
    }
}
window.addEventListener("load", function () {
    display.textContent = "0";
    placeCaretAtEnd(display);
});
function insertParenthesesAtCaret(el) {
    var _a;
    // Clear display if it only contains "0"
    if ((((_a = el.textContent) !== null && _a !== void 0 ? _a : "").trim()) === "0") {
        el.textContent = "";
    }
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount)
        return;
    var range = selection.getRangeAt(0);
    var open = document.createTextNode("(");
    var close = document.createTextNode(")");
    var middle = document.createTextNode(""); // Placeholder for cursor
    range.deleteContents();
    range.insertNode(close);
    range.insertNode(middle);
    range.insertNode(open);
    // Set cursor to middle (empty text node)
    range.setStart(middle, 0);
    range.setEnd(middle, 0);
    selection.removeAllRanges();
    selection.addRange(range);
}
function factorial(n) {
    if (n < 0)
        return NaN; // 負数の階乗は定義しない
    if (n === 0 || n === 1)
        return 1;
    var result = 1;
    for (var i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
/**
 * 指定された関数名の後に () を自動挿入し、
 * カーソルをかっこの間にセットする関数
 */
function insertFunctionCallAtCaret(el, funcName) {
    var _a;
    // Clear display if it only contains "0"
    if ((((_a = el.textContent) !== null && _a !== void 0 ? _a : "").trim()) === "0") {
        el.textContent = "";
    }
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount)
        return;
    var range = selection.getRangeAt(0);
    range.deleteContents();
    var funcText = document.createTextNode(funcName);
    var openParen = document.createTextNode("(");
    var emptyNode = document.createTextNode(""); // Placeholder for cursor
    var closeParen = document.createTextNode(")");
    range.insertNode(closeParen);
    range.insertNode(emptyNode);
    range.insertNode(openParen);
    range.insertNode(funcText);
    // Set cursor to emptyNode (between parentheses)
    range.setStart(emptyNode, 0);
    range.setEnd(emptyNode, 0);
    selection.removeAllRanges();
    selection.addRange(range);
}
// Update event listener for reciprocal button
if (reciprocalButton) {
    reciprocalButton.addEventListener('click', function () {
        var _a;
        display.focus();
        var input = (_a = display.textContent) !== null && _a !== void 0 ? _a : "";
        if (!input.trim()) {
            display.textContent = "エラー";
            return;
        }
        // Clear display if it only contains "0"
        if (input.trim() === "0") {
            display.textContent = "エラー";
            return;
        }
        // Replace the current input with a reciprocal operation
        display.textContent = "1/(".concat(input, ")");
        placeCaretAtEnd(display);
    });
}
// πを挿入する関数
function insertPiAtCaret(el) {
    var _a;
    // Clear display if it only contains "0"
    if ((((_a = el.textContent) !== null && _a !== void 0 ? _a : "").trim()) === "0") {
        el.textContent = "";
    }
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount)
        return;
    var range = selection.getRangeAt(0);
    range.deleteContents();
    // πの値を表示用と計算用で分ける
    var displayText = document.createTextNode("π");
    range.insertNode(displayText);
    // カーソルを末尾に移動
    range.setStartAfter(displayText);
    range.setEndAfter(displayText);
    selection.removeAllRanges();
    selection.addRange(range);
}
// 絶対値記号を挿入する関数
function insertAbsAtCaret(el) {
    var _a;
    // Clear display if it only contains "0"
    if ((((_a = el.textContent) !== null && _a !== void 0 ? _a : "").trim()) === "0") {
        el.textContent = "";
    }
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount)
        return;
    var range = selection.getRangeAt(0);
    var content = el.textContent || "";
    if (!content) {
        // 入力が空の場合は || を挿入し、カーソルを中央に
        el.textContent = "||";
        var newRange = document.createRange();
        newRange.setStart(el.firstChild || el, 1);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
    else {
        // 入力がある場合は、現在の入力の後に || を追加
        el.textContent = content + "||";
        // カーソルを || の間に配置
        var newRange = document.createRange();
        newRange.setStart(el.firstChild || el, content.length + 1);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
}
// 床関数記号を挿入する関数
function insertFloorAtCaret(el) {
    var _a;
    // Clear display if it only contains "0"
    if ((((_a = el.textContent) !== null && _a !== void 0 ? _a : "").trim()) === "0") {
        el.textContent = "";
    }
    var selection = window.getSelection();
    if (!selection || !selection.rangeCount)
        return;
    var range = selection.getRangeAt(0);
    var content = el.textContent || "";
    if (!content) {
        // 入力が空の場合は ⌊⌋ を挿入し、カーソルを中央に
        el.textContent = "⌊⌋";
        var newRange = document.createRange();
        newRange.setStart(el.firstChild || el, 1);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
    else {
        // 入力がある場合は、現在の入力の後に ⌊⌋ を追加
        el.textContent = content + "⌊⌋";
        // カーソルを ⌊⌋ の間に配置
        var newRange = document.createRange();
        newRange.setStart(el.firstChild || el, content.length + 1);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
}
