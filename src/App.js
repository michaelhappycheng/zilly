import React, { Component } from "react";
import StationSearch from "./StationSearch";
import SelectedStations from "./SelectedStations"
import axios from "axios";
import {Table} from 'react-bootstrap'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [],
      selectedStations: [],
      detailStationAbbr: "",
      selectedStationDetail: {},
      exploreStation: {}
    }
  }
  // default state object
  // state = {
  //   stations: [],
  //   selectedStations: [],
  //   detailStationAbbr: "",
  //   selectedStationDetail: {},
  //   exploreStation: {}
  // };

  // componentDidMount() {
  //   axios
  //     // .get("https://jsonplaceholder.typicode.com/users")
  //     .get("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y")
  //     .then(response => {
  //       // create an array of contacts only with relevant data
  //       const newStations = response.data.root.stations.station.map((c, key) => {
  //         return {
  //           // id: c.id,
  //           id: key,
  //           name: c.name,
  //           abbr: c.abbr,
  //           city: c.city,
  //           zip: c.zipcode,
  //         };
  //       });
        
  //       console.log("get response", response);
  //       // create a new "state" object without mutating
  //       // the original state object.
  //       const newState = Object.assign({}, this.state, {
  //         stations: newStations
  //       });

  //       // store the new state object in the component's state
  //       this.setState(newState);
  //     })
  //     .catch(error => console.log(error));
  // }

  // removeStationItem = itemAbbr => {
  //   const filteredStations = this.state.selectedStations.filter(
  //     (item, item_abbr) => {
  //       itemAbbr == item_abbr
  //       // this.setState({ detailStationAbbr: itemAbbr})
  //       // console.log("what is detailstation abbr????", itemAbbr.abbr)
  //       axios
  //       .get(`http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${itemAbbr.abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`)
  //       .then(response => {
  //         console.log('get station detail ', response)
  //         // return response.data.root.stations.station;
  //         this.setState({
  //           selectedStationDetail: response.data.root.stations.station
  //         })
  //       })
  //     }
  //   );
  //   this.setState({ selectedStations: filteredStations });
  // };

  addMinutes(time, minsToAdd) {
    function D(J){ return (J<10? '0':'') + J;};
    var apm = time.substr(9,2)
    var piece = time.substr(0,8).split(':');
    var mins = piece[0]*60 + +piece[1] + +minsToAdd;
  
    return D(mins%(24*60)/60 | 0) + ':' + D(mins%60) + ' ' +apm;  
  }  

  addStation = station => {
    const newStations = this.state.selectedStations.concat(station);
    console.log("addstation clicked, this station is added", station.abbr)
    axios
    // .get(`http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${station.abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`)
    .get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station.abbr}&plat=3&dir=n&key=MW9S-E7SL-26DU-VV8V&json=y`)
    .then(response => {
      console.log('get station detail ', response.data.root)
      // return response.data.root.stations.station;
      this.setState({
        exploreStation: response.data.root 
      })
      // return response.data.root.stations.station
    })
    
    this.setState({ selectedStations: newStations }); 
    
  }


  render() {
    const { selectedStations, exploreStation} = this.state;

    return (
      <div>
        <div>
          <SelectedStations
            // stations = {selectedStations}
            // stations = {selectedStationDetail ? selectedStationDetail : []}
            // onStationClick = {this.showStationDetail}
            addMinutes = {this.addMinutes}
            detailStation = {exploreStation}
          />
          
          <StationSearch
            // stations = {selectedStations} 
            onStationClick={this.addStation} 
          />
        </div>
      </div>
    );
  }
}

export default App;
