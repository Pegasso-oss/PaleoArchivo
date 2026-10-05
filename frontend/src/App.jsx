import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useUser } from "./context/useUser";

const AdminPage = lazy(() => import("./pages/AdminPage.jsx"));
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const DinoDetailPage = lazy(() => import("./pages/DinoDetailPage.jsx"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));
const ArchivoPage = lazy(() => import("./pages/ArchivoPage.jsx"));
const TopFavoritosPage = lazy(() => import("./pages/TopFavoritosPage.jsx"));
const PaleoMapPage = lazy(() => import("./pages/PaleoMapPage.jsx"));
const ComparadorPage = lazy(() => import("./pages/ComparadorPage.jsx"));
const SugerirPage = lazy(() => import("./pages/SugerirPage.jsx"));
const EdiacaricoPage = lazy(() => import("./pages/EdiacaricoPage.jsx"));
const PaleozoicoPage = lazy(() => import("./pages/PaleozoicoPage.jsx"));
const CambricoPage = lazy(() => import("./pages/CambricoPage.jsx"));
const OrdovicicoPage = lazy(() => import("./pages/OrdovicicoPage.jsx"));
const SiluricoPage = lazy(() => import("./pages/SiluricoPage.jsx"));
const DevonicoPage = lazy(() => import("./pages/DevonicoPage.jsx"));
const CarboniferoPage = lazy(() => import("./pages/CarboniferoPage.jsx"));
const PermicoPage = lazy(() => import("./pages/PermicoPage.jsx"));
const MesozoicoPage = lazy(() => import("./pages/MesozoicoPage.jsx"));
const TriasicoPage = lazy(() => import("./pages/TriasicoPage.jsx"));
const JurasicoPage = lazy(() => import("./pages/JurasicoPage.jsx"));
const CretacicoPage = lazy(() => import("./pages/CretacicoPage.jsx"));
const CenozoicoPage = lazy(() => import("./pages/CenozoicoPage.jsx"));
const PaleogenoPage = lazy(() => import("./pages/PaleogenoPage.jsx"));
const PaleocenoPage = lazy(() => import("./pages/PaleocenoPage.jsx"));
const EocenoPage = lazy(() => import("./pages/EocenoPage.jsx"));
const OligocenoPage = lazy(() => import("./pages/OligocenoPage.jsx"));
const NeogenoPage = lazy(() => import("./pages/NeogenoPage.jsx"));
const MiocenoPage = lazy(() => import("./pages/MiocenoPage.jsx"));
const PliocenoPage = lazy(() => import("./pages/PliocenoPage.jsx"));
const CuaternarioPage = lazy(() => import("./pages/CuaternarioPage.jsx"));
const PleistocenoPage = lazy(() => import("./pages/PleistocenoPage.jsx"));
const HolocenoPage = lazy(() => import("./pages/HolocenoPage.jsx"));

import Header        from "./components/Header.jsx";
import Footer        from "./components/Footer.jsx";
import Login         from "./components/Login.jsx";
import Register      from "./components/Register.jsx";
import Toast         from "./components/Toast.jsx";
import TimelineModal from "./components/TimelineModal.jsx";

function App() {
  const location = useLocation();
  const { theme } = useUser();
  const isLight = theme === "light";

  const [toast, setToast] = useState({ isVisible: false, message: "", type: "success" });

  const hideHeader = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/admin";

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
        <Suspense fallback={<div className="flex-grow" aria-busy="true" />}>
          <Routes>

          {/* PERSONAL */}
          <Route path="/"              element={<LandingPage />} />
          <Route path="/login"         element={<Login />} />
          <Route path="/register"      element={<Register />} />
          <Route path="/favorites"     element={<FavoritesPage />} />
          <Route path="/perfil"        element={<ProfilePage />} />
          <Route path="/animal/:id"    element={<DinoDetailPage />} />
          <Route path="/archivo"       element={<ArchivoPage />} />
          <Route path="/top-favoritos" element={<TopFavoritosPage />} />
          <Route path="/mapa"          element={<PaleoMapPage />} />
          <Route path="/comparador"    element={<ComparadorPage />} />
          <Route path="/sugerir"       element={<SugerirPage />} />
          <Route path="/admin"         element={<AdminPage />} />
          
          {/* Precambrico */}
          <Route path="/era/ediacarico"             element={<EdiacaricoPage />} />

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
        </Suspense>
      </main>

      {!hideHeader && <Footer />}

      {/* Modal cronología — fuera del layout, se gestiona solo */}
      <TimelineModal />
    </div>
  );
}

export default App;
