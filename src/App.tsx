import { useEffect } from "react";
import { useTranslation } from "../node_modules/react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Overlay from "./pages/Overlay";

// Handle different base names using the value from the vite config
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("pageTitle");
  }, [t]);

  // HashRouter enables multiple routes using the '/#' prefix
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Overlay edit={false} />} />
        <Route path="/edit" element={<Overlay edit={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
