import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

export function getBaseLayer() {
  return new TileLayer({
      source: new XYZ({
        url: '/bing/{z}/{x}/{y}.png'
      })
    })
}