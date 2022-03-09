// Content Negotiation exercise

const fetchDiv = document.querySelector("#fetchResult");

fetchDiv.textContent = "Fetching result...";

const acceptHeaders = [
  "text/plain",
  "text/html",
  "application/json",
  "application/rainbows+unicorns",
];

acceptHeaders.map((header) => {
  fetch("https://eloquentjavascript.net/author", {
    headers: { accept: header },
  })
    .then((resp) => {
      return `<div>Header: ${header} Code: ${resp.status} Text: ${resp.statusText}</div>`;
    })
    .then((text) => (fetchDiv.innerHTML += text));
});

// A JavaScript WorkBench Exercise

const codeTextArea = document.querySelector("#code");
const buttonRunCode = document.querySelector("#button");
let codeOutput = document.querySelector("#output");

buttonRunCode.addEventListener("click", () => {
  let code = "";
  try {
    code = Function(codeTextArea.value)();
  } catch (err) {
    code = err;
  }
  codeOutput.appendChild(document.createTextNode(`${code}\n`));
});
