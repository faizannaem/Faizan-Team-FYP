import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useNavigationLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const routesWithLoader = [
      "/",        // Home route
      "/contact", // Contact route
      "/about",   // About route
      "/product", // Product route
      "/cart",    // Cart route
      "/login",   // Login route
      "/signup",  // Signup route
    ];

    if (routesWithLoader.includes(location.pathname)) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 800);

      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false);
    }
  }, [location]);

  return loading;
};

export default useNavigationLoader;
