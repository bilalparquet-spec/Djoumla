"use client";
import { T } from "@/lib/theme";
import { CATS } from "@/lib/constants";

interface Props {
  open: boolean;
  onClose: () => void;
  showToast: (m: string) => void;
}

export function RFQSheet({ open, onClose, showToast }: Props) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.7)", backdropFilter:"blur(8px)", zIndex:400, display:"flex", alignItems:"flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:"22px 22px 0 0", padding:"24px 18px 44px", width:"100%", animation:"slideUp .3s ease", fontFamily:"'Cairo',sans-serif", maxHeight:"88vh", overflowY:"auto" }}>
        <div style={{ width:36, height:4, borderRadius:2, background:T.dim, margin:"0 auto 20px" }} />
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:22 }}>
          <h3 style={{ fontSize:18, fontWeight:900 }}>📋 طلب عرض سعر</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", color:T.muted, fontSize:22, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input className="inp" placeholder="اسم المنتج..." />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <input className="inp" placeholder="الكمية" type="number" />
            <select className="inp"><option>قطعة</option><option>طن</option><option>كغ</option></select>
          </div>
          <input className="inp" placeholder="الميزانية (دج)" />
          <select className="inp">{CATS.map(c => <option key={c.name}>{c.name}</option>)}</select>
          <textarea className="inp" placeholder="تفاصيل..." style={{ minHeight:68, resize:"vertical" }} />
          <button className="btnP press" style={{ padding:"14px", fontSize:15 }}
            onClick={() => { showToast("تم إرسال الطلب 🎉"); onClose(); }}>
            🚀 إرسال للموردين
          </button>
        </div>
      </div>
    </div>
  );
}
