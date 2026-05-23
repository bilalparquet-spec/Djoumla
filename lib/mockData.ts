// ── MOCK DATA — بيانات محاكاة واقعية ────────────────────────────────────────

export const PRODUCTS = [
  {
    id: "p001", name: "هاتف Nova X Pro 5G", cat: "إلكترونيات",
    price: 145000, minQty: 10, unit: "قطعة",
    img: "📱", color: "#3D8EF0", rating: 4.8, sold: 1240,
    supplier: "مصنع النور للإلكترونيات", supplierId: "s001",
    badge: "الأكثر مبيعاً", stock: 850,
    desc: "هاتف ذكي بشاشة 6.7 بوصة AMOLED، معالج Octa-Core، بطارية 5000mAh، كاميرا 108MP.",
    specs: ["شاشة 6.7 AMOLED", "معالج Octa-Core 2.8GHz", "ذاكرة 12GB RAM", "تخزين 256GB", "كاميرا 108MP", "بطارية 5000mAh"],
    images: ["📱", "📲", "🔋"],
  },
  {
    id: "p002", name: "لابتوب UltraBook Pro", cat: "إلكترونيات",
    price: 380000, minQty: 5, unit: "قطعة",
    img: "💻", color: "#3D8EF0", rating: 4.9, sold: 432,
    supplier: "مصنع النور للإلكترونيات", supplierId: "s001",
    badge: "جديد", stock: 120,
    desc: "لابتوب احترافي للأعمال، معالج i7 الجيل 13، شاشة IPS 14 بوصة.",
    specs: ["معالج Intel i7-13700H", "ذاكرة 16GB DDR5", "SSD 512GB NVMe", "شاشة 14 IPS FHD", "بطارية 72Wh", "وزن 1.4kg"],
    images: ["💻", "⌨️", "🖥️"],
  },
  {
    id: "p003", name: "أسياخ حديد مسلح 12mm", cat: "البناء",
    price: 8500, minQty: 100, unit: "قضيب",
    img: "🔩", color: "#A78BFA", rating: 4.7, sold: 5600,
    supplier: "شركة الأطلس للبناء", supplierId: "s002",
    badge: "الأكثر طلباً", stock: 15000,
    desc: "أسياخ حديد مسلح عالية الجودة مطابقة للمواصفات الجزائرية NA 442.",
    specs: ["قطر 12mm", "طول 12 متر", "جودة FeE500", "مطابق NA 442", "إنتاج محلي 100%"],
    images: ["🔩", "🏗️", "⚙️"],
  },
  {
    id: "p004", name: "ألواح شمسية 400W Mono", cat: "الطاقة",
    price: 52000, minQty: 20, unit: "لوح",
    img: "☀️", color: "#FCD34D", rating: 4.9, sold: 980,
    supplier: "مؤسسة الجنوب للطاقة", supplierId: "s004",
    badge: "خصم 15%", stock: 2000,
    desc: "ألواح شمسية أحادية البلورة بكفاءة 22.5%، مناسبة للاستخدام التجاري والصناعي.",
    specs: ["قدرة 400W Peak", "كفاءة 22.5%", "خلايا Mono PERC", "ضمان 25 سنة", "شهادة IEC 61215"],
    images: ["☀️", "⚡", "🔆"],
  },
  {
    id: "p005", name: "ملابس رياضية Sport Elite", cat: "الموضة",
    price: 2800, minQty: 50, unit: "قطعة",
    img: "👕", color: "#F472B6", rating: 4.6, sold: 3200,
    supplier: "مجمع تيزي للنسيج", supplierId: "s003",
    badge: "الأكثر مبيعاً", stock: 5000,
    desc: "ملابس رياضية مصنوعة من قطن مصري 100%، متوفرة بجميع المقاسات والألوان.",
    specs: ["قطن مصري 100%", "مقاسات XS-3XL", "متوفر 12 لون", "غسيل في الغسالة", "شهادة OEKO-TEX"],
    images: ["👕", "👖", "🧢"],
  },
  {
    id: "p006", name: "بذور طماطم هجينة F1", cat: "الزراعة",
    price: 12000, minQty: 10, unit: "كيس 100g",
    img: "🌱", color: "#4ADE80", rating: 4.8, sold: 760,
    supplier: "مؤسسة الجنوب للزراعة", supplierId: "s004",
    badge: "موسمي", stock: 500,
    desc: "بذور طماطم هجينة عالية الإنتاجية، مقاومة للأمراض، مناسبة للمناخ الجزائري.",
    specs: ["إنتاجية 80 طن/هكتار", "مقاومة للفطريات", "نضوج 70 يوم", "ثمار 200-250g", "مناسب للبيت البلاستيكي"],
    images: ["🌱", "🍅", "🌿"],
  },
];

export const MOCK_ORDERS = [
  {
    id: "ORD-7821", date: "2026-05-20", status: "جديد", statusC: "#00E5A0",
    buyer: "شركة النجاح للتجارة", buyerCity: "الجزائر العاصمة",
    items: [{ name: "هاتف Nova X Pro 5G", qty: 50, price: 145000 }],
    total: 7250000, paid: false, delivery: "شحن بري",
  },
  {
    id: "ORD-7820", date: "2026-05-18", status: "قيد التنفيذ", statusC: "#F5A623",
    buyer: "مؤسسة الأمل للاستيراد", buyerCity: "وهران",
    items: [
      { name: "لابتوب UltraBook Pro", qty: 20, price: 380000 },
      { name: "هاتف Nova X Pro 5G", qty: 10, price: 145000 },
    ],
    total: 9050000, paid: true, delivery: "شحن بري",
  },
  {
    id: "ORD-7818", date: "2026-05-15", status: "تم الشحن", statusC: "#3D8EF0",
    buyer: "مستورد الشمال", buyerCity: "عنابة",
    items: [{ name: "ملابس رياضية Sport Elite", qty: 200, price: 2800 }],
    total: 560000, paid: true, delivery: "شحن بري",
  },
  {
    id: "ORD-7815", date: "2026-05-10", status: "مكتمل", statusC: "#6B7A99",
    buyer: "تاجر العاصمة", buyerCity: "الجزائر العاصمة",
    items: [{ name: "ألواح شمسية 400W", qty: 30, price: 52000 }],
    total: 1560000, paid: true, delivery: "شحن بري",
  },
  {
    id: "ORD-7810", date: "2026-05-05", status: "مكتمل", statusC: "#6B7A99",
    buyer: "مجموعة المغرب للبناء", buyerCity: "تلمسان",
    items: [{ name: "أسياخ حديد مسلح 12mm", qty: 500, price: 8500 }],
    total: 4250000, paid: true, delivery: "شحن بري",
  },
];

export const NOTIFICATIONS = [
  { id: "n1", type: "order",   icon: "📦", title: "طلب جديد #7821",         desc: "شركة النجاح طلبت 50 هاتف Nova X Pro",          time: "منذ 5 دقائق",  read: false, color: "#00E5A0" },
  { id: "n2", type: "message", icon: "💬", title: "رسالة من مؤسسة الأمل",   desc: "هل يمكن تسريع شحن الطلب #7820؟",               time: "منذ 23 دقيقة", read: false, color: "#3D8EF0" },
  { id: "n3", type: "payment", icon: "💰", title: "تم استلام الدفع",         desc: "دفعة 9,050,000 دج للطلب #7820 في الحساب",       time: "منذ ساعة",     read: false, color: "#F5A623" },
  { id: "n4", type: "rfq",     icon: "📋", title: "طلب سعر جديد",           desc: "مستورد من وهران يبحث عن 1000 هاتف بمواصفاتك",   time: "منذ 3 ساعات",  read: true,  color: "#A78BFA" },
  { id: "n5", type: "review",  icon: "⭐", title: "تقييم جديد 5 نجوم",      desc: "تاجر العاصمة قيّم طلبه بـ 5 نجوم ممتاز!",       time: "منذ 5 ساعات",  read: true,  color: "#F5A623" },
  { id: "n6", type: "system",  icon: "🔔", title: "تجديد الاشتراك",         desc: "باقتك الذهبية تنتهي خلال 7 أيام",               time: "أمس",          read: true,  color: "#F05252" },
  { id: "n7", type: "order",   icon: "📦", title: "تم تأكيد الشحن #7818",   desc: "شحنة عنابة في الطريق — متوقع الوصول 25 مايو",   time: "أمس",          read: true,  color: "#3D8EF0" },
  { id: "n8", type: "rfq",     icon: "📋", title: "عرض سعر جديد",           desc: "3 موردين ردّوا على طلبك للألواح الشمسية",        time: "منذ يومين",    read: true,  color: "#A78BFA" },
];

export const SUPPLIER_PROFILE = {
  id: "s001",
  name: "مصنع النور للإلكترونيات",
  tagline: "إلكترونيات عالية الجودة — مباشرة من المصنع",
  logo: "🏭",
  color: "#3D8EF0",
  badge: "ذهبي",
  loc: "المنطقة الصناعية، الرويبة — الجزائر العاصمة",
  phone: "+213 23 87 45 10",
  email: "contact@nour-electronics.dz",
  web: "www.nour-electronics.dz",
  since: "2008",
  employees: "250-500",
  rating: 4.9,
  reviews: 312,
  deals: 1240,
  resp: "< ساعة",
  verified: true,
  sectors: ["هواتف ذكية", "لابتوب", "إكسسوارات", "أجهزة منزلية"],
  certs: ["ISO 9001:2015", "CE", "RoHS", "IANOR"],
  about: "مصنع النور للإلكترونيات — رائد في صناعة وتوزيع الإلكترونيات في الجزائر منذ 2008. نمتلك خط إنتاج متطور بطاقة 50,000 وحدة شهرياً، ونوزع على 34 ولاية.",
  products: ["p001", "p002"],
  stats: [
    { icon: "📦", v: "50K", l: "وحدة/شهر", c: "#00E5A0" },
    { icon: "🗺️", v: "34",  l: "ولاية",    c: "#3D8EF0" },
    { icon: "⭐", v: "4.9", l: "تقييم",    c: "#F5A623" },
    { icon: "🏆", v: "18",  l: "سنة خبرة", c: "#A78BFA" },
  ],
};

export const REVIEWS = [
  { id: "r1", buyer: "شركة النجاح",    city: "الجزائر العاصمة", rating: 5, date: "مايو 2026",  text: "تعامل ممتاز وجودة عالية. الشحن في الوقت المحدد والتغليف احترافي.", avatar: "🏢" },
  { id: "r2", buyer: "مؤسسة الأمل",   city: "وهران",            rating: 5, date: "أبريل 2026", text: "منتجات ممتازة وأسعار تنافسية. نتعامل معهم منذ 3 سنوات دون أي مشكلة.", avatar: "🏪" },
  { id: "r3", buyer: "تاجر العاصمة",  city: "الجزائر العاصمة", rating: 4, date: "أبريل 2026", text: "جودة جيدة لكن التوصيل تأخر يومين. بشكل عام تجربة إيجابية.", avatar: "🛒" },
  { id: "r4", buyer: "مستورد الشمال", city: "عنابة",            rating: 5, date: "مارس 2026",  text: "أفضل مورد في الجزائر للإلكترونيات. الردود سريعة والمنتجات أصلية 100%.", avatar: "🏭" },
];

export const CHAT_CONVERSATIONS = [
  {
    id: "c1", name: "شركة النجاح للتجارة", avatar: "🏢", city: "الجزائر العاصمة",
    lastMsg: "هل يمكن توفير 100 وحدة إضافية؟", time: "الآن", unread: 2, online: true,
    msgs: [
      { from: "sup", text: "مرحباً! كيف أساعدك؟", time: "10:00" },
      { from: "me",  text: "نريد الاستفسار عن هاتف Nova X Pro بكميات كبيرة", time: "10:02" },
      { from: "sup", text: "تفضل، الحد الأدنى للطلب 10 قطع بسعر 145,000 دج للقطعة", time: "10:03" },
      { from: "me",  text: "ماذا لو طلبنا 100 قطعة؟ هل يوجد خصم؟", time: "10:05" },
      { from: "sup", text: "بالتأكيد! لـ 100+ قطعة نقدم خصم 8% — أي 133,400 دج/قطعة 🎉", time: "10:06" },
      { from: "me",  text: "هل يمكن توفير 100 وحدة إضافية؟", time: "10:15" },
    ],
  },
  {
    id: "c2", name: "مؤسسة الأمل للاستيراد", avatar: "🏪", city: "وهران",
    lastMsg: "شكراً، سنتواصل غداً لتأكيد الطلب", time: "أمس", unread: 0, online: false,
    msgs: [
      { from: "me",  text: "السلام عليكم، نريد عرض سعر للابتوب UltraBook Pro", time: "09:00" },
      { from: "sup", text: "وعليكم السلام! 380,000 دج/قطعة، الحد الأدنى 5 قطع", time: "09:15" },
      { from: "me",  text: "ممتاز، هل يوجد ضمان؟", time: "09:20" },
      { from: "sup", text: "نعم، ضمان رسمي سنتان + دعم تقني مجاني", time: "09:22" },
      { from: "me",  text: "شكراً، سنتواصل غداً لتأكيد الطلب", time: "09:45" },
    ],
  },
  {
    id: "c3", name: "مستورد الشمال", avatar: "🏭", city: "عنابة",
    lastMsg: "تم استلام الشحنة بسلامة، جودة ممتازة", time: "الثلاثاء", unread: 0, online: false,
    msgs: [
      { from: "me",  text: "متى موعد شحن الطلب #7818؟", time: "08:00" },
      { from: "sup", text: "تم الشحن اليوم، رقم التتبع: DZ-4521-8833", time: "08:30" },
      { from: "me",  text: "شكراً جزيلاً", time: "08:32" },
      { from: "sup", text: "الخدمة دائماً في انتظاركم 🙏", time: "08:33" },
      { from: "me",  text: "تم استلام الشحنة بسلامة، جودة ممتازة", time: "15:00" },
    ],
  },
];
