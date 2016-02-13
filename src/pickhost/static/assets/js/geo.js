//import geocoder from 'google-geocoding'
//import geocoder from 'geocoder'
import {geocodeFinished} from './action_creators';
import store from './store';

if ('undefined' == typeof(window.google)){
  /*
  The npm packages for geocoding are not reliable, therefore, we just put this
  in a script tag.
  */
  throw "The window object must have the google api object defined.";
}
const originalMapOptions = {
  zoom: 12,
//  center: new window.google.maps.LatLng('42.35925','-71.093781'), //Arbitrarily, center on MIT
  center: new window.google.maps.LatLng('51.524189','-0.106811'), //Arbitrarily, center on London
  mapTypeId: window.google.maps.MapTypeId.ROADMAP
}

let lazy_map;
export const map = function(mapCanvasId){
  /*
    A Google Map is not a react component and needs to be created after the
    root component has been rendered. Therefore, lazily evaluate it so it can be
    created after the component is rendered.

    It is manipulated through side-effects.

    Keep it in a singleton here.
  */
  const map_initialize = function() {

    const mapCanvas = window.document.getElementById(mapCanvasId);
    lazy_map = new window.google.maps.Map(mapCanvas, originalMapOptions);
    const transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(lazy_map);
  }
  if ('undefined' === typeof(lazy_map)){
    map_initialize()
  }
  return lazy_map;
}


export function EmptyMarker(){
  return new window.google.maps.Marker({
    position: new window.google.maps.LatLng(0.0, 0.0),
  })
}

export const clearMarker = function clearMarker(marker){
  marker.setPosition(new window.google.maps.LatLng(0.0, 0.0));
  marker.setMap(undefined);
}

const updateMarker = function updateMarker(marker, latlng, label=''){
  marker.setMap(map());
  marker.setPosition(latlng);
}

export function pickMarker(address){
  const members = store.getState().get('members')
  members.forEach((member) => {
    if (address === member.get('address')){
      member.get('marker').setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    } else {
      member.get('marker').setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
    }
  });
}

export function getPosition(member){
  return member.get('marker').getPosition().toUrlValue()
}

export function redrawMap(){
  /*
  Resize and pan the map based on the updated markers.
  */
  const members = store.getState().get('members')

  const newBounds = new window.google.maps.LatLngBounds();
  let atLeastOnePoint;
  /*
  If only one position is valid, center the map on it,
  but don't zoom in all the way.
  */
  let points = 0;
  members.forEach((member) => {
    if (undefined !== member.get('marker').getMap()){
      atLeastOnePoint = member.get('marker').getPosition();
      newBounds.extend(member.get('marker').getPosition());
      points += 1;
    }
  });
  if (0 === points){
    map().setOptions(originalMapOptions);
  } else if (1 === points){
    map().setOptions(originalMapOptions);
    map().setCenter(atLeastOnePoint);
  } else {
    map().fitBounds(newBounds);
  }
}

export function updateGeocode(member, address) {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({address: address}, (data, status) => {
    if (status == google.maps.GeocoderStatus.OK){
      // We got the result back successfully. Update data.
      updateMarker(member.get('marker'), data[0].geometry.location, member.get('name'))
    } else {
      // Geocode returned nothing. Update to remove stale location.
      clearMarker(member.get('marker'))
    }
    redrawMap()
  });
}
