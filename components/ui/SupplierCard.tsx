"use client";
import { T } from "@/lib/theme";
import type { Supplier } from "@/types";

interface Props {
  s: Supplier;
  onChat?: () => void;
  compact?: boolean;
}

export function SupplierCard({ s, onChat, compact }: Props) {
  return (
    <div className="card press" style={{ padding: compact ? 14 : 18, marginBottom:12 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <div className="ibox" style={{ width:50, height:50, background:`${s.color}18`, fontSize:24 }}>{s.img}</div>
          <div>
            <div style={{ fontWeight:800, fontSize:14, lineHeight:1.3 }}>{s.name}</div>
            <div style={{ color:T.muted, fontSize:12, marginTop:3, display:"flex", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:11 }}>📍</span> {s.loc}
            </div>
          </div>
        </div>
        <span className={`badge ${s.badge==="ذهبي"?"badgeG":"badgeS"}`}>{s.badge}</span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
        {[
          { v:`${s.rating}`, l:"التقييم", icon:"⭐", c:T.amber },
          { v:s.deals,       l:"صفقة",    icon:"📦", c:T.accent },
          { v:s.resp,        l:"رد سريع", icon:"⚡", c:T.blue  },
        ].map((m,i) => (
          <div key={i} className="stat-card">
            <div style={{ fontSize:11, marginBottom:4 }}>{m.icon}</div>
            <div style={{ fontSize:13, fontWeight:900, color:m.c }}>{m.v}</div>
            <div style={{ fontSize:10, color:T.muted, marginTop:2 }}>{m.l}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
        {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
        <span className="vbadge">✓ موثق</span>
      </div>

      <div style={{ display:"flex", gap:8 }}>
        <button className="btnP" style={{ flex:1, padding:"11px 0", fontSize:13 }}>الكتالوج</button>
        <button className="btnO" style={{ flex:1, padding:"11px 0", fontSize:13 }}
          onClick={e => { e.stopPropagation(); onChat?.(); }}>💬 تواصل</button>
      </div>
    </div>
  );
}
