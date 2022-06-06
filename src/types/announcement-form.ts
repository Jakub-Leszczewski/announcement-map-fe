import { AnnouncementEntity, AuctionLinkEntityRes } from "types";

export type AnnouncementForm = Omit<AnnouncementEntity, 'id' | 'createdAt' | 'createdBy' | 'lat' | 'lon'> & {
  auctionLinks: AuctionLinkEntityRes[]
}
