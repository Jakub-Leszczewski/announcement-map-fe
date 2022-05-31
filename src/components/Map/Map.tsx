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
            <Popup>
              <AdPopup
                id={'dsdadadasds3eesadar32r2'}
                name={'Nazwa Produktu'}
                description={' jakiś opis bardzo fajny i długi opis  jakiś opis bardzo fajny i długi opis  jakiś' +
                  ' opis bardzo fajny i długi opis  jakiś opis bardzo fajny i długi opis  jakiś opis bardzo fajny i' +
                  ' długi opis  jakiś opis bardzo fajny i długi opis  jakiś opis bardzo fajny i długi opis'}
                price={20.10}
                country={'Polska'}
                city={'Bydgoszcz'}
                zipCode={'23-234'}
                address={'Glinki 3/52'}
                date={new Date()}
                links={[
                  {id: 'greherff', name: 'olx', url: ''},
                  {id: 'sdfelkqldm', name: 'allegro', url: ''},
                  {id: 'kopr4fkwdl', name: 'aliexpress', url: ''},
                ]}
              />
            </Popup>
          </Marker>

        </MapContainer>
      }
    </div>
  )
}
