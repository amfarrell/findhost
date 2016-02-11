import sinon from 'sinon';

export const LATLNG_URLVALUES = [
  '42.3591,-71.0934',
  '42.4591,-71.0634',
  '42.3501,-71.0234',
];

const makeGeocodeResult = function(index){
  return {
    geometry: {
      location: {
        toUrlValue: function(){LATLNG_URLVALUES[index % LATLNG_URLVALUES.length]}
      }
    }
  }
}

const geocode = sinon.stub();
geocode.onCall(0).returns(makeGeocodeResult(0))
geocode.onCall(1).returns(makeGeocodeResult(1))
geocode.onCall(2).returns(makeGeocodeResult(2))


export const google = {
  maps: {
    LatLng: function(lat, lon){
      return {lat: lat, lon: lon, };
    },
    LatLngBounds: function(){
      return {
        extend: function(newLatLng){ }
      }
    },
    TransitLayer: function(){
      return {
        setMap: function(map){ }
      }
    },
    MapTypeId: {
      ROADMAP: 'ROADMAP'
    },
    Map: function(canvas, optins){
      return {
        setOptions: function(options){ },
        setCenter: function(center){ },
        fitBounds: function(bounds){ },
      }
    },
    Geocoder: function(){
      return {
        geocode: function(addrmap, callback) {
          callback([makeGeocodeResult(1)], 'OK');
        }
      }
    },
    GeocoderStatus: {
      OK: 'OK',
    }
  }
}
