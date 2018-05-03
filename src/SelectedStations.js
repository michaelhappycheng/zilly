import React from "react";
import axios from "axios"
import {Table} from 'react-bootstrap'

//Goal: after selected station(prop) is update, 
// we need to do another axios call with the abbr
// then update the component by generating another table eta time for south and north bound


class SelectedStations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailStationAbbr: "",
      currentStation: {},
      North: null,
      South: null,
      result1: null,
      result2: null,
      currentTime: new Date(),
      stationName: null
    }
  }

  // componentWillReceiveProps(nexProps) {
  //   if (nextProps.detailStation.abbr !== this.props.detailStation.abbr) {
  //     console.log("component will receive props work?")
  //     this.setState({
  //       currentStation : nextProps.detailStation
  //     })
  //   }
  // }
  // componentWillUpdate() {
  //   console.log("component did update", this.props.detailStation.abbr)
    
  //   axios
  //   // .get(`http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=${this.props.detailStation.abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`)
  //   .get(`http://api.bart.gov/api/etd.aspx?cmd=etd&orig=${this.props.detailStation.abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`)
  //   .then(response => {
  //     console.log('getting real time etimate', response.data.root.station)

  //     // if (response.data.root.stations.station.south_platforms) {
  //     //   this.setState({
  //     //     south_routes: response.data.root.stations.station.south_platforms
  //     //   })
  //     //   console.log('we got some south routes', this.state.south_routes)
  //     // }
  //     // if (response.data.root.stations.station.north_platforms) {
  //     //   this.setState({
  //     //     north_routes: response.data.root.stations.station.north_platforms
  //     //   })
  //     //   console.log('we got some north routes', this.state.north_routes)
  //     // }
      
  //     // this.setState({
  //     //   stations : response.data.root.stations.station,
  //     //   allStations : response.data.root.stations.station
  //     // })
  //     return response.data.root.stations.station;
  //   })
  // 
  //   .catch(error => console.log(error));
  // }
  

  render() {
    const { stations } = this.props;

    console.log("selectedstations render", this.props.detailStation.station)
    
    // const stationRows = stations.map((station, idx) => (
    //   <tr key={idx} >
    //     <td >{station.name}</td>
    //     <td >{station.north_routes}</td>
    //     <td >{station.south_routes}</td>
    //     <td >{station.zipcode}</td>
    //   </tr>
    // ));
    
    if (this.props.detailStation.station != undefined) {
      // console.log("inside first if loop", this.props.detailStation.station[0].etd["0"].estimate)
      if (this.props.detailStation.station[0]) {
        console.log('show me some', this.props.detailStation.station)
        if ('etd' in this.props.detailStation.station[0]) {
          console.log('HHHHHHHHH', this.props.detailStation.station)
          this.state.North = "North Bound"
          this.state.stationName = this.props.detailStation.station[0].name
          this.state.NorthStationNumber = "Platform #"
          this.state.result1 = this.props.detailStation.station[0].etd["0"].estimate.map((station, idx) => (
            <tr key= {idx}>
              <td> {this.props.addMinutes(this.props.detailStation.time, station.minutes)} </td>
              <td> {station.platform} </td>
              {/* <td> {station.direction} </td> */}
            </tr>
          ));
        } else if ('etd' in this.props.detailStation.station[0]) {
          this.state.North = "South Bound"
          this.state.result2 = this.props.detailStation.station[0].etd["1"].estimate.map((station, idx) => (
            <tr key= {idx}>
              <td> {station.minutes} </td>
              <td> {station.platform} </td>
              <td> {station.direction} </td>
            </tr>
          ));
        }
      } 
    } 
    
    return (
      <div>
        <Table responsive bordered condensed hover>
          <thead>
            <tr>
              <th className="text-left">{this.state.stationName}</th>
            </tr>
            <tr>
              <th className="text-left">{this.state.North}</th>
              <th className="text-left">{this.state.NorthStationNumber}</th>
            </tr>
          </thead>
          <tbody>            
            {this.state.result1}
          </tbody>
        </Table>
        <Table responsive bordered condensed hover>
          <thead>
            <tr>
              <th className="text-left">{this.state.South}</th>
            </tr>
          </thead>
          <tbody>            
            {this.state.result2}
          </tbody>
        </Table>
      </div>
    );
  }
}

SelectedStations.defaultProps = {currentStation:[]};
export default SelectedStations;




