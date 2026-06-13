import React, { useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, type = 'info', visible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`toast toast-${type}`} role="alert">
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close">×</button>
    </div>
  );
}
