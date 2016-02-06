import requests
import urllib
import pytest
import time

from django.test import TestCase, Client
from django.core.urlresolvers import reverse

from django.conf import settings
from .models import Party, Member
from .views import create_party


now = pytest.mark.now

SLEEP_INTERVAL = 6.25

def get_traveltime(start, end):
    """
    Given a start coordinate and an end coordinate

    Can only call this function 5x per minute.
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
                return None
            print("need to do exponential backoff")
            time.sleep(sleeptime)
            sleeptime = sleeptime*2


@now
def test_call_citymapper():
    """
    Check that we can create objects at all.
    """
    party = 0
    member_data = [
       {'party': party, 'name': 'MIT',
        'address': '70 Massachusetts Avenue, Cambridge MA 02139',
        'latlng': "42.35925,-71.093781",
    }, {'party': party, 'name': 'Taza Chocolate',
        'address': '561 Windsor St, Somerville, MA 02143',
        'latlng': "42.375619,-71.093237",
    }, {'party': party, 'name': 'Cambridgeside Gallaria',
        'address': '100 Cambridgeside Pl, Cambridge, MA 02141',
        'latlng': "42.368126,-71.076239"
    }, {'party': party, 'name': 'Redbones BBQ',
        'address': '55 Chester St, Somerville, MA 02144',
        'latlng': "42.395196,-71.122354"
    }, {'party': party, 'name': 'Cambridge Friends School',
        'address': '5 Cadbury Rd, Cambridge, MA 02140',
        'latlng': "42.387906,-71.130619"
    }, {'party': party, 'name': 'Market Basket',
        'address': '400 Somerville Ave, Somerville, MA 02143',
        'latlng': "42.38073,-71.101597"
    }]
    #bulk_create does not create primary keys
    edges = dict()
    #{ destination : { source : travel_time}}
    for candidate_destination in member_data:
        edges[candidate_destination['name']] = dict()
        for start in member_data:
            if start['name'] == candidate_destination['name']:
                result = 0
            else:
                result = get_traveltime(start['latlng'], candidate_destination['latlng'])
                time.sleep(SLEEP_INTERVAL)
            edges[candidate_destination['name']][start['name']] = result
    import pdb;pdb.set_trace()
    print(edges)
