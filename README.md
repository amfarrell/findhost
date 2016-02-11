# Findhost
Given a bunch of your friends that want to have a board game night, who is the most conveniently-situated to host?

This application lets a user list three friends and their addresses, then
uses the Citymapper API to find how long it would take to get from one house
to another via public transit, and tells the user which location would be
least inconvenient for the group as a whole.

# Setting up Development Environment


Prerequisites:
- python2.7 or python3.5
- node version >= 4.2.3
- npm version >= 2.14.7

The development environment is split between node.js for the front end and
python/django for the back end.
Open two separate terminals.

Install required python packages and start the django server with
```
pip install -f ./requirements.txt
CITYMAPPER_API_KEY='<citymapper api key here>' python src/pickhost/manage.py runserver
```

install required npm packages and start serving the front end with
```
cd src/pickhost/static/
npm install
npm start
```

Then, visit http://localhost:8000
