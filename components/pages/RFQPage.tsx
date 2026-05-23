"use client";
import { T } from "@/lib/theme";
import { CATS } from "@/lib/constants";

interface Props {
  showToast: (m: string) => void;
}

export function RFQPage({ showToast }: Props) {
  const rfqs = [
    { product:"ألواح شمسية 400W", qty:"500 قطعة", offers:8,  days:"3 أيام", budget:"2,400,000 دج" },
    { product:"أسياخ حديد 12mm",  qty:"20 طن",    offers:12, days:"يوم",     budget:"720,000 دج"   },
    { product:"ملابس رياضية",      qty:"1000 قطعة",offers:5,  days:"5 أيام", budget:"350,000 دج"   },
  ];

  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 16px" }}>
      <div style={{ paddingTop:18, marginBottom:18 }}>
        <h2 style={{ fontSize:22, fontWeight:900 }}>طلبات الأسعار</h2>
        <p style={{ color:T.muted, fontSize:13, marginTop:4 }}>ضع طلبك ودع الموردين يتنافسون</p>
      </div>

      <div className="card" style={{ padding:18, marginBottom:20, border:`1px solid rgba(0,229,160,.15)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"rgba(0,229,160,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📋</div>
          <div style={{ fontWeight:800, fontSize:15, color:T.accent }}>طلب جديد</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input className="inp" placeholder="اسم المنتج..." />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <input className="inp" placeholder="الكمية" type="number" />
            <select className="inp"><option>قطعة</option><option>طن</option><option>كغ</option><option>متر</option></select>
          </div>
          <select className="inp">{CATS.map(c => <option key={c.name}>{c.name}</option>)}</select>
          <input className="inp" placeholder="الميزانية (دج)" />
          <textarea className="inp" placeholder="تفاصيل وملاحظات..." style={{ minHeight:72, resize:"vertical" }} />
          <button className="btnP press" style={{ padding:"13px", fontSize:15 }} onClick={() => showToast("تم إرسال طلبك 🎉")}>
            🚀 إرسال للموردين
          </button>
        </div>
      </div>

      <h3 style={{ fontSize:16, fontWeight:900, marginBottom:14 }}>الطلبات النشطة</h3>
      {rfqs.map((r,i) => (
        <div key={i} className="card" style={{ padding:16, marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontWeight:800, fontSize:14 }}>{r.product}</span>
            <span style={{ background:"rgba(0,229,160,.12)", color:T.accent, padding:"3px 12px", borderRadius:99, fontSize:12, fontWeight:700 }}>{r.offers} عروض</span>
          </div>
          <div style={{ display:"flex", gap:16, fontSize:12, color:T.muted, marginBottom:12 }}>
            <span>📦 {r.qty}</span><span>⏰ {r.days}</span><span>💰 {r.budget}</span>
          </div>
          <button className="btnO" style={{ width:"100%", padding:"10px", fontSize:13 }}>عرض العروض</button>
        </div>
      ))}
    </div>
  );
}
