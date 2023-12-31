import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';

// npm install @pbe/react-yandex-maps
export default function MapComponent() {
  const [coords, setCoords] = useState([]);

  async function getCoords() {
    navigator.geolocation.getCurrentPosition(function (position) {
      // ширина, долгота
      setCoords([position.coords.latitude, position.coords.longitude])
    });
  }

  useEffect(() => {
    getCoords()
  })

  const defaultState = {
    center: coords,
    zoom: 16,
  };

  return (
    <YMaps >
      <Map defaultState={defaultState} width={"470px"}>
        <Placemark geometry={coords} />
      </Map>
    </YMaps>
  );
}