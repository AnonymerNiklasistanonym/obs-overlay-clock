import { Suspense, useCallback } from "react";
import PositionSelector from "./PositionSelector";
import { useTranslation } from "../../node_modules/react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import FontSizeInput from "./FontSizeInput";
import TimeStringInput from "./TimeStringInput";
import NoteInput from "./NoteInput";
import "./EditOverlay.css";
import LanguageSwitcher from "./LanguageSwitcher";
import CountrySelector from "./CountrySelector";
import FontFamilySelector from "./FontFamilyInput";

function EditOverlay() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const copyUrl = useCallback(async () => {
    const url = new URL(window.location.href);
    // change only the pathname and keep URL parameters
    url.pathname = url.pathname.replace(/\/edit$/, "") || "/";

    try {
      await navigator.clipboard.writeText(url.toString());
    } catch {
      const input = document.createElement("input");
      input.value = url.toString();
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
  }, []);
  const viewResult = useCallback(
    () =>
      navigate({
        pathname: "/",
        search: location.search,
      }),
    [navigate, location],
  );

  return (
    <section id="center">
      <Suspense fallback={null}>
        <p>
          {t("set-language")}: <LanguageSwitcher />
        </p>
        <ul>
          <li>
            {t("set-time")}: <TimeStringInput />
          </li>
          <li>
            {t("set-country")}: <CountrySelector />
          </li>
          <li>
            {t("set-position")}: <PositionSelector />
          </li>
          <li>
            {t("set-font-size")}: <FontSizeInput />
          </li>
          <li>
            {t("set-font-family")}: <FontFamilySelector />
          </li>
          <li>
            {t("set-note")}: <NoteInput />
          </li>
        </ul>
      </Suspense>
      <button onClick={copyUrl}>{t("copy-url")}</button>
      <br />
      <button onClick={viewResult}>{t("view-result")}</button>
    </section>
  );
}

export default EditOverlay;
