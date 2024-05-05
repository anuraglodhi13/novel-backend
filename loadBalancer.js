const express = require("express");
const axios = require("axios");

const app = express();

const servers = ["http://localhost:8081", "http://localhost:8082"];

let currentIndex = 0;

function getNextServer() {
  currentIndex++;
  if (currentIndex >= servers.length) {
    currentIndex = 0;
  }

  return servers[currentIndex];
}

async function healthCheck() {
  for (let i = 0; i < servers.length; i++) {
    const result = await axios.get(servers[i] + "/health");

    if (result.status !== 200) {
      servers.splice(i, 1);
      i--;
    }
  }

  setInterval(async () => {
    let serverAdded = false;
    for (let i = 0; i < servers.length; i++) {
      const result = await axios.get(servers[i] + "/health");
      if (result.status === 200 && !servers.includes(servers[i])) {
        servers.push(servers[i]);
        serverAdded = true;
      }
    }

    if (serverAdded) {
      console.log("Server added back to pool");
    }
  }, 5000);
}

healthCheck();

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.get("*", async (req, res) => {
  const server = getNextServer();
  try {
    const result = await axios.get(server + req.url);
    res.status(result.status).send(result.data);
  } catch (err) {
    res.status(500).send("Failed to connect to backend");
  }
});

app.listen(80, () => {});
