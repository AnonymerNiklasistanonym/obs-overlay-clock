import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "../node_modules/react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Handle different base names using the value from the vite config
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

// Lazy load pages instead of pulling in all components
const Overlay = lazy(() => import("./pages/Overlay"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle");
  }, [t]);

  return (
    <BrowserRouter basename={basename}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Overlay edit={false} />} />
          <Route path="/edit" element={<Overlay edit={true} />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
