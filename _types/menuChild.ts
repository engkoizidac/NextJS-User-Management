import { MenuMain } from "./menuMain";

export interface MenuChild {
  id: number;
  name: string;
  link: string;
  menuMain: MenuMain;
}
