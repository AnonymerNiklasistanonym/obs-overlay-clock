import { useTranslation } from "../../node_modules/react-i18next";
import { useCallback } from "react";
import { FONT_FAMILY_DEFAULT, useFontFamilyStore } from "../stores/fontFamilyStore";

export default function FontFamilyInput() {
  const fontFamily = useFontFamilyStore((state) => state.fontFamily);
  const setFontFamily = useFontFamilyStore((state) => state.setFontFamily);
  const { t } = useTranslation();

  const reset = useCallback(() => setFontFamily(null), [setFontFamily]);

  return (
    <>
      <input
        type="text"
        value={fontFamily ?? FONT_FAMILY_DEFAULT}
        onChange={(e) => setFontFamily(e.target.value)}
      />
      <br />
      <button onClick={reset}>{t("reset")}</button>
    </>
  );
}
