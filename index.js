const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

// let myIP = "107.190.97.133";
// let coords = { latitude: "43.3754", longitude: "-79.38456" };

nextISSTimesForMyLocation((error, passTimes) => {
  if (error || !passTimes.length) {
    console.log("It didn't work!", error);
  }

  const timeStr = passTimes.map(({ risetime, duration }) => {
    return `Date: ${risetime}\nDuration of visibility: ${duration} minutes\n`;
  });

  console.log(timeStr.join(`\n`));
});
