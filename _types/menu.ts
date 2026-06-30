export interface MenuChildItem {
  id: number;
  name: string;
  link: string;
  description: string;
}

export interface MenuGroupItem {
  id: number;
  name: string;
  children: MenuChildItem[];
}
