"use client";
import { useState } from "react";
import { CSS } from "@/lib/css";
import { T } from "@/lib/theme";
import { useToast } from "@/hooks/useToast";

import { Toast }        from "@/components/ui/Toast";
import { Header }       from "@/components/layout/Header";
import { BottomNav }    from "@/components/layout/BottomNav";
import { ChatWidget }   from "@/components/overlays/ChatWidget";
import { RFQSheet }     from "@/components/overlays/RFQSheet";
import { Onboarding }   from "@/components/pages/onboarding/Onboarding";
import { LoginPage }    from "@/components/pages/auth/LoginPage";
import { RegisterPage } from "@/components/pages/auth/RegisterPage";
import { HomePage }     from "@/components/pages/HomePage";
import { SuppliersPage }      from "@/components/pages/SuppliersPage";
import { CategoriesPage }     from "@/components/pages/CategoriesPage";
import { RFQPage }            from "@/components/pages/RFQPage";
import { DashboardPage }      from "@/components/pages/DashboardPage";
import { MessagesPage }       from "@/components/pages/MessagesPage";
import { NotificationsPage }  from "@/components/pages/notifications/NotificationsPage";
import { ProductDetailPage }  from "@/components/pages/product/ProductDetailPage";
import { SupplierProfilePage } from "@/components/pages/supplier/SupplierProfilePage";
import { OrdersPage }         from "@/components/pages/orders/OrdersPage";

const AUTH_PAGES  = ["login", "register"];
const INNER_PAGES = ["product-detail", "supplier-profile", "notifications", "orders"];

export default function App() {
  const [onboard,    setOnboard]    = useState(true);
  const [page,       setPage]       = useState("home");
  const [rfq,        setRfq]        = useState(false);
  const [chat,       setChat]       = useState(false);
  const [productId,  setProductId]  = useState("p001");
  const [supplierId, setSupplierId] = useState("s001");
  const { toast, showToast } = useToast();

  if (onboard) return (
    <>
      <style>{CSS}</style>
      <Onboarding onDone={() => setOnboard(false)} />
    </>
  );

  const isAuth  = AUTH_PAGES.includes(page);
  const isInner = INNER_PAGES.includes(page);

  return (
    <div dir="rtl" style={{
      fontFamily: "'Cairo',sans-serif",
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

      {/* Background glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse at 15% 25%, rgba(0,229,160,.05) 0%, transparent 55%),
                     radial-gradient(ellipse at 85% 75%, rgba(61,142,240,.04) 0%, transparent 55%)` }} />

      <Header page={page} setPage={setPage} setChat={setChat} />

      <div style={{ flex: 1, overflow: "hidden", position: "relative", zIndex: 1 }}>
        {page === "home"             && <HomePage            setPage={setPage} setRfq={setRfq} setChat={setChat} setProductId={setProductId} setSupplierId={setSupplierId} />}
        {page === "suppliers"        && <SuppliersPage       setPage={setPage} setSupplierId={setSupplierId} setChat={setChat} />}
        {page === "categories"       && <CategoriesPage      setPage={setPage} />}
        {page === "rfq"              && <RFQPage             showToast={showToast} />}
        {page === "dashboard"        && <DashboardPage       showToast={showToast} setPage={setPage} />}
        {page === "messages"         && <MessagesPage        showToast={showToast} />}
        {page === "notifications"    && <NotificationsPage   showToast={showToast} />}
        {page === "product-detail"   && <ProductDetailPage   productId={productId} setPage={setPage} setSupplierId={setSupplierId} showToast={showToast} />}
        {page === "supplier-profile" && <SupplierProfilePage supplierId={supplierId} setPage={setPage} setProductId={setProductId} setChat={setChat} showToast={showToast} />}
        {page === "orders"           && <OrdersPage          showToast={showToast} />}
        {page === "login"            && <LoginPage           setPage={setPage} showToast={showToast} />}
        {page === "register"         && <RegisterPage        setPage={setPage} showToast={showToast} />}
      </div>

      {!isAuth && <BottomNav page={page} setPage={setPage} notifCount={3} msgCount={2} />}

      <ChatWidget open={chat} onClose={() => setChat(false)} />
      <RFQSheet   open={rfq}  onClose={() => setRfq(false)} showToast={showToast} />
      {toast && <Toast msg={toast} />}
    </div>
  );
}
