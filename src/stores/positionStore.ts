import { create } from "zustand";

export type PositionVertical = "top" | "bottom";
export type PositionHorizontal = "left" | "center" | "right";

export const positionsVertical: PositionVertical[] = ["top", "bottom"];
export const positionsHorizontal: PositionHorizontal[] = ["left", "center", "right"];

interface PositionStore {
  positionVertical: PositionVertical;
  positionHorizontal: PositionHorizontal;
  setPositionVertical: (positionVertical: PositionVertical) => void;
  setPositionHorizontal: (positionHorizontal: PositionHorizontal) => void;
}

export const usePositionStore = create<PositionStore>((set) => ({
  positionVertical: new URLSearchParams(window.location.search).get(
    "positionVertical",
  ) as PositionVertical,
  positionHorizontal: new URLSearchParams(window.location.search).get(
    "positionHorizontal",
  ) as PositionHorizontal,
  setPositionVertical: (positionVertical) => {
    const url = new URL(window.location.href);

    if (positionVertical) {
      url.searchParams.set("positionVertical", positionVertical);
    } else {
      url.searchParams.delete("positionVertical");
    }

    window.history.replaceState({}, "", url);

    set({ positionVertical });
  },
  setPositionHorizontal: (positionHorizontal) => {
    const url = new URL(window.location.href);

    if (positionHorizontal) {
      url.searchParams.set("positionHorizontal", positionHorizontal);
    } else {
      url.searchParams.delete("positionHorizontal");
    }

    window.history.replaceState({}, "", url);

    set({ positionHorizontal });
  },
}));
