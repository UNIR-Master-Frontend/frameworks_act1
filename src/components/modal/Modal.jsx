"use client";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 lg:p-8 pointer-events-none">
        <div
          className="relative bg-white rounded-2xl w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[1200px] max-h-[90vh] lg:max-h-[85vh] overflow-y-auto pointer-events-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}
