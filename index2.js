const { nextISSTimesForMyLocation } = require("./iss-promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    const timeStr = passTimes.map(({ risetime, duration }) => {
      return `Date: ${risetime}\nDuration of visibility: ${duration} minutes\n`;
    });

    console.log(timeStr.join(`\n`));
  })
  .catch((err) => {
    console.log(`It didn't work: ${err.message}`);
  });
