import jsdom from 'jsdom';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {google} from './mock_google';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;
global.google = google;
global.window['google'] = google;
global.window['csrftoken'] = 'fakecsrftoken';

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});


chai.use(chaiImmutable);
