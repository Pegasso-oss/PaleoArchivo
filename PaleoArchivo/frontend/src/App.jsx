import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useUser } from "./context/useUser";
import {
  LandingPage, DinoDetailPage, FavoritesPage, ProfilePage,
  ArchivoPage,
  PaleozoicoPage, CambricoPage, OrdovicicoPage, SiluricoPage,
  DevonicoPage, CarboniferoPage, PermicoPage,
  MesozoicoPage, TriasicoPage, JurasicoPage, CretacicoPage,
  CenozoicoPage,
  PaleogenoPage, PaleocenoPage, EocenoPage, OligocenoPage,
  NeogenoPage,   MiocenoPage,  PliocenoPage,
  CuaternarioPage, PleistocenoPage, HolocenoPage,
} from "./pages/pages.js";

import Header   from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Login    from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Toast    from "./components/Toast.jsx";

function App() {
  const location = useLocation();
  const { theme } = useUser();
  const isLight = theme === "light";

  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    document.body.style.backgroundColor = isLight ? "#f8f6f2" : "#1d1914";
    document.body.style.transition = "background-color 0.4s ease";
  }, [isLight]);

  return (
    <div className={`min-h-screen flex flex-col selection:bg-amber-500/30 transition-all duration-500 ${
      isLight ? "light-theme bg-[#f8f6f2] text-stone-900" : "bg-[#1d1914] text-white"
    }`}>
      {!hideHeader && <Header />}

      <div style={{ position: "relative", zIndex: 99999 }}>
        <Toast
          isVisible={toast.isVisible}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, isVisible: false })}
        />
      </div>

      <main className="flex-grow flex flex-col">
        <Routes>

          {/* PERSONAL */}
          <Route path="/"           element={<LandingPage />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/favorites"  element={<FavoritesPage />} />
          <Route path="/perfil"     element={<ProfilePage />} />
          <Route path="/animal/:id" element={<DinoDetailPage />} />
          <Route path="/archivo"    element={<ArchivoPage />} />

          {/* PALEOZOICO */}
          <Route path="/era/paleozoico"             element={<PaleozoicoPage />} />
          <Route path="/era/paleozoico/cambrico"    element={<CambricoPage />} />
          <Route path="/era/paleozoico/ordovicico"  element={<OrdovicicoPage />} />
          <Route path="/era/paleozoico/silurico"    element={<SiluricoPage />} />
          <Route path="/era/paleozoico/devonico"    element={<DevonicoPage />} />
          <Route path="/era/paleozoico/carbonifero" element={<CarboniferoPage />} />
          <Route path="/era/paleozoico/permico"     element={<PermicoPage />} />

          {/* MESOZOICO */}
          <Route path="/era/mesozoico"           element={<MesozoicoPage />} />
          <Route path="/era/mesozoico/triasico"  element={<TriasicoPage />} />
          <Route path="/era/mesozoico/jurasico"  element={<JurasicoPage />} />
          <Route path="/era/mesozoico/cretacico" element={<CretacicoPage />} />

          {/* CENOZOICO */}
          <Route path="/era/cenozoico" element={<CenozoicoPage />} />

          <Route path="/era/cenozoico/paleogeno"           element={<PaleogenoPage />} />
          <Route path="/era/cenozoico/paleogeno/paleoceno" element={<PaleocenoPage />} />
          <Route path="/era/cenozoico/paleogeno/eoceno"    element={<EocenoPage />} />
          <Route path="/era/cenozoico/paleogeno/oligoceno" element={<OligocenoPage />} />

          <Route path="/era/cenozoico/neogeno"          element={<NeogenoPage />} />
          <Route path="/era/cenozoico/neogeno/mioceno"  element={<MiocenoPage />} />
          <Route path="/era/cenozoico/neogeno/plioceno" element={<PliocenoPage />} />

          <Route path="/era/cenozoico/cuaternario"             element={<CuaternarioPage />} />
          <Route path="/era/cenozoico/cuaternario/pleistoceno" element={<PleistocenoPage />} />
          <Route path="/era/cenozoico/cuaternario/holoceno"    element={<HolocenoPage />} />

        </Routes>
      </main>

      {!hideHeader && <Footer />}
    </div>
  );
}

export default App;