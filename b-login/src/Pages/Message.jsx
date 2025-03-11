import React from 'react';
export default function Message ({message, type, onClose}) {

  if (!message) return null; // Jei nėra pranešimo, nieko nerodome

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" onClick={onClose}></button>
    </div>
  );
};


