const ctx = document.getElementById("stock-chart").getContext("2d");
let chart;

// for form submissions
document.getElementById("stock-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const ticker = document.getElementById("ticker").value.toUpperCase();
  const days = parseInt(document.getElementById("range").value);
  await fetchAndDrawStock(ticker, days);
});

// geting the stock chart from polygon.io
async function fetchAndDrawStock(ticker, days) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);

  const from = start.toISOString().split("T")[0];
  const to = end.toISOString().split("T")[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&sort=asc&limit=100&apiKey=n66t4hoqSofRrZVWRMJ38rHjGKqtTwbA`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    alert("No data for this ticker, try a different one.");
    return;
  }

  const labels = data.results.map(d => new Date(d.t).toLocaleDateString());
  const closeValues = data.results.map(d => d.c);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `${ticker} Closing Prices`,
        data: closeValues,
        borderColor: "blue",
        fill: false,
      }]
    }
  });
}

// getting the top 5 stocks from reddit
async function fetchTopRedditStocks() {
  const res = await fetch("https://tradestie.com/api/v1/apps/reddit?date=2022-04-03");
  const data = await res.json();

  const top5 = data.slice(0, 5);
  const tbody = document.querySelector("#reddit-table tbody");
  tbody.innerHTML = "";

  top5.forEach(stock => {
    const tr = document.createElement("tr");

    const link = document.createElement("a");
    link.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
    link.textContent = stock.ticker;
    link.target = "_blank";

    const icon = document.createElement("img");
    if (stock.sentiment === "Bullish") {
      icon.src = "assets/bullish.png"; 
      icon.alt = "Bullish";
    } else {
      icon.src = "assets/bearish.png";
      icon.alt = "Bearish";
    }

    icon.style.width = "30px";
    icon.style.height = "30px";

    tr.innerHTML = `
      <td>${link.outerHTML}</td>
      <td>${stock.no_of_comments}</td>
      <td>${icon.outerHTML}</td>
    `;
    tbody.appendChild(tr);
  });
}

// loading the chart in case of hash
window.addEventListener("DOMContentLoaded", () => {
  fetchTopRedditStocks();

  const hash = window.location.hash;
  if (hash) {
    const ticker = hash.replace("#", "").toUpperCase();
    document.getElementById("ticker").value = ticker;
    document.getElementById("range").value = "30";
    fetchAndDrawStock(ticker, 30);
  }
});

// changing the graph by voice command
window.addEventListener("hashchange", () => {
  const ticker = window.location.hash.replace("#", "").toUpperCase();
  if (ticker) {
    document.getElementById("ticker").value = ticker;
    document.getElementById("range").value = "30";
    fetchAndDrawStock(ticker, 30);
  }
});
