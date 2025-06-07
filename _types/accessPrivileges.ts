import { MenuChild } from "./menuChild";

export interface AccessPrivilege {
  id: number;
  description: string;
  menu_child?: MenuChild;
}
