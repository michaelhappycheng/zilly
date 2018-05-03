import axios from "axios";
import React, { Component } from "react";
import StationSearch from "./StationSearch";
import SelectedStations from "./SelectedStations"

import {Table} from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exploreStation: {},
      selectedStations: [],
    }
  }
  
  addStation = station => {
    const newStations = this.state.selectedStations.concat(station);
    axios
    .get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${station.abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`)
    .then(response => {
      this.setState({
        exploreStation: response.data.root 
      })
    })

    this.setState({ selectedStations: newStations });     
  }

  render() {
    const { selectedStations, exploreStation} = this.state;

    return (
      <div>
        <div>
          <SelectedStations
            detailStation = {exploreStation}
          />
          
          <StationSearch
            onStationClick={this.addStation} 
          />
        </div>
      </div>
    );
  }
}

export default App;
