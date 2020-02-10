import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import axios from 'axios';
import { DialogTitle } from '@material-ui/core';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
      homeowners: [],
      businessOwners: []
    };
  }

  async componentDidMount() {
    var self = this;
    var apiBaseUrl = "https://hpcompost.com/api/users/";

    await axios.get(apiBaseUrl + "hosts?id=" + this.props.location.state.id, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
      if (response.data.success == true) {
        self.setState({ homeowners: response.data.homeowners, businessOwners: response.data.businessOwners })
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  onMarkerClick = (props, marker, e) => {
    console.log(props)
    console.log(marker)
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderHomeownerMarkers() {
    return this.state.homeowners.map((homeowner, i) => {
      return <Marker
        key={i}
        title={homeowner.name.first.concat(" ", homeowner.name.last)}
        position={{ lat: homeowner.location.lat, lng: homeowner.location.long }}
        icon={{ url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" }}
        onClick={this.onMarkerClick}
        options={{
          allowedItems: homeowner.allowedItems,
          prohibitedItems: homeowner.prohibitedItems
        }}
      />
    })
  }

  renderBusinessOwnerMarkers() {
    return this.state.businessOwners.map((businessOwner, i) => {
      return <Marker
        key={i}
        title={businessOwner.name.first.concat(" ", businessOwner.name.last)}
        position={{ lat: businessOwner.location.lat, lng: businessOwner.location.long }}
        icon={{ url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png" }}
        onClick={this.onMarkerClick}
        options={{
          allowedItems: businessOwner.allowedItems,
          prohibitedItems: businessOwner.prohibitedItems
        }}
      />
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 30.266666, lng: -97.733330 }}
      >
        {this.renderHomeownerMarkers()}
        {this.renderBusinessOwnerMarkers()}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h3>{this.state.selectedPlace.title}</h3>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyByA8HpRS2kg5JWrU-zJ0UO_k2rBq2HyDw'
})(MapContainer);

// add style here to mimic 'container'
const mapStyles = {
  width: '100%',
  height: '100vh',
};