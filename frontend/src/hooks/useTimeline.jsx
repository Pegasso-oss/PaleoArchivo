import { createContext, useContext, useState } from "react";

const TimelineContext = createContext(null);

export function TimelineProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openTimeline = () => setIsOpen(true);
  const closeTimeline = () => setIsOpen(false);

  return (
    <TimelineContext.Provider value={{ isOpen, openTimeline, closeTimeline }}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("useTimeline must be used inside TimelineProvider");
  return ctx;
}
