//import geocoder from 'google-geocoding'
//import geocoder from 'geocoder'
import {geocodeFinished} from './action_creators'
import store from './store'

if ('undefined' == typeof(window.geocoder) || 'undefined' == typeof(window.google)){
  /*
  The npm packages for geocoding are not reliable, therefore, we just put this
  in a script tag.
  */
  throw "both google and geocoder must be defined on the window"
}

/*
  function codeAddress(name, address){
      geocoder.geocode({'address': address}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
          console.log('{"'+name+'", "'+results[0].geometry.location.toUrlValue()+'"},')
        } else {
          console.log("Geocode was unsuccessful becase " + status)
        }
      })
  }
  */
export function applyGeocode(members, address, latlng) {
  console.log("applying geocode "+latlng+" for address "+address)
  return members.map((member) => {
    if (member.get('address') === address) {
      return member.merge({'latlng': latlng, 'latlng_dirty': false})
    } else {
      return member
    }
  })
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
