"use client";
import { useState, useRef, useEffect } from "react";
import { T } from "@/lib/theme";
import { CHAT_CONVERSATIONS } from "@/lib/mockData";

interface Props {
  showToast: (m: string) => void;
}

export function MessagesPage({ showToast }: Props) {
  const [convos, setConvos] = useState(CHAT_CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const active = convos.find(c => c.id === activeId);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.msgs]);

  const send = () => {
    if (!input.trim() || !activeId) return;
    const msg = { from: "me", text: input, time: new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" }) };
    setConvos(prev => prev.map(c =>
      c.id === activeId ? { ...c, msgs: [...c.msgs, msg], lastMsg: input } : c
    ));
    setInput("");
    setTimeout(() => {
      const reply = { from: "sup", text: "شكراً على رسالتك، سنرد عليك في أقرب وقت.", time: new Date().toLocaleTimeString("ar-DZ", { hour: "2-digit", minute: "2-digit" }) };
      setConvos(prev => prev.map(c =>
        c.id === activeId ? { ...c, msgs: [...c.msgs, reply] } : c
      ));
    }, 900);
  };

  // Chat View
  if (active) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: "'Cairo',sans-serif" }}>
      {/* Chat Header */}
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", gap: 12, alignItems: "center", background: "rgba(13,19,34,.97)", flexShrink: 0 }}>
        <button onClick={() => setActiveId(null)} style={{ background: "rgba(255,255,255,.06)", border: `1px solid ${T.border}`, color: T.text, width: 34, height: 34, borderRadius: 10, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>→</button>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(0,229,160,.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{active.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>{active.name}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: active.online ? T.accent : T.muted }} />
            <span style={{ fontSize: 11, color: active.online ? T.accent : T.muted }}>{active.online ? "متصل الآن" : "غير متصل"}</span>
          </div>
        </div>
        <button onClick={() => showToast("جارٍ الاتصال...")} style={{ background: "rgba(0,229,160,.08)", border: `1px solid rgba(0,229,160,.2)`, color: T.accent, width: 34, height: 34, borderRadius: 10, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>📞</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10, background: T.bg }}>
        <div style={{ textAlign: "center", fontSize: 11, color: T.muted, background: "rgba(255,255,255,.04)", padding: "4px 14px", borderRadius: 99, margin: "0 auto" }}>اليوم</div>
        {active.msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "me" ? "flex-end" : "flex-start", gap: 4 }}>
            <div className={m.from === "me" ? "cbMe" : "cbSup"} style={{ padding: "10px 14px", fontSize: 14, maxWidth: "80%", color: T.text, lineHeight: 1.6 }}>
              {m.text}
            </div>
            <div style={{ fontSize: 10, color: T.muted, paddingLeft: 4, paddingRight: 4 }}>{m.time}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", borderTop: `1px solid ${T.border}`, display: "flex", gap: 8, background: "rgba(13,19,34,.97)", flexShrink: 0 }}>
        <button style={{ background: "rgba(255,255,255,.05)", border: `1px solid ${T.border}`, color: T.muted, width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>📎</button>
        <input className="inp" placeholder="اكتب رسالتك..." style={{ flex: 1, padding: "10px 14px" }}
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()} />
        <button className="btnP" style={{ width: 38, height: 38, borderRadius: 10, fontSize: 18, flexShrink: 0, padding: 0 }} onClick={send}>↑</button>
      </div>
    </div>
  );

  // Conversations List
  const totalUnread = convos.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="pscroll aFadeUp" style={{ padding: "0 16px" }}>
      <div style={{ paddingTop: 18, marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 900 }}>الرسائل</h2>
          {totalUnread > 0 && <p style={{ color: T.accent, fontSize: 13, marginTop: 4, fontWeight: 700 }}>{totalUnread} رسالة غير مقروءة</p>}
        </div>
        <button className="btnP" style={{ padding: "8px 14px", fontSize: 13 }} onClick={() => showToast("افتح محادثة جديدة")}>+ جديد</button>
      </div>

      <div className="sf-wrap" style={{ marginBottom: 16 }}>
        <span className="sf-ico">🔍</span>
        <input className="inp" placeholder="ابحث في المحادثات..." />
      </div>

      {convos.map(c => (
        <div key={c.id} className="card press" style={{ padding: 16, marginBottom: 10, display: "flex", gap: 14, alignItems: "center" }}
          onClick={() => { setActiveId(c.id); setConvos(prev => prev.map(x => x.id === c.id ? { ...x, unread: 0 } : x)); }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(0,229,160,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{c.avatar}</div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: c.online ? T.accent : T.muted, border: `2px solid ${T.card}` }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ fontWeight: 800, fontSize: 14 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: T.muted, flexShrink: 0 }}>{c.time}</div>
            </div>
            <div style={{ color: T.muted, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.lastMsg}</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>📍 {c.city}</div>
          </div>
          {c.unread > 0 && (
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: T.accent, color: "#060A12", fontSize: 11, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.unread}</div>
          )}
        </div>
      ))}
    </div>
  );
}
