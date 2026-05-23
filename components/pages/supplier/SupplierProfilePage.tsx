"use client";
import { useState } from "react";
import { T } from "@/lib/theme";
import { SUPPLIER_PROFILE, PRODUCTS, REVIEWS } from "@/lib/mockData";

interface Props {
  supplierId: string;
  setPage: (p: string) => void;
  setProductId: (id: string) => void;
  setChat: (v: boolean) => void;
  showToast: (m: string) => void;
}

export function SupplierProfilePage({ supplierId, setPage, setProductId, setChat, showToast }: Props) {
  const s = SUPPLIER_PROFILE;
  const [tab, setTab] = useState("about");
  const supplierProducts = PRODUCTS.filter(p => p.supplierId === s.id);

  return (
    <div className="pscroll aFadeUp" style={{ padding: "0 16px" }}>

      {/* Hero Banner */}
      <div style={{ borderRadius: 20, background: `${s.color}10`, border: `1px solid ${s.color}20`, padding: "24px 18px", marginTop: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
          <div style={{ width: 68, height: 68, borderRadius: 18, background: `${s.color}20`, border: `2px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>{s.logo}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
              <h1 style={{ fontSize: 17, fontWeight: 900, color: "#fff", margin: 0 }}>{s.name}</h1>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span className={`badge ${s.badge === "ذهبي" ? "badgeG" : "badgeS"}`}>{s.badge}</span>
              {s.verified && <span className="vbadge">✓ موثق</span>}
            </div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: T.muted, margin: "0 0 16px", lineHeight: 1.7 }}>{s.tagline}</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {s.stats.map((st, i) => (
            <div key={i} className="stat-card">
              <div style={{ fontSize: 18, marginBottom: 4 }}>{st.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: st.c }}>{st.v}</div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{st.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btnP press" style={{ flex: 2, padding: "12px", fontSize: 13 }}
            onClick={() => setChat(true)}>💬 تواصل مباشر</button>
          <button className="btnO press" style={{ flex: 1, padding: "12px", fontSize: 12 }}
            onClick={() => showToast("تمت إضافة المورد للمفضلة")}>❤️ حفظ</button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="card" style={{ padding: 16, marginBottom: 14 }}>
        {[
          { icon: "📍", v: s.loc },
          { icon: "📞", v: s.phone },
          { icon: "📧", v: s.email },
          { icon: "🌐", v: s.web },
          { icon: "📅", v: `منذ ${s.since}` },
          { icon: "👥", v: `${s.employees} موظف` },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "9px 0", borderBottom: i < 5 ? `1px solid ${T.border}` : "none" }}>
            <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{row.icon}</span>
            <span style={{ fontSize: 13, color: T.muted }}>{row.v}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 16 }}>
        {[
          { id: "about",    l: "عن الشركة"  },
          { id: "products", l: "المنتجات"   },
          { id: "certs",    l: "الشهادات"   },
          { id: "reviews",  l: "التقييمات"  },
        ].map(t => (
          <button key={t.id} className={`chip ${tab === t.id ? "chipOn" : "chipOff"}`} onClick={() => setTab(t.id)}>{t.l}</button>
        ))}
      </div>

      {tab === "about" && (
        <div className="aFadeIn">
          <div className="card" style={{ padding: 18, marginBottom: 12 }}>
            <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>نبذة عن الشركة</h3>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.9 }}>{s.about}</p>
          </div>
          <div className="card" style={{ padding: 18, marginBottom: 12 }}>
            <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>قطاعات النشاط</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {s.sectors.map(sec => (
                <span key={sec} className="tag">{sec}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "products" && (
        <div className="aFadeIn">
          {supplierProducts.map(p => (
            <div key={p.id} className="card press" style={{ padding: 16, marginBottom: 10, display: "flex", gap: 14, alignItems: "center" }}
              onClick={() => { setProductId(p.id); setPage("product-detail"); }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{p.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{p.name}</div>
                <div style={{ color: T.accent, fontWeight: 700, fontSize: 14, marginTop: 4 }}>{p.price.toLocaleString()} دج</div>
                <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>الحد الأدنى: {p.minQty} {p.unit}</div>
              </div>
              <span style={{ color: T.accent, fontSize: 18 }}>←</span>
            </div>
          ))}
        </div>
      )}

      {tab === "certs" && (
        <div className="aFadeIn">
          <div className="card" style={{ padding: 18, marginBottom: 12 }}>
            <h3 style={{ fontWeight: 800, fontSize: 15, marginBottom: 16 }}>الشهادات والاعتمادات</h3>
            {s.certs.map((cert, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < s.certs.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,229,160,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏅</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{cert}</div>
                  <div style={{ color: T.accent, fontSize: 12, marginTop: 2 }}>✓ معتمد وساري المفعول</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "reviews" && (
        <div className="aFadeIn">
          <div className="card" style={{ padding: 18, marginBottom: 12, display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: T.amber, lineHeight: 1 }}>{s.rating}</div>
              <div style={{ color: T.amber, fontSize: 16, margin: "6px 0" }}>⭐⭐⭐⭐⭐</div>
              <div style={{ color: T.muted, fontSize: 12 }}>{s.reviews} تقييم</div>
            </div>
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: T.muted, width: 10 }}>{star}</span>
                  <div style={{ flex: 1, height: 6, borderRadius: 3, background: T.dim, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 3, background: T.amber, width: star === 5 ? "75%" : star === 4 ? "18%" : "7%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {REVIEWS.map(r => (
            <div key={r.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(0,229,160,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{r.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{r.buyer}</div>
                    <div style={{ color: T.muted, fontSize: 11 }}>📍 {r.city}</div>
                  </div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ color: T.amber }}>{"⭐".repeat(r.rating)}</div>
                  <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>{r.date}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.8, margin: 0 }}>{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
