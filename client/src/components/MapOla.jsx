import { useState, useEffect } from "react";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const MapOla = ({ lat, lng }) => {
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (!mapReady) return;

    const map = new MapLibreMap({
      container: "central-map",
      center: [lng, lat],
      zoom: 7.5,
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      transformRequest: (url, resourceType) => {
        if (!url.includes("?")) {
          url = url + `?api_key=${import.meta.env.VITE_OLAMAPS_API_KEY}`;
        } else {
          url = url + `&api_key=${import.meta.env.VITE_OLAMAPS_API_KEY}`;
        }
        return { url, resourceType };
      },
    });

    const nav = new NavigationControl({
      visualizePitch: true,
    });
    map.addControl(nav, "top-left");
  }, [mapReady]);

  return (
    <div
      style={{ width: "100%", height: "400px", overflow: "hidden" }}
      ref={() => setMapReady(true)}
      id="central-map"
    />
  );
};
