"use strict";
// src/main.ts
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const button = document.getElementById("calc");
const result = document.getElementById("result");
button.addEventListener("click", () => {
    const n1 = parseFloat(num1.value);
    const n2 = parseFloat(num2.value);
    const sum = n1 + n2;
    result.textContent = sum.toString();
});
