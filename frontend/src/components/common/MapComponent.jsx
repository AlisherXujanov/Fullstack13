import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { useEffect, useState } from 'react';

// npm install @pbe/react-yandex-maps
export default function MapComponent(props) {
  const [coords, setCoords] = useState([]);

  function getCoords() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoords([position.coords.latitude, position.coords.longitude])
    });

  }
  useEffect(() => {
    if (props.coords) {
      setCoords(props.coords)
    } else {
      getCoords()
    }
  }, [])

  const defaultState = {
    center: coords,
    zoom: 16,
  };

  let normal_size = "40vw"
  let small_screen = 900

  if (window.innerWidth < small_screen) {
    normal_size = "80vw"
    // 1vw == 1% of the viewport
    // 1vh == 1% of the viewport height
  }
  else if (window.innerWidth < 750) {
    normal_size = "100vw"
  }

  return (
    <YMaps >
      <Map defaultState={defaultState} width={normal_size}>
        <Placemark geometry={coords} />
      </Map>
    </YMaps>
  );
}