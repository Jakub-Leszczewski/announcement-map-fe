import React, { useEffect, useState } from 'react'

interface UserCurrentGeolocation{
  coords: [number, number] | null;
  isAllow: boolean;
}

export const useCurrenGeolocation = (initialLocation: [number, number]): UserCurrentGeolocation => {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [isAllow, setIsAllow] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords([position.coords.latitude, position.coords.longitude]);
          setIsAllow(true);
        },
        () => {
          setCoords(initialLocation);
          setIsAllow(false);
        }, {
          enableHighAccuracy:true,
          maximumAge: 10000,
          timeout: 5000
        }
      );
    })();
  }, []);

  return {
    coords,
    isAllow,
  }
}
