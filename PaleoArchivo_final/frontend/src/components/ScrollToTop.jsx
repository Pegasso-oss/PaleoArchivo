import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Intentamos tres métodos distintos a la vez para no fallar
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0; // Para Safari
      document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Edge
    };

    // Le damos 50ms para que la página termine de renderizar
    const timeoutId = setTimeout(scrollToTop, 5);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default ScrollToTop;