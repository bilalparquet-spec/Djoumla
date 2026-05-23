"use client";
import { T } from "@/lib/theme";

interface Props {
  page: string;
  setPage: (p: string) => void;
  setChat: (v: boolean) => void;
}

export function Header({ page, setPage, setChat }: Props) {
  const isAuth = page === "login" || page === "register";

  return (
    <header style={{
      position: "relative", zIndex: 100,
      background: "rgba(6,10,18,.96)",
      backdropFilter: "blur(18px)",
      borderBottom: `1px solid ${T.border}`,
      padding: "11px 16px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexShrink: 0,
    }}>
      {isAuth ? (
        <>
          <button onClick={() => setPage("home")} style={{ background:"rgba(255,255,255,.06)", border:`1px solid ${T.border}`, color:T.text, width:36, height:36, borderRadius:10, fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
          <span style={{ fontSize:14, fontWeight:700, color:T.muted }}>{page==="login"?"تسجيل الدخول":"إنشاء حساب"}</span>
          <div style={{ width:36 }} />
        </>
      ) : (
        <>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#00E5A0,#3D8EF0)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color:"#060A12", flexShrink:0 }}>ج</div>
            <div>
              <div style={{ fontSize:15, fontWeight:900, color:"#fff", lineHeight:1 }}>جملة DZ</div>
              <div style={{ fontSize:9, color:T.accent, letterSpacing:1, fontWeight:700 }}>B2B WHOLESALE</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button className="btnO" style={{ padding:"7px 13px", fontSize:12 }} onClick={() => setPage("login")}>دخول</button>
            <button className="btnP" style={{ padding:"7px 13px", fontSize:12 }} onClick={() => setPage("register")}>انضم</button>
            <div style={{ position:"relative", cursor:"pointer" }} onClick={() => setChat(true)}>
              <span style={{ fontSize:22 }}>💬</span>
              <div className="ndot" />
            </div>
          </div>
        </>
      )}
    </header>
  );
}
