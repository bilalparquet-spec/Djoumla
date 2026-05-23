"use client";
import { useState } from "react";
import { SLIDES } from "@/lib/constants";

interface Props {
  onDone: () => void;
}

export function Onboarding({ onDone }: Props) {
  const [idx, setIdx] = useState(0);
  const sl = SLIDES[idx];
  const last = idx === SLIDES.length - 1;

  return (
    <div dir="rtl" style={{ fontFamily:"'Cairo',sans-serif", background:"#060A12", height:"100%", display:"flex", flexDirection:"column", color:"#F0F4FF", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-20%", left:"50%", transform:"translateX(-50%)", width:360, height:360, borderRadius:"50%", background:`${sl.c}12`, filter:"blur(80px)", transition:"background .6s", pointerEvents:"none" }} />

      <div style={{ padding:"20px 20px 0", display:"flex", justifyContent:"flex-end", zIndex:1 }}>
        <button onClick={onDone} style={{ background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,0.07)", color:"#6B7A99", padding:"7px 16px", borderRadius:99, fontFamily:"'Cairo',sans-serif", fontSize:13, cursor:"pointer" }}>تخطي</button>
      </div>

      <div key={idx} className="aScaleIn" style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 32px", textAlign:"center", zIndex:1 }}>
        <div style={{ width:130, height:130, borderRadius:"50%", background:`${sl.c}14`, border:`1.5px solid ${sl.c}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:56, marginBottom:36, animation:"float 3s ease-in-out infinite", boxShadow:`0 0 60px ${sl.c}20` }}>
          {sl.icon}
        </div>
        <h1 style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1.2, marginBottom:16 }}>{sl.h}</h1>
        <p style={{ fontSize:15, color:"#6B7A99", lineHeight:1.85, maxWidth:290 }}>{sl.p}</p>
      </div>

      <div style={{ padding:"0 24px 52px", display:"flex", flexDirection:"column", gap:20, alignItems:"center", zIndex:1 }}>
        <div style={{ display:"flex", gap:8 }}>
          {SLIDES.map((_,i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ height:7, borderRadius:4, background: i===idx ? sl.c : "rgba(255,255,255,.12)", width: i===idx ? 28 : 8, transition:"all .3s", cursor:"pointer" }} />
          ))}
        </div>
        <button className="btnP" onClick={() => last ? onDone() : setIdx(i=>i+1)} style={{ width:"100%", padding:"16px", fontSize:16 }}>
          {last ? "🚀 ابدأ الآن" : "التالي"}
        </button>
        {idx > 0 && (
          <button onClick={() => setIdx(i=>i-1)} style={{ background:"none", border:"none", color:"#6B7A99", fontFamily:"'Cairo',sans-serif", fontSize:14, cursor:"pointer" }}>رجوع</button>
        )}
      </div>
    </div>
  );
}
