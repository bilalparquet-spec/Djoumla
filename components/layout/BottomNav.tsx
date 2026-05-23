"use client";

interface Props {
  page: string;
  setPage: (p: string) => void;
  notifCount?: number;
  msgCount?: number;
}

const NAV = [
  { id: "home",          icon: "🏠", label: "الرئيسية"  },
  { id: "suppliers",     icon: "🏭", label: "الموردون"   },
  { id: "rfq",           icon: "📋", label: "الأسعار"    },
  { id: "messages",      icon: "💬", label: "الرسائل"    },
  { id: "dashboard",     icon: "📊", label: "حسابي"      },
];

export function BottomNav({ page, setPage, notifCount = 0, msgCount = 2 }: Props) {
  return (
    <nav style={{
      position: "relative", zIndex: 200, flexShrink: 0,
      background: "rgba(6,10,18,.97)",
      backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      display: "flex",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      {NAV.map(item => (
        <button key={item.id} className={`bnBtn ${page === item.id ? "on" : ""}`} onClick={() => setPage(item.id)}>
          <span className="bni" style={{ position: "relative", display: "inline-block" }}>
            {item.icon}
            {item.id === "messages" && msgCount > 0 && (
              <span style={{ position: "absolute", top: -4, right: -6, background: "#F05252", color: "#fff", fontSize: 9, fontWeight: 900, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #060A12" }}>{msgCount}</span>
            )}
            {item.id === "dashboard" && notifCount > 0 && (
              <span style={{ position: "absolute", top: -4, right: -6, background: "#F5A623", color: "#060A12", fontSize: 9, fontWeight: 900, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #060A12" }}>{notifCount}</span>
            )}
          </span>
          <span className="bnl">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
