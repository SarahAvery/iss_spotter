/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

// //IP ADDRESS
const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  const endPoint = "https://api.ipify.org?format=json";
  request(`${endPoint}`, (error, res, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (res && res.statusCode !== 200) {
      callback("statusCode: " + res.statusCode);
      return;
    }
    if (body) {
      const data = JSON.parse(body);
      const ipAddress = data.ip;
      callback(null, ipAddress);
    }
  });
};

const fetchCoordsByIP = function (ip, callback) {
  // use request to fetch IP address from JSON API
  const endPoint = "https://freegeoip.app/json/";
  const ipAddress = ip;
  // const endPoint = "https://freegeoip.app/json/invalidIPHere";
  request(`${endPoint}${ipAddress}`, (error, res, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (res && res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode}`), null);
      return;
    }
    if (body) {
      const { latitude, longitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
    }
  });
};
// https://freegeoip.app/json/

module.exports = { fetchMyIP, fetchCoordsByIP };
