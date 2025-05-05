window.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("index.html")) {
      fetch("https://zenquotes.io/api/random")
        .then(res => res.json())
        .then(data => {
          const quote = data[0]?.q + " – " + data[0]?.a;
          const quoteElem = document.createElement("p");
          quoteElem.textContent = quote;
          document.getElementById("main-content").appendChild(quoteElem);
        })
        .catch(console.error);
    }
  });
  