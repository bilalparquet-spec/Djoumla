"use client";
import { useState } from "react";
import { T } from "@/lib/theme";
import { PRODUCTS, REVIEWS } from "@/lib/mockData";

interface Props {
  productId: string;
  setPage: (p: string) => void;
  setSupplierId: (id: string) => void;
  showToast: (m: string) => void;
}

export function ProductDetailPage({ productId, setPage, setSupplierId, showToast }: Props) {
  const p = PRODUCTS.find(x => x.id === productId) || PRODUCTS[0];
  const [qty, setQty] = useState(p.minQty);
  const [tab, setTab] = useState("details");
  const total = (qty * p.price).toLocaleString("ar-DZ");

  return (
    <div className="pscroll aFadeUp" style={{ padding: "0 16px" }}>
      {/* Hero */}
      <div style={{ borderRadius: 20, background: `${p.color}12`, border: `1px solid ${p.color}25`, padding: "28px 20px", marginTop: 16, marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 72, marginBottom: 12, lineHeight: 1 }}>{p.img}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ background: `${p.color}20`, color: p.color, padding: "3px 12px", borderRadius: 99, fontSize: 12, fontWeight: 800 }}>{p.badge}</span>
          <span className="vbadge">✓ موثق</span>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: "#fff", marginBottom: 8 }}>{p.name}</h1>
        <div style={{ color: T.muted, fontSize: 13 }}>{p.cat}</div>
      </div>

      {/* Price & Qty */}
      <div className="card" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 900, color: T.accent }}>{p.price.toLocaleString("ar-DZ")} <span style={{ fontSize: 14, color: T.muted }}>دج</span></div>
            <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>الحد الأدنى {p.minQty} {p.unit}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: T.muted, fontSize: 11, marginBottom: 6 }}>المخزون</div>
            <div style={{ color: "#4ADE80", fontWeight: 800, fontSize: 15 }}>{p.stock.toLocaleString()} {p.unit}</div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ color: T.muted, fontSize: 12, marginBottom: 8, fontWeight: 600 }}>الكمية المطلوبة</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setQty(q => Math.max(p.minQty, q - p.minQty))}
              style={{ width: 40, height: 40, borderRadius: 10, background: T.dim, border: "none", color: T.text, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{qty}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{p.unit}</div>
            </div>
            <button onClick={() => setQty(q => q + p.minQty)}
              style={{ width: 40, height: 40, borderRadius: 10, background: `${T.accent}20`, border: `1px solid ${T.accent}40`, color: T.accent, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
          </div>
        </div>

        <div style={{ background: "rgba(0,229,160,.05)", border: "1px solid rgba(0,229,160,.15)", borderRadius: 12, padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: T.muted, fontSize: 13 }}>إجمالي الطلب</span>
          <span style={{ fontSize: 18, fontWeight: 900, color: T.accent }}>{total} دج</span>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btnP press" style={{ flex: 2, padding: "13px", fontSize: 14 }}
            onClick={() => showToast("تم إرسال طلب الشراء 🎉")}>
            🛒 طلب الآن
          </button>
          <button className="btnO press" style={{ flex: 1, padding: "13px", fontSize: 13 }}
            onClick={() => showToast("تمت الإضافة للمفضلة ❤️")}>
            ❤️
          </button>
        </div>
      </div>

      {/* Supplier */}
      <div className="card press" style={{ padding: 16, marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}
        onClick={() => { setSupplierId(p.supplierId); setPage("supplier-profile"); }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🏭</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{p.supplier}</div>
          <div className="vbadge" style={{ marginTop: 4 }}>✓ مورد موثق</div>
        </div>
        <span style={{ color: T.accent, fontSize: 18 }}>←</span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[{ id: "details", l: "التفاصيل" }, { id: "specs", l: "المواصفات" }, { id: "reviews", l: `التقييمات (${REVIEWS.length})` }].map(t => (
          <button key={t.id} className={`chip ${tab === t.id ? "chipOn" : "chipOff"}`} onClick={() => setTab(t.id)}>{t.l}</button>
        ))}
      </div>

      {tab === "details" && (
        <div className="card aFadeIn" style={{ padding: 18, marginBottom: 14 }}>
          <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.9 }}>{p.desc}</p>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "📦", l: "الحد الأدنى", v: `${p.minQty} ${p.unit}` },
              { icon: "🏷️", l: "الفئة",       v: p.cat },
              { icon: "⭐", l: "التقييم",     v: `${p.rating} / 5` },
              { icon: "📊", l: "المبيعات",    v: `${p.sold.toLocaleString()} وحدة` },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ color: T.muted, fontSize: 13 }}>{row.icon} {row.l}</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{row.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "specs" && (
        <div className="card aFadeIn" style={{ padding: 18, marginBottom: 14 }}>
          {p.specs.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < p.specs.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <span style={{ color: T.accent, fontWeight: 800, fontSize: 14 }}>✓</span>
              <span style={{ fontSize: 14, color: T.text }}>{s}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "reviews" && (
        <div className="aFadeIn">
          <div className="card" style={{ padding: 18, marginBottom: 12, textAlign: "center" }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: T.amber, lineHeight: 1 }}>{p.rating}</div>
            <div style={{ color: "#F5A623", fontSize: 20, margin: "8px 0" }}>{"⭐".repeat(Math.round(p.rating))}</div>
            <div style={{ color: T.muted, fontSize: 13 }}>{REVIEWS.length} تقييم</div>
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
