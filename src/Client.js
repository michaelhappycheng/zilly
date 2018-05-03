import axios from "axios"

// function search(query, cb) {
//   return fetch(`http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${query}&key=MW9S-E7SL-26DU-VV8V&json=y`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(myJson) {
//       console.log(myJson);
//     });
// }


/* eslint-disable no-undef */
function search(query, cb) {
  console.log("searching", query)
  return axios
    .get(`http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${query}&key=MW9S-E7SL-26DU-VV8V&json=y`)
    .then(response => {
      console.log('getting statiosn', response.data.root.stations.station)
      return response.data.root.stations.station;
    })
    .then(cb)
    .catch(error => console.log(error, query));

  // return fetch(`http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${query}&key=MW9S-E7SL-26DU-VV8V&json=y`, {
  //   accept: "application/json"
  // })
  //   .then(checkStatus)
  //   .then(parseJSON)
  //   .then(cb);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log('checkStatus', response)
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  // return response.json();
  return response.json();
}

const Client = { search };
export default Client;