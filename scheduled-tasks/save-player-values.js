const request = require("request");

const saveQbValuesUrl = "https://usfl-node-bidder.herokuapp.com/api/playervalues/qb";
const saveRbValuesUrl = "https://usfl-node-bidder.herokuapp.com/api/playervalues/rb";
const saveWrValuesUrl = "https://usfl-node-bidder.herokuapp.com/api/playervalues/wr";
const saveTeValuesUrl = "https://usfl-node-bidder.herokuapp.com/api/playervalues/te";

var today = new Date();

if(today.getDay() === 2){
    // save qb values
request.post(saveQbValuesUrl, (error, response, body) => {
    let json = JSON.parse(body);
    console.log("error: " + error);
    console.log("response: " + response);
    console.log("body: " + body);
  });
  
  // save rb values
  request.post(saveRbValuesUrl, (error, response, body) => {
      let json = JSON.parse(body);
      console.log("error: " + error);
      console.log("response: " + response);
      console.log("body: " + body);
    });
  
  // save wr values
  request.post(saveWrValuesUrl, (error, response, body) => {
      let json = JSON.parse(body);
      console.log("error: " + error);
      console.log("response: " + response);
      console.log("body: " + body);
    });
  
  // save te values
  request.post(saveTeValuesUrl, (error, response, body) => {
      let json = JSON.parse(body);
      console.log("error: " + error);
      console.log("response: " + response);
      console.log("body: " + body);
    });  
}



