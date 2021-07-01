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

// // LAT/LONG
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

// // FLYOVER TIMES
const fetchISSFlyOverTimes = function (coords, callback) {
  const lat = coords.latitude;
  const lon = coords.longitude;

  request(
    `http://api.open-notify.org/iss/v1/?lat=${lat}&lon=${lon}`,
    (error, res, body) => {
      if (error) {
        callback(error);
        return;
      }
      if (res && res.statusCode !== 200) {
        callback(Error(`Status Code ${res.statusCode}`), null);
        return;
      }
      if (body) {
        const data = JSON.parse(body);
        const response = data.response;

        const dates = response.map(
          ({ duration: durationSeconds, risetime }) => {
            const durationMinutes = durationSeconds / 60;
            const timeOfDay = new Date(risetime * 1000).toLocaleTimeString(
              "en-CA",
            );
            const visibleDate = new Date(risetime * 1000).toLocaleDateString(
              "en-CA",
            );

            return {
              risetime: visibleDate + ", " + timeOfDay,
              duration: durationMinutes.toFixed(2),
            };
          },
        );
        callback(null, dates);
      }
    },
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ipData) => {
    if (error) return;

    fetchCoordsByIP(ipData, (error, coordsData) => {
      if (error) return;

      fetchISSFlyOverTimes(coordsData, (error, datesData) => {
        if (error) return;

        callback(null, datesData);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
