const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

let myIP = "107.190.97.133";
let coords = { latitude: "43.3754", longitude: "-79.38456" };

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   } else {
//     if (!ip) {
//       console.log(`No IP Address Found`);
//     }
//     console.log("It worked! Returned IP:", ip);
//   }
// });

// fetchCoordsByIP(myIP, (error, data) => {
//   //
//   if (error) {
//     console.log(`Error Occured When Fetching Data`, error);
//     return;
//   } else {
//     if (!data) {
//       console.log(`No Coordinates Could Be Found`);
//     }
//     console.log(data);
//   }
// });

fetchISSFlyOverTimes(coords, (error, data) => {
  //
  if (error) {
    console.log(`Error Occured When Fetching Data`, error);
    return;
  } else {
    if (!data) {
      console.log(`No Coordinates Could Be Found`);
    }
    const firstTime = `Date: ${data[0].risetime}\nDuration of visibility: ${data[0].duration} minutes`;
    const secondTime = `Date: ${data[1].risetime}\nDuration of visibility: ${data[1].duration} minutes`;
    const thirdTime = `Date: ${data[2].risetime}\nDuration of visibility: ${data[2].duration} minutes`;
    const fourthTime = `Date: ${data[3].risetime}\nDuration of visibility: ${data[3].duration} minutes`;
    const fifthTime = `Date: ${data[4].risetime}\nDuration of visibility: ${data[4].duration} minutes`;
    console.log(
      `${firstTime}\n\n${secondTime}\n\n${thirdTime}\n\n${fourthTime}\n\n${fifthTime}`,
    );
  }
});
