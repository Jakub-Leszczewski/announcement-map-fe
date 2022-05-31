import React, { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css';
import '../../utils/map-icons'
import { useCurrenGeolocation } from '../../hooks/useCurrenGeolocation'
import { userIcon } from '../../utils/map-icons'
import { UserPopup } from '../UserPopup/UserPopup'
import { AdPopup } from '../AdPopup/AdPopup'

export const Map = () => {
  const userLocation = useCurrenGeolocation([52.2408503,21.0065499])
  return (
    <div className="Map">
      {
        userLocation &&
        <MapContainer center={userLocation.coords} zoom={13}>
          <TileLayer
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap & contributors</a>"
          />

          <Marker position={userLocation.coords} icon={userIcon}>
            <Popup><UserPopup isGeolocation={userLocation.isAllow}/></Popup>
          </Marker>

          <Marker position={[53.095929,18.0150541]}>
            <Popup><AdPopup/></Popup>
          </Marker>

        </MapContainer>
      }
    </div>
  )
}
