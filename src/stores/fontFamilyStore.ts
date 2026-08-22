import { create } from "zustand";

interface FontFamilyStore {
  fontFamily: string | null;
  setFontFamily: (fontFamily: string | null) => void;
}

export const FONT_FAMILY_DEFAULT = "monospace";

export const useFontFamilyStore = create<FontFamilyStore>((set) => ({
  fontFamily: new URLSearchParams(window.location.search).get("fontFamily") || FONT_FAMILY_DEFAULT,
  setFontFamily: (fontFamily) => {
    const url = new URL(window.location.href);

    if (
      fontFamily &&
      fontFamily.trim().length > 0 &&
      fontFamily.toLowerCase() !== FONT_FAMILY_DEFAULT
    ) {
      url.searchParams.set("fontFamily", fontFamily);
    } else {
      url.searchParams.delete("fontFamily");
    }

    window.history.replaceState({}, "", url);

    set({ fontFamily });
  },
}));
