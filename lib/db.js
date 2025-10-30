const fs = require('fs').promises;
const path = require('path');
const dataPath = path.join(process.cwd(), 'data', 'products.json');

async function readProducts() {
  const json = await fs.readFile(dataPath, 'utf8');
  return JSON.parse(json);
}

async function writeProducts(products) {
  await fs.writeFile(dataPath, JSON.stringify(products, null, 2), 'utf8');
}

module.exports = { readProducts, writeProducts };
