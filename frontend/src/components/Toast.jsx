import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const Toast = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  // Forzamos el renderizado al final del body para evitar el corte del header
  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          style={{ 
            position: "fixed",
            top: "88px", // Altura del header
            right: "40px",
            zIndex: 2147483647, // Máximo z-index permitido por navegadores
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              backgroundColor: "#1a1614", 
              border: `2px solid ${type === "success" ? "#d97706" : "#ef4444"}`,
              borderTop: "none", 
              padding: "10px 24px",
              borderRadius: "0 0 12px 12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              pointerEvents: "auto",
              minWidth: "280px"
            }}
          >
            <div style={{ color: type === "success" ? "#d97706" : "#ef4444" }}>
              {type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ color: "white", fontSize: "11px", fontWeight: "900", margin: 0, textTransform: "uppercase" }}>
                {type === "success" ? "Sistema" : "Aviso"}
              </p>
              <p style={{ color: type === "success" ? "#d97706" : "#ef4444", fontSize: "10px", fontWeight: "bold", margin: 0 }}>
                {message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Toast;