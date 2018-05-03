import React from "react";

import {Table} from 'react-bootstrap'

class SelectedStations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stationName: null,
      table: [],
      showHeader: false
    }
    this.iter = null;
    this.stationInfos = []
  }

  addMinutes(time, minsToAdd) {
    function D(J){ return (J<10? '0':'') + J;};
    var apm = time.substr(9,2)
    var piece = time.substr(0,8).split(':');
    var mins = piece[0]*60 + +piece[1] + +minsToAdd;
    return D(mins%(24*60)/60 | 0) + ':' + D(mins%60) + ' ' + apm;  
  }

  componentWillUpdate (props){
    // reset for incoming station information
    if (this.stationInfos.length !== 0) {
      this.stationInfos = []
    }

    // check if we need to update 
    if (props.detailStation.station !== undefined && this.props !== props) {
      this.state.stationName = props.detailStation.station[0].name
      
      // note the weird return JSON format ["0"], that allow station detail access
      if (props.detailStation.station["0"]) {
        for (this.iter in props.detailStation.station["0"].etd) {
          const currIter = props.detailStation.station["0"].etd[this.iter]
          
          // check if the time is a valid number (REGEX)
          const deptTime = 
                  currIter.estimate[0].minutes.match(/^-{0,1}\d+$/) ? 
                    this.addMinutes(props.detailStation.time, currIter.estimate[0].minutes) :
                    "Leaving"

          this.stationInfos.push({"dest": currIter.destination,
                              "ETD": deptTime,
                              "platform": currIter.estimate[0].platform
                            })
          // make sure the station platform # is in ascending order
          this.stationInfos.sort((a,b) => a.platform - b.platform)
          console.log("this.stateInfos is", this.stationInfos)
          this.setState({
            table: this.stationInfos,
            showHeader: true,
          })
        }
      } 
    } // end of prop update check
  }


  render() {
    console.log("selected Stations rendering", this.state.table)
    const { stations, table } = this.props;
    const stationRows = this.state.table.map((st, idx) => (
      <tr key={idx} >
        <td>{st.dest}</td>
        <td>{st.ETD}</td>
        <td>{st.platform}</td>
      </tr>
    ));
    
    return (
      <div>
        <Table responsive bordered condensed hover>
          {this.state.showHeader === true ? 
            <thead>
              <tr>
                <th className="text-left">{this.state.stationName}</th>
              </tr>
              <tr>
                <th className="text-left">Destination</th>
                <th className="text-left">Est. Departure Time</th>
                <th className="text-left">Platform</th>
              </tr>
            </thead> 
            : 
            null
          }   
          <tbody>            
            {this.state.showHeader === true ? stationRows : null}
          </tbody>
        </Table>
      </div>
    );
  }
}


export default SelectedStations;




