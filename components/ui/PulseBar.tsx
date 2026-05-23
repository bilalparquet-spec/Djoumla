"use client";
import { T } from "@/lib/theme";

export function PulseBar({ color = T.accent }: { color?: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <div style={{ width:6, height:6, borderRadius:"50%", background:color, animation:"pulse 2s infinite" }} />
      <span style={{ fontSize:11, color, fontWeight:700, letterSpacing:.5 }}>مباشر</span>
    </div>
  );
}
