const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  const ipAddress = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ipAddress}`);
};

const fetchISSFlyOverTimes = function (coords) {
  const { latitude, longitude } = JSON.parse(coords);
  return request(
    `http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}`,
  );
};
const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then((res) => {
      return fetchCoordsByIP(res);
    })
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      if (body) {
        const data = JSON.parse(body);
        const response = data.response;

        return response.map(({ duration: durationSeconds, risetime }) => {
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
        });
      }
    });
};

module.exports = { nextISSTimesForMyLocation };
