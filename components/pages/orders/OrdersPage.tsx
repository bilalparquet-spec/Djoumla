"use client";
import { useState } from "react";
import { T } from "@/lib/theme";
import { MOCK_ORDERS } from "@/lib/mockData";

interface Props {
  showToast: (m: string) => void;
}

const FILTERS = ["الكل", "جديد", "قيد التنفيذ", "تم الشحن", "مكتمل"];

export function OrdersPage({ showToast }: Props) {
  const [filter, setFilter] = useState("الكل");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === "الكل" ? MOCK_ORDERS : MOCK_ORDERS.filter(o => o.status === filter);
  const order = MOCK_ORDERS.find(o => o.id === selected);

  if (order) return (
    <div className="pscroll aFadeIn" style={{ padding: "0 16px" }}>
      <button onClick={() => setSelected(null)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: T.muted, fontFamily: "'Cairo',sans-serif", fontSize: 14, cursor: "pointer", paddingTop: 16, marginBottom: 16 }}>
        → رجوع للطلبات
      </button>

      {/* Order Header */}
      <div className="card" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>{order.id}</div>
            <div style={{ color: T.muted, fontSize: 13, marginTop: 4 }}>📅 {order.date}</div>
          </div>
          <span style={{ color: order.statusC, fontWeight: 800, fontSize: 14, background: `${order.statusC}15`, padding: "6px 14px", borderRadius: 99 }}>● {order.status}</span>
        </div>

        {/* Progress Steps */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          {["جديد", "قيد التنفيذ", "تم الشحن", "مكتمل"].map((step, i) => {
            const steps = ["جديد", "قيد التنفيذ", "تم الشحن", "مكتمل"];
            const currentIdx = steps.indexOf(order.status);
            const isDone = i <= currentIdx;
            return (
              <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, background: isDone ? T.accent : T.dim, color: isDone ? "#060A12" : T.muted }}>
                  {isDone ? "✓" : i + 1}
                </div>
                
                <div style={{ fontSize: 9, color: isDone ? T.accent : T.muted, marginTop: 4, textAlign: "center", whiteSpace: "nowrap" }}>{step}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Buyer */}
      <div className="card" style={{ padding: 16, marginBottom: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>👤 المشتري</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: T.muted, fontSize: 13 }}>{order.buyer}</span>
          <span style={{ color: T.muted, fontSize: 13 }}>📍 {order.buyerCity}</span>
        </div>
      </div>

      {/* Items */}
      <div className="card" style={{ padding: 16, marginBottom: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>📦 المنتجات</div>
        {order.items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i < order.items.length - 1 ? `1px solid ${T.border}` : "none" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.name}</div>
              <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>× {item.qty} قطعة</div>
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: T.accent, fontWeight: 700 }}>{(item.qty * item.price).toLocaleString()} دج</div>
              <div style={{ color: T.muted, fontSize: 12 }}>{item.price.toLocaleString()} /قطعة</div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, marginTop: 4 }}>
          <span style={{ fontWeight: 800 }}>الإجمالي</span>
          <span style={{ fontWeight: 900, color: T.accent, fontSize: 16 }}>{order.total.toLocaleString()} دج</span>
        </div>
      </div>

      {/* Payment & Delivery */}
      <div className="card" style={{ padding: 16, marginBottom: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 12 }}>💳 الدفع والشحن</div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ color: T.muted, fontSize: 13 }}>حالة الدفع</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: order.paid ? T.accent : T.amber }}>
            {order.paid ? "✓ مدفوع" : "⏳ في انتظار الدفع"}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: T.muted, fontSize: 13 }}>طريقة الشحن</span>
          <span style={{ fontWeight: 700, fontSize: 13 }}>{order.delivery}</span>
        </div>
      </div>

      {order.status !== "مكتمل" && (
        <div style={{ display: "flex", gap: 10, paddingBottom: 16 }}>
          <button className="btnP press" style={{ flex: 1, padding: "13px", fontSize: 14 }} onClick={() => showToast("تم تحديث حالة الطلب")}>تحديث الحالة</button>
          <button className="btnO press" style={{ flex: 1, padding: "13px", fontSize: 14 }} onClick={() => showToast("تم إرسال رسالة للمشتري")}>💬 تواصل</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="pscroll aFadeUp" style={{ padding: "0 16px" }}>
      <div style={{ paddingTop: 18, marginBottom: 14 }}>
        <h2 style={{ fontSize: 22, fontWeight: 900 }}>الطلبات</h2>
        <p style={{ color: T.muted, fontSize: 13, marginTop: 4 }}>إجمالي {MOCK_ORDERS.length} طلب</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
        {[
          { v: "1",  l: "جديد",          c: T.accent },
          { v: "1",  l: "تنفيذ",          c: T.amber  },
          { v: "1",  l: "شحن",            c: T.blue   },
          { v: "2",  l: "مكتمل",          c: T.muted  },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: "10px 6px", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 16 }}>
        {FILTERS.map(f => (
          <button key={f} className={`chip ${filter === f ? "chipOn" : "chipOff"}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {filtered.map(o => (
        <div key={o.id} className="card press" style={{ padding: 16, marginBottom: 10 }} onClick={() => setSelected(o.id)}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 15 }}>{o.id}</div>
              <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{o.buyer}</div>
            </div>
            <span style={{ color: o.statusC, background: `${o.statusC}15`, padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 700 }}>● {o.status}</span>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: T.muted, marginBottom: 12 }}>
            <span>📅 {o.date}</span>
            <span>📍 {o.buyerCity}</span>
            <span>{o.paid ? "✓ مدفوع" : "⏳ معلق"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: T.accent, fontWeight: 900, fontSize: 15 }}>{o.total.toLocaleString()} دج</span>
            <span style={{ color: T.accent, fontSize: 13, fontWeight: 700 }}>التفاصيل ←</span>
          </div>
        </div>
      ))}
    </div>
  );
}
