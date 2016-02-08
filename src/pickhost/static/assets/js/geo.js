//import geocoder from 'google-geocoding'
//import geocoder from 'geocoder'
import {geocodeFinished} from './action_creators';
import store from './store';

if ('undefined' == typeof(window.google)){
  /*
  The npm packages for geocoding are not reliable, therefore, we just put this
  in a script tag.
  */
  throw "The window object must have the google api object and a function to get the id of the google map div.";
}
const originalMapOptions = {
  zoom: 12,
//  center: new window.google.maps.LatLng('42.35925','-71.093781'), //Arbitrarily, center on pMIT
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
  console.log(typeof(lazy_map));
  if ('undefined' === typeof(lazy_map)){
    map_initialize()
  }
  return lazy_map;
}



const makeMarker = function(name, position) {
  return new window.google.maps.Marker({
    position: position,
    map: map(),
    title: name
  });
}
const LatLng = function(latlng_string){
  /* Convert urlstring back to google maps LatLng object */
    const latlng = JSON.parse('['+latlng_string+']');
    return new window.google.maps.LatLng(latlng[0], latlng[1]);
}

export function removeMarker(member){
  if (member.get('marker')){
    member.get('marker').setMap(null);
  }
}

export function pickMarker(members, address){
  members.forEach((member) => {
    if (member.get('marker')){
      if (address === member.get('address')){
        member.get('marker').setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
      } else {
        member.get('marker').setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
      }
    }
  });
}

export function applyGeocode(members, address, latlng) {
  /*
    Fill in the latitude and longitude value for all members with the given address.
    Place pins on the map for them and adjust the bounds of the map.
  */

  const newBounds = new window.google.maps.LatLngBounds();
  let points = 0;
  const newMembers = members.map((member) => {

    if (member.get('address') === address) {
      if (null === latlng){
        //No geocoded latlng passed. Clear the marker.
        removeMarker(member);
        return member.merge({
          latlng: undefined,
          latlng_dirty: true,
        })
      }

      points += 1;
      newBounds.extend(LatLng(latlng));
      if (member.get('marker')) {
        member.get('marker').setPosition(LatLng(latlng));
        return member.merge({
          latlng: latlng,
          latlng_dirty: false,
        })
      } else {
        return member.merge({
          latlng: latlng,
          latlng_dirty: false,
          marker: makeMarker(member.get('name'), LatLng(latlng))
        })
      }
    } else {
      if (member.get('latlng')){
        points += 1;
        newBounds.extend(LatLng(member.get('latlng')));
      }
      return member
    }
  });
  if (0 === points){
    map().setOptions(originalMapOptions);
  } else if (1 < points){
    map().fitBounds(newBounds);
  } else {
    map().setCenter(LatLng(latlng));
  }
  return newMembers;
}

export function getGeocode(address) {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({address: address}, (data, status) => {
    if (status == google.maps.GeocoderStatus.OK){
      const latlng = data[0].geometry.location.toUrlValue()
      console.log("got result back from google. geocode of " + address + " is " + latlng)
      store.dispatch(geocodeFinished(address, latlng))
    } else {
      store.dispatch(geocodeFinished(address, null))
      console.log("Geocode was unsuccessful becase " + status)
    }
  });
}
