import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css';
import '../../utils/fix-map-icons'

//1. dodajemy MapContainer z leafleta w nim ustawiamy center(domyślna pozycja)=[x, y] i zoom={10}
//2. dodajemy warstwe, w niej możemy dodać url(z niego będzie pobierana warstwa) i attribution - informacje o
// autorze(dla open source)
//3. importujemy style import 'leaflet/dist/leaflet.css';
//4. importujemy wcześniej stworzony plik import '../../utils/fix-map-icons';

//Dodawanie markera
//1. Do tagu MapContainer dodajemy tag Marker a w nim atrybut position z koordynatami [x,y]
//2. Do tagu Marker dodajemy tag Popup, a w nim nasz popup np tytuł opis itd
export const Map = () => {
  return (
    <div className="Map">
      <MapContainer center={[52.2408503,21.0065499]} zoom={7}>
        <TileLayer
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> & contributors"
        />

        <Marker position={[52.2408503,21.0065499]}>
          <Popup><h1>test</h1></Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
