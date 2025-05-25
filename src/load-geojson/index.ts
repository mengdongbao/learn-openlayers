import "ol/ol.css";
import Map from 'ol/Map';
import View from 'ol/View';
import {getBaseLayer} from 'src/utils/basemap';
import {Vector as VectorSource} from 'ol/source';
import {GeoJSON} from "ol/format";
import VectorLayer from "ol/layer/Vector";
import {get as getProjection} from "ol/proj";

const map = new Map({
  target: 'map',
  layers: [getBaseLayer()],
  view: new View({
    center: [0, 0],
    zoom: 2,
  })
});

Reflect.set(window, 'map', map);

;(async () => {
  const response = await fetch('/data/china.json');
  const geojsonObject: object = await response.json();
  const geoJSON = new GeoJSON({
    dataProjection: getProjection('EPSG:4326')!,
    featureProjection: map.getView().getProjection()
  });
  const vectorSource = new VectorSource({
    features: geoJSON.readFeatures(geojsonObject),
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });
  map.getLayers().push(vectorLayer);
})();
