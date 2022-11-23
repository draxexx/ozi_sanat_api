const CryptoJS = require("crypto-js");

const encryptString = (password) => {
  const key = process.env.CRYPTO_KEY;
  return CryptoJS.AES.encrypt(password, key).toString();
};

const decryptString = (password) => {
  const key = process.env.CRYPTO_KEY;
  return CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryptString,
  decryptString,
};
