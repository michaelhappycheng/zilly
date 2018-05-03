import axios from "axios"
import React from "react";
import Client from "./Client";
import "./index.css"
// import { Grid, Row, Col } from 'react-bootstrap';
import {Table, tr, td, th, thead, tbody} from 'react-bootstrap'
const MATCHING_ITEM_LIMIT = 10;


class StationSearch extends React.Component {
  state = {
    stations: [],
    showRemoveIcon: false,
    searchValue: "",
    allStations: [],
  };
  componentDidMount() {
    axios
    .get(`http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y`)
    .then(response => {
      console.log('getting all stations statiosn', response.data.root.stations.station)
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
        showRemoveIcon: false
      });

    } else {
      this.setState({
        showRemoveIcon: true,
        stations: this.state.allStations
      });



      Client.search(value, stations => {
        console.log("Client.search back from Client", stations)
        this.setState({
          stations: [stations]
        });
        
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      stations: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  };
  
  render() {
    // console.log("in StationSearch, stations is", this.props.from_app_stations)
    const { showRemoveIcon, stations } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };
    console.log("constant update when state is changing in stateion Search")
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
