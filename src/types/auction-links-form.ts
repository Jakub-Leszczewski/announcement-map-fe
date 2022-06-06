import { AuctionLinkEntityRes } from "types";

export type AuctionLinkForm = Omit<AuctionLinkEntityRes, 'id' | 'announcementId'>
