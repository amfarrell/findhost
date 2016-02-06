import requests
import random
import time
from math import inf as infinity
SLEEP_INTERVAL = 0

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


def get_traveltime(start_latlng, end_latlng):
    """
    Given the latlng for a starting point and the latlng for
    an ending point, return the travel time from the first to the second.
    """
    return random.randint(5,75)


'''
curl -v  -X GET "https://developer.citymapper.com/api/1/traveltime/?startcoord=51.525246%2C0.084672&endcoord=51.559098%2C0.074503&time=2014-11-06T19%3A00%3A02-0500&time_type=arrival&key=98d284b7d52b08711edebd5fb185df50"


{
 "travel_time_minutes": 37,
 "diagnostic": {
  "milliseconds": 1200
 }
}
'''
