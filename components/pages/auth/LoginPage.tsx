"use client";
import { useState } from "react";
import { T } from "@/lib/theme";

interface Props {
  setPage: (p: string) => void;
  showToast: (m: string) => void;
}

export function LoginPage({ setPage, showToast }: Props) {
  const [phone, setPhone] = useState("");
  const [pass,  setPass]  = useState("");
  const [show,  setShow]  = useState(false);

  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 20px", display:"flex", flexDirection:"column", minHeight:"100%" }}>
      <div style={{ paddingTop:32, paddingBottom:32, textAlign:"center" }}>
        <div style={{ width:68, height:68, borderRadius:20, background:"linear-gradient(135deg,#00E5A0,#3D8EF0)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, fontWeight:900, color:"#060A12", margin:"0 auto 16px" }}>ج</div>
        <h1 style={{ fontSize:24, fontWeight:900, color:"#fff" }}>أهلاً بعودتك</h1>
        <p style={{ color:T.muted, fontSize:14, marginTop:6 }}>سجّل دخولك إلى جملة DZ</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
        {[
          { icon:"🇬", label:"متابعة عبر Google",   bg:"rgba(255,255,255,.06)" },
          { icon:"📘", label:"متابعة عبر Facebook", bg:"rgba(59,89,152,.15)"   },
        ].map((s,i) => (
          <button key={i} className="btnGhost press" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, padding:"13px", fontSize:14, width:"100%", border:`1px solid ${T.border}` }}
            onClick={() => { showToast("مرحباً بك 👋"); setPage("home"); }}>
            <span style={{ fontSize:18 }}>{s.icon}</span> {s.label}
          </button>
        ))}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <div style={{ flex:1, height:1, background:T.border }} />
        <span style={{ color:T.muted, fontSize:13 }}>أو بالهاتف</span>
        <div style={{ flex:1, height:1, background:T.border }} />
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:24 }}>
        <div>
          <label style={{ display:"block", fontSize:12, color:T.muted, marginBottom:7, fontWeight:600 }}>رقم الهاتف</label>
          <input className="inp" placeholder="05xxxxxxxx" value={phone} onChange={e=>setPhone(e.target.value)} type="tel" />
        </div>
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
            <label style={{ fontSize:12, color:T.muted, fontWeight:600 }}>كلمة المرور</label>
            <button onClick={() => showToast("تم إرسال رابط الاسترجاع")} style={{ background:"none", border:"none", color:T.accent, fontFamily:"'Cairo',sans-serif", fontSize:12, cursor:"pointer" }}>نسيت؟</button>
          </div>
          <div style={{ position:"relative" }}>
            <input className="inp" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)} type={show?"text":"password"} style={{ paddingLeft:44 }} />
            <button onClick={()=>setShow(s=>!s)} style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:16, color:T.muted }}>
              {show?"🙈":"👁️"}
            </button>
          </div>
        </div>
      </div>

      <button className="btnP press" style={{ width:"100%", padding:"15px", fontSize:15, marginBottom:20 }}
        onClick={() => { if(phone && pass) { showToast("مرحباً بك 👋"); setPage("home"); } }}>
        تسجيل الدخول
      </button>

      <p style={{ textAlign:"center", fontSize:14, color:T.muted, paddingBottom:20 }}>
        ليس لديك حساب؟{" "}
        <button onClick={() => setPage("register")} style={{ background:"none", border:"none", color:T.accent, fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>إنشاء حساب</button>
      </p>
    </div>
  );
}
