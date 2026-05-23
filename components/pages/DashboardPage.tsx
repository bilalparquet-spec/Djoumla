"use client";
import { useState } from "react";
import { T } from "@/lib/theme";

interface Props {
  setPage?: (p: string) => void;
  showToast: (m: string) => void;
}

const ORDERS = [
  { id:"#7821", buyer:"شركة النجاح",   prod:"50 هاتف",     amt:"450,000 دج", st:"جديد",        c:"#00E5A0" },
  { id:"#7820", buyer:"مؤسسة الأمل",    prod:"20 لابتوب",   amt:"760,000 دج", st:"قيد التنفيذ", c:"#F5A623" },
  { id:"#7818", buyer:"مستورد الشمال",  prod:"100 إكسسوار", amt:"85,000 دج",  st:"مكتمل",       c:"#6B7A99" },
  { id:"#7815", buyer:"تاجر العاصمة",   prod:"30 تابلت",    amt:"310,000 دج", st:"مكتمل",       c:"#6B7A99" },
];

const TABS = [
  { id:"overview",  l:"نظرة عامة" },
  { id:"products",  l:"المنتجات"  },
  { id:"orders",    l:"الطلبات"   },
  { id:"messages",  l:"الرسائل"   },
];

export function DashboardPage({ showToast, setPage }: Props) {
  const [tab, setTab] = useState("overview");

  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 16px" }}>
      <div style={{ paddingTop:18, marginBottom:14 }}>
        <h2 style={{ fontSize:22, fontWeight:900 }}>لوحة التحكم</h2>
        <p style={{ color:T.muted, fontSize:13, marginTop:4 }}>مصنع النور للإلكترونيات 🏭</p>
      </div>

      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6, marginBottom:18 }}>
        {TABS.map(t => <button key={t.id} className={`chip ${tab===t.id?"chipOn":"chipOff"}`} onClick={() => setTab(t.id)}>{t.l}</button>)}
      </div>

      {tab==="overview" && (
        <div className="aFadeIn">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
            {[
              { icon:"💰", l:"إيرادات الشهر", v:"4.23M دج", ch:"+18%", c:T.accent },
              { icon:"📦", l:"طلبات جديدة",   v:"47",       ch:"+8",   c:T.blue   },
              { icon:"⭐", l:"التقييم",        v:"4.9 / 5",  ch:"+0.1", c:T.amber  },
              { icon:"💬", l:"رسائل جديدة",   v:"12",       ch:"",     c:"#F472B6" },
            ].map((k,i) => (
              <div key={i} className="card" style={{ padding:16 }}>
                <div style={{ fontSize:22, marginBottom:10 }}>{k.icon}</div>
                <div style={{ fontSize:18, fontWeight:900, color:"#fff" }}>{k.v}</div>
                <div style={{ fontSize:11, color:T.muted, marginTop:3 }}>{k.l}</div>
                {k.ch && <div style={{ color:k.c, fontSize:12, marginTop:6, fontWeight:700 }}>↑ {k.ch}</div>}
              </div>
            ))}
          </div>

          <div className="card" style={{ padding:18, marginBottom:14 }}>
            <div style={{ fontWeight:800, fontSize:15, marginBottom:16 }}>📋 آخر الطلبات</div>
            {ORDERS.slice(0,3).map((o,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom: i<2 ? `1px solid ${T.border}` : "none" }}>
                <div>
                  <div style={{ fontWeight:700, fontSize:13 }}>{o.id} — {o.buyer}</div>
                  <div style={{ color:T.muted, fontSize:11, marginTop:2 }}>{o.prod}</div>
                </div>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontWeight:700, color:T.accent, fontSize:13 }}>{o.amt}</div>
                  <div style={{ color:o.c, fontSize:11, marginTop:2 }}>{o.st}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:"linear-gradient(135deg,rgba(245,166,35,.1),rgba(240,82,82,.07))", border:`1px solid rgba(245,166,35,.22)`, borderRadius:16, padding:18, marginBottom:14 }}>
            <div style={{ fontWeight:800, fontSize:15, marginBottom:6 }}>🏆 الباقة الذهبية</div>
            <p style={{ color:T.muted, fontSize:13, marginBottom:14 }}>باقتك الحالية: <strong style={{ color:T.amber }}>ذهبي — 4,900 دج/شهر</strong></p>
            {["منتجات غير محدودة","ظهور أولوي","شارة الذهبي","تحليلات متقدمة","دعم 24/7"].map(f => (
              <div key={f} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, marginBottom:8 }}>
                <span style={{ color:T.accent, fontWeight:800 }}>✓</span>{f}
              </div>
            ))}
            <button className="btnP press" style={{ width:"100%", padding:"12px", fontSize:14, marginTop:12 }} onClick={() => showToast("تجديد الاشتراك ✓")}>تجديد الاشتراك</button>
          </div>
        </div>
      )}

      {tab==="products" && (
        <div className="aFadeIn">
          <div style={{ display:"flex", gap:10, marginBottom:16 }}>
            <div className="sf-wrap" style={{ flex:1 }}><span className="sf-ico">🔍</span><input className="inp" placeholder="بحث..." /></div>
            <button className="btnP press" style={{ padding:"0 16px", fontSize:13, flexShrink:0 }} onClick={() => showToast("تم إضافة منتج!")}>+ منتج</button>
          </div>
          {["هاتف X Pro","لابتوب Ultra","سماعات BT","شاشة 4K","لوحة مفاتيح","ماوس لاسلكي"].map((p,i) => (
            <div key={i} className="card press" style={{ padding:14, marginBottom:10, display:"flex", alignItems:"center", gap:14 }}>
              <div className="ibox" style={{ width:44, height:44, background:"rgba(61,142,240,.12)", fontSize:22, flexShrink:0 }}>📱</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14 }}>{p}</div>
                <div style={{ color:T.accent, fontSize:13, marginTop:2 }}>{(i+1)*15}K دج</div>
              </div>
              <button className="btnO" style={{ padding:"7px 14px", fontSize:12 }}>تعديل</button>
            </div>
          ))}
        </div>
      )}

      {tab==="orders" && (
        <div className="aFadeIn">
          {ORDERS.map((o,i) => (
            <div key={i} className="card" style={{ padding:16, marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                <span style={{ fontWeight:800 }}>{o.id}</span>
                <span style={{ color:o.c, fontSize:13, fontWeight:700 }}>● {o.st}</span>
              </div>
              <div style={{ fontSize:14, marginBottom:4 }}>{o.buyer}</div>
              <div style={{ color:T.muted, fontSize:12, marginBottom:12 }}>{o.prod}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:T.accent, fontWeight:700 }}>{o.amt}</span>
                <button className="btnO" style={{ padding:"6px 14px", fontSize:12 }}>التفاصيل</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==="messages" && (
        <div className="aFadeIn">
          {["شركة النجاح","مؤسسة التطوير","مستورد الجنوب","تاجر العاصمة"].map((name,i) => (
            <div key={i} className="card press" style={{ padding:16, marginBottom:10, display:"flex", alignItems:"center", gap:14 }}>
              <div className="ava" style={{ width:46, height:46, background:"rgba(0,229,160,.1)", fontSize:22, flexShrink:0 }}>🏢</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14 }}>{name}</div>
                <div style={{ color:T.muted, fontSize:12, marginTop:2 }}>آخر رسالة منذ {i+1} ساعة</div>
              </div>
              {i===0 && <div style={{ width:10, height:10, borderRadius:"50%", background:T.accent, flexShrink:0 }} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
