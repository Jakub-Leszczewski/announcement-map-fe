import React, { useEffect, useState } from 'react'

interface UserCurrentGeolocation{
  coords: [number, number];
  isAllow: boolean;
}

export const useCurrenGeolocation = (initialLocation: [number, number]): UserCurrentGeolocation | null => {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [isAllow, setIsAllow] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const permissions = await navigator.permissions.query({ name: 'geolocation' });

      if (permissions.state === 'granted') {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoords([position.coords.latitude, position.coords.longitude]);
          setIsAllow(true);
        });
      } else {
        setCoords(initialLocation);
        setIsAllow(false);
      }
    })();
  });

  if(!coords) return null;

  return {
    coords,
    isAllow,
  }
}
