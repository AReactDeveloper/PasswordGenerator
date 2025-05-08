
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const lengthValueEl = document.getElementById('length-value');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateBtn = document.querySelector('.generate-btn');
const copyBtn = document.querySelector('.copy-btn');
const strengthLabel = document.getElementById('strength-label');
const bars = document.querySelectorAll('.bar');

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+={}[]|\\:;"\'<>,.?/~`';

const randomChar = str => str[Math.floor(Math.random() * str.length)];

function generatePassword() {
  let length = +lengthEl.value;
  let charPool = '';
  let password = '';

  if (uppercaseEl.checked) charPool += UPPERCASE;
  if (lowercaseEl.checked) charPool += LOWERCASE;
  if (numbersEl.checked) charPool += NUMBERS;
  if (symbolsEl.checked) charPool += SYMBOLS;

  if (charPool.length === 0) {
    passwordEl.value = 'Select at least 1 option';
    return;
  }

  for (let i = 0; i < length; i++) {
    password += randomChar(charPool);
  }

  passwordEl.value = password;
  updateStrength(password);
}

function updateStrength(pw) {
  const length = pw.length;
  let score = 0;

  if (/[a-z]/.test(pw)) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (length >= 12) score++;

  bars.forEach((bar, i) => {
    bar.style.background = i < score ? '#44ff44' : '#333';
  });

  strengthLabel.textContent =
    score >= 4 ? 'STRONG' :
    score === 3 ? 'GOOD' :
    score === 2 ? 'WEAK' : 'VERY WEAK';
}

copyBtn.addEventListener('click', () => {
  if (passwordEl.value && passwordEl.value !== 'Select at least 1 option') {
    navigator.clipboard.writeText(passwordEl.value);
    copyBtn.textContent = '✔️';
    setTimeout(() => (copyBtn.textContent = '📋'), 1500);
  }
});

lengthEl.addEventListener('input', () => {
  lengthValueEl.textContent = lengthEl.value;
});

generateBtn.addEventListener('click', generatePassword);

window.addEventListener('DOMContentLoaded', generatePassword);
