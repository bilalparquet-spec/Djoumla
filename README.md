# جملة DZ – B2B Wholesale Algeria

منصة البيع بالجملة الجزائرية — تواصل مع أفضل الموردين والمصانع.

## نشر على Vercel

### الطريقة 1 — Vercel CLI (الأسرع)
```bash
npm i -g vercel
vercel
```

### الطريقة 2 — GitHub + Vercel Dashboard
1. ارفع المشروع على GitHub
2. اذهب إلى [vercel.com/new](https://vercel.com/new)
3. اختر الـ repository
4. اضغط **Deploy** — Vercel سيكتشف Next.js تلقائياً

### تشغيل محلياً
```bash
npm install
npm run dev
# افتح http://localhost:3000
```

## هيكل المشروع
```
djazair-wholesale/
├── app/
│   ├── layout.tsx      # Root layout (fonts, metadata)
│   ├── page.tsx        # Entry point
│   ├── globals.css     # Base styles
│   └── DjazairApp.tsx  # Main app component
├── next.config.js
├── package.json
├── tsconfig.json
└── vercel.json
```

## التقنيات
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- خط **Cairo** من Google Fonts
