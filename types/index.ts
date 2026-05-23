export interface Supplier {
  name: string;
  badge: string;
  loc: string;
  rating: number;
  deals: string;
  resp: string;
  tags: string[];
  img: string;
  color: string;
}

export interface ChatMsg {
  from: string;
  text: string;
}

export interface Category {
  icon: string;
  name: string;
  n: string;
  c: string;
}

export interface Slide {
  icon: string;
  h: string;
  p: string;
  c: string;
}

export interface NavItem {
  id: string;
  icon: string;
  label: string;
}
