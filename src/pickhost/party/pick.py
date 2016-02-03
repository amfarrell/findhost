import requests

def find_most_convenient_meeting_point(meeting_points):
    """
    Given a dict of {name: geocodable_location},
    return the name of the location that is least-inconvenient
    for all parties involved.
    """
