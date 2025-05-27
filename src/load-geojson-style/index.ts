import "ol/ol.css";
import Map from 'ol/Map';
import View from 'ol/View';
import {getBaseLayer} from 'src/utils/basemap';
import {Vector as VectorSource} from 'ol/source';
import {GeoJSON} from "ol/format";
import Feature from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import {get as getProjection} from "ol/proj";
import {Fill, Style, Icon, Circle, Stroke} from "ol/style";
import {fromString} from "ol/color";
import ol from "ol/dist/ol";

const map = new Map({
  target: 'map',
  layers: [getBaseLayer()],
  view: new View({
    center: [0, 0],
    zoom: 2,
  })
});

Reflect.set(window, 'map', map);

/**
 * 获取图层默认样式
 */
function getDefaultStyle(): Style {
  return new Style({
    fill: new Fill({
      color: fromString('#3b5765')
    }),
    stroke: new Stroke({
      width: 1, color: [255, 255, 255],
    })
  })
}


function clearVector() {
  const layers = map.getLayers().getArray();
  const filter = layers.filter(layer => layer instanceof VectorLayer);
  filter.forEach(layer => {
    map.removeLayer(layer);
  })
}

/**
 * 加载带样式的 GeoJSON
 * @param featureStyleCB
 */
export async function loadStyle(featureStyleCB?: (features: Feature[]) => void) {
  clearVector();
  const response = await fetch('/data/china.json');
  const geojsonObject: object = await response.json();
  const geoJSON = new GeoJSON({
    dataProjection: getProjection('EPSG:4326')!,
    featureProjection: map.getView().getProjection()
  });
  const features = geoJSON.readFeatures(geojsonObject);
  featureStyleCB && featureStyleCB(features);
  const vectorSource = new VectorSource({
    features,
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: getDefaultStyle()
  });
  map.addLayer(vectorLayer);
}


const capitalStyle = new Style({
  fill: new Fill({//填充样式
    color: '#ff6688',
  }),
  stroke: new Stroke({
    width: 5, color: fromString('#830404'),
  })
})

export async function loadStyleByFeature() {
  await loadStyle(features => {
    features.forEach(feature => {
      const properties = feature.getProperties();
      if (properties.name === '北京市') {
        feature.setStyle(capitalStyle);
      } else {
        feature.setStyle(getDefaultStyle());
      }
    });
  })
}
