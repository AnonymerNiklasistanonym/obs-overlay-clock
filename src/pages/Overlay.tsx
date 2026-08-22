import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useCountryStore } from "../stores/countryStore";
import { CountryFlag } from "../components/CountryFlag";
import { usePositionStore } from "../stores/positionStore";
import { useTimeStore } from "../stores/timeStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useFontSizeStore } from "../stores/fontSizeStore";
import { useNoteStore } from "../stores/noteStore";
import "./Overlay.css";
import { FONT_FAMILY_DEFAULT, useFontFamilyStore } from "../stores/fontFamilyStore";

// Lazy load components that will only be necessary when editing the page
const EditOverlay = lazy(() => import("../components/EditOverlay"));

export interface OverlayProps {
  edit?: boolean;
}

function Overlay({ edit }: OverlayProps) {
  const country = useCountryStore((state) => state.country);
  const positionHorizontal = usePositionStore((state) => state.positionHorizontal);
  const positionVertical = usePositionStore((state) => state.positionVertical);
  const timeString = useTimeStore((state) => state.timeString);
  const fontFamily = useFontFamilyStore((state) => state.fontFamily);
  const fontSize = useFontSizeStore((state) => state.fontSize);
  const note = useNoteStore((state) => state.note);
  const [now, setNow] = useState(() => new Date());

  const navigate = useNavigate();
  const location = useLocation();

  const time = useMemo(() => format(now, timeString), [now, timeString]);
  const classNames = useMemo(() => {
    return [positionHorizontal, positionVertical].join(" ");
  }, [positionHorizontal, positionVertical]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--clock-font-family",
      fontFamily ? `${fontFamily},${FONT_FAMILY_DEFAULT}` : FONT_FAMILY_DEFAULT,
    );
  }, [fontFamily]);

  useEffect(() => {
    document.documentElement.style.setProperty("--clock-font-size", `${fontSize}rem`);
  }, [fontSize]);

  useEffect(() => {
    let timeout: number;

    const update = () => {
      const current = new Date();
      setNow(current);
      // Schedule the next update at the next exact second boundary.
      const delay = 1000 - current.getMilliseconds();
      timeout = window.setTimeout(update, delay);
    };

    const delay = 1000 - new Date().getMilliseconds();
    timeout = window.setTimeout(update, delay);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore key when currently inside an input element
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if (event.key === "e") {
        if (edit) {
          navigate({
            pathname: "/",
            search: location.search,
          });
        } else {
          navigate({
            pathname: "/edit",
            search: location.search,
          });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, location, edit]);

  return (
    <>
      <section id="clock-wrapper">
        <div id="clock" className={classNames}>
          <span id="clock-time">{time}</span>
          {note && <span id="clock-note">{note}</span>}
          {country && (
            <span id="clock-country">
              <CountryFlag />
            </span>
          )}
        </div>
      </section>
      {edit && (
        <Suspense fallback={null}>
          <EditOverlay />
        </Suspense>
      )}
    </>
  );
}

export default Overlay;
