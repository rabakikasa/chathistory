export{}
// main.ts
const display = document.getElementById("display") as HTMLDivElement;
const buttons = document.querySelectorAll(".btn");
const reciprocalButton = document.querySelector(".btn.reciprocal");

// Always ensure display is focused when calculator starts
window.addEventListener("load", () => {
  display.textContent = "0";
  placeCaretAtEnd(display);
  // ボタンにショートカットキー情報を追加
  setupButtonTooltips();
});

// ボタンにショートカットキーの情報をツールチップとして追加する関数
function setupButtonTooltips() {
  // 各ボタンに対応するショートカットキー情報を設定
  document.querySelector(".btn.sqrt")?.setAttribute("title", "ショートカット: Alt+r");
  document.querySelector(".btn.e-power")?.setAttribute("title", "ショートカット: Alt+e");
  document.querySelector(".btn.loge")?.setAttribute("title", "ショートカット: Alt+n");
  document.querySelector(".btn.log")?.setAttribute("title", "ショートカット: Alt+l");
  document.querySelector(".btn.factorial")?.setAttribute("title", "ショートカット: !");
  document.querySelector(".btn.power")?.setAttribute("title", "ショートカット: ^");
  document.querySelector(".btn.bracket")?.setAttribute("title", "ショートカット: (");
  document.querySelector(".btn.pi")?.setAttribute("title", "ショートカット: Alt+i または π");
  
  // 三角関数ボタンにショートカットキー情報を設定
  document.querySelector(".btn.sin")?.setAttribute("title", "ショートカット: Alt+s");
  document.querySelector(".btn.cos")?.setAttribute("title", "ショートカット: Alt+c");
  document.querySelector(".btn.tan")?.setAttribute("title", "ショートカット: Alt+t");
  
  // 基本的な演算子とその他のキーにもツールチップを追加
  const buttonTooltips: { [key: string]: string } = {
    "+": "ショートカット: +",
    "-": "ショートカット: -",
    "×": "ショートカット: *",
    "÷": "ショートカット: /",
    "=": "ショートカット: = または Enter",
    "C": "計算をクリア"
  };
  
  buttons.forEach(btn => {
    const text = btn.textContent;
    if (text && buttonTooltips[text]) {
      btn.setAttribute("title", buttonTooltips[text]);
    }
  });
}

// Ensure display stays focused when clicking anywhere in the calculator
document.getElementById("calculator")?.addEventListener("mousedown", (e) => {
  if (e.target instanceof HTMLButtonElement) {
    // Prevent button from getting focus
    e.preventDefault();
    display.focus();
    placeCaretAtEnd(display);
  }
});

buttons.forEach((btn) => {
  // Prevent text selection on buttons
  btn.addEventListener("mousedown", (e) => {
    e.preventDefault();
  });

  if (btn.classList.contains("bracket")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertParenthesesAtCaret(display);
      placeCaretAtEnd(display);
    });
    return;
  }

  if (btn.classList.contains("pi")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertPiAtCaret(display);
      placeCaretAtEnd(display);
    });
    return;
  }

  if (btn.classList.contains("factorial")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertAtCaret(display, "!");
      placeCaretAtEnd(display);
    });
    return;
  }
  if (btn.classList.contains("e-power")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertAtCaret(display, "e^");
      placeCaretAtEnd(display);
    });
    return;
  }
  if (btn.classList.contains("loge")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertFunctionCallAtCaret(display,"loge");
      placeCaretAtEnd(display);
    });
    return;
  }
  if (btn.classList.contains("log")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertFunctionCallAtCaret(display, "log");
      placeCaretAtEnd(display);
    });
    return;
  }
  if (btn.classList.contains("sqrt")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertFunctionCallAtCaret(display, "sqrt");
      placeCaretAtEnd(display);
    });
    return;
  }
  
  // 三角関数ボタンの処理を追加
  if (btn.classList.contains("sin")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertFunctionCallAtCaret(display, "sin");
      placeCaretAtEnd(display);
    });
    return;
  }
  if (btn.classList.contains("cos")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertFunctionCallAtCaret(display, "cos");
      placeCaretAtEnd(display);
    });
    return;
  }
  if (btn.classList.contains("tan")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertFunctionCallAtCaret(display, "tan");
      placeCaretAtEnd(display);
    });
    return;
  }

  if (btn.classList.contains("abs")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertAbsAtCaret(display);
      placeCaretAtEnd(display);
    });
    return;
  }

  if (btn.classList.contains("btn-reciprocal")) {
    btn.addEventListener("click", () => {
      display.focus();
      const input = display.textContent ?? "";
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
      display.textContent = `1/(${input})`;
      placeCaretAtEnd(display);
    });
    return;
  }

  if (btn.classList.contains("floor")) {
    btn.addEventListener("click", () => {
      display.focus();
      insertFunctionCallAtCaret(display, "floor");
      placeCaretAtEnd(display);
    });
    return;
  }

  btn.addEventListener("click", () => {
    display.focus();
    const value = btn.textContent;
    if (!value) return;

    if (value === "C") {
      display.textContent = "";
    } else if (value === "=") {
      try {
        const input = display.textContent ?? "";
        if (!input.trim()) {
          display.textContent = "0";
          return;
        }
        
        const converted = input.replace(/×/g, "*").replace(/÷/g, "/");
        const result = evaluateExpression(converted);
        
        // Check if result is valid
        if (typeof result !== 'number' || !isFinite(result)) {
          console.error('Invalid calculation result:', result);
          display.textContent = "エラー";
          display.focus();
          placeCaretAtEnd(display);
          return;
        }

        const resultStr = result.toString()
          .replace(/\*/g, "×")
          .replace(/\//g, "÷");
        display.textContent = resultStr;
      } catch (error) {
        console.error('Calculation error:', error);
        display.textContent = "エラー";
        display.focus();
        placeCaretAtEnd(display);
      }
      placeCaretAtEnd(display);
    } else {
      insertAtCaret(display, value);
    }
  });
});

// Enterキーで計算実行
document.addEventListener("keydown", (event) => {
  // 数字、演算子、括弧以外のキーは無視
  const allowedKeys = /^[0-9+\-*/.()=!^π|]$/;  // | を許可するキーに追加
  const isAllowedKey = allowedKeys.test(event.key);
  const isControlKey = event.ctrlKey || event.metaKey;
  const isNavigationKey = event.key === "ArrowLeft" || event.key === "ArrowRight" || 
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
      const input = display.textContent ?? "";
      if (!input.trim() || parseFloat(input) === 0) {
        display.textContent = "エラー";
        return;
      }
      const result = 1 / parseFloat(input);
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
    const input = display.textContent ?? "";
    if (!input.trim()) {
      display.textContent = "0";
      placeCaretAtEnd(display);
      return;
    }
    const converted = input.replace(/×/g, "*").replace(/÷/g, "/");

    try {
      const result = evaluateExpression(converted);
      const resultStr = result.toString()
        .replace(/\*/g, "×")
        .replace(/\//g, "÷");

      display.textContent = resultStr;
    } catch {
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
  } else if (event.key === "/") {
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
function insertAtCaret(el: HTMLElement, text: string) {
  const selection = window.getSelection();
  if (!selection || !selection.getRangeAt || !selection.rangeCount) return;

  // ディスプレイが空の場合は0を消去
  if (!el.textContent || el.textContent.trim() === "") {
    el.textContent = "";
  }

  const range = selection.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(text));
  range.collapse(false);
}

// カーソルを末尾に置く（クリック後などに必要）
function placeCaretAtEnd(el: HTMLElement) {
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  if (sel) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

// 計算関数は前の evaluateExpression を使ってOK！


// --- 文字列をトークンに分ける ---
function tokenize(expression: string): string[] {
  return expression.match(/(sin|cos|tan|floor|e\^|loge|log|sqrt|\d+\.?\d*|\.\d+|\+|\-|\*|\/|\^|!|\(|\))/g) || [];
}

// --- 計算処理（演算子の優先順位を守る） ---
function calculate(tokens: string[]): number {
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
  for (let i = 0; i < tokens.length - 2; i++) {
    if (tokens[i] === "^" && tokens[i+1] === "-" && !isNaN(parseFloat(tokens[i+2]))) {
      // マイナス記号と数値を結合
      tokens.splice(i+1, 2, "-" + tokens[i+2]);
    }
  }

  let maxIterations = 1000; // 無限ループ防止用

  // ① 関数の処理（sin, cos, tan, log, loge, sqrt, floor）
  let i = 0;
  while (i < tokens.length && maxIterations > 0) {
    if (["sin", "cos", "tan", "log", "loge", "sqrt", "e^", "floor"].includes(tokens[i])) {
      if (i >= tokens.length - 1) {
        throw new Error(`不正な${tokens[i]}関数の使用です`);
      }
      const arg = parseFloat(tokens[i + 1]);
      if (isNaN(arg)) {
        throw new Error(`不正な${tokens[i]}関数の引数です`);
      }

      let result: number;
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
          if (arg <= 0) throw new Error("常用対数の引数は正の数である必要があります");
          result = Math.log10(arg);
          break;
        case "loge":
          if (arg <= 0) throw new Error("自然対数の引数は正の数である必要があります");
          result = Math.log(arg);
          break;
        case "sqrt":
          if (arg < 0) throw new Error("平方根の引数は0以上である必要があります");
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
    } else {
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
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);
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
      
      const result = Math.pow(left, right);
      if (!isFinite(result)) {
        throw new Error("計算結果が無効です");
      }
      tokens.splice(i - 1, 3, result.toString());
      i = 0;
    } else {
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
      const n = parseFloat(tokens[i - 1]);
      if (isNaN(n) || n < 0 || !Number.isInteger(n)) {
        throw new Error("階乗は0以上の整数のみ有効です");
      }
      const result = factorial(n);
      if (!isFinite(result)) {
        throw new Error("計算結果が大きすぎます");
      }
      tokens.splice(i - 1, 2, result.toString());
      i = 0;
    } else {
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
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);
      if (isNaN(left) || isNaN(right)) {
        throw new Error("不正な乗除算です");
      }
      if (tokens[i] === "/" && right === 0) {
        throw new Error("0で割ることはできません");
      }
      const result = tokens[i] === "*" ? left * right : left / right;
      if (!isFinite(result)) {
        throw new Error("計算結果が無効です");
      }
      tokens.splice(i - 1, 3, result.toString());
      i = 0;
    } else {
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
        const right = parseFloat(tokens[i + 1]);
        if (isNaN(right)) {
          throw new Error("不正な数値です");
        }
        const result = -right;
        tokens.splice(i, 2, result.toString());
        continue;
      }
      const left = parseFloat(tokens[i - 1]);
      const right = parseFloat(tokens[i + 1]);
      if (isNaN(left) || isNaN(right)) {
        throw new Error("不正な加減算です");
      }
      const result = tokens[i] === "+" ? left + right : left - right;
      if (!isFinite(result)) {
        throw new Error("計算結果が無効です");
      }
      tokens.splice(i - 1, 3, result.toString());
      i = 0;
    } else {
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
  
  const finalResult = parseFloat(tokens[0]);
  if (isNaN(finalResult) || !isFinite(finalResult)) {
    throw new Error("計算結果が無効です");
  }
  
  return finalResult;
}

function evaluateExpression(expression: string): number {
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
      const start = expression.indexOf("|");
      let end = expression.indexOf("|", start + 1);
      
      if (end === -1) {
        throw new Error("絶対値の記号が正しく対応していません");
      }
      
      const innerExpr = expression.substring(start + 1, end);
      const innerResult = Math.abs(evaluateExpression(innerExpr));
      
      expression = expression.substring(0, start) + innerResult + expression.substring(end + 1);
    }

    // 括弧の対応チェック
    const openBrackets = (expression.match(/\(/g) || []).length;
    const closeBrackets = (expression.match(/\)/g) || []).length;
    if (openBrackets !== closeBrackets) {
      throw new Error("括弧の対応が不正です");
    }

    // 数字と括弧の間に * を挿入（例: 2(3+4) → 2*(3+4)）
    expression = expression.replace(/(\d+\.?\d*)(\()/g, "$1*$2");
    
    // 括弧の直後に数字がある場合も * を挿入（例: (3+4)2 → (3+4)*2）
    expression = expression.replace(/(\))(\d+\.?\d*)/g, "$1*$2");

    // 数字と関数名の間に * を挿入（例: 2log(10) → 2*log(10)）
    expression = expression.replace(/(\d+\.?\d*)(log|loge|sqrt|sin|cos|tan)/g, "$1*$2");

    // 3. かっこを中から外へ順に評価
    let maxBracketIterations = 100; // 無限ループ防止用
    while (expression.includes("(") && maxBracketIterations > 0) {
      expression = expression.replace(/\(([^()]+)\)/g, (_, inner) => {
        try {
          const tokens = tokenize(inner);
          if (tokens.length === 0) return "0";
          const result = calculate(tokens);
          if (!isFinite(result)) {
            throw new Error("計算結果が無効です");
          }
          return result.toString();
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`括弧内の計算エラー: ${error.message}`);
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
    const tokens = tokenize(expression);
    if (tokens.length === 0) {
      throw new Error("式が空です");
    }

    // 式の構文チェック
    for (let i = 0; i < tokens.length - 1; i++) {
      // 演算子が連続していないかチェック（単項マイナスは除く）
      if (/[+\-*/^]/.test(tokens[i]) && /[+*/^]/.test(tokens[i + 1])) {
        throw new Error("演算子が連続しています");
      }
    }

    const result = calculate(tokens);
    if (!isFinite(result)) {
      throw new Error("計算結果が無効です");
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Expression evaluation error:', error.message);
      throw new Error(error.message);
    }
    throw error;
  }
}

window.addEventListener("load", () => {
  display.textContent = "0";
  placeCaretAtEnd(display);
});



function insertParenthesesAtCaret(el: HTMLElement) {
  // Clear display if it only contains "0"
  if (((el.textContent ?? "").trim()) === "0") {
    el.textContent = "";
  }
  
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const open = document.createTextNode("(");
  const close = document.createTextNode(")");
  const middle = document.createTextNode(""); // Placeholder for cursor

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

function factorial(n: number): number {
  if (n < 0) return NaN; // 負数の階乗は定義しない
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * 指定された関数名の後に () を自動挿入し、
 * カーソルをかっこの間にセットする関数
 */
function insertFunctionCallAtCaret(el: HTMLElement, funcName: string) {
  // Clear display if it only contains "0"
  if (((el.textContent ?? "").trim()) === "0") {
    el.textContent = "";
  }

  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  range.deleteContents();

  const funcText = document.createTextNode(funcName);
  const openParen = document.createTextNode("(");
  const emptyNode = document.createTextNode(""); // Placeholder for cursor
  const closeParen = document.createTextNode(")");

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
  reciprocalButton.addEventListener('click', () => {
    display.focus();
    const input = display.textContent ?? "";
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
    display.textContent = `1/(${input})`;
    placeCaretAtEnd(display);
  });
}

// πを挿入する関数
function insertPiAtCaret(el: HTMLElement) {
  // Clear display if it only contains "0"
  if (((el.textContent ?? "").trim()) === "0") {
    el.textContent = "";
  }

  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  range.deleteContents();

  // πの値を表示用と計算用で分ける
  const displayText = document.createTextNode("π");
  range.insertNode(displayText);

  // カーソルを末尾に移動
  range.setStartAfter(displayText);
  range.setEndAfter(displayText);
  selection.removeAllRanges();
  selection.addRange(range);
}

// 絶対値記号を挿入する関数
function insertAbsAtCaret(el: HTMLElement) {
  // Clear display if it only contains "0"
  if (((el.textContent ?? "").trim()) === "0") {
    el.textContent = "";
  }

  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const content = el.textContent || "";
  
  if (!content) {
    // 入力が空の場合は || を挿入し、カーソルを中央に
    el.textContent = "||";
    const newRange = document.createRange();
    newRange.setStart(el.firstChild || el, 1);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } else {
    // 入力がある場合は、現在の入力の後に || を追加
    el.textContent = content + "||";
    
    // カーソルを || の間に配置
    const newRange = document.createRange();
    newRange.setStart(el.firstChild || el, content.length + 1);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
}


