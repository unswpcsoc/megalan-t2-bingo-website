import { z } from "zod";

export type ClubNamesType =
  | "PCS"
  | "ES"
  | "RS"
  | "KS"
  | "FGS"
  | "RGS"
  | "VRS"
  | "GS"
  | "MCS"
  | "PS"
  | "SBS"
  | "GDS"
  | "SPONSOR"
  | "COSPLAY";

export type CleanClubDataType = { name: ClubNamesType; id: string };

export const ClubNameSchema = z.enum([
  "PCS",
  "ES",
  "RS",
  "KS",
  "FGS",
  "RGS",
  "VRS",
  "GS",
  "MCS",
  "PS",
  "SBS",
  "GDS",
  "SPONSOR",
  "COSPLAY",
]);

export const TaskTypeSchema = z.enum(["SOCIETY", "SOCIAL", "COSPLAY"]);

export const SocietyNameList = [
  "PCS",
  "ES",
  "RS",
  "KS",
  "FGS",
  "RGS",
  "VRS",
  "GS",
  "MCS",
  "PS",
  "SBS",
  "GDS",
];
