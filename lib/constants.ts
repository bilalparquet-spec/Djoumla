import type { Category, Supplier, Slide, NavItem } from "@/types";

export const CATS: Category[] = [
  { icon:"⚡", name:"إلكترونيات", n:"2,340", c:"#3D8EF0" },
  { icon:"🚗", name:"سيارات",     n:"1,890", c:"#F5A623" },
  { icon:"🏗️", name:"البناء",     n:"3,120", c:"#A78BFA" },
  { icon:"👗", name:"الموضة",     n:"4,560", c:"#F472B6" },
  { icon:"🏠", name:"المنزل",     n:"2,100", c:"#34D399" },
  { icon:"🌾", name:"الغذاء",     n:"1,670", c:"#F5A623" },
  { icon:"🌱", name:"الزراعة",    n:"980",   c:"#4ADE80" },
  { icon:"☀️", name:"الطاقة",     n:"750",   c:"#FCD34D" },
];

export const SUPPLIERS: Supplier[] = [
  { name:"مصنع النور للإلكترونيات", badge:"ذهبي", loc:"الجزائر العاصمة", rating:4.9, deals:"1,240", resp:"< ساعة",    tags:["هواتف","إكسسوارات"], img:"🏭", color:"#3D8EF0" },
  { name:"شركة الأطلس للبناء",       badge:"فضي",  loc:"وهران",            rating:4.7, deals:"890",   resp:"< 3 ساعات",tags:["إسمنت","حديد"],      img:"🏗️", color:"#A78BFA" },
  { name:"مجمع تيزي للنسيج",         badge:"ذهبي", loc:"تيزي وزو",         rating:4.8, deals:"2,100", resp:"< ساعتين", tags:["ملابس","أقمشة"],     img:"🧵", color:"#F472B6" },
  { name:"مؤسسة الجنوب للزراعة",     badge:"فضي",  loc:"بسكرة",            rating:4.6, deals:"560",   resp:"< 4 ساعات",tags:["بذور","أسمدة"],      img:"🌾", color:"#4ADE80" },
];

export const SLIDES: Slide[] = [
  { icon:"🏭", h:"12,400+ مورد موثق",   p:"تواصل مباشرة مع المصانع والموردين عبر الجزائر.", c:"#00E5A0" },
  { icon:"📋", h:"طلب سعر في ثوانٍ",    p:"أرسل مواصفاتك وسيتنافس الموردون على أفضل سعر.", c:"#3D8EF0" },
  { icon:"🔒", h:"دفع آمن 100٪",        p:"نظام Escrow يضمن أموالك حتى تستلم بضاعتك.",     c:"#F5A623" },
  { icon:"🚚", h:"شحن وتتبع فوري",      p:"تتبع شحنتك برّاً وبحراً وجواً لحظةً بلحظة.",   c:"#F472B6" },
];

export const NAV: NavItem[] = [
  { id:"home",       icon:"🏠", label:"الرئيسية" },
  { id:"suppliers",  icon:"🏭", label:"الموردون"  },
  { id:"categories", icon:"📦", label:"الفئات"    },
  { id:"rfq",        icon:"📋", label:"الأسعار"   },
  { id:"dashboard",  icon:"📊", label:"حسابي"     },
];

export const WILAYAS = [
  "الجزائر العاصمة","وهران","قسنطينة","عنابة",
  "تيزي وزو","بجاية","سطيف","بسكرة","ورقلة","غرداية",
];
