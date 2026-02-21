import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { lenisInstance } from "../ScrollSmoother/ScrollSMoother"; // Adjust path to your file

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisInstance) {
      // 'immediate: true' is the magic flag. 
      // It kills inertia and snaps the scroll to 0 instantly.
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}