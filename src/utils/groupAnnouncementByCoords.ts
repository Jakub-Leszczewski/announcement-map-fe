import { AnnouncementEntitySimple } from "types";

export const groupAnnouncementByCoords = (announcementEntity: AnnouncementEntitySimple[]) => {
  let announcementGroups: AnnouncementEntitySimple[][] = [];
  announcementEntity.forEach((announcement) => {
    const lat = announcement.lat;
    const lon = announcement.lon;

    const index = announcementGroups.findIndex((e) => lat === e[0].lat && lon === e[0].lon);

    if(index !== -1) {
      announcementGroups[index].push(announcement);
    } else {
      announcementGroups.push([announcement]);
    }
  });

  return announcementGroups;
}
