import { Reference } from "src/app/modals/refrence";

export interface User {
  prefix: string;
  imgurl: string;
  physicallyChallenged: string;
  maritalStatus: string;
  community: string;
  category: string;
  gender: string;
  references1: Reference;
  references2: Reference;
  gstno: string;
  businessaddress: string;
  firmaddress: string;
  addressproofurl: string;
  ownershipproofurl: string;
  residenceproofurl: string;
}