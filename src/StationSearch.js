import axios from "axios"
import Client from "./Client";
import React from "react";
import {Table, tr, td, th, thead, tbody} from 'react-bootstrap'

import "./index.css"

class StationSearch extends React.Component {
  state = {
    stations: [],
    searchValue: "",
    allStations: [],
  };
  componentDidMount() {
    axios
    .get(`http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y`)
    .then(response => {
      this.setState({
        stations : response.data.root.stations.station,
        allStations : response.data.root.stations.station
      })
      return response.data.root.stations.station;
    })
    .catch(error => console.log(error));
  }
  

  handleSearchChange = e => {
    const value = e.target.value;
    
    this.setState({
      searchValue: value
    });
    
    if (value === "") {
      this.setState({
        stations: this.state.stations,
      });

    } else {
      this.setState({
        stations: this.state.allStations
      });

      // calling client axios call and set state
      Client.search(value, stations => {
        this.setState({
          stations: [stations]
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      stations: [],
      searchValue: ""
    });
  };
  
  render() {
    // console.log("in StationSearch, stations is", this.props.from_app_stations)
    const { stations } = this.state;
    const stationRows = stations.map((station, idx) => (
      <tr key={idx} onClick={() => this.props.onStationClick(station)}>
        <td class="text-left">{station.name}</td>
        <td class="text-left">{station.abbr}</td>
        <td class="text-left">{station.city}</td>
        <td class="text-left">{station.zipcode}</td>
      </tr>
    ));
    
    return (
      <div>
        <input
          class="input"
          type="text"
          placeholder="Search stations with [Abbr]..."
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
        />
        <Table responsive bordered condensed hover>
          <thead>
            <tr>
              <th className="text-left">Station Name</th>
              <th className="text-left">Abbr</th>
              <th className="text-left">City</th>
              <th className="text-left">ZipCode</th>
            </tr>
          </thead>
          <tbody>
            {stationRows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default StationSearch;
