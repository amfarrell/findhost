//import geocoder from 'google-geocoding'
//import geocoder from 'geocoder'
import {geocodeFinished} from './action_creators';
import store from './store';

if ('undefined' == typeof(window.getMapCanvas) || 'undefined' == typeof(window.google)){
  /*
  The npm packages for geocoding are not reliable, therefore, we just put this
  in a script tag.
  */
  throw "The window object must have the google api object and a function to get the id of the google map div.";
}


const geocoder = new window.google.maps.Geocoder();

const map_initialize = function() {
  const mapOptions = {
    zoom: 8,
    center: new window.google.maps.LatLng('42.35925','-71.093781'), //Arbitrarily, center on MIT
    mapTypeId: window.google.maps.MapTypeId.ROADMAP
  }
  const map = new window.google.maps.Map(window.getMapCanvas(), mapOptions);
  const transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);
  return map;
}

const map = map_initialize();

const makeMarker = function(name, position) {
  return new window.google.maps.Marker({
    position: position,
    map: map,
    title: name
  });
}
const LatLng = function(latlng_string){
  /* Convert urlstring back to google maps LatLng object */
    const latlng = JSON.parse('['+latlng_string+']');
    return new window.google.maps.LatLng(latlng[0], latlng[1]);
}

export function removeMarker(member){
  if (member.get(index).get('marker')){
    member.get(index).get('marker').setMap(null);
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
  const newMembers = members.map((member) => {
    if (member.get('address') === address) {
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
        newBounds.extend(LatLng(member.get('latlng')));
      }
      return member
    }
  });
  map.fitBounds(newBounds);
  return newMembers;
}

export function getGeocode(address) {
  geocoder.geocode({address: address}, (data, status) => {
    if (status == google.maps.GeocoderStatus.OK){
      const latlng = data[0].geometry.location.toUrlValue()
      console.log("got result back from google. geocode of " + address + " is " + latlng)
      store.dispatch(geocodeFinished(address, latlng))
    } else {
      console.log("Geocode was unsuccessful becase " + status)
    }
    /*
      Tell the redux store that we will need to apply the geocode
    */
  });
}
