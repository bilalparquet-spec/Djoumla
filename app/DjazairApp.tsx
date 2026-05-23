"use client";
import { useState, useRef, useEffect } from "react";
import React from "react";

// ── PALETTE & TOKENS ──────────────────────────────────────────────────────────
const T = {
  bg:      "#060A12",
  surface: "#0D1322",
  card:    "#111827",
  border:  "rgba(255,255,255,0.07)",
  accent:  "#00E5A0",
  blue:    "#3D8EF0",
  amber:   "#F5A623",
  danger:  "#F05252",
  text:    "#F0F4FF",
  muted:   "#6B7A99",
  dim:     "#2A3347",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const CATS = [
  { icon:"⚡", name:"إلكترونيات",       n:"2,340", c:"#3D8EF0" },
  { icon:"🚗", name:"سيارات",           n:"1,890", c:"#F5A623" },
  { icon:"🏗️", name:"البناء",           n:"3,120", c:"#A78BFA" },
  { icon:"👗", name:"الموضة",           n:"4,560", c:"#F472B6" },
  { icon:"🏠", name:"المنزل",           n:"2,100", c:"#34D399" },
  { icon:"🌾", name:"الغذاء",           n:"1,670", c:"#F5A623" },
  { icon:"🌱", name:"الزراعة",          n:"980",   c:"#4ADE80" },
  { icon:"☀️", name:"الطاقة",           n:"750",   c:"#FCD34D" },
];
const SUPPLIERS = [
  { name:"مصنع النور للإلكترونيات", badge:"ذهبي", loc:"الجزائر العاصمة", rating:4.9, deals:"1,240", resp:"< ساعة",    tags:["هواتف","إكسسوارات"], img:"🏭", color:"#3D8EF0" },
  { name:"شركة الأطلس للبناء",       badge:"فضي",  loc:"وهران",            rating:4.7, deals:"890",   resp:"< 3 ساعات",tags:["إسمنت","حديد"],      img:"🏗️", color:"#A78BFA" },
  { name:"مجمع تيزي للنسيج",         badge:"ذهبي", loc:"تيزي وزو",         rating:4.8, deals:"2,100", resp:"< ساعتين", tags:["ملابس","أقمشة"],     img:"🧵", color:"#F472B6" },
  { name:"مؤسسة الجنوب للزراعة",     badge:"فضي",  loc:"بسكرة",            rating:4.6, deals:"560",   resp:"< 4 ساعات",tags:["بذور","أسمدة"],      img:"🌾", color:"#4ADE80" },
];
const SLIDES = [
  { icon:"🏭", h:"12,400+ مورد موثق",   p:"تواصل مباشرة مع المصانع والموردين عبر الجزائر.", c:T.accent },
  { icon:"📋", h:"طلب سعر في ثوانٍ",    p:"أرسل مواصفاتك وسيتنافس الموردون على أفضل سعر.", c:T.blue   },
  { icon:"🔒", h:"دفع آمن 100٪",        p:"نظام Escrow يضمن أموالك حتى تستلم بضاعتك.",     c:T.amber  },
  { icon:"🚚", h:"شحن وتتبع فوري",      p:"تتبع شحنتك برّاً وبحراً وجواً لحظةً بلحظة.",   c:"#F472B6" },
];

// ── GLOBAL CSS ────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin:0; padding:0; -webkit-tap-highlight-color: transparent; }

:root {
  --bg:      ${T.bg};
  --surface: ${T.surface};
  --card:    ${T.card};
  --border:  ${T.border};
  --accent:  ${T.accent};
  --blue:    ${T.blue};
  --amber:   ${T.amber};
  --text:    ${T.text};
  --muted:   ${T.muted};
  --dim:     ${T.dim};
  --r:       14px;
  --rLg:     20px;
  --rFull:   999px;
}

body { font-family:'Cairo',sans-serif; background:var(--bg); color:var(--text); }

/* scroll */
::-webkit-scrollbar { width:3px; height:3px; }
::-webkit-scrollbar-thumb { background:var(--dim); border-radius:3px; }

/* animations */
@keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes scaleIn  { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }
@keyframes slideUp  { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
@keyframes pulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(.72)} }
@keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
@keyframes spin     { to{transform:rotate(360deg)} }
@keyframes shimmer  { 0%{background-position:-300px 0} 100%{background-position:300px 0} }
@keyframes progress { from{width:0} to{width:var(--pw,100%)} }

.aFadeUp  { animation:fadeUp  .38s cubic-bezier(.25,0,.25,1) both; }
.aFadeIn  { animation:fadeIn  .25s ease both; }
.aScaleIn { animation:scaleIn .32s cubic-bezier(.25,0,.25,1) both; }

/* page scroll container */
.pscroll {
  height:100%;
  overflow-y:auto;
  overflow-x:hidden;
  -webkit-overflow-scrolling:touch;
  overscroll-behavior:contain;
  padding-bottom:90px;
}

/* pressable */
.press { transition:transform .12s,opacity .12s; cursor:pointer; }
.press:active { transform:scale(.96); opacity:.85; }

/* cards */
.card {
  background:var(--card);
  border:1px solid var(--border);
  border-radius:var(--rLg);
}

/* buttons */
.btnP {
  display:flex; align-items:center; justify-content:center; gap:6px;
  background:var(--accent); color:#060A12;
  border:none; border-radius:var(--r);
  font-family:'Cairo',sans-serif; font-weight:700; cursor:pointer;
}
.btnP:active { opacity:.82; transform:scale(.96); }

.btnO {
  display:flex; align-items:center; justify-content:center; gap:6px;
  background:transparent; color:var(--accent);
  border:1.5px solid rgba(0,229,160,.35); border-radius:var(--r);
  font-family:'Cairo',sans-serif; font-weight:600; cursor:pointer;
}
.btnO:active { background:rgba(0,229,160,.08); transform:scale(.96); }

.btnGhost {
  background:rgba(255,255,255,.06); color:var(--text);
  border:1px solid var(--border); border-radius:var(--r);
  font-family:'Cairo',sans-serif; font-weight:600; cursor:pointer;
}
.btnGhost:active { opacity:.7; }

/* inputs */
.inp {
  width:100%;
  background:rgba(255,255,255,.05);
  border:1.5px solid var(--border);
  border-radius:var(--r);
  padding:13px 16px;
  color:var(--text);
  font-family:'Cairo',sans-serif;
  font-size:14px;
  outline:none;
  transition:border-color .2s, box-shadow .2s;
}
.inp:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(0,229,160,.1); }
.inp::placeholder { color:var(--muted); }
select.inp option { background:#0D1322; }

/* chips */
.chip {
  padding:7px 14px; border-radius:var(--rFull);
  font-family:'Cairo',sans-serif; font-size:13px; font-weight:700;
  cursor:pointer; white-space:nowrap; flex-shrink:0;
  border:1.5px solid; transition:all .15s;
}
.chipOn  { background:rgba(0,229,160,.1); border-color:var(--accent); color:var(--accent); }
.chipOff { background:transparent; border-color:var(--border); color:var(--muted); }

/* badge */
.badgeG { background:linear-gradient(135deg,#F5A623,#F05252); color:#fff; }
.badgeS { background:linear-gradient(135deg,#94A3B8,#64748B); color:#fff; }
.badge  { padding:2px 10px; border-radius:var(--rFull); font-size:11px; font-weight:800; }

/* bottom nav */
.bnBtn {
  display:flex; flex-direction:column; align-items:center; gap:2px;
  flex:1; padding:7px 2px;
  border:none; background:none;
  font-family:'Cairo',sans-serif;
  color:var(--muted);
  cursor:pointer;
  transition:color .18s;
  position:relative;
}
.bnBtn.on { color:var(--accent); }
.bnBtn .bni { font-size:22px; line-height:1; }
.bnBtn .bnl { font-size:10px; font-weight:700; }

/* active indicator for bottom nav */
.bnBtn.on::before {
  content:'';
  position:absolute;
  top:0; left:50%; transform:translateX(-50%);
  width:28px; height:3px;
  background:var(--accent);
  border-radius:0 0 3px 3px;
}

/* notification dot */
.ndot {
  position:absolute; top:0; right:2px;
  width:8px; height:8px; border-radius:50%;
  background:#F05252; border:2px solid var(--bg);
  animation:pulse 2s infinite;
}

/* toast */
.toast {
  position:fixed; bottom:88px; left:50%; transform:translateX(-50%);
  background:rgba(0,229,160,.18); border:1px solid rgba(0,229,160,.35);
  backdrop-filter:blur(12px);
  color:var(--accent); padding:11px 24px; border-radius:var(--rFull);
  font-size:13px; font-weight:700; font-family:'Cairo',sans-serif;
  z-index:9999; animation:fadeUp .3s ease; white-space:nowrap;
  box-shadow:0 8px 32px rgba(0,229,160,.15);
}

/* divider */
.divider { height:1px; background:var(--border); }

/* tag */
.tag {
  padding:3px 10px; border-radius:var(--rFull);
  font-size:12px; font-weight:600;
  background:rgba(61,142,240,.12); color:var(--blue);
}

/* section header */
.secH { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
.secH h2 { font-size:18px; font-weight:900; }
.secH button { background:none; border:none; color:var(--accent); font-family:'Cairo',sans-serif; font-size:13px; cursor:pointer; font-weight:600; }

/* avatar circle */
.ava { border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

/* icon box */
.ibox { border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

/* OTP input */
.otp-inp {
  width:46px; height:54px; text-align:center; font-size:20px; font-weight:900;
  border-radius:12px; border:1.5px solid var(--border);
  background:rgba(255,255,255,.05); color:var(--text);
  font-family:'Cairo',sans-serif; outline:none;
  transition:border-color .2s, box-shadow .2s;
}
.otp-inp:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(0,229,160,.1); }

/* password strength bar */
.psb { height:4px; border-radius:2px; transition:width .35s, background .35s; }

/* search field */
.sf-wrap { position:relative; }
.sf-ico  { position:absolute; right:14px; top:50%; transform:translateY(-50%); color:var(--muted); pointer-events:none; font-size:15px; }
.sf-wrap .inp { padding-right:40px; }

/* hero gradient bg */
.hero-bg {
  background: linear-gradient(145deg,rgba(0,229,160,.08) 0%,rgba(61,142,240,.06) 50%,transparent 100%);
  border:1px solid rgba(0,229,160,.15);
}

/* stat card */
.stat-card {
  background:rgba(255,255,255,.03);
  border:1px solid var(--border);
  border-radius:12px;
  padding:14px;
  text-align:center;
}

/* verified */
.vbadge {
  display:inline-flex; align-items:center; gap:5px;
  background:rgba(0,229,160,.07); border:1px solid rgba(0,229,160,.2);
  border-radius:var(--rFull); padding:3px 10px;
  font-size:12px; color:var(--accent); font-weight:600;
}

/* skeleton shimmer */
.shimmer {
  background: linear-gradient(90deg, var(--card) 25%, var(--dim) 50%, var(--card) 75%);
  background-size:400px 100%;
  animation:shimmer 1.4s infinite;
}

/* rating stars */
.stars { color:#F5A623; font-size:12px; }

/* chat bubble */
.cbMe  { background:rgba(0,229,160,.15); border-radius:16px 16px 0 16px; align-self:flex-end; }
.cbSup { background:rgba(255,255,255,.06); border-radius:16px 16px 16px 0; align-self:flex-start; }

/* step indicator */
.step-active { background:var(--accent); color:#060A12; }
.step-done   { background:rgba(0,229,160,.2); color:var(--accent); border:1.5px solid rgba(0,229,160,.3); }
.step-idle   { background:var(--dim); color:var(--muted); }
`;

// ── SMALL COMPONENTS ──────────────────────────────────────────────────────────

const Toast = ({ msg }) => <div className="toast">✓ {msg}</div>;

function PulseBar({ color = T.accent }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <div style={{ width:6, height:6, borderRadius:"50%", background:color, animation:"pulse 2s infinite" }} />
      <span style={{ fontSize:11, color, fontWeight:700, letterSpacing:.5 }}>مباشر</span>
    </div>
  );
}

function SupplierCard({ s, onChat, compact }) {
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

      {/* metrics */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
        {[
          { v:`${s.rating}`, l:"التقييم", icon:"⭐", c:T.amber },
          { v:s.deals, l:"صفقة",    icon:"📦", c:T.accent },
          { v:s.resp,  l:"رد سريع", icon:"⚡", c:T.blue  },
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

// ── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [idx, setIdx] = useState(0);
  const sl = SLIDES[idx];
  const last = idx === SLIDES.length - 1;

  return (
    <div dir="rtl" style={{ fontFamily:"'Cairo',sans-serif", background:T.bg, height:"100%", display:"flex", flexDirection:"column", color:T.text, position:"relative", overflow:"hidden" }}>
      <style>{CSS}</style>

      {/* ambient glow */}
      <div style={{ position:"absolute", top:"-20%", left:"50%", transform:"translateX(-50%)", width:360, height:360, borderRadius:"50%", background:`${sl.c}12`, filter:"blur(80px)", transition:"background .6s", pointerEvents:"none" }} />

      {/* skip */}
      <div style={{ padding:"20px 20px 0", display:"flex", justifyContent:"flex-end", zIndex:1 }}>
        <button onClick={onDone} style={{ background:"rgba(255,255,255,.07)", border:"1px solid var(--border)", color:T.muted, padding:"7px 16px", borderRadius:99, fontFamily:"'Cairo',sans-serif", fontSize:13, cursor:"pointer" }}>تخطي</button>
      </div>

      {/* slide */}
      <div key={idx} className="aScaleIn" style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 32px", textAlign:"center", zIndex:1 }}>
        <div style={{ width:130, height:130, borderRadius:"50%", background:`${sl.c}14`, border:`1.5px solid ${sl.c}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:56, marginBottom:36, animation:"float 3s ease-in-out infinite", boxShadow:`0 0 60px ${sl.c}20` }}>
          {sl.icon}
        </div>
        <h1 style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1.2, marginBottom:16 }}>{sl.h}</h1>
        <p style={{ fontSize:15, color:T.muted, lineHeight:1.85, maxWidth:290 }}>{sl.p}</p>
      </div>

      {/* dots + cta */}
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
          <button onClick={() => setIdx(i=>i-1)} style={{ background:"none", border:"none", color:T.muted, fontFamily:"'Cairo',sans-serif", fontSize:14, cursor:"pointer" }}>رجوع</button>
        )}
      </div>
    </div>
  );
}

// ── AUTH: LOGIN ───────────────────────────────────────────────────────────────
function LoginPage({ setPage, showToast }) {
  const [phone, setPhone] = useState("");
  const [pass,  setPass]  = useState("");
  const [show,  setShow]  = useState(false);

  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 20px", display:"flex", flexDirection:"column", minHeight:"100%" }}>
      {/* logo top */}
      <div style={{ paddingTop:32, paddingBottom:32, textAlign:"center" }}>
        <div style={{ width:68, height:68, borderRadius:20, background:"linear-gradient(135deg,#00E5A0,#3D8EF0)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, fontWeight:900, color:"#060A12", margin:"0 auto 16px" }}>ج</div>
        <h1 style={{ fontSize:24, fontWeight:900, color:"#fff" }}>أهلاً بعودتك</h1>
        <p style={{ color:T.muted, fontSize:14, marginTop:6 }}>سجّل دخولك إلى جملة DZ</p>
      </div>

      {/* social */}
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

      {/* divider */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <div style={{ flex:1, height:1, background:T.border }} />
        <span style={{ color:T.muted, fontSize:13 }}>أو بالهاتف</span>
        <div style={{ flex:1, height:1, background:T.border }} />
      </div>

      {/* form */}
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

// ── AUTH: REGISTER ────────────────────────────────────────────────────────────
function RegisterPage({ setPage, showToast }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const [form, setForm] = useState({ name:"", phone:"", email:"", pass:"", confirm:"", wilaya:"", sector:"", rc:"" });
  const [otp,  setOtp]  = useState(["","","","","",""]);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const strength = p => {
    if (!p) return { w:0, c:"transparent", l:"" };
    if (p.length < 6) return { w:25, c:"#F05252", l:"ضعيفة" };
    if (p.length < 9) return { w:55, c:T.amber, l:"متوسطة" };
    if (/[A-Z]/.test(p) && /\d/.test(p)) return { w:100, c:T.accent, l:"قوية جداً" };
    return { w:75, c:T.blue, l:"جيدة" };
  };
  const str = strength(form.pass);

  const WILAYAS = ["الجزائر العاصمة","وهران","قسنطينة","عنابة","تيزي وزو","بجاية","سطيف","بسكرة","ورقلة","غرداية"];

  // progress dots
  const Steps = () => (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, marginBottom:28 }}>
      {[1,2,3].map((n,i) => (
        <React.Fragment key={n}>
          <div style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}
            className={step > n ? "step-done" : step === n ? "step-active" : "step-idle"}>
            {step > n ? "✓" : n}
          </div>
          {i < 2 && <div style={{ height:2, width:40, background: step > n+1 ? `${T.accent}40` : T.border }} />}
        </React.Fragment>
      ))}
    </div>
  );

  // STEP 1
  if (step === 1) return (
    <div className="pscroll aFadeUp" style={{ padding:"0 20px" }}>
      <div style={{ paddingTop:32, paddingBottom:24 }}>
        <h1 style={{ fontSize:24, fontWeight:900 }}>إنشاء حساب</h1>
        <p style={{ color:T.muted, fontSize:14, marginTop:6 }}>كيف ستستخدم المنصة؟</p>
      </div>
      <Steps />
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {[
          { id:"buyer",    icon:"🛒", title:"مشتري / تاجر",   desc:"أبحث عن موردين وأشتري بالجملة", c:T.blue   },
          { id:"supplier", icon:"🏭", title:"مورد / مصنع",    desc:"أعرض منتجاتي وأبيع بالجملة",   c:T.accent },
        ].map(o => (
          <div key={o.id} className="card press" onClick={() => setType(o.id)} style={{
            padding:20, border: type===o.id ? `1.5px solid ${o.c}` : `1px solid ${T.border}`,
            background: type===o.id ? `${o.c}0C` : T.card,
            display:"flex", alignItems:"center", gap:16, transition:"all .2s",
          }}>
            <div className="ibox" style={{ width:54, height:54, background:`${o.c}18`, fontSize:26 }}>{o.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, fontSize:16, color: type===o.id ? o.c : T.text }}>{o.title}</div>
              <div style={{ color:T.muted, fontSize:13, marginTop:4 }}>{o.desc}</div>
            </div>
            <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${type===o.id?o.c:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              {type===o.id && <div style={{ width:10, height:10, borderRadius:"50%", background:o.c }} />}
            </div>
          </div>
        ))}
      </div>
      <button className="btnP press" style={{ width:"100%", padding:"15px", fontSize:15, marginTop:24, opacity: type?1:.4 }}
        disabled={!type} onClick={() => setStep(2)}>متابعة</button>
      <p style={{ textAlign:"center", fontSize:14, color:T.muted, marginTop:20, paddingBottom:20 }}>
        لديك حساب؟{" "}
        <button onClick={() => setPage("login")} style={{ background:"none", border:"none", color:T.accent, fontFamily:"'Cairo',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}>تسجيل الدخول</button>
      </p>
    </div>
  );

  // STEP 2
  if (step === 2) return (
    <div className="pscroll aFadeUp" style={{ padding:"0 20px" }}>
      <div style={{ paddingTop:32, paddingBottom:20 }}>
        <h1 style={{ fontSize:22, fontWeight:900 }}>{type==="supplier"?"بيانات المنشأة":"بياناتك"}</h1>
        <p style={{ color:T.muted, fontSize:13, marginTop:6 }}>الخطوة 2 من 3</p>
      </div>
      <Steps />
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {[
          { k:"name",  label: type==="supplier"?"اسم المنشأة":"الاسم الكامل", ph: type==="supplier"?"مصنع النور للإلكترونيات":"محمد أمين بلقاسم" },
          { k:"phone", label:"رقم الهاتف", ph:"05xxxxxxxx", type:"tel" },
          { k:"email", label:"البريد الإلكتروني", ph:"email@example.com", type:"email" },
        ].map(f => (
          <div key={f.k}>
            <label style={{ display:"block", fontSize:12, color:T.muted, marginBottom:7, fontWeight:600 }}>{f.label}</label>
            <input className="inp" placeholder={f.ph} value={form[f.k]} onChange={set(f.k)} type={f.type||"text"} />
          </div>
        ))}

        <div>
          <label style={{ display:"block", fontSize:12, color:T.muted, marginBottom:7, fontWeight:600 }}>الولاية</label>
          <select className="inp" value={form.wilaya} onChange={set("wilaya")}>
            <option value="">اختر الولاية...</option>
            {WILAYAS.map(w => <option key={w}>{w}</option>)}
          </select>
        </div>

        {type==="supplier" && <>
          <div>
            <label style={{ display:"block", fontSize:12, color:T.muted, marginBottom:7, fontWeight:600 }}>قطاع النشاط</label>
            <select className="inp" value={form.sector} onChange={set("sector")}>
              <option value="">اختر القطاع...</option>
              {CATS.map(c => <option key={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:"block", fontSize:12, color:T.muted, marginBottom:7, fontWeight:600 }}>رقم السجل التجاري</label>
            <input className="inp" placeholder="16/00-XXXX" value={form.rc} onChange={set("rc")} />
          </div>
        </>}

        <div>
          <label style={{ display:"block", fontSize:12, color:T.muted, marginBottom:7, fontWeight:600 }}>كلمة المرور</label>
          <input className="inp" placeholder="8 أحرف على الأقل" value={form.pass} onChange={set("pass")} type="password" />
          {form.pass && (
            <div style={{ marginTop:8 }}>
              <div style={{ height:4, borderRadius:2, background:T.dim, overflow:"hidden" }}>
                <div className="psb" style={{ width:`${str.w}%`, background:str.c }} />
              </div>
              <div style={{ display:"flex", justifyContent:"flex-end", marginTop:4 }}>
                <span style={{ fontSize:11, color:str.c, fontWeight:700 }}>{str.l}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label style={{ display:"block", fontSize:12, color:T.muted, marginBottom:7, fontWeight:600 }}>تأكيد كلمة المرور</label>
          <input className="inp" placeholder="••••••••" value={form.confirm} onChange={set("confirm")} type="password" />
          {form.confirm && (
            <div style={{ marginTop:5, fontSize:12, fontWeight:600, color: form.pass===form.confirm ? T.accent : "#F05252" }}>
              {form.pass===form.confirm ? "✓ متطابقتان" : "✕ غير متطابقتين"}
            </div>
          )}
        </div>

        {/* terms */}
        <div style={{ background:"rgba(255,255,255,.03)", border:`1px solid ${T.border}`, borderRadius:12, padding:14, display:"flex", gap:12 }}>
          <span style={{ fontSize:20, flexShrink:0 }}>📄</span>
          <p style={{ fontSize:12, color:T.muted, lineHeight:1.7 }}>
            بالتسجيل، أوافق على{" "}
            <span style={{ color:T.accent, cursor:"pointer" }}>شروط الاستخدام</span>{" "}و{" "}
            <span style={{ color:T.accent, cursor:"pointer" }}>سياسة الخصوصية</span>.
          </p>
        </div>

        <button className="btnP press" style={{ padding:"15px", fontSize:15 }}
          onClick={() => { if(form.name&&form.phone&&form.pass&&form.pass===form.confirm) setStep(3); }}>
          متابعة → التحقق
        </button>
      </div>
    </div>
  );

  // STEP 3 – OTP
  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 20px", display:"flex", flexDirection:"column", justifyContent:"center", minHeight:"100%" }}>
      <div style={{ paddingTop:32, marginBottom:24 }}>
        <Steps />
      </div>
      <div style={{ textAlign:"center", marginBottom:40 }}>
        <div style={{ fontSize:60, marginBottom:18 }}>📲</div>
        <h2 style={{ fontSize:22, fontWeight:900, marginBottom:12 }}>التحقق من هاتفك</h2>
        <p style={{ color:T.muted, fontSize:14, lineHeight:1.8 }}>
          أرسلنا رمز التحقق إلى<br />
          <strong style={{ color:"#fff" }}>{form.phone || "05xxxxxxxx"}</strong>
        </p>
      </div>

      {/* OTP boxes */}
      <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:30, direction:"ltr" }}>
        {otp.map((v,i) => (
          <input key={i} id={`otp${i}`} className="otp-inp" maxLength={1} value={v}
            onChange={e => {
              const val = e.target.value.replace(/\D/,"");
              const next = [...otp]; next[i] = val; setOtp(next);
              if (val && i<5) document.getElementById(`otp${i+1}`)?.focus();
            }}
            onKeyDown={e => { if(e.key==="Backspace"&&!v&&i>0) document.getElementById(`otp${i-1}`)?.focus(); }}
          />
        ))}
      </div>

      <button className="btnP press" style={{ padding:"15px", fontSize:15, marginBottom:18 }}
        onClick={() => { showToast("تم إنشاء حسابك 🎉"); setPage("home"); }}>
        ✅ تأكيد وإنشاء الحساب
      </button>
      <p style={{ textAlign:"center", color:T.muted, fontSize:13 }}>
        لم تصلك الرسالة؟{" "}
        <button onClick={() => showToast("تم إعادة الإرسال")} style={{ background:"none", border:"none", color:T.accent, fontFamily:"'Cairo',sans-serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>إعادة الإرسال</button>
      </p>
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomePage({ setPage, setRfq, setChat }) {
  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 16px" }}>
      {/* hero */}
      <div className="hero-bg" style={{ borderRadius:20, padding:"22px 18px", marginTop:16, marginBottom:18 }}>
        <PulseBar />
        <h1 style={{ fontSize:27, fontWeight:900, lineHeight:1.25, margin:"12px 0 10px", color:"#fff" }}>
          تجارة الجملة<br />
          <span style={{ background:`linear-gradient(90deg,${T.accent},${T.blue})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            بذكاء وأمان
          </span>
        </h1>
        <p style={{ fontSize:13, color:T.muted, lineHeight:1.8, marginBottom:18 }}>
          ربط المصانع والموردين بالمشترين — مفاوضة مباشرة، دفع آمن، شحن موثوق.
        </p>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btnP press" style={{ flex:1, padding:"13px", fontSize:14 }} onClick={() => setPage("suppliers")}>الموردون</button>
          <button className="btnO press" style={{ flex:1, padding:"13px", fontSize:14 }} onClick={() => setRfq(true)}>📋 طلب سعر</button>
        </div>
      </div>

      {/* search */}
      <div className="sf-wrap" style={{ marginBottom:18 }}>
        <span className="sf-ico">🔍</span>
        <input className="inp" placeholder="ابحث عن منتج أو مورد..." />
      </div>

      {/* stats */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:22 }}>
        {[
          { icon:"🏭", v:"12,400+", l:"مورد موثق",    c:T.accent },
          { icon:"📦", v:"85K+",   l:"منتج مدرج",    c:T.blue   },
          { icon:"🗺️", v:"34",     l:"ولاية مغطاة",  c:"#A78BFA"},
          { icon:"💰", v:"99M+",   l:"حجم الصفقات",  c:T.amber  },
        ].map((s,i) => (
          <div key={i} className="card press" style={{ padding:"16px 14px", display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:26 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize:17, fontWeight:900, color:s.c }}>{s.v}</div>
              <div style={{ fontSize:11, color:T.muted, marginTop:2 }}>{s.l}</div>
            </div>
          </div>
        ))}
      </div>

      {/* categories */}
      <div className="secH">
        <h2>الفئات</h2>
        <button onClick={() => setPage("categories")}>عرض الكل</button>
      </div>
      {/* horizontal scroll row */}
      <div style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:8, marginBottom:22 }}>
        {CATS.map((c,i) => (
          <div key={i} className="card press" onClick={() => setPage("categories")} style={{
            minWidth:96, padding:"14px 10px", textAlign:"center",
            flexShrink:0, border:`1px solid ${c.c}22`,
          }}>
            <div style={{ fontSize:28, marginBottom:8 }}>{c.icon}</div>
            <div style={{ fontWeight:700, fontSize:12, lineHeight:1.3 }}>{c.name}</div>
            <div style={{ color:c.c, fontSize:11, marginTop:4, fontWeight:700 }}>{c.n}</div>
          </div>
        ))}
      </div>

      {/* top suppliers */}
      <div className="secH">
        <h2>أبرز الموردين</h2>
        <button onClick={() => setPage("suppliers")}>الكل</button>
      </div>
      {SUPPLIERS.slice(0,2).map((s,i) => <SupplierCard key={i} s={s} onChat={() => setChat(true)} compact />)}

      {/* how it works */}
      <div className="card" style={{ padding:"20px 18px", marginTop:4 }}>
        <h3 style={{ fontSize:16, fontWeight:900, textAlign:"center", marginBottom:22 }}>كيف تعمل المنصة؟</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {[
            { n:"01", icon:"🔍", t:"ابحث",         d:"ابحث عن المنتج أو المورد المناسب" },
            { n:"02", icon:"💬", t:"تفاوض",         d:"تواصل مباشرة مع المصنع" },
            { n:"03", icon:"🔒", t:"ادفع بأمان",    d:"نظام Escrow يضمن حقك" },
            { n:"04", icon:"🚚", t:"استلم بضاعتك",  d:"تتبع الشحنة لحظةً بلحظة" },
          ].map((s,i) => (
            <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{ width:44, height:44, borderRadius:"50%", background:"rgba(0,229,160,.08)", border:"1.5px solid rgba(0,229,160,.18)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0, marginTop:2 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize:9, color:T.accent, fontWeight:900, letterSpacing:1.5, marginBottom:3 }}>خطوة {s.n}</div>
                <div style={{ fontWeight:800, fontSize:15 }}>{s.t}</div>
                <div style={{ color:T.muted, fontSize:13, marginTop:3 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── SUPPLIERS ─────────────────────────────────────────────────────────────────
function SuppliersPage({ setChat }) {
  const [filter, setFilter] = useState("الكل");
  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 16px" }}>
      <div style={{ paddingTop:18, marginBottom:14 }}>
        <h2 style={{ fontSize:22, fontWeight:900 }}>الموردون والمصانع</h2>
        <p style={{ color:T.muted, fontSize:13, marginTop:4 }}>12,400+ مورد موثق</p>
      </div>
      <div className="sf-wrap" style={{ marginBottom:12 }}>
        <span className="sf-ico">🔍</span>
        <input className="inp" placeholder="ابحث..." />
      </div>
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:6, marginBottom:16 }}>
        {["الكل","مصانع","تجار جملة","موزعون"].map(f => (
          <button key={f} className={`chip ${filter===f?"chipOn":"chipOff"}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      {[...SUPPLIERS,...SUPPLIERS].map((s,i) => <SupplierCard key={i} s={s} onChat={() => setChat(true)} />)}
    </div>
  );
}

// ── CATEGORIES ────────────────────────────────────────────────────────────────
function CategoriesPage({ setPage }) {
  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 16px" }}>
      <div style={{ paddingTop:18, marginBottom:18 }}>
        <h2 style={{ fontSize:22, fontWeight:900 }}>الفئات</h2>
        <p style={{ color:T.muted, fontSize:13, marginTop:4 }}>تصفح حسب الصناعة</p>
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

// ── RFQ PAGE ──────────────────────────────────────────────────────────────────
function RFQPage({ showToast }) {
  const rfqs = [
    { product:"ألواح شمسية 400W", qty:"500 قطعة", offers:8,  days:"3 أيام",   budget:"2,400,000 دج" },
    { product:"أسياخ حديد 12mm",  qty:"20 طن",    offers:12, days:"يوم",       budget:"720,000 دج"   },
    { product:"ملابس رياضية",      qty:"1000 قطعة",offers:5,  days:"5 أيام",   budget:"350,000 دج"   },
  ];
  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 16px" }}>
      <div style={{ paddingTop:18, marginBottom:18 }}>
        <h2 style={{ fontSize:22, fontWeight:900 }}>طلبات الأسعار</h2>
        <p style={{ color:T.muted, fontSize:13, marginTop:4 }}>ضع طلبك ودع الموردين يتنافسون</p>
      </div>

      {/* form card */}
      <div className="card" style={{ padding:18, marginBottom:20, border:`1px solid rgba(0,229,160,.15)` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:"rgba(0,229,160,.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📋</div>
          <div style={{ fontWeight:800, fontSize:15, color:T.accent }}>طلب جديد</div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <input className="inp" placeholder="اسم المنتج..." />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <input className="inp" placeholder="الكمية" type="number" />
            <select className="inp"><option>قطعة</option><option>طن</option><option>كغ</option><option>متر</option></select>
          </div>
          <select className="inp">{CATS.map(c => <option key={c.name}>{c.name}</option>)}</select>
          <input className="inp" placeholder="الميزانية (دج)" />
          <textarea className="inp" placeholder="تفاصيل وملاحظات..." style={{ minHeight:72, resize:"vertical" }} />
          <button className="btnP press" style={{ padding:"13px", fontSize:15 }} onClick={() => showToast("تم إرسال طلبك 🎉")}>
            🚀 إرسال للموردين
          </button>
        </div>
      </div>

      {/* active rfqs */}
      <h3 style={{ fontSize:16, fontWeight:900, marginBottom:14 }}>الطلبات النشطة</h3>
      {rfqs.map((r,i) => (
        <div key={i} className="card" style={{ padding:16, marginBottom:12 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontWeight:800, fontSize:14 }}>{r.product}</span>
            <span style={{ background:"rgba(0,229,160,.12)", color:T.accent, padding:"3px 12px", borderRadius:99, fontSize:12, fontWeight:700 }}>{r.offers} عروض</span>
          </div>
          <div style={{ display:"flex", gap:16, fontSize:12, color:T.muted, marginBottom:12 }}>
            <span>📦 {r.qty}</span><span>⏰ {r.days}</span><span>💰 {r.budget}</span>
          </div>
          <button className="btnO" style={{ width:"100%", padding:"10px", fontSize:13 }}>عرض العروض</button>
        </div>
      ))}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function DashboardPage({ showToast }) {
  const [tab, setTab] = useState("overview");
  const TABS = [{ id:"overview",l:"نظرة عامة"},{id:"products",l:"المنتجات"},{id:"orders",l:"الطلبات"},{id:"messages",l:"الرسائل"}];

  const ORDERS = [
    { id:"#7821", buyer:"شركة النجاح",     prod:"50 هاتف",       amt:"450,000 دج", st:"جديد",         c:T.accent },
    { id:"#7820", buyer:"مؤسسة الأمل",      prod:"20 لابتوب",     amt:"760,000 دج", st:"قيد التنفيذ",  c:T.amber  },
    { id:"#7818", buyer:"مستورد الشمال",    prod:"100 إكسسوار",   amt:"85,000 دج",  st:"مكتمل",        c:T.muted  },
    { id:"#7815", buyer:"تاجر العاصمة",     prod:"30 تابلت",      amt:"310,000 دج", st:"مكتمل",        c:T.muted  },
  ];

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
          {/* kpis */}
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

          {/* recent orders */}
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

          {/* plan */}
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

// ── CHAT WIDGET ───────────────────────────────────────────────────────────────
function ChatWidget({ open, onClose }) {
  const [msg,  setMsg]  = useState("");
  const [msgs, setMsgs] = useState([{ from:"sup", text:"مرحباً! كيف أساعدك اليوم؟" }]);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = () => {
    if (!msg.trim()) return;
    setMsgs(m => [...m, { from:"me", text:msg }]);
    setMsg("");
    setTimeout(() => setMsgs(m => [...m, { from:"sup", text:"شكراً! سنتواصل معك قريباً." }]), 800);
  };

  if (!open) return null;
  return (
    <div style={{ position:"fixed", bottom:74, left:"50%", transform:"translateX(-50%)", width:"calc(100% - 20px)", maxWidth:440, background:T.surface, border:`1px solid ${T.border}`, borderRadius:20, zIndex:300, display:"flex", flexDirection:"column", height:340, animation:"slideUp .3s ease", boxShadow:"0 24px 64px rgba(0,0,0,.7)", fontFamily:"'Cairo',sans-serif" }}>
      <div style={{ padding:"13px 16px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", borderRadius:"20px 20px 0 0", background:"rgba(0,229,160,.05)" }}>
        <div>
          <div style={{ fontWeight:800, fontSize:14 }}>مصنع النور للإلكترونيات</div>
          <PulseBar />
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,.07)", border:"none", color:T.muted, width:30, height:30, borderRadius:8, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
      </div>
      <div style={{ flex:1, padding:12, overflowY:"auto", display:"flex", flexDirection:"column", gap:8 }}>
        {msgs.map((m,i) => (
          <div key={i} className={m.from==="me"?"cbMe":"cbSup"} style={{ padding:"9px 13px", fontSize:13, maxWidth:"78%", color:T.text }}>
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding:"10px 12px", borderTop:`1px solid ${T.border}`, display:"flex", gap:8 }}>
        <input className="inp" placeholder="اكتب رسالتك..." style={{ flex:1, padding:"10px 13px" }}
          value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key==="Enter" && send()} />
        <button className="btnP" style={{ padding:"10px 16px", borderRadius:12 }} onClick={send}>↑</button>
      </div>
    </div>
  );
}

// ── RFQ SHEET ─────────────────────────────────────────────────────────────────
function RFQSheet({ open, onClose, showToast }) {
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

// ── ROOT APP ──────────────────────────────────────────────────────────────────
const NAV = [
  { id:"home",       icon:"🏠", label:"الرئيسية"  },
  { id:"suppliers",  icon:"🏭", label:"الموردون"   },
  { id:"categories", icon:"📦", label:"الفئات"     },
  { id:"rfq",        icon:"📋", label:"الأسعار"    },
  { id:"dashboard",  icon:"📊", label:"حسابي"      },
];

export default function App() {
  const [onboard, setOnboard] = useState(true);
  const [page,    setPage]    = useState("home");
  const [rfq,     setRfq]     = useState(false);
  const [chat,    setChat]    = useState(false);
  const [toast,   setToast]   = useState(null);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  if (onboard) return <Onboarding onDone={() => setOnboard(false)} />;

  // auth pages — no bottom nav
  const isAuth = page === "login" || page === "register";

  return (
    <div dir="rtl" style={{
      fontFamily:"'Cairo',sans-serif",
      background: T.bg,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      color: T.text,
      overflow: "hidden",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
    }}>
      <style>{CSS}</style>

      {/* ambient bg */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0,
        background:`radial-gradient(ellipse at 15% 25%, rgba(0,229,160,.05) 0%, transparent 55%),
                    radial-gradient(ellipse at 85% 75%, rgba(61,142,240,.04) 0%, transparent 55%)` }} />

      {/* ── HEADER ── */}
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

      {/* ── CONTENT ── */}
      <div style={{ flex:1, overflow:"hidden", position:"relative", zIndex:1 }}>
        {page==="home"       && <HomePage       setPage={setPage} setRfq={setRfq} setChat={setChat} />}
        {page==="suppliers"  && <SuppliersPage  setChat={setChat} />}
        {page==="categories" && <CategoriesPage setPage={setPage} />}
        {page==="rfq"        && <RFQPage        showToast={showToast} />}
        {page==="dashboard"  && <DashboardPage  showToast={showToast} />}
        {page==="login"      && <LoginPage      setPage={setPage} showToast={showToast} />}
        {page==="register"   && <RegisterPage   setPage={setPage} showToast={showToast} />}
      </div>

      {/* ── BOTTOM NAV (hidden on auth pages) ── */}
      {!isAuth && (
        <nav style={{
          position: "relative", zIndex: 200, flexShrink: 0,
          background: "rgba(6,10,18,.97)",
          backdropFilter: "blur(20px)",
          borderTop: `1px solid ${T.border}`,
          display: "flex",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}>
          {NAV.map(item => (
            <button key={item.id} className={`bnBtn ${page===item.id?"on":""}`} onClick={() => setPage(item.id)}>
              <span className="bni">
                {item.icon}
                {item.id==="dashboard" && page!=="dashboard" && <div className="ndot" />}
              </span>
              <span className="bnl">{item.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* ── OVERLAYS ── */}
      <ChatWidget open={chat} onClose={() => setChat(false)} />
      <RFQSheet   open={rfq}  onClose={() => setRfq(false)} showToast={showToast} />
      {toast && <Toast msg={toast} />}
    </div>
  );
}
