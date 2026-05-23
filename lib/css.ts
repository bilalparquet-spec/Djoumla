import { T } from "./theme";

export const CSS = `
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

::-webkit-scrollbar { width:3px; height:3px; }
::-webkit-scrollbar-thumb { background:var(--dim); border-radius:3px; }

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

.pscroll {
  height:100%;
  overflow-y:auto;
  overflow-x:hidden;
  -webkit-overflow-scrolling:touch;
  overscroll-behavior:contain;
  padding-bottom:90px;
}

.press { transition:transform .12s,opacity .12s; cursor:pointer; }
.press:active { transform:scale(.96); opacity:.85; }

.card { background:var(--card); border:1px solid var(--border); border-radius:var(--rLg); }

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

.chip {
  padding:7px 14px; border-radius:var(--rFull);
  font-family:'Cairo',sans-serif; font-size:13px; font-weight:700;
  cursor:pointer; white-space:nowrap; flex-shrink:0;
  border:1.5px solid; transition:all .15s;
}
.chipOn  { background:rgba(0,229,160,.1); border-color:var(--accent); color:var(--accent); }
.chipOff { background:transparent; border-color:var(--border); color:var(--muted); }

.badgeG { background:linear-gradient(135deg,#F5A623,#F05252); color:#fff; }
.badgeS { background:linear-gradient(135deg,#94A3B8,#64748B); color:#fff; }
.badge  { padding:2px 10px; border-radius:var(--rFull); font-size:11px; font-weight:800; }

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

.bnBtn.on::before {
  content:'';
  position:absolute;
  top:0; left:50%; transform:translateX(-50%);
  width:28px; height:3px;
  background:var(--accent);
  border-radius:0 0 3px 3px;
}

.ndot {
  position:absolute; top:0; right:2px;
  width:8px; height:8px; border-radius:50%;
  background:#F05252; border:2px solid var(--bg);
  animation:pulse 2s infinite;
}

.toast {
  position:fixed; bottom:88px; left:50%; transform:translateX(-50%);
  background:rgba(0,229,160,.18); border:1px solid rgba(0,229,160,.35);
  backdrop-filter:blur(12px);
  color:var(--accent); padding:11px 24px; border-radius:var(--rFull);
  font-size:13px; font-weight:700; font-family:'Cairo',sans-serif;
  z-index:9999; animation:fadeUp .3s ease; white-space:nowrap;
  box-shadow:0 8px 32px rgba(0,229,160,.15);
}

.divider { height:1px; background:var(--border); }

.tag {
  padding:3px 10px; border-radius:var(--rFull);
  font-size:12px; font-weight:600;
  background:rgba(61,142,240,.12); color:var(--blue);
}

.secH { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }
.secH h2 { font-size:18px; font-weight:900; }
.secH button { background:none; border:none; color:var(--accent); font-family:'Cairo',sans-serif; font-size:13px; cursor:pointer; font-weight:600; }

.ava { border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.ibox { border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }

.otp-inp {
  width:46px; height:54px; text-align:center; font-size:20px; font-weight:900;
  border-radius:12px; border:1.5px solid var(--border);
  background:rgba(255,255,255,.05); color:var(--text);
  font-family:'Cairo',sans-serif; outline:none;
  transition:border-color .2s, box-shadow .2s;
}
.otp-inp:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(0,229,160,.1); }

.psb { height:4px; border-radius:2px; transition:width .35s, background .35s; }

.sf-wrap { position:relative; }
.sf-ico  { position:absolute; right:14px; top:50%; transform:translateY(-50%); color:var(--muted); pointer-events:none; font-size:15px; }
.sf-wrap .inp { padding-right:40px; }

.hero-bg {
  background: linear-gradient(145deg,rgba(0,229,160,.08) 0%,rgba(61,142,240,.06) 50%,transparent 100%);
  border:1px solid rgba(0,229,160,.15);
}

.stat-card {
  background:rgba(255,255,255,.03);
  border:1px solid var(--border);
  border-radius:12px;
  padding:14px;
  text-align:center;
}

.vbadge {
  display:inline-flex; align-items:center; gap:5px;
  background:rgba(0,229,160,.07); border:1px solid rgba(0,229,160,.2);
  border-radius:var(--rFull); padding:3px 10px;
  font-size:12px; color:var(--accent); font-weight:600;
}

.shimmer {
  background: linear-gradient(90deg, var(--card) 25%, var(--dim) 50%, var(--card) 75%);
  background-size:400px 100%;
  animation:shimmer 1.4s infinite;
}

.stars { color:#F5A623; font-size:12px; }

.cbMe  { background:rgba(0,229,160,.15); border-radius:16px 16px 0 16px; align-self:flex-end; }
.cbSup { background:rgba(255,255,255,.06); border-radius:16px 16px 16px 0; align-self:flex-start; }

.step-active { background:var(--accent); color:#060A12; }
.step-done   { background:rgba(0,229,160,.2); color:var(--accent); border:1.5px solid rgba(0,229,160,.3); }
.step-idle   { background:var(--dim); color:var(--muted); }
`;
