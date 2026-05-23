"use client";
import { T } from "@/lib/theme";
import { CATS, SUPPLIERS } from "@/lib/constants";
import { PRODUCTS } from "@/lib/mockData";
import { PulseBar } from "@/components/ui/PulseBar";

interface Props {
  setPage: (p: string) => void;
  setRfq: (v: boolean) => void;
  setChat: (v: boolean) => void;
  setProductId: (id: string) => void;
  setSupplierId: (id: string) => void;
}

export function HomePage({ setPage, setRfq, setChat, setProductId, setSupplierId }: Props) {
  return (
    <div className="pscroll aFadeUp" style={{ padding: "0 16px" }}>

      {/* Hero */}
      <div className="hero-bg" style={{ borderRadius: 20, padding: "22px 18px", marginTop: 16, marginBottom: 18 }}>
        <PulseBar />
        <h1 style={{ fontSize: 27, fontWeight: 900, lineHeight: 1.25, margin: "12px 0 10px", color: "#fff" }}>
          تجارة الجملة<br />
          <span style={{ background: `linear-gradient(90deg,${T.accent},${T.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            بذكاء وأمان
          </span>
        </h1>
        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.8, marginBottom: 18 }}>
          ربط المصانع والموردين بالمشترين — مفاوضة مباشرة، دفع آمن، شحن موثوق.
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btnP press" style={{ flex: 1, padding: "13px", fontSize: 14 }} onClick={() => setPage("suppliers")}>الموردون</button>
          <button className="btnO press" style={{ flex: 1, padding: "13px", fontSize: 14 }} onClick={() => setRfq(true)}>📋 طلب سعر</button>
        </div>
      </div>

      {/* Search */}
      <div className="sf-wrap" style={{ marginBottom: 18 }}>
        <span className="sf-ico">🔍</span>
        <input className="inp" placeholder="ابحث عن منتج أو مورد..." />
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
        {[
          { icon: "🏭", v: "12,400+", l: "مورد موثق",   c: T.accent },
          { icon: "📦", v: "85K+",   l: "منتج مدرج",   c: T.blue   },
          { icon: "🗺️", v: "34",     l: "ولاية مغطاة", c: "#A78BFA" },
          { icon: "💰", v: "99M+",   l: "حجم الصفقات", c: T.amber  },
        ].map((s, i) => (
          <div key={i} className="card press" style={{ padding: "16px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 26 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: 17, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{s.l}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="secH">
        <h2>الفئات</h2>
        <button onClick={() => setPage("categories")}>عرض الكل</button>
      </div>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 8, marginBottom: 22 }}>
        {CATS.map((c, i) => (
          <div key={i} className="card press" onClick={() => setPage("categories")} style={{ minWidth: 96, padding: "14px 10px", textAlign: "center", flexShrink: 0, border: `1px solid ${c.c}22` }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>{c.name}</div>
            <div style={{ color: c.c, fontSize: 11, marginTop: 4, fontWeight: 700 }}>{c.n}</div>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <div className="secH">
        <h2>منتجات مميزة</h2>
        <button onClick={() => setPage("categories")}>الكل</button>
      </div>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, marginBottom: 22 }}>
        {PRODUCTS.slice(0, 4).map(p => (
          <div key={p.id} className="card press" style={{ minWidth: 150, padding: 14, flexShrink: 0, border: `1px solid ${p.color}18` }}
            onClick={() => { setProductId(p.id); setPage("product-detail"); }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 10px" }}>{p.img}</div>
            <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4, textAlign: "center", lineHeight: 1.3 }}>{p.name}</div>
            <div style={{ color: p.color, fontWeight: 900, fontSize: 13, textAlign: "center" }}>{p.price.toLocaleString()} دج</div>
            <div style={{ color: T.muted, fontSize: 11, textAlign: "center", marginTop: 3 }}>/ {p.unit}</div>
            {p.badge && (
              <div style={{ background: `${p.color}18`, color: p.color, fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 99, textAlign: "center", marginTop: 8 }}>{p.badge}</div>
            )}
          </div>
        ))}
      </div>

      {/* Top Suppliers */}
      <div className="secH">
        <h2>أبرز الموردين</h2>
        <button onClick={() => setPage("suppliers")}>الكل</button>
      </div>
      {SUPPLIERS.slice(0, 2).map((s, i) => (
        <div key={i} className="card press" style={{ padding: 16, marginBottom: 12, display: "flex", gap: 14, alignItems: "center" }}
          onClick={() => { setSupplierId("s001"); setPage("supplier-profile"); }}>
          <div className="ibox" style={{ width: 50, height: 50, background: `${s.color}18`, fontSize: 26 }}>{s.img}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{s.name}</div>
            <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>📍 {s.loc}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <span style={{ color: T.amber, fontSize: 12 }}>⭐ {s.rating}</span>
              <span style={{ color: T.muted, fontSize: 12 }}>· {s.deals} صفقة</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <button className="btnP" style={{ padding: "6px 12px", fontSize: 11 }}
              onClick={e => { e.stopPropagation(); setSupplierId("s001"); setPage("supplier-profile"); }}>ملفه</button>
            <button className="btnO" style={{ padding: "6px 12px", fontSize: 11 }}
              onClick={e => { e.stopPropagation(); setChat(true); }}>💬</button>
          </div>
        </div>
      ))}

      {/* How it works */}
      <div className="card" style={{ padding: "20px 18px", marginTop: 4 }}>
        <h3 style={{ fontSize: 16, fontWeight: 900, textAlign: "center", marginBottom: 22 }}>كيف تعمل المنصة؟</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { n: "01", icon: "🔍", t: "ابحث",        d: "ابحث عن المنتج أو المورد المناسب" },
            { n: "02", icon: "💬", t: "تفاوض",        d: "تواصل مباشرة مع المصنع"           },
            { n: "03", icon: "🔒", t: "ادفع بأمان",   d: "نظام Escrow يضمن حقك"             },
            { n: "04", icon: "🚚", t: "استلم بضاعتك", d: "تتبع الشحنة لحظةً بلحظة"         },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(0,229,160,.08)", border: "1.5px solid rgba(0,229,160,.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, marginTop: 2 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 9, color: T.accent, fontWeight: 900, letterSpacing: 1.5, marginBottom: 3 }}>خطوة {s.n}</div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{s.t}</div>
                <div style={{ color: T.muted, fontSize: 13, marginTop: 3 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
