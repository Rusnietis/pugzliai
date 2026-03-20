import { createContext, useState, useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { toastManager } from "../Manager/toastManager";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaTimes
} from "react-icons/fa";
import '../Style/toast.scss';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef([]);

  useEffect(() => {
    toastManager.setShow(showToast);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const showToast = useCallback(({ text, type = "info", duration = 4000 }) => {
    const id = uuidv4();

    setToasts((prev) => [...prev, { id, text, type }]);

    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);

    timers.current.push(timer);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle />;
      case "error":
        return <FaTimesCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.type}`}>
            <div className="toast-left">
              <span className="toast-icon">{getIcon(toast.type)}</span>
              <span>
                {toast.username && <strong>{toast.username}</strong>} {toast.text}
                </span>
            </div>

            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
            >
              <FaTimes />
            </button>

            <div className="toast-progress"></div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};