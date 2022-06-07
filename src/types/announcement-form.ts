import { AnnouncementEntitySave, AuctionLinkEntitySave } from "types";

export type AnnouncementForm = AnnouncementEntitySave & {
  auctionLinks: AuctionLinkEntitySave[]
}
