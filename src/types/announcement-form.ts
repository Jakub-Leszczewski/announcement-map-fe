import { AnnouncementEntity } from "types";
import { AuctionLinkForm } from './auction-links-form'

export type AnnouncementForm = Omit<AnnouncementEntity, 'id' | 'createdAt' | 'createdBy' | 'lat' | 'lon'> & {
  auctionLinks: AuctionLinkForm[]
}
