const axios = require('axios');
const crypto = require('crypto');

// 将这些值替换为您从交易网站获得的APIKey，SecretKey和Passphrase
const APIKey = 'e40e0557-d18a-4107-87c5-9d6bb824d9ed';
const SecretKey = 'D1B219EFD3484996C884243F4078DA72';
const Passphrase = 'CKPckp.0217';

function generateSignature(timestamp, method, requestPath, body) {
  const prehash = timestamp + method + requestPath + body;
  const secret = Buffer.from(SecretKey, 'base64');
  const hash = crypto.createHmac('sha256', secret).update(prehash).digest('base64');
  return hash;
}

async function getBitcoinPrice() {
  const method = 'GET';
  const requestPath = '/api/v5/market/history-mark-price-candles?instId=BTC-USD-SWAP';
  const timestamp = new Date().toISOString();
  const sign = generateSignature(timestamp, method, requestPath, '');

  const headers = {
    'OK-ACCESS-KEY': APIKey,
    'OK-ACCESS-PASSPHRASE': Passphrase,
    'Access-Control-Allow-Origin':'*'
  };

  try {
    const response = await axios.get(`http://www.okx.com${requestPath}`, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
async function testConnection() {
    try {
      const response = await axios.get('https://www.okx.com/api/v5/public/time');
      console.log(response.data);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
  
testConnection();
  
getBitcoinPrice();
