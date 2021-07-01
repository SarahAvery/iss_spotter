const { fetchMyIP, fetchCoordsByIP } = require("./iss");

let myIP = "107.190.97.133";

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

fetchCoordsByIP(myIP, (error, data) => {
  //
  if (error) {
    console.log(`Error Occured When Fetching Data`, error);
    return;
  } else {
    if (!data) {
      console.log(`No Coordinates Could Be Found`);
    }
    console.log(data);
  }
});
