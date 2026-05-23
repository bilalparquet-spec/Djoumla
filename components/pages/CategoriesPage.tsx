"use client";
import { CATS } from "@/lib/constants";

interface Props {
  setPage: (p: string) => void;
}

export function CategoriesPage({ setPage }: Props) {
  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 16px" }}>
      <div style={{ paddingTop:18, marginBottom:18 }}>
        <h2 style={{ fontSize:22, fontWeight:900 }}>الفئات</h2>
        <p style={{ color:"#6B7A99", fontSize:13, marginTop:4 }}>تصفح حسب الصناعة</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {CATS.map((cat,i) => (
          <div key={i} className="card press" onClick={() => setPage("suppliers")} style={{ padding:18, textAlign:"center", border:`1px solid ${cat.c}22` }}>
            <div style={{ width:56, height:56, borderRadius:14, background:`${cat.c}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 12px" }}>{cat.icon}</div>
            <div style={{ fontWeight:800, fontSize:14, marginBottom:6 }}>{cat.name}</div>
            <div style={{ color:cat.c, fontWeight:700, fontSize:13, marginBottom:14 }}>{cat.n} منتج</div>
            <button className="btnO" style={{ width:"100%", padding:"9px", fontSize:13, borderColor:cat.c, color:cat.c }}>تصفح</button>
          </div>
        ))}
      </div>
    </div>
  );
}
