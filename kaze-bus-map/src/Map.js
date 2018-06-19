import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react'
import './Map.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component{
    static defaultProps = {
        center: {
          lat: 11.058186,
          lng: 106.6837316
        },
        zoom: 11
      };
    
    render(){
      let style=null;
      if(this.props.displaySidebar){
        style = {
          height: (this.props.height-80),
          width: (this.props.width-300),
          left: (300)
        }
      }
      else{
        style = {
          height: (this.props.height-80),
          width: (this.props.width),
          left: 0
        }
      }
        
      return (<div className="Map" style={style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCqcvS0_drAFXZkKPjIqMxFe2E3IOYnE90" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>);
    }
}

export default Map;