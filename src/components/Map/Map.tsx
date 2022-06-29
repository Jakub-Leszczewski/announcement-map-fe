import React, { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Map.css';
import '../../utils/map-icons'
import { useCurrenGeolocation } from '../../hooks/useCurrenGeolocation'
import { userIcon } from '../../utils/map-icons'
import { UserPopup } from '../UserPopup/UserPopup'
import { AdPopup } from '../AdPopup/AdPopup'
import { GetAnnouncementsResponse } from 'types';
import { groupAnnouncementByCoords } from '../../utils/group-announcement-by-coords'
import { useSelector } from 'react-redux'
import { StoreType } from '../../store'
import { useApi } from '../../hooks/useApi'

export const Map = () => {
  const appStore = useSelector((store:StoreType) => store.app);
  const search = encodeURIComponent(appStore.search);
  const category = encodeURIComponent(appStore.categoryId);
  const userLocation = useCurrenGeolocation([52.2408503,21.0065499]);

  const [loading, status, data] = useApi<GetAnnouncementsResponse>(
    `http://localhost:3001/api/announcement/?search=${search}&category=${category}`
  );

  const announcementGroups = useMemo(() => (
    !loading && status === 200 && data && !('error' in data))
    ? groupAnnouncementByCoords(data)
    : [], [data]
  );

  return (
    <div className="Map">
      {
        userLocation &&
        <MapContainer center={userLocation.coords} zoom={13}>
          <TileLayer
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap & contributors</a>"
          />

          {
            announcementGroups
              ? announcementGroups.map((group) => (
                <Marker key={group[0].id} position={[group[0].lat, group[0].lon]}>
                  <Popup>
                    <AdPopup id={group.map((announcement) => announcement.id)}/>
                  </Popup>
                </Marker>
                ))
              : null
          }
          <Marker position={userLocation.coords} icon={userIcon}>
            <Popup><UserPopup isGeolocation={userLocation.isAllow}/></Popup>
          </Marker>
        </MapContainer>
      }
    </div>
  )
}
