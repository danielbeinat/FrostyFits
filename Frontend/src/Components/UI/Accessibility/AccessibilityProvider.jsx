import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

// Accessibility Context
const AccessibilityContext = createContext();

// Accessibility Provider Component
export const AccessibilityProvider = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState("normal"); // small, normal, large
  const [screenReader, setScreenReader] = useState(false);

  // Check user preferences on mount
  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window?.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );
    if (motionQuery) {
      setReducedMotion(motionQuery.matches);

      const handleMotionChange = (e) => setReducedMotion(e.matches);
      motionQuery.addEventListener("change", handleMotionChange);

      // Cleanup
      return () => {
        motionQuery.removeEventListener("change", handleMotionChange);
      };
    }
  }, []);

  useEffect(() => {
    // Check for high contrast preference
    const contrastQuery = window?.matchMedia?.("(prefers-contrast: high)");
    if (contrastQuery) {
      setHighContrast(contrastQuery.matches);

      const handleContrastChange = (e) => setHighContrast(e.matches);
      contrastQuery.addEventListener("change", handleContrastChange);

      // Cleanup
      return () => {
        contrastQuery.removeEventListener("change", handleContrastChange);
      };
    }
  }, []);

  useEffect(() => {
    // Check for screen reader
    const screenReaderQuery = window?.matchMedia?.("(speech)");
    if (screenReaderQuery) {
      setScreenReader(screenReaderQuery.matches);

      const handleScreenReaderChange = (e) => setScreenReader(e.matches);
      screenReaderQuery.addEventListener("change", handleScreenReaderChange);

      // Cleanup
      return () => {
        screenReaderQuery.removeEventListener(
          "change",
          handleScreenReaderChange,
        );
      };
    }
  }, []);

  // Load saved preferences
  useEffect(() => {
    const savedFontSize = localStorage?.getItem?.("accessibility-fontSize");
    if (savedFontSize) {
      setFontSize(savedFontSize);
      applyFontSize(savedFontSize);
    }
  }, []);

  // Apply font size changes
  const applyFontSize = (size) => {
    const root = document?.documentElement;
    if (root) {
      switch (size) {
        case "small":
          root.style.fontSize = "14px";
          break;
        case "normal":
          root.style.fontSize = "16px";
          break;
        case "large":
          root.style.fontSize = "18px";
          break;
        default:
          root.style.fontSize = "16px";
      }
    }
  };

  // Handle font size changes
  useEffect(() => {
    applyFontSize(fontSize);
    localStorage?.setItem?.("accessibility-fontSize", fontSize);
  }, [fontSize]);

  // Apply high contrast styles
  useEffect(() => {
    if (highContrast) {
      document?.body?.classList?.add("high-contrast");
    } else {
      document?.body?.classList?.remove("high-contrast");
    }
  }, [highContrast]);

  // Skip to main content function
  const skipToMain = useCallback(() => {
    const mainContent = document?.getElementById?.("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ block: "center" });
    }
  }, []);

  // Focus management utilities
  const trapFocus = useCallback((element) => {
    const focusableElements = element?.querySelectorAll?.(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusable = focusableElements?.[0];
    const lastFocusable = focusableElements?.[focusableElements?.length - 1];

    if (!firstFocusable || !lastFocusable) return;

    const handleTabKey = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document?.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document?.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    };

    element?.addEventListener?.("keydown", handleTabKey);
    firstFocusable?.focus?.();

    return () => {
      element?.removeEventListener?.("keydown", handleTabKey);
    };
  }, []);

  // Announce to screen readers
  const announce = useCallback((message, priority = "polite") => {
    const announcement = document?.createElement?.("div");
    if (announcement) {
      announcement.setAttribute("aria-live", priority);
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = message;

      document?.body?.appendChild?.(announcement);

      setTimeout(() => {
        document?.body?.removeChild?.(announcement);
      }, 1000);
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    const value = {
      reducedMotion: reducedMotion || false,
      highContrast: highContrast || false,
      fontSize: fontSize || "normal",
      screenReader: screenReader || false,
      setFontSize,
      skipToMain,
      trapFocus,
      announce,
    };

    // Ensure all values are primitive
    return {
      reducedMotion: Boolean(value.reducedMotion),
      highContrast: Boolean(value.highContrast),
      fontSize: String(value.fontSize),
      screenReader: Boolean(value.screenReader),
      setFontSize: value.setFontSize,
      skipToMain: value.skipToMain,
      trapFocus: value.trapFocus,
      announce: value.announce,
    };
  }, [
    reducedMotion,
    highContrast,
    fontSize,
    screenReader,
    setFontSize,
    skipToMain,
    trapFocus,
    announce,
  ]);

  return (
    <AccessibilityContext.Provider value={contextValue}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Skip to Main Content Component
export const SkipToMain = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
    onClick={(e) => {
      e.preventDefault();
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView();
      }
    }}
  >
    Saltar al contenido principal
  </a>
);

// Focus Outline Component
export const FocusOutline = () => (
  <style>{`
    :focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
    :focus:not(:focus-visible) { outline: none; }
    .high-contrast { filter: contrast(1.5); }
    .high-contrast * { border-color: currentColor !important; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    .focus\\:not-sr-only:focus { position: static; width: auto; height: auto; padding: inherit; margin: inherit; overflow: visible; clip: auto; white-space: inherit; }
  `}</style>
);

export default AccessibilityProvider;
