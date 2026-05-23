"use client";
import { useState } from "react";
import { T } from "@/lib/theme";
import { NOTIFICATIONS } from "@/lib/mockData";

interface Props {
  showToast: (m: string) => void;
}

export function NotificationsPage({ showToast }: Props) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const unread = notifs.filter(n => !n.read).length;

  const markAll = () => {
    setNotifs(n => n.map(x => ({ ...x, read: true })));
    showToast("تم تحديد الكل كمقروء");
  };

  return (
    <div className="pscroll aFadeUp" style={{ padding: "0 16px" }}>
      <div style={{ paddingTop: 18, marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 900 }}>الإشعارات</h2>
          {unread > 0 && <p style={{ color: T.accent, fontSize: 13, marginTop: 4, fontWeight: 700 }}>{unread} غير مقروء</p>}
        </div>
        {unread > 0 && (
          <button onClick={markAll} style={{ background: "none", border: "none", color: T.accent, fontFamily: "'Cairo',sans-serif", fontSize: 13, cursor: "pointer", fontWeight: 700 }}>
            تحديد الكل ✓
          </button>
        )}
      </div>

      {/* Unread */}
      {notifs.filter(n => !n.read).length > 0 && (
        <>
          <div style={{ fontSize: 12, color: T.muted, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 }}>الجديدة</div>
          {notifs.filter(n => !n.read).map(n => (
            <div key={n.id} className="press" onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
              style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", borderRadius: 16, background: `${n.color}08`, border: `1px solid ${n.color}20`, marginBottom: 10, cursor: "pointer" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${n.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontWeight: 800, fontSize: 14, color: "#fff" }}>{n.title}</div>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.color, flexShrink: 0, marginTop: 4 }} />
                </div>
                <div style={{ color: T.muted, fontSize: 13, marginTop: 4, lineHeight: 1.6 }}>{n.desc}</div>
                <div style={{ color: n.color, fontSize: 11, marginTop: 6, fontWeight: 700 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Read */}
      {notifs.filter(n => n.read).length > 0 && (
        <>
          <div style={{ fontSize: 12, color: T.muted, fontWeight: 700, margin: "16px 0 10px", letterSpacing: 0.5 }}>السابقة</div>
          {notifs.filter(n => n.read).map(n => (
            <div key={n.id} className="card press" style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", marginBottom: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, opacity: 0.6 }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: T.muted }}>{n.title}</div>
                <div style={{ color: T.muted, fontSize: 12, marginTop: 4, lineHeight: 1.6, opacity: 0.7 }}>{n.desc}</div>
                <div style={{ color: T.muted, fontSize: 11, marginTop: 6 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
