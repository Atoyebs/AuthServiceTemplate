import { ObjectValues } from ".";

export interface IUserBasicData {
  user_id: string;
  app_id: string;
  firstname: string;
  lastname: string;
  username?: string;
}

export const USER_ROLES = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  BASIC: "basic",
} as const;

export type UserRoleType = ObjectValues<typeof USER_ROLES>;
