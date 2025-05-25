import "ol/ol.css";
import Map from 'ol/Map';
import View from 'ol/View';
import {getBaseLayer} from 'src/utils/basemap';

const map = new Map({
  target: 'map',
  layers: [getBaseLayer()],
  view: new View({
    center: [0, 0],
    zoom: 2,
  })
});

Reflect.set(window, 'map', map);