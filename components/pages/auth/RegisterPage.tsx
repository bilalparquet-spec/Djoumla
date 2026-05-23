"use client";
import { useState } from "react";
import React from "react";
import { T } from "@/lib/theme";
import { CATS, WILAYAS } from "@/lib/constants";

interface Props {
  setPage: (p: string) => void;
  showToast: (m: string) => void;
}

export function RegisterPage({ setPage, showToast }: Props) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [form, setForm] = useState({ name:"", phone:"", email:"", pass:"", confirm:"", wilaya:"", sector:"", rc:"" });
  const [otp,  setOtp]  = useState(["","","","","",""]);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const strength = (p: string) => {
    if (!p) return { w:0, c:"transparent", l:"" };
    if (p.length < 6) return { w:25, c:"#F05252", l:"ضعيفة" };
    if (p.length < 9) return { w:55, c:T.amber,  l:"متوسطة" };
    if (/[A-Z]/.test(p) && /\d/.test(p)) return { w:100, c:T.accent, l:"قوية جداً" };
    return { w:75, c:T.blue, l:"جيدة" };
  };
  const str = strength(form.pass);

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

  if (step === 1) return (
    <div className="pscroll aFadeUp" style={{ padding:"0 20px" }}>
      <div style={{ paddingTop:32, paddingBottom:24 }}>
        <h1 style={{ fontSize:24, fontWeight:900 }}>إنشاء حساب</h1>
        <p style={{ color:T.muted, fontSize:14, marginTop:6 }}>كيف ستستخدم المنصة؟</p>
      </div>
      <Steps />
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {[
          { id:"buyer",    icon:"🛒", title:"مشتري / تاجر",  desc:"أبحث عن موردين وأشتري بالجملة", c:T.blue   },
          { id:"supplier", icon:"🏭", title:"مورد / مصنع",   desc:"أعرض منتجاتي وأبيع بالجملة",   c:T.accent },
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
          { k:"phone", label:"رقم الهاتف",          ph:"05xxxxxxxx",          type:"tel"   },
          { k:"email", label:"البريد الإلكتروني",   ph:"email@example.com",   type:"email" },
        ].map(f => (
          <div key={f.k}>
            <label style={{ display:"block", fontSize:12, color:T.muted, marginBottom:7, fontWeight:600 }}>{f.label}</label>
            <input className="inp" placeholder={f.ph} value={form[f.k as keyof typeof form]} onChange={set(f.k)} type={f.type||"text"} />
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

  return (
    <div className="pscroll aFadeUp" style={{ padding:"0 20px", display:"flex", flexDirection:"column", justifyContent:"center", minHeight:"100%" }}>
      <div style={{ paddingTop:32, marginBottom:24 }}><Steps /></div>
      <div style={{ textAlign:"center", marginBottom:40 }}>
        <div style={{ fontSize:60, marginBottom:18 }}>📲</div>
        <h2 style={{ fontSize:22, fontWeight:900, marginBottom:12 }}>التحقق من هاتفك</h2>
        <p style={{ color:T.muted, fontSize:14, lineHeight:1.8 }}>
          أرسلنا رمز التحقق إلى<br />
          <strong style={{ color:"#fff" }}>{form.phone || "05xxxxxxxx"}</strong>
        </p>
      </div>

      <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:30, direction:"ltr" }}>
        {otp.map((v,i) => (
          <input key={i} id={`otp${i}`} className="otp-inp" maxLength={1} value={v}
            onChange={e => {
              const val = e.target.value.replace(/\D/,"");
              const next = [...otp]; next[i] = val; setOtp(next);
              if (val && i<5) (document.getElementById(`otp${i+1}`) as HTMLInputElement)?.focus();
            }}
            onKeyDown={e => { if(e.key==="Backspace"&&!v&&i>0) (document.getElementById(`otp${i-1}`) as HTMLInputElement)?.focus(); }}
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
