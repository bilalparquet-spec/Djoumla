"use client";
import { useState, useRef, useEffect } from "react";
import { T } from "@/lib/theme";
import { PulseBar } from "@/components/ui/PulseBar";
import type { ChatMsg } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ChatWidget({ open, onClose }: Props) {
  const [msg,  setMsg]  = useState("");
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ from:"sup", text:"مرحباً! كيف أساعدك اليوم؟" }]);
  const endRef = useRef<HTMLDivElement>(null);

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
