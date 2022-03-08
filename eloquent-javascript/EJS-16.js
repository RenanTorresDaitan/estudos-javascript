const fetchDiv = document.querySelector("#fetchResult");

fetchDiv.textContent = "teste";

fetch("https://eloquentjavascript.net/author").then((resp) =>
  resp.headers.forEach((v) => console.log(v))
);
