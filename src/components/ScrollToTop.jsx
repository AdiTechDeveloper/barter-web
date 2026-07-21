import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly snap the window scroll back to the top left on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render any UI
}
