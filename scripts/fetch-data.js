const axios = require("axios");
const fs = require("fs-extra");

const API_URL = "https://api.wc2026api.com";
const API_KEY = process.env.WC_API_KEY;

const headers = {
  Authorization: `Bearer ${API_KEY}`
};

async function fetchAndSave(endpoint, filename) {
  try {
    console.log(`Fetching ${endpoint}...`);

    const response = await axios.get(`${API_URL}/${endpoint}`, {
      headers
    });

    await fs.ensureDir("data");
    await fs.writeJson(`data/${filename}.json`, response.data, { spaces: 2 });

    console.log(`Saved ${filename}.json`);
  } catch (err) {
    console.error(`Error fetching ${endpoint}`, err.message);
    process.exit(1);
  }
}

async function run() {
  await fetchAndSave("matches", "matches");
  await fetchAndSave("teams", "teams");
  await fetchAndSave("groups", "groups");
}

run();