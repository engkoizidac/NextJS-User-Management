import { MenuChild } from "./menuChild";

export interface MenuMain {
  id: number;
  name: string;
  icon: string;
  children: MenuChild[];
}
