import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

/**
 * 获取一个简单的 XYZ 瓦片图层 (只有前三级)
 * @returns {TileLayer}
 */
export function getBaseLayer() {
  return new TileLayer({
      source: new XYZ({
        url: '/bing/{z}/{x}/{y}.png'
      })
    })
}