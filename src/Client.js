import axios from "axios"

function search(query, cb) {
  return axios
    .get(`https://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${query}&key=MW9S-E7SL-26DU-VV8V&json=y`)
    .then(response => {
      console.log('getting statiosn', response.data.root.stations.station)
      return response.data.root.stations.station;
    })
    .then(cb)
    .catch(error => console.log(error, query));
}

const Client = { search };
export default Client;