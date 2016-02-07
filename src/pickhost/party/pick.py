import requests
import urllib
import random
from django.conf import settings
import time
import six
if six.PY2:
    from decimal import Decimal
    infinity = Decimal('Infinity')
else:
    from math import inf as infinity
SLEEP_INTERVAL = 6

def pick_address(party):
    """
    Given an array of dicts [{name: str, latlng: str, address: str}],
    return the dict of the location that is least-inconvenient
    for all parties involved.
    """
    meeting_points = party.meeting_points()
    best_destination = None
    best_inconvenience = infinity
    for candidate_destination in meeting_points:
        inconvenience = 0
        for start in meeting_points:
            if start['address'] != candidate_destination['address']:
                inconvenience += get_traveltime(start['latlng'], candidate_destination['latlng'])
                time.sleep(SLEEP_INTERVAL)
        if inconvenience < best_inconvenience:
            best_destination = candidate_destination
            best_inconvenience = inconvenience
    party.best_host_id = best_destination['id']

    return best_destination


def fake_get_traveltime(start_latlng, end_latlng):
    """
    Given the latlng for a starting point and the latlng for
    an ending point, return the travel time from the first to the second.
    """
    print("generated fake traveltime")
    return random.randint(5,75)

def get_traveltime(start, end):
    """
    Given a start coordinate and an end coordinate

    an ending point, return the travel time from the first to the second.
    Currently, can only call this function 5x per minute.
    """
    url = urllib.parse.urljoin(settings.CITYMAPPER_URL, '/api/1/traveltime/')
    sleeptime = SLEEP_INTERVAL
    while True:
        response = requests.get(url=url, params={
            'startcoord': start,
            'endcoord': end,
            'key': settings.CITYMAPPER_API_KEY
        })
        result = response.json()
        if result.get('travel_time_minutes'):
            sleeptime = SLEEP_INTERVAL
            print("got result on time")
            return result.get('travel_time_minutes')
        else:
            if sleeptime > 2**4:
                print("waited for too long.")
                return infinity
            print("need to do exponential backoff")
            time.sleep(sleeptime)
            sleeptime = sleeptime*2

'''
curl -v  -X GET "https://developer.citymapper.com/api/1/traveltime/?startcoord=51.525246%2C0.084672&endcoord=51.559098%2C0.074503&time=2014-11-06T19%3A00%3A02-0500&time_type=arrival&key=98d284b7d52b08711edebd5fb185df50"


{
 "travel_time_minutes": 37,
 "diagnostic": {
  "milliseconds": 1200
 }
}
'''
