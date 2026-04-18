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

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          style={{ 
            position: "fixed",
            top: "90px",
            right: "24px",
            zIndex: 2147483647, // Máximo valor real de 32 bits
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              backgroundColor: "#1a1614", 
              border: `2px solid ${type === "success" ? "#d97706" : "#ef4444"}`,
              padding: "16px 24px", // PADDING NORMAL
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
              pointerEvents: "auto",
              minWidth: "280px"
            }}
          >
            <div style={{ color: type === "success" ? "#d97706" : "#ef4444" }}>
              {type === "success" ? <CheckCircle size={24} /> : <XCircle size={24} />}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ color: "#78716c", fontSize: "10px", fontWeight: "900", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
                {type === "success" ? "Sistema Actualizado" : "Aviso de Seguridad"}
              </p>
              <p style={{ color: "white", fontSize: "13px", fontWeight: "bold", margin: 0 }}>
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